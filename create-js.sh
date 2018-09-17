#!/bin/bash

if [ ! -d "root" ]
then
    echo "run build-binutils.sh first!"
    exit 1
fi

function createWasm(){
    file=$(realpath $1)
    filename=$(basename $file)
    cp $file $filename.bc
    expname=$2
    emcc $filename.bc -O3 -g3 -s FORCE_FILESYSTEM=1 -s MODULARIZE=1 \
         -o $expname.js --post-js post-js.txt
    rm $filename.bc
    #echo "var exports = module.exports = { $expname: Module };" >> $expname.js
    echo $expname.js
}

rm -rf dist
mkdir -p dist
cd dist

echo "Module['FS'] = FS;" > post-js.txt

createWasm "../root/usr/local/arm-linux/bin/strip" "strip"

rm post-js.txt
cd ..