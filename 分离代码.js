//引入fs模块
const fs = require('fs')
const path = require('path')

//读取css部分的正则表达式
//出现正斜杠要在其之前加上反斜杠防止转义
const cssReg = /<style>[\s\S]*<\/style>/
//读取js部分的正则表达式
const jsReg = /<script>[\s\S]*<\/script>/

//读取html文件
fs.readFile(path.join(__dirname, './clock/index.html'),'utf8',function(err,dataStr){
    if(err){
        return console.log('读取失败'+err.message)
    }
    resolveCss(dataStr)
    resolveJs(dataStr)
})
function resolveCss(htmlStr){
    const cssArr =  cssReg.exec(htmlStr)
    if(cssArr!=null){
        const cssStr = cssArr[0].replace('<style>', '').replace('</style>','')
        fs.writeFile(path.join(__dirname,'./clock/index.css'),cssStr,function(err){
            if(err){
                return console.log('写入失败')+err.message;
            }
            console.log('css代码写入成功');
        })
    }
      
}
function resolveJs(htmlStr){
    const jsArr = jsReg.exec(htmlStr)
    if(jsArr!=null){
        const jsStr = jsArr[0].replace('<script>','').replace('</script>','')
        fs.writeFile(path.join(__dirname,'./clock/index.js'),jsStr,function(err){
            if(err){
                return console.log('写入失败'+err.message);
            }
            console.log('js代码写入成功');
        })
    }
}