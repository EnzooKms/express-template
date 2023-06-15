import { Args, Command, Flags, ux } from '@oclif/core'
import * as inquirer from 'inquirer'
import * as fs from 'fs/promises'
import path = require('path')
import { fileURLToPath } from 'url'

export default class Generate extends Command {
  static description = 'Make route will create all folder and files you need to work'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = {
    dest: Args.directory({ exists: false, default: `${process.cwd()}/express-template` })
  }

  public async run(): Promise<void> {
    const { args } = await this.parse(Generate)
    const choice = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Choisis un template : ',
        choices: [
          'html',
          'ejs'
        ]
      }
    ])

    const templateDir = path.resolve(
      fileURLToPath(process.cwd()),
      '../..',
      `template-${choice.template}`,
    )
    ux.action.start("copying")
    await fs.mkdir("./" + args.dest)
    await fs.cp(templateDir, `${process.cwd()}/${args.dest}`, { recursive: true })
    ux.action.stop()
  }
}
