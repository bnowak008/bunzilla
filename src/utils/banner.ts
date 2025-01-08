import chalk from 'chalk';

export const bunzilla = `
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++#####++##++##+##+++##+#####++#++#++++#+++++++#+++++++++++++++++++++++++++
+++++++++++++++++++++++#####-+##-+##++##+###++##++++##++#++##++##++++++###+++++++++++++++++-++++++-+
+++++++--++++++++++++##++##++###+##-++##+####+##+++##++##++##++##+++++####+++++++++++++++-++++++++++
++++++++++-++++++++++++++#####+++##++##-##-####++##++++##++##++##+++++##+##++++++++++++-++++++++++++
++++++++++++++++++++++++########+##++##+##++###-##.++++##++##++##+++#######+++++++++-++++++++++++++-
-+++++++++++++++++++++++##++++##-+####++##++++#########+#++#########+##+++#+++++++++++++++++++++++--
----++++++++++++++++++++#++####-++++++++++++++++++++++++#+++++++---+##++++##+++++++++++++++++++++---
------++++++++++++++++######-++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-------
--------.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-------------
----------------------------------------------------------------------------------------------------
-.--------------------..-----------.--------##+.+###----------.-------..---------------------------.
--.-------.-...---------------------------#+#########.--------------------------------------.....---
---.---.-------------------------------#+#####+##+#######--------------------------...--------------
---------........--------------------.######+#######+#####.----------------------------..-----.-----
.......--------..........---------..##############+#####+###.-----.......-----......----------.....-
......--.........--........------#######+##########+#######+##+------....--.......--.........-......
--..........|||.....|..........-###############################+..............-.........|||.......--
------..--..|||.....||........###################################+...........||.........|||...------
....|..||-..|||.||..||....|-...###################################......||...||.....||.-|||.|||...||
.||.||.|||.|||||||..||..|.||...##################################..|||.||||.|||||.||||.|||||||||||||
||||||||||||||||||||||||||||||||################################||||||||||||||||||||||||||||||||||||
`;

function padLine(line: string, width: number): string {
  if (line.length > width) {
    const excess = line.length - width;
    const start = Math.floor(excess / 2);
    return line.slice(start, start + width);
  }
  const padding = Math.floor((width - line.length) / 2);
  return ' '.repeat(padding) + line + ' '.repeat(width - line.length - padding);
}

export function getBanner(): string {
  const terminalWidth = process.stdout.columns || 80;
  const lines = bunzilla.split('\n').filter(line => line.length > 0);
  const maxLineLength = Math.max(...lines.map(line => line.length));
  const targetWidth = Math.min(maxLineLength, terminalWidth);
  const processedLines = lines.map(line => padLine(line, targetWidth));
  
  return processedLines.map((line, index) => {
    return line.split('').map(char => {
      if (char === '#' || (char === '+' && index >= 11)) {
        return chalk.hex('#E8D0AA')(char);
      }
      
      const totalHeight = 20;
      const currentHeight = totalHeight - index;
      const progress = currentHeight / totalHeight;
      const variation = (Math.random() - 0.5) * 0.1;
      const adjustedProgress = Math.max(0, Math.min(1, progress + variation));
      
      if (char === '|') {
        return chalk.hex('#2B2D42')(char);
      } else if (char === '-' || char === '.' || (char === '+' && index < 11)) {
        if (adjustedProgress < 0.15) return chalk.hex('#ffd700')(char);
        if (adjustedProgress < 0.3) return chalk.hex('#ffb347')(char);
        if (adjustedProgress < 0.45) return chalk.hex('#ff7f50')(char);
        if (adjustedProgress < 0.6) return chalk.hex('#da70d6')(char);
        if (adjustedProgress < 0.75) return chalk.hex('#9370db')(char);
        if (adjustedProgress < 0.9) return chalk.hex('#4b0082')(char);
        return chalk.hex('#191970')(char);
      }
      
      if (adjustedProgress < 0.15) return chalk.hex('#ffd700')(char);
      if (adjustedProgress < 0.3) return chalk.hex('#ffb347')(char);
      if (adjustedProgress < 0.45) return chalk.hex('#ff7f50')(char);
      if (adjustedProgress < 0.6) return chalk.hex('#da70d6')(char);
      if (adjustedProgress < 0.75) return chalk.hex('#9370db')(char);
      if (adjustedProgress < 0.9) return chalk.hex('#4b0082')(char);
      return chalk.hex('#191970')(char);
    }).join('');
  }).join('\n');
} 