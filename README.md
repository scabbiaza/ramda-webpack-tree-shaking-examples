# Ramda with Tree Shaking 

## Webpack

Starting from version `0.25` Ramda comes with Tree Shaking.

The idea behind [Tree Shaking in Webpack](https://webpack.js.org/guides/tree-shaking/) is next:<br/>
**Webpack marks the unused code and some minifier removes it**.

Minifier options:
* `UglifyJSPlugin` 
* flag in Webpack `--optimize-minimize` that includes the `UglifyJSPlugin` behind the scenes
* flag in Webpack `-p` that invokes `--optimize-minimize flag` and `--define process.env.NODE_ENV="'production'"`

You can find a basic example in the folder `01-webpack-ramda-tree-shaking` 
that uses `UglifyJSPlugin` as a minifier.

Note, that in the `webpack.config.js` file `UglifyJSPlugin` is initiated only for production mode: 
minification and tree shaking are time-consuming operations and in the most cases you won't
do them in development mode.

Run the next command to compile files in development mode:<br/>
`$ npm run build`

Run the next command to compile files in production mode:<br/>
`$ NODE_ENV=production npm run build`

### How to check Tree Shaking works?

You can search in dist files for some string from Ramda sources.
For example, `splitEvery` function contains an exception with a message:
`First argument to splitEvery must be a positive integer`.

Try to do next:
* compile `01-webpack-ramda-tree-shaking/src/index.js`in development mode
  (function `splitEvery` is not used in this example) and 
  search for that exceptional message – you should find it in the dist file
* compile the same file in production mode and you should not find it

### How much profit from Tree Shaking in Ramda?

Let's compare the dist files compiled in the production mode for `ramda@0.25` and 
`ramda@0.24`.
Files `01-webpack-ramda-tree-shaking/src/index.js` and 
`02-webpack-ramda-without-tree-shaking/src/index.js` accordingly.

Both files have the same code and use only one Ramda function – `identity`. 
They are compiled into files with the next sizes:<br/>
`ramda@0.24` - 59.2 kB <br/>
`ramda@0.25` - 51.3 kB 

**With Tree Shaking file size is reduced only by 15%**. 
Remember, we used only one function, so it looks like the maximum profit.

Comparing to the to the **manual Tree Shaking**, when the size of the dist file is 957 bytes,
that is **reducing by 98.5%**!

Example of the manual Tree Shaking:<br/>
`03-webpack-ramda-manual-tree-shaking/src/index.js`

### Nasty bug in Tree Shaking in Webpack

Not only that Tree Shaking in Ramda doesn't give a big profit,
but [this bug in Webpack](https://github.com/webpack/webpack/issues/4453) 
makes the situation even worse.

Quick overview:<br/>
Two files import `ramda`.<br/> 
File `a.js` imports function `a`, file `b.js` function `b`.<br/>
In the result, bundle `a.js` will have both functions, as well as bundle `b.js`.

That means that ALL Ramda functions you use in your project 
will be added to ALL bundles that import Ramda.

Check the example in `04-webpack-tree-shaking-bug`.

### ModuleConcatenationPlugin

[ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)
concatenates the scope of all modules into one closure and allows for the code to have 
a faster execution time in the browser.

Besides, in the scope hoisted bundle it is more easily to eliminate a dead code.
Check the example in the folder `06-webpack-scope-hoisted`:<br/>
the resulting bundle size is **2.45 kB**.

[Note from Andarist](https://github.com/ramda/ramda/issues/2355#issuecomment-338661857)
> Keep in mind that ModuleConcatenationPlugin is considered 
experimental at this point (i think, maybe its already past that phase).
 Im not sure how well it plays with code-splitted project, but Im using it without any problems with a single bundle app.


### `babel-present-env`

If you use `babel-preset-env` make sure to set option `modules` to false,
otherwise, Tree Shaking won't work.

The full example you can find in the folder `05-webpack-tree-shaking-and-babel-preset-env`.

### `compress` option in UglifyJSPlugin

A bundle can be reduced even more by passing `{compress: {passes: 3}}`
to `UglifyJSPlugin`.

In example #1 the result is not that impressive:<br/>
the size is decreased from 51.3 kB to 51.1 kB.

Meantime in example #6, the bundle with `compress` option is reduced more than twice:
from 2.45 kB to 1.03 kB.

## Rollup

The same Ramda example was built with Rollup – `07-rollup-ramda-tree-shaking`.
The resulting bundle in production mode was only **530 bytes**!


## Contributors

Thank you for the contribution to this project to:<br/>
* [Ivan Kleshnin](https://github.com/ivan-kleshnin)
* [Mateusz Burzyński](https://github.com/Andarist)
