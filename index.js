"use strict";

const strip = require("./dist/strip.js");
const NFS = require("fs");
const NUtil = require("util");

async function stripWrap(files,opts){
    if(!files || !Array.isArray(files) || files.length < 1)
        throw new Error("strip expects param 1 to be a non empty array!");
    for(let f in files){
        if(typeof files[f] == "string"){
            files[f] = await NUtil.promisify(NFS.readFile)(files[f]);
        }else if(Buffer.isBuffer(files[f])){
            files[f] = f;
        }else{
            throw new Error("strip expects param 1 to be an array of strings and buffers!");
        }
    }
    if(opts && !Array.isArray(opts))
        throw new Error("strip expects param 1 to be an argument");
    let env = {};
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
    await new Promise((res,rej)=>{
        let error = false;
        env.quit = (code,err)=>{
            error = true;
            rej(err);
        };
        env.postRun = [
            function(){
                if(!error){
                    let filesOut = [];
                    for(let f in files){
                        filesOut[f] = prog.FS.readFile("/f_"+f);
                    }
                    res(filesOut);
                }   
            }
        ];
        prog = strip(env);
    });
}

var exports = module.exports = {
    strip: stripWrap
}