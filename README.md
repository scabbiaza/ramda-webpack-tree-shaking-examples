# Using Ramda with Tree Shaking option in Webpack

Starting from version `0.25` Ramda comes with tree shaking option.

The idea behind the [tree shaking in Webpack](https://webpack.js.org/guides/tree-shaking/) is next:
**Webpack marks unused code and some minifier removes it**.

Minifier options:
* `UglifyJSPlugin` 
* flag in Webpack `--optimize-minimize` that includes the `UglifyJSPlugin` behind the scenes
* flag in Webpack `-p` that invokes `--optimize-minimize flag` and `--define process.env.NODE_ENV="'production'"`

In the folder `01-ramda-webpack-tree-shaking` you find a basic example 
that uses `UglifyJSPlugin` as a minifier.

Note, that in the `webpack.config.js` we initiate `UglifyJSPlugin` only for production mode: 
minification and tree shaking are time-consuming operations and in the most cases you won't
do them in development mode.

To compile files in example run:<br/>
`$ npm run build`

To compile files in production mode run:<br/>
`$ NODE_ENV=production npm run build`

### How to check tree shaking works?

You can search in dist file for some string from Ramda sources.
For example, `splitEvery` function contains a throwing an error with a message:
`First argument to splitEvery must be a positive integer`.

Try to do next:
* compile `01-ramda-webpack-tree-shaking/src/index.js` in development mode and 
  search for that string – you should find it
* compile the same file in production mode and you should not find that 
  string in the dist file

### How much profit from Ramda tree shaking?

Let's compare the dist files compiled in the production mode for `ramda@0.25` and 
`ramda@0.24`.
`01-ramda-webpack-tree-shaking/src/index.js` and 
`02-ramda-without-tree-shaking-option/src/index.js` accordingly.

*Make sure source files are the same*.

Both files use only one Ramda function (`identity`) and are compiled into:<br/>
`ramda@0.24` - 59.2 kB <br/>
`ramda@0.25` - 51.2 kB 

**With tree shaking file is reduced only by 15%**. Remember, we used only one function!

Comparing to the to the manual tree shaking, when dist file size is 916 bytes,
that is reducing by 98.5%!

Example of the manual tree shaking:<br/>
`03-ramda-manual-tree-shaking/src/index.js`

### Nasty bug in tree shaking in Webpack itself

Not only that tree shaking in Ramda doesn't give a big profit,
but [this bug in Webpack](https://github.com/webpack/webpack/issues/4453) 
make the situation even worse.

Quick overview:<br/>
Two files export `ramda`.<br/> 
File `a.js` exports function `a`, file `b.js` function `b`.<br/>
In the result bundles file `a.js` will have both functions, as well as file `b.js`.

That means that ALL Ramda functions that you use in your project 
will be added to the ALL bundles that import Ramda.

Check the example in `04-webpack-tree-shaking-bug`.

### Note about `babel-present-env`

If you use `babel-preset-env` make sure to set option `modules` to false,
otherwise, tree shaking won't work.

The full example you can find in folder `05-webpack-tree-shaking-and-babel-preset-env`.

