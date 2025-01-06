import chalk from 'chalk';

const bunzilla = `
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

const tagline = '\n   The Ultimate Bun Project Generator';

export function getBanner(): string {
  const lines = bunzilla.split('\n');
  return lines.map((line, index) => {
    return line.split('').map(char => {
      // BUNZILLA text and bun shape
      if (char === '#' || (char === '+' && index >= 11)) {
        return chalk.hex('#E8D0AA')(char); // Warmer beige for bun
      }
      
      // Background gradient with variation
      const totalHeight = 20;
      const currentHeight = totalHeight - index;
      const progress = currentHeight / totalHeight;
      
      // Add some randomness to progress for more natural blending
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const adjustedProgress = Math.max(0, Math.min(1, progress + variation));
      
      // Handle special characters
      if (char === '|') {
        return chalk.hex('#2B2D42')(char); // Building color
      } else if (char === '-' || char === '.' || (char === '+' && index < 11)) {
        // More color stops for smoother gradient
        if (adjustedProgress < 0.15) {
          return chalk.hex('#ffd700')(char); // Bright yellow
        } else if (adjustedProgress < 0.3) {
          return chalk.hex('#ffb347')(char); // Light orange
        } else if (adjustedProgress < 0.45) {
          return chalk.hex('#ff7f50')(char); // Coral
        } else if (adjustedProgress < 0.6) {
          return chalk.hex('#da70d6')(char); // Orchid
        } else if (adjustedProgress < 0.75) {
          return chalk.hex('#9370db')(char); // Medium purple
        } else if (adjustedProgress < 0.9) {
          return chalk.hex('#4b0082')(char); // Indigo
        } else {
          return chalk.hex('#191970')(char); // Midnight blue
        }
      }
      
      // Background color with more variation
      if (adjustedProgress < 0.15) {
        return chalk.hex('#ffd700')(char); // Yellow
      } else if (adjustedProgress < 0.3) {
        return chalk.hex('#ffb347')(char); // Light orange
      } else if (adjustedProgress < 0.45) {
        return chalk.hex('#ff7f50')(char); // Coral
      } else if (adjustedProgress < 0.6) {
        return chalk.hex('#da70d6')(char); // Orchid
      } else if (adjustedProgress < 0.75) {
        return chalk.hex('#9370db')(char); // Medium purple
      } else if (adjustedProgress < 0.9) {
        return chalk.hex('#4b0082')(char); // Indigo
      } else {
        return chalk.hex('#191970')(char); // Midnight blue
      }
    }).join('');
  }).join('\n') + chalk.dim(tagline);
} 