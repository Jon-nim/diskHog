const path = require('path')
const fs = require('fs')
const filesize = require('filesize')

const args = process.argv.slice(2)

let currendDir = "C:\\Users\\Jona\\OneDrive\\FALL2021"

const getAllFiles = function(directoryPath, arrayOfFiles) {
    files = fs.readdirSync(directoryPath)

    if (arrayOfFiles == null) {arrayOfFiles = []}

    for(file of files){
        if (fs.statSync(directoryPath + "\\" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(directoryPath + "\\" + file, arrayOfFiles)
            
        } else{
            console.log(file)
            arrayOfFiles.push([directoryPath,file,filesize(fs.statSync(directoryPath + "\\" + file).size)])
        }
    }
        return arrayOfFiles
}


const result1 = getAllFiles(currendDir)

console.log(result1)