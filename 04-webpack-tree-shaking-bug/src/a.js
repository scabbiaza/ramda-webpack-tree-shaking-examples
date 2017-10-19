import {a} from "./h"

a()

// The dist file should contain only `a` function, but because of the bug in webpack
// it will also have a code of `b` function. The reason is that `b.js` importer `b` function.
// However, it won't have a code of `c` function, because no file imported it.
