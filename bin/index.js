#! /usr/bin/env node
const dico = require('./translate.json')
let char = []
let allprog
const fs = require("fs")
if(process.argv[2]=="-n"){
    allprog = process.argv.slice(3)
}else if(process.argv[2]=="-o"){
    allprog = fs.readFileSync(process.cwd() + '/' + process.argv[3], 'utf-8').split(' ')
}else{
    console.log("help")
}
let instructions = []
allprog.forEach((el,i)=>{
    if(i!=0) char.push(" ")
    let instruction = el.split(".")
    instruction.forEach((ell,j)=>{
        if(j!=0) char.push(".")
        instructions.push(ell)
    })
})
let string = false
let transfertinstruction = []
instructions.forEach(el=>{
    let r = el.split('(')
    for(let i = r.length-1; i > 0;i--){
        r.splice(i, 0,'(')
    }
    r.forEach(el=>{transfertinstruction.push(el)})
})
let realinstruction = []
transfertinstruction.forEach(el=>{
    let r = el.split(')')
    for(let i = r.length-1; i > 0;i--){
        r.splice(i, 0,')')
    }
    r.forEach(ell=>{realinstruction.push(ell)})
})
let string2 = ""
for(let i = 0;i< realinstruction.length;i++){

    if(realinstruction[i].startsWith('"')) string=true
    if(realinstruction[i].endsWith('"')) string=false
    if(dico[realinstruction[i]]&&!string){
        string2 += dico[realinstruction[i]]
    }else{
        string2 += realinstruction[i]
    }
    if(realinstruction[i+1]&&realinstruction[i+1]!=")"&&realinstruction[i+1]!=="("&&!realinstruction[i+1].startsWith('"')){
        string2+=char[0]
        char.shift()
    }
}

eval(string2)