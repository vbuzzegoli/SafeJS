# SafeJS
A safe javascript, finally!

## Installation

```bash
npm install safejs-cli --save-dev
```

## Usage

### General idea

What if we could simply write `safe` in front of an unsafe bit of code to make it safe. No surrounding validation, no try / catch, no worries, just like that.

Well now you can. ⚡

### Dealing with unpredictable data structures

Previously in Vanilla JS:

```js
// Accessing deeply nested variables in a safe way quickly gets messy
if (response &&
  response.data &&
  response.data.user &&
  response.data.user[0] &&
  response.data.user[0].id
) {
  console.log(response.data.user[0].id);
}
```

Equivalent in **SafeJS**:

```js
// Not anymore
console.log(safe response.data.user[0].id);
```

Previously in Vanilla JS:

```js
let id;
if (response &&
  response.data &&
  response.data.user &&
  response.data.user[0] &&
  response.data.user[0].id
) {
  id = response.data.user[0].id;
}
```

Equivalent in **SafeJS**:

```js
// Note that the `( ... )` are important here to limit the context appropriately
const id = (safe response.data.user[0].id);
```

Previously in Vanilla JS:

```js
// It also works with unsafe conditions
if (response &&
  response.data &&
  response.data.user &&
  response.data.user[0] &&
  response.data.user[0].id &&
  response.data.user[0].id !== 'unknown'
) {
  console.log('found');
}
```

Equivalent in **SafeJS**:

```js
if (safe response.data.user[0].id !== 'unknown'){
  console.log('found');
}
```

Previously in Vanilla JS:

```js
// It also works with unsafe functions
let res;
try {
  res = await axios.get('url/does/not/exist');
} catch (err) {}
console.log(res); // undefined
```

Equivalent in **SafeJS**:

```js
const res = (safe await axios.get('url/does/not/exist'));
console.log(res); // undefined
```

### Managing the context of execution

By default SafeJS will assume that when you write `safe ...` you are talking about the largest context of execution (aka the closest `(...)`). Unless you are running in an explicit context already, make sure you **always** specify the context around `safe` when using it.

Also note that SweetJS, the compiler used by SafeJS, is not very friendly with _semicolons_, it will fail to interprete the context in some edges cases (chaining of function declarations, chaining of function executions and function declarations). To be safe, **always** write your semicolons.

Here is a couple of example:

```js
if (safe a.b) {} // valid
if (safe a.b && c.d) {} // valid
if (safe a.b && safe c.d) {} // invalid
if ((safe a.b) && (safe c.d)) {} // valid

console.log(safe a.b); // valid
console.log(safe a.b, c); // invalid
console.log((safe a.b), c); // valid

const a = safe b.c; // invalid
const a = (safe b.c); // valid

const b = safe foo(); // invalid
const b = (safe foo()); // valid
```

## Transpile

From your root directory, run:

```bash
safejs
```

This will transpile your code into a folder named `predist`.

You can now run the entry point of your code in this folder to see it in action.

> Hint: Customize your `start` script and soon you won't event remember this command

## Configure

You can configure _SafeJS_ using these optional flags if necessary:

```bash
safejs --inputDir=./src --outputDir=./predist --noBabel=true --log=false
```

You can also use a `safejs.config.js` file at root level to specify your config if a few additional options:

```js
module.exports = {
  inputDir: './src',
  outputDir: './predist',
  noBabel: true,
  log: false,
  exclude: [
    /.+(.ghost.js)/g,
    /(excluded)/i,
  ]
}
```

> Note: `exclude` is an array of regular expressions for paths to exclude

## Working with Webpack, Babel and Testing

Simply set your source directory to `./predist` (or custom directory) instead of `./src`. Easy.

> Note: For now SweetJS does not allow direct input manipulation, which prevents me from making a Webpack loader (would remove the need for a pre-distribution). In a further version I might fork SweetJS's compiler directly to allow it and make a custom loader.

## Hot reload

If you want hot reload you can do so using [Nodemon](https://www.npmjs.com/package/nodemon)

> Hint: Customize your `start` and `build` scripts to transpile your code before running it
