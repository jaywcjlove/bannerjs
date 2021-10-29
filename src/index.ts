import path from 'path';
import { PackageJson } from 'types-package-json';

export * from './cli';

/**
 * Get package.json Object
 */
export function getPackage(rootPath: string = process.cwd()): PackageJson {
  const pkgPath = path.resolve(rootPath, 'package.json');
  const pkg: PackageJson = require(pkgPath);
  pkg.author = pkg.author;
  if (pkg.author && typeof pkg.author === 'object' && pkg.author.name) {
    pkg.author = pkg.author.name;
  }

  if (!pkg.homepage && pkg.repository) {
    pkg.homepage = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url;
  }

  if (!pkg.homepage) {
    pkg.homepage = '';
  }

  pkg.description = pkg.description;
  if (!pkg.description) {
      pkg.description = '';
  }

  return pkg;
}

export function onebanner(option?: PackageJson) {
  let bn = getPackage();
  if (option) {
    bn = Object.assign(bn, option);
  }
  return `/*! ${bn.name} v${bn.version} | ${bn.license} © ${new Date().getFullYear()} ${bn.author} ${bn.homepage} */`
}

export function multibanner(option?: PackageJson) {
  let bn = getPackage();
  if (option) bn = Object.assign(bn, option);
  const str = `/**!
  * ${bn.name} v${bn.version}
  * ${bn.description}
  * 
  * Copyright (c) ${new Date().getFullYear()} ${bn.author}
  * ${bn.homepage}
  * Licensed under the ${bn.license} license.
  */\n
  `;
  return str;
}