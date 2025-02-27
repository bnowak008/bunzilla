import { createInterface } from 'node:readline';
import chalk from 'chalk';
import { Command } from 'commander';
import { getBanner } from './banner.js';
import type { ProjectType } from '../types.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

type Choice<T = string> = {
  readonly title: string;
  readonly value: T;
}

type BaseStep<T = any> = {
  name: string;
  message: string;
  description?: string;
  validate?: (input: string) => boolean | string;
  transform?: (input: string) => T;
  initial?: T;
}

type TextStep = BaseStep & {
  type: 'text';
}

type SelectStep = BaseStep & {
  type: 'select';
  choices: readonly Choice[];
}

type ConfirmStep = BaseStep & {
  type: 'confirm';
}

type StepConfig = 
  | ({ type: 'text'; initial?: string } & BaseStep)
  | ({ 
      type: 'select'; 
      initial?: string; 
      choices: readonly Choice[];
      when?: (answers: Record<string, any>) => boolean;
    } & BaseStep)
  | ({ type: 'confirm'; initial?: boolean } & BaseStep)
  | ({ 
      type: ((prev: any) => 'text' | 'select' | 'confirm' | null);
      choices?: readonly Choice[];
    } & Omit<BaseStep, 'transform'>);

type CommandConfig = {
  name: string;
  description: string;
  banner?: {
    render: () => string;
    text?: string;
    responsive?: boolean;
  };
  steps: StepConfig[];
}

type CLIConfig = {
  name: string;
  version: string;
  commands: Record<string, CommandConfig>;
}

// Track the current cursor position
let currentLine = 0;

// Input utilities
async function text(message: string, initial?: string, validate?: (input: string) => boolean | string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Display the initial prompt with the default value if provided
  const promptText = chalk.cyan('? ') + message + (initial ? chalk.dim(` (${initial})`) : '');
  console.log(promptText);
  currentLine++;

  while (true) {
    try {
      const answer = await new Promise<string>((resolve) => {
        rl.question('', (input) => {
          // If user just hits enter, use the initial value
          resolve(input || initial || '');
        });
      });

      if (validate) {
        const result = validate(answer);
        if (typeof result === 'string') {
          console.log(chalk.red('✖ ') + result);
          continue;
        }
      }

      rl.close();
      return answer;
    } catch (error) {
      rl.close();
      throw error;
    }
  }
}

async function select<T = string>(
  message: string, 
  choices: readonly Choice<T>[], 
  initialIndex = 0
): Promise<T> {
  const rl = createInterface({ 
    input: process.stdin, 
    output: process.stdout 
  });

  let selectedIndex = initialIndex;
  const maxIndex = choices.length - 1;

  // Hide cursor during selection
  process.stdout.write('\x1B[?25l');

  // Position cursor and render initial menu
  console.log(chalk.cyan('? ') + message);
  currentLine++;

  const renderChoices = () => {
    process.stdout.write('\x1B[0G'); // Reset to the start of the line
    choices.forEach((choice, i) => {
      const prefix = i === selectedIndex ? chalk.green('>') : ' ';
      console.log(`  ${prefix} ${choice.title}`);
    });
  };

  const clearChoices = () => {
    choices.forEach(() => {
      process.stdout.write('\x1B[1A'); // Move cursor up one line
      process.stdout.write('\x1B[2K'); // Clear the line
    });
  };

  try {
    const result = await new Promise<T>((resolve) => {
      const handleKeypress = (str: string, key: { name: string }) => {
        if (key.name === 'up' && selectedIndex > 0) {
          selectedIndex--;
        } else if (key.name === 'down' && selectedIndex < maxIndex) {
          selectedIndex++;
        } else if (key.name === 'return') {
          cleanup();
          resolve(choices[selectedIndex].value);
          return;
        }
        clearChoices();
        renderChoices();
      };

      const cleanup = () => {
        process.stdin.removeListener('keypress', handleKeypress);
        process.stdin.setRawMode(false);
        process.stdin.pause();
        rl.close();
        process.stdout.write('\x1B[?25h'); // Show cursor
        clearLines(choices.length + 1); // Clear the menu and question
      };

      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on('keypress', handleKeypress);

      renderChoices();
    });

    return result;
  } finally {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    rl.close();
    process.stdout.write('\x1B[?25h');
  }
}

async function confirm(message: string, initial = false): Promise<boolean> {
  const answer = await text(`${message} (y/n)`, initial ? 'y' : 'n');
  return answer.toLowerCase().startsWith('y');
}

function clearLines(count: number) {
  for (let i = 0; i < count; i++) {
    process.stdout.write('\x1B[1A'); // Move cursor up one line
    process.stdout.write('\x1B[2K'); // Clear the line
  }
}

function updatePreviousLine(step: StepConfig, answer: any) {
  clearLines(1);
  const checkmark = chalk.green('✓');
  let displayValue = answer;
  
  // Format display value based on step type
  if (step.type === 'select') {
    const selectStep = step as SelectStep;
    const choice = selectStep.choices.find(c => c.value === answer);
    displayValue = choice?.title || answer;
  } else if (step.type === 'confirm') {
    displayValue = answer ? 'Yes' : 'No';
  }
  
  console.log(`${checkmark} ${step.message} ${chalk.cyan(displayValue)}`);
}

async function processStep(step: StepConfig, prevAnswer?: any): Promise<any> {
  // First check if we should skip this step based on 'when' condition
  if ('when' in step && typeof step.when === 'function') {
    const shouldRun = step.when(prevAnswer);
    if (!shouldRun) {
      return null;
    }
  }

  const stepType = typeof step.type === 'function' ? step.type(prevAnswer) : step.type;
  
  if (!stepType) return null;

  let answer: any;
  
  switch (stepType) {
    case 'text': {
      const textStep = step as { type: 'text'; initial?: string };
      answer = await text(step.message, textStep.initial, step.validate);
      updatePreviousLine(step, answer);
      return answer;
    }
    case 'select': {
      const selectStep = step as (SelectStep | { type: Function; choices: readonly Choice[] });
      if (!selectStep.choices) throw new Error('Choices required for select step');
      answer = await select(step.message, selectStep.choices);
      updatePreviousLine(step, answer);
      return answer;
    }
    case 'confirm': {
      const confirmStep = step as { type: 'confirm'; initial?: boolean };
      answer = await confirm(step.message, confirmStep.initial);
      updatePreviousLine(step, answer);
      return answer;
    }
    default: {
      // @ts-expect-error
      const _exhaustiveCheck: never = step;
      throw new Error(`Unknown step type: ${stepType}`);
    }
  }
}

async function promptSteps(config: CommandConfig) {
  const answers: Record<string, any> = {};

  // Clear screen and reset cursor position
  process.stdout.write('\x1B[2J\x1B[0f');
  currentLine = 0;

  // Display banner if exists
  if (config.banner) {
    console.log(config.banner.render());
    if (config.banner.text) {
      console.log(`\t\t\t       ${chalk.dim(config.banner.text)}`);
    }

    const bannerHeight = config.banner.render().split('\n').length;
    currentLine = bannerHeight + (config.banner.text ? 2 : 1);
  }

  try {
    for (const step of config.steps) {
      const answer = await processStep(step, answers);
      if (answer !== null) {
        answers[step.name] = answer;
      }
    }
  } finally {
    process.stdout.write('\x1B[?25h');
  }

  return answers;
}

async function loadCommand(commandName: string) {
  try {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const isDistBuild = currentDir.endsWith('dist');
    const commandPath = isDistBuild
      ? join(currentDir, 'commands', commandName, 'index.js')
      : join(currentDir, '..', 'commands', commandName, 'index.js');

    const handler = await import(commandPath);
    if (!handler[commandName]) {
      throw new Error(`Command ${commandName} not found in module`);
    }
    return handler;
  } catch (error) {
    console.error(`Failed to load command: ${commandName}`, error);
    throw error;
  }
}

function createCommand(program: Command, commandName: string, config: CommandConfig) {
  const command = program.command(commandName);
  command.description(config.description);

  // Add project name as an argument
  command.argument('[name]', 'Project name');

  // Add remaining options
  config.steps.forEach(step => {
    if (step.name !== 'name') { // Skip name since it's now an argument
      if (typeof step.type === 'function') {
        command.option(
          `--${step.name} <${step.name}>`,
          step.description || step.message
        );
      } else {
        command.option(
          `--${step.name} <${step.name}>`,
          step.description || step.message,
          step.type === 'select' ? step.choices?.map(c => c.value) : undefined
        );
      }
    }
  });

  command.action(async (name, options) => {
    // Combine argument and options
    const combinedOptions = {
      ...options,
      name: name || options.name // Prefer argument over option
    };
    
    const answers = await promptSteps({
      ...config,
      steps: config.steps.map(step => ({
        ...step,
        initial: combinedOptions[step.name] || step.initial
      }))
    });

    try {
      const handler = await loadCommand(commandName);
      await handler[commandName]({ 
        ...combinedOptions,
        ...answers,
        defaults: false
      });
    } catch (error) {
      console.error(`Failed to run command handler for ${commandName}:`, error);
      throw error;
    }
  });

  return command;
}

async function createCLI(config: CLIConfig) {
  const program = new Command();

  program
    .name(config.name)
    .version(config.version);

  Object.entries(config.commands).forEach(([name, cmdConfig]) => {
    createCommand(program, name, cmdConfig);
  });

  return {
    run: () => program.parseAsync()
  };
}

export {
  createCLI,
  type CLIConfig,
  type CommandConfig,
  type StepConfig,
  type Choice
};