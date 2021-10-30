const path = require('path')
const fs = require('fs')
const filesize = require('filesize')
const { mainModule } = require('process')

const getAllFiles = function(directoryPath, arrayOfFiles, size) {
    files = fs.readdirSync(directoryPath)

    if (arrayOfFiles.children == []) {
        arrayOfFiles.children
    }
    for(file of files){
        if (fs.statSync(directoryPath + "\\" + file).isDirectory()) {
            let tmp = getAllFiles(directoryPath + "\\" + file, {name:file, size:0, children:[]},)
            tmp.size = calcSize(tmp)
            arrayOfFiles.children.push(tmp)

            
        } else{
            let tmp = {
                name :file,
                size : fs.statSync(directoryPath + "\\" + file).size,
                children : undefined
            }
            arrayOfFiles.children.push(tmp)
        }
    }
    if(arrayOfFiles.name == ".\\"){
        let tmptotal = 0
        for(child of arrayOfFiles.children){tmptotal += child.size}
        arrayOfFiles.size = tmptotal
    }
    return arrayOfFiles
}
const calcSize = function(root){
    if(root.children == undefined){
        return root.size
    }
    let totalSize = 0
    for(child of root.children){
        totalSize += calcSize(child)
    }
    return totalSize

}
const printToScreen = function(tree, tabs = 0){
    numberOfTabs = ' '.repeat(tabs * 2)
    console.log(`${numberOfTabs}(${filesize(tree.size)}) ${tree.name}`)
    if(tree.children == undefined){return}
    for(child of tree.children){
        {printToScreen(child, tabs+1)}
    }
}


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





function main() {

    let root = {
        name: ".\\",
        size: 0,
        children : []
    }

    let lang = "en_US"
    const args = process.argv.slice(2)
    let currendDir ="./"

    lang = changeLang(args)
    help(args, lang)
    const result1 = getAllFiles(currendDir, root)
    printToScreen(result1)

    
}

main();

