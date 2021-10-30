const fs = require('fs')
function help(args, lang){
    if(args.includes("--help") || (args.includes("-h"))){
        let helpFile = `help_${lang}.txt`
        try{
            const data = fs.readFileSync(helpFile, ('UTF8'))
            console.log(data)
        } catch(err) {
            const data = fs.readFileSync("help_en_US.txt", ('UTF8'))
            console.log(data)
        }
        process.exit();
    }
}

function changeLang(args){
    for(let i =0; i < args.length; i++){
        if (args[i] == "-l" || args[i] == "--lang"){
            let lang = args[i +1]
            return lang
        }
    }
}

module.exports = {help, changeLang};