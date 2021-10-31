const path = require('path')
const fs = require('fs')
const filesize = require('filesize')
const { mainModule } = require('process')
const { format } = require('path')

const getAllFiles = function(directoryPath, arrayOfFiles, size) {
    files = fs.readdirSync(directoryPath)

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
const printToScreen = function(tree, metric, threshold, sortType, tabs = 0){
    let numberOfTabs = ' '.repeat(tabs * 2)
    if(tree.size > (threshold * 1000000)){
        if(metric){
            console.log(`${numberOfTabs}(${filesize(tree.size)}) ${tree.name}`)
        }
        else {
            console.log(`${numberOfTabs}(${tree.size}) ${tree.name}`)
        }
    }
    if(tree.children == undefined){return}
    let sorted = tree.children;
    if(sortType == "alpha") sorted = sortAlpha(sorted)
    if(sortType == "size") sorted = sortSize(sorted)
    for(child of sorted){
        {printToScreen(child, metric, threshold, sortType, tabs+1)}
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

function getLang(args){
    let tmp;
    for(let i =0; i < args.length; i++){
        if (args[i] == "-l" || args[i] == "--lang"){
            tmp = args[i +1]
            return tmp
        }
    }
    try{
        tmp = (process.env.lang).split('.')[0]
    } catch{
        tmp = "en_US"
    }
    return tmp
    
}

function getPath(args){
    for(let i =0; i < args.length; i++){
        if (args[i] == "-p" || args[i] == "--p"){
            return args[i+1].replace('"', '')
        }
    }
    return "./"
}

function getMetric(args){
    if(args.includes("-m") || args.includes("--metric")) return true
    return false
}

function getThreshold(args){
    for(let i =0; i < args.length; i++){
        if (args[i] == "-t" || args[i] == "--threshold"){
            return parseInt(args[i+1])
        }
    }
    return 1
}

function sortSize(array){
    return array.sort(function(a,b){
        return b.size - a.size
    })
}

function sortAlpha(array){
    return array.sort(function(a,b){
        return a.name - b.name
    })
}

function sortType(args){
    for(let i =0; i < args.length; i++){
        if (args[i] == "-s" || args[i] == "--sort"){
            if(args[i+1] == "size" || args[i+1] == "alpha")return args[i+1]
            return "size"
        }
    }
    return ""
}

function main() {

    let root = {
        name: ".\\",
        size: 0,
        children : []
    }

    const args = process.argv.slice(2)
    let dir = getPath(args) 
    let lang = getLang(args)
    let metric = getMetric(args)
    let threshold = getThreshold(args)
    let sortT = sortType(args)
    help(args, lang)
    
    const result1 = getAllFiles(dir, root)
    printToScreen(result1, metric, threshold, sortT)

    
}

main();

