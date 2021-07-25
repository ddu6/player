const fs=require('fs')
const path=require('path')
const vnames=[]
let out=''
for(const fileName of fs.readdirSync(path.join(__dirname,'../icons'))){
    const [name,format]=fileName.split('.')
    const vname=name.replace(/-/g,'_')
    vnames.push(vname)
    out+=`export const ${vname}='@font-face{font-family:"${name}";src:url("data:font/${format};base64,${
        fs.readFileSync(path.join(__dirname,'../icons/'+fileName)).toString('base64')
    }") format("${format}")}.show-icon.${name}::before{font-family:"${name}";content:"A"}'\n`
}
out+=`export const all=${vnames.join('+')}`
fs.writeFileSync(path.join(__dirname,'../src/lib/icons.ts'),out)