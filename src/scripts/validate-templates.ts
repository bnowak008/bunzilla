import { join } from "path";
import chalk from "chalk";

const templatesPath = join(process.cwd(), "src", "templates");
const templates = ["api", "cli", "monorepo", "utility", "webapp"];

// Single spinner character for now
const spinner = chalk.cyan("◐");
let spinnerInterval: Timer;

// Track cursor position for each cell
const CELL_POSITIONS = {
  install: 19,
  build: 32,
  test: 45,
  typecheck: 58
};

function updateCell(row: number, position: number, content: string): void {
  // Move to specific row (header + row number + borders)
  process.stdout.write(`\x1b[${row + 4}H`);
  // Move to column position
  process.stdout.write(`\x1b[${position}G${content.padEnd(8)}`);
}

// Update spinner animation frames
const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴"].map(f => chalk.cyan(f));
let frameIndex = 0;

function startSpinners(): void {
  spinnerInterval = setInterval(() => {
    frameIndex = (frameIndex + 1) % frames.length;
    // Update each cell with current frame
    templates.forEach((_, rowIndex) => {
      Object.values(CELL_POSITIONS).forEach(position => {
        updateCell(rowIndex, position, frames[frameIndex]);
      });
    });
  }, 100);
}

function stopSpinners(): void {
  if (spinnerInterval) {
    clearInterval(spinnerInterval);
  }
}

function createRow(template: string, cells: string[]): string {
  return `   │ ${template.padEnd(8)} │ ${cells.map(c => c.padEnd(8)).join(" │ ")} │`;
}

function printTable(): void {
  console.log(chalk.blue("\nValidation Progress\n"));
  
  // Header
  console.log("   ┌──────────┬──────────┬──────────┬──────────┬──────────┐");
  console.log("   │ Template │ Install  │  Build   │   Test   │ TypeCheck│");
  console.log("   ├──────────┼──────────┼──────────┼──────────┼──────────┤");
  
  // Content
  templates.forEach(template => {
    console.log(createRow(template, ["·", "·", "·", "·"]));
  });
  
  // Footer
  console.log("   └──────────┴──────────┴──────────┴──────────┴──────────┘");
}

// Update main to use spinners
function main() {
  // Hide cursor
  process.stdout.write('\x1b[?25l');
  
  printTable();
  startSpinners();
  
  // Show cursor on exit
  process.on('SIGINT', () => {
    stopSpinners();
    process.stdout.write('\x1b[?25h');
    process.exit(0);
  });
}

main();