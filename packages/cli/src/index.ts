import { Command } from 'commander';
import { init } from './commands/init.js';
import { add } from './commands/add.js';
import { list } from './commands/list.js';
import { diff } from './commands/diff.js';

const program = new Command();

program
  .name('blink')
  .description('Blink UI — download web component source code into your project')
  .version('0.0.0');

program
  .command('init')
  .description('Initialize Blink UI in your project')
  .action(init);

program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Component names to add')
  .option('-a, --all', 'Add all available components')
  .option('-o, --overwrite', 'Overwrite existing components')
  .action(add);

program
  .command('list')
  .description('List available components')
  .action(list);

program
  .command('diff')
  .description('Show differences between local and registry versions')
  .argument('<component>', 'Component name to diff')
  .action(diff);

program.parse();
