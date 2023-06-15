import { Args, Command, Flags } from '@oclif/core'
import * as inquirer from 'inquirer'
import * as fs from 'fs'

export default class MakeRoute extends Command {
    static description = 'Make route will create all folder and files you need to work'

    static examples = [
        '<%= config.bin %> <%= command.id %>',
    ]

    static flags = {
    }

    static args = {
    }

    public async run(): Promise<void> {
        const { args, flags } = await this.parse(MakeRoute)

        createRoute()

    }
}

function createRoute() {

    inquirer.prompt([
        {
            type: 'input',
            message: 'Quel est le nom de la route à créer ?',
            name: 'route'
        }
    ]).then(answer => {

        const spliter = answer.route.split('/')
        const view = spliter[spliter.length - 1]

        if (view.includes('/') || view.includes('\\')) {
            throw new Error('la view ne peut pas avoir le caractère "/" ou "\\"')
        }


        else {
            const folder = spliter[0]

            try {
                fs.mkdirSync(`./routers/${folder}`)
                fs.mkdirSync(`./resources/css/${folder}`)
                fs.mkdirSync(`./resources/js/${folder}`)
                fs.mkdirSync(`./resources/views/${folder}`)

            }
            catch { }

            fs.open(`./routers/${folder}/${view}.js`, (err) => {

                if (!err) {
                    throw new Error(`le ficher ${__dirname}/routers/${folder}/${view}.js existe deja !`)
                }

                fs.open(`./resources/css/${folder}/${view}.css`, (err) => {

                    if (!err) {
                        throw new Error(`le ficher ${__dirname}/resources/css/${folder}/${view}.css existe deja !`)
                    }


                    fs.open(`./resources/js/${folder}/${view}.js`, (err) => {

                        if (!err) {
                            throw new Error(`le ficher ${__dirname}/resources/css/${folder}/${view}.js existe deja !`)
                        }

                        fs.open(`./resources/views/${folder}/${view}.ejs`, (err) => {

                            if (!err) {
                                throw new Error(`le ficher ${__dirname}/resources/views/${folder}/${view}.ejs existe deja !`)
                            }

                            const data = `const { Router } = require('express');
const router = Router()

router.get('/${answer.route}', (req, res) => {

res.render('${answer.route}', {})

})

module.exports = { router }
            `

                            fs.writeFileSync(`./routers/${folder}/${view}.js`, data)
                            fs.writeFileSync(`./resources/css/${folder}/${view}.css`, '')
                            fs.writeFileSync(`./resources/js/${folder}/${view}.js`, '')
                            fs.writeFileSync(`./resources/views/${folder}/${view}.ejs`, '')

                            console.log('fichier créer');
                        })
                    })
                })
            })


        }

    })

}
