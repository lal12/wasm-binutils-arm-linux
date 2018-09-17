#!/bin/bash

./install-emscripten.sh
source emsdk/emsdk_env.sh

if [ ! -d "binutils-2.31" ] 
then
    wget http://ftp.gnu.org/gnu/binutils/binutils-2.31.tar.xz
    tar -xf binutils-2.31.tar.xz
    rm binutils-2.31.tar.xz
fi
if [ ! -d "build" ]
then
    mkdir -p build
    cd build
    emconfigure ../binutils-2.31/configure --disable-doc --build=x86 --host=wasm32 --target=arm-linux
    emmake make -j8 CFLAGS="-DHAVE_PSIGNAL=1 -DELIDE_CODE -D__GNU_LIBRARY__"
    mkdir -p ../root
    emmake make install DESTDIR="$(pwd)/../root"
fi
