#!/usr/bin/env node

import { createReadStream, createWriteStream } from 'fs';
import { onebanner, multibanner } from './';

export function run() {
  let args = process.argv.slice(2)
  let help = false;
  let multi = false;
  let one = false;

  args = args.filter((arg) => {
    if (arg === '-h' || arg === '--help') {
      help = true
      return false
    } else if (arg === '-m' || arg === '--multi') {
      multi = true
      return false
    } else if (arg === '-o' || arg === '--one') {
      one = true
      return false
    }
    return true
  });

  if (help) {
    const helpStr = `
    Usage: bannerjs

    Pipe Usage: bannerjs

    -m --multi     Output multi-line results
    -o --one       Output one-line results

    `;
    console.log(helpStr);
    return;
  }

  let bannerStr = '';
  if (multi) {
    bannerStr = multibanner();
  } else {
    bannerStr = onebanner();
  }

  let dest = args[2] ? createWriteStream(args[2]) : process.stdout;
  let source = args[1] ? createReadStream(args[1]) : process.stdin;

  dest.write(`${bannerStr}\n`);
  source.on('end', () => {
    dest.write('\n');
  })
  .on('error', (err) => {
    console.log('ERR:', err)
  })
  .pipe(dest, { end: true });
}