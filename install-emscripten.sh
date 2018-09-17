#!/bin/bash

if [ ! -d "emsdk"  ] 
then
    git clone https://github.com/juj/emsdk.git
    cd emsdk
    ./emsdk install latest
    ./emsdk activate latest
    cd ..
fi
