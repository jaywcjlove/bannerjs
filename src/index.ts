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

  if (!pkg.homepage && pkg.repository && pkg.repository.url) {
    pkg.homepage = pkg.repository.url;
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
  return ['/*! ', bn.name, ' v', bn.version,
    ' | ', bn.license, ' (c) ',
    new Date().getFullYear(), ' ', bn.author,
    ' | ', bn.homepage,
    ' */',
  ].filter(Boolean).join('');
}

export function multibanner(option?: PackageJson) {
  let bn = getPackage();
  if (option) bn = Object.assign(bn, option);
  const result: string[] = [];
  result.push('/**!');
  result.push(`\n * ${bn.name} v${bn.version}`);
  result.push(`\n * ${bn.description}`);
  result.push(`\n * `);
  result.push(`\n * Copyright (c) ${new Date().getFullYear()} ${bn.author}`);
  result.push(`\n * ${bn.homepage}`);
  result.push(`\n * `);
  result.push(`\n * Licensed under the ${bn.license} license.`);
  result.push(`\n */\n`);
  return result.filter(Boolean).join('');
}