import { createInterface } from 'node:readline';
import chalk from 'chalk';

interface Choice<T = string> {
  title: string;
  value: T;
}

interface StepConfig<T = any> {
  name: string;
  message: string;
  type: 'text' | 'select' | 'confirm';
  choices?: Choice[];
  validate?: (input: string) => boolean | string;
  transform?: (input: string) => T;
  initial?: T;
}

interface CLIConfig {
  banner?: {
    render: () => string;
    responsive?: boolean;
    text?: string;
  };
  steps: StepConfig[];
}

// Track the current cursor position
let currentLine = 0;

// Utility function for centering text
function centerText(text: string, width: number): string {
  const visibleLength = text.replace(/\u001b\[\d+m/g, '').length;
  const padding = Math.floor((width - visibleLength) / 2);
  return ' '.repeat(Math.max(0, padding)) + text;
}

// Input utilities
async function text(message: string, initial?: string, validate?: (input: string) => boolean | string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const promptText = chalk.cyan('? ') + message + (initial ? chalk.dim(` (${initial})`) : '') + ' ';
  console.log(promptText);
  currentLine++;

  try {
    const answer = await new Promise<string>((resolve) => {
      rl.question('', (input) => {
        resolve(input || initial || '');
      });
    });

    if (validate) {
      const result = validate(answer);
      if (typeof result === 'string') {
        throw new Error(result);
      }
    }

    return answer;
  } finally {
    rl.close();
    currentLine++;
  }
}

async function select<T = string>(message: string, choices: Choice<T>[], initialIndex = 0): Promise<T> {
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
    return await new Promise((resolve) => {
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
        process.stdout.write('\x1B[?25h\n'); // Show cursor again
      };

      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on('keypress', handleKeypress);

      renderChoices();
    });
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

// Main CLI function
async function createCLI(config: CLIConfig) {
  const answers: Record<string, any> = {};

  // Clear screen and reset cursor position
  process.stdout.write('\x1B[2J\x1B[0f');
  currentLine = 0;

  if (config.banner) {
    // Display banner at the top
    console.log(config.banner.render());
    if (config.banner.text) {
      console.log(chalk.dim(config.banner.text));
    }
    console.log(); // Add a blank line after banner

    // Update current line position based on banner height
    const bannerHeight = config.banner.render().split('\n').length;
    currentLine = bannerHeight + (config.banner.text ? 2 : 1);
  }

  try {
    for (const step of config.steps) {
      const answer = await processStep(step);
      answers[step.name] = answer;
    }
  } finally {
    // Ensure cursor is visible
    process.stdout.write('\x1B[?25h');
  }

  return answers;
}

async function processStep(step: StepConfig): Promise<any> {
  switch (step.type) {
    case 'text':
      return text(step.message, step.initial as string, step.validate);
    case 'select':
      return select(step.message, step.choices || []);
    case 'confirm':
      return confirm(step.message, step.initial as boolean);
    default:
      throw new Error(`Unknown step type: ${step.type}`);
  }
}

export { createCLI, text, select, confirm, type Choice, type StepConfig, type CLIConfig };