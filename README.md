# wasm-binutils-arm-linux

This package includes binutils programs for arm-linux. It is compiled to wasm which means, that there are no further dependencies, because everything is done inside the javascript runtime.

## Usage

Every program can be loaded by
Currently the following programs can be used:

### strip

    const strip = require("wasm-binutils-arm-linux").strip;
    strip(files,options);

- `files: Array<Buffer|string>`: specify an array, which contains all files to be stripped. strings are paths to files, all results will be 
- `options: Array<string>`: Pass any option you want as specified in `man strip`. Keep in mind that using some options like `-o` won't be working for obvious reasons.

## Future

- Implement more binutils programs
- Make it compatible for browser usage