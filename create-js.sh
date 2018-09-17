#!/bin/bash

./build-binutils.sh
source emsdk/emsdk_env.sh

function createWasm(){
    file=$(realpath $1)
    filename=$(basename $file)
    cp $file $filename.bc
    expname=$2
    emcc $filename.bc -O3 -g0 -s FORCE_FILESYSTEM=1 -s MODULARIZE=1 \
         -o $expname.js --post-js post-js.txt
    rm $filename.bc
    echo $expname.js
}

rm -rf dist
mkdir -p dist
cd dist

echo "Module['FS'] = FS;" > post-js.txt

createWasm "../root/usr/local/arm-linux/bin/strip" "strip"

rm post-js.txt
