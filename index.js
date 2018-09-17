"use strict";

const strip = require("./dist/strip.js");
const NFS = require("fs");
const NUtil = require("util");

async function stripWrap(files,opts){
    if(!files || !Array.isArray(files) || files.length < 1)
        throw new Error("strip expects param 1 to be a non empty array!");
    for(let f in files){
        if(typeof f == "string"){
            files[f] = await NUtil.promisify(NFS.readFile)(files[f]);
        }else if(Buffer.isBuffer(f)){
            files[f] = f;
        }else{
            throw new Error("strip expects param 1 to be an array of strings and buffers!");
        }
    }
    if(opts && !Array.isArray(opts))
        throw new Error("strip expects param 1 to be an argument");
    return new Promise((res,rej)=>{
        let env = {};
        env.quit = (code,err)=>{
            rej(err);
        };
        let args = opts || [];
        args = args.concat(files.map((v,i)=>"/f_"+i));
        let prog;
        env.arguments = args;
        let datas = [];
        env.preRun = [
            function(){
                let count = 0;
                for(let f in files){
                    prog.FS.writeFile("/f_"+f, files[f]);
                }
            }
        ];
        env.postRun = [
            function(){
                let filesOut = [];
                for(let f in files){
                    filesOut[f] = prog.FS.readFile("/f_"+f);
                }
                res(filesOut);
            }
        ];
        try{
            prog = strip(env);
        }catch(e){
            rej(e);
        }
        //res(filesOut);
    })
}

var exports = module.exports = {
    strip: stripWrap
}