# bannerjs

Add a banner to a string. Get one-line/multi-line comment banner based on package.json.

# Install

Install with npm:

```bash
npm i bannerjs --save-dev
```

Multi-line results in:

```bash
/*! bannerjs v1.0.8 | MIT (c) 2016 kenny wang <wowohoo@qq.com> | https://github.com/jaywcjlove/bannerjs */
```

One-line results in:

```bash
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

# License

MIT license