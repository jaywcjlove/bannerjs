# bannerjs

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![Build & Deploy](https://github.com/jaywcjlove/bannerjs/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/bannerjs/actions/workflows/ci.yml)
[![Coverage Status](https://jaywcjlove.github.io/bannerjs/badges.svg)](https://jaywcjlove.github.io/bannerjs/lcov-report/)
[![Repo Dependents](https://badgen.net/github/dependents-repo/jaywcjlove/bannerjs)](https://github.com/jaywcjlove/bannerjs/network/dependents)
[![npm version](https://img.shields.io/npm/v/bannerjs.svg)](https://www.npmjs.com/package/bannerjs)
[![NPM Download](https://img.shields.io/npm/dm/bannerjs.svg?style=flat)](https://www.npmjs.com/package/bannerjs)

Add a banner to a string. Get one-line/multi-line comment banner based on package.json.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c): Node 14+ is needed to use it and it must be `import` instead of `require`.

```bash
npm install bannerjs --save
```

One-line results in:

```js
/*! bannerjs v1.0.8 | MIT (c) 2016 kenny wang <wowohoo@qq.com> | https://github.com/jaywcjlove/bannerjs */
```

Multi-line results in:

```js
/*!
 * bannerjs v1.0.0
 * Add a banner to a string. Get one-line/multi-line comment banner based on package.json.
 * 
 * Copyright (c) 2016 kenny wang <wowohoo@qq.com>
 * https://github.com/jaywcjlove/bannerjs
 *
 * Licensed under the MIT license.
 */
```

## Structure

The following keys should be defined in package.json:

```json
{
  "name": "bannerjs",
  "version": "1.0.0",
  "description": "Add a banner to a string. Get one-line/multi-line comment banner based on package.json.",
  "license": "MIT",
  "author": {
    "name": "kenny wang"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/jaywcjlove/bannerjs.git"
  }
}
```

`author` value can be defined like object or simply string too.


## Use

### option

- `multibanner(option)` Multi-line results
- `onebanner(option)` One-line results

```js
var banner = require('bannerjs');
bannerjs.multibanner({
  author:"banner.js",
  homepage:"http://....",
  name:"banner.js",
  license:"MIT",
  version:1.2.3,
  description:"description"
})
```

### API

```ts
import { PackageJson } from 'types-package-json';
export * from './cli.js';

export declare function getPackage(rootPath?: string): PackageJson;
export declare function onebanner(option?: PackageJson, rootPath?: string): string;
export declare function multibanner(option?: PackageJson, rootPath?: string): string;
```

## Use in gulp

- `bannerjs.multibanner()` Multi-line results
- `bannerjs.onebanner()` One-line results

```js 
var gulp = require('gulp');
var banner = require('gulp-banner');
var bannerjs = require('bannerjs');

gulp.task('default', function() {
  gulp.src('./test.js')
    .pipe(banner(bannerjs.multibanner()))
    .pipe(gulp.dest('dist/'));
});
```

## Use in Node

```js
var fs = require('fs');
var banner = require('bannerjs');
var uglify = require('uglify-js')

var code = fs.readFileSync('src/test.js', 'utf-8')
var minified = banner.onebanner() + '\n' + uglify.minify(code, {
  fromString: true,
  output: {
    ascii_only: true
  }
}).code;

fs.writeFileSync('src/test.js', minified);
```

## Use in Rollup

```js
import banner from 'bannerjs';

// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
    banner: banner.multibanner()
  }
};
```


## Command Line

```bash
Usage: bannerjs

Pipe Usage: bannerjs

Options:

 -m --multi     Output multi-line results
 -o --one       Output one-line results
```

You can easilly pipe unix commands together like:

```bash
cat my-js.js | bannerjs -o | uglify-js > my-js.min.js
```

**Npm Script**

```json
{
  "scripts":{
    "build:min": "cat my-js.js | uglifyjs | bannerjs -o > dist/my-js.min.js",
    "build:dist": "cat my-js.js | bannerjs -m | uglifyjs -b beautify=true --comments 'all' > dist/my-js.js "
  }
}
```

# License

MIT license
