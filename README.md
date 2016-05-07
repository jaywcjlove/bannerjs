# bannerjs

Add a banner to a string. Get one-line/multi-line comment banner based on package.json.

# Install

Install with npm:

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
 * Copyright (c) 2016 kenny wang <wowohoo@qq.com>
 * Licensed under the MIT license.
 *
 * https://github.com/jaywcjlove/bannerjs
 */
```

# Structure

The following keys should be defined in package.json:

```json
{
  "name": "bannerjs",
  "version": "1.0.0",
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

# Command Line

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

# Use in gulp

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

# License

MIT license