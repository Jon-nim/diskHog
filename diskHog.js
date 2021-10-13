const path = require('path')
const fs = require('fs')
const filesize = require('filesize')

const args = process.argv.slice(2)
let currendDir ="./"

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


let root = {
    name: ".\\",
    size: 0,
    children : []
}


if(args.length > 0){
    if(args[0] == '-h' || args[0] == '--help'){
        console.log(`
        -p, --path value, the relative or absolute path name of a file or directory. Default is -p .
        -s, --sort alpha | size
        alpha sorts alphabetically (ascending)
        size sorts by size (descending), default
        -m, --metric, sizes displayed as KB, MB, GB, and TB.
        -t, --threshold min, only displays files and folders of at least minimum size. min is the number of millions. Default is -t 1.
        -h, --help prints this usage screen. Ignores all other arguments.
        `)
    }
    else{
        console.log('Not a valid argument')
    }
}
else{
    const result1 = getAllFiles(currendDir, root)
    printToScreen(result1)
}
=======
const result1 = getAllFiles(currendDir)
//console.log(result1.CS3380.Notes['Spikes']['readme.txt'])
console.log(result1)


//TODO
/*
-need to change the folder object to include size, name and children
-need to clean up data structure to look like notes1012
*/

