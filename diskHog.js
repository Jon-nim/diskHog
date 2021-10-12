const path = require('path')
const fs = require('fs')
const filesize = require('filesize')

const args = process.argv.slice(2)

let currendDir ="C:\\Users\\Jona\\OneDrive\\FALL2021"

const getAllFiles = function(directoryPath, arrayOfFiles) {
    files = fs.readdirSync(directoryPath)

    if (arrayOfFiles == null) {
        arrayOfFiles = {}
    }

    for(file of files){
        if (fs.statSync(directoryPath + "\\" + file).isDirectory()) {
            arrayOfFiles[file] = {}
            //console.log(arrayOfFiles)
            arrayOfFiles[file] = getAllFiles(directoryPath + "\\" + file, arrayOfFiles[file])
            
        } else{
            arrayOfFiles[file] = {}
            arrayOfFiles[file].size = filesize(fs.statSync(directoryPath + "\\" + file).size)
            arrayOfFiles[file]["filename"] = file
        }
    }
        return arrayOfFiles
}


const result1 = getAllFiles(currendDir)
console.log(result1.CS3380.Notes['Spikes']['readme.txt'])
//console.log(result1)