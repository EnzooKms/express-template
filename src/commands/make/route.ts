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

    let ext: any;

    fs.readFile('./package.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        ext = JSON.parse(data).cli.engine
    });

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
                    throw new Error(`le ficher ${process.cwd()}/routers/${folder}/${view}.js existe deja !`)
                }

                fs.open(`./resources/css/${folder}/${view}.css`, (err) => {

                    if (!err) {
                        throw new Error(`le ficher ${process.cwd()}/resources/css/${folder}/${view}.css existe deja !`)
                    }


                    fs.open(`./resources/js/${folder}/${view}.js`, (err) => {

                        if (!err) {
                            throw new Error(`le ficher ${process.cwd()}/resources/css/${folder}/${view}.js existe deja !`)
                        }

                        fs.open(`./resources/views/${folder}/${view}.${ext}`, (err) => {

                            if (!err) {
                                throw new Error(`le ficher ${process.cwd()}/resources/views/${folder}/${view}.${ext} existe deja !`)
                            }

                            else {

                                const routeWrite = `const { Router } = require('express');\nconst router = Router();\n\nrouter.get('/${answer.route}', (req, res) => {\n\tres.render('${answer.route}', { title: '${answer.route}' });\n})\n\nmodule.exports = { router };`
                                const viewWrite = `<!DOCTYPE html>\n<html lang="fr-fr">\n\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<link rel="stylesheet" href="/resources/css/${answer.route}.css">\n<title>\n\t<%= title %>\n</title>\n</head>\n\n<body>\n\n\t<script src="/resources/js/${answer.route}.js" type="module"></script>\n</body>\n\n</html>`
                                const cssWrite = `html {\n\tbackground-color: #242424;\n\tbox-sizing: border-box;\n\tfont-size: 16px;\n\t}\n\n*,\n*:before,\n*:after {\n\tbox-sizing: inherit;\nmargin: 0;\npadding: 0;\n}\n\nbody {\n\theight: 100vh;\n\twidth: 100vw;\n}\n\nbody,\nh1,\n,\nh3,\nh4,\nh5,\nh6,\np,\nol,\nul {\n\tmargin: 0;\n\tpadding: 0;\n\tfont-weight: normal;\n\t}\n\nol,\nul {\n\tlist-style: none;\n}\n\nimg,\npicture img,\npicture source,\niframe {\n\tmax-width: 100%;\n\theight: auto;\n}\n\na {\n\ttext-decoration: none;\n\tcolor: black;\n}`

                                fs.writeFileSync(`./routers/${folder}/${view}.js`, routeWrite)
                                fs.writeFileSync(`./resources/views/${folder}/${view}.${ext}`, viewWrite)
                                fs.writeFileSync(`./resources/css/${folder}/${view}.css`, cssWrite)
                                fs.writeFileSync(`./resources/js/${folder}/${view}.js`, '')

                                console.log('fichier créer');

                            }
                        })
                    })
                })
            })


        }

    })

}
