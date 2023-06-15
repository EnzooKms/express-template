import { Args, Command, Flags, ux } from '@oclif/core'
import * as inquirer from 'inquirer'
import * as fs from 'fs'
import { sync } from 'pkg-dir'
import path = require('path')

function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

export default class Generate extends Command {
  static description = 'Create template with engine templating you choice'

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

    ux.action.stop()
    const value = sync(process.cwd())
    copyDir(`${__dirname}/../../template/template-${choice.template}`, args.dest)
  }
}
