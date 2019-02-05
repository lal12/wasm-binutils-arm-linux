# wasm-binutils-arm-linux

This package includes binutils programs for arm-linux. It is compiled to wasm which means, that there are no further dependencies, because everything is done inside the javascript runtime.

## Usage

It is recommend to run the functions only inside a child_process, since the underlying emscripten has some shortcomings...
Currently the following programs can be used:

### strip

    const strip = require("wasm-binutils-arm-linux").strip;
    let promise = strip(files,options);

- `files: Array<Buffer|string>`: specify an array, which contains all files to be stripped. strings are paths to files.
- `options: Array<string>`: Pass any option you want, as specified in `man strip`. Keep in mind that using some options like `-o` won't be working for obvious reasons.
  
A Promise is returned by strip, it will either give you back an array of buffers, which are the results of the files or throw an error.

## Future

- Implement more binutils programs: Actually not hard, just needs some tidious boilerplate code... 
- Make it compatible for browser usage