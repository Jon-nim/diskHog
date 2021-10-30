const path = require('path')
const fs = require('fs')
const filesize = require('filesize')
const { mainModule } = require('process')
const tags = require('./diskHogTags')
const getfiles = require('./diskHogGetFiles')

function main() {

    let root = {
        name: ".\\",
        size: 0,
        children : []
    }

    let lang = "en_US"
    const args = process.argv.slice(2)
    let currendDir ="./"

    lang = tags.changeLang(args)
    tags.help(args, lang)
    const result1 = getfiles.getAllFiles(currendDir, root)
    getfiles.printToScreen(result1)

    
}

main();

