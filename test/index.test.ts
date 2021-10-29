import path from 'path';
import { getPackage, onebanner, multibanner } from '../src';

it('getPackage test case', async () => {
  const pkg = await getPackage();
  expect(pkg.name).toEqual('bannerjs');
  expect(pkg.license).toEqual('MIT');
  expect(pkg.repository).toEqual({
    type: "git",
    url: "https://github.com/jaywcjlove/bannerjs.git"
  });

  const ansiEscapes = getPackage(path.resolve(process.cwd(), 'node_modules/ansi-escapes'));
  expect(ansiEscapes.author).toEqual('Sindre Sorhus');
  expect(ansiEscapes.homepage).toEqual('sindresorhus/ansi-escapes');

  const compatData = getPackage(path.resolve(process.cwd(), 'node_modules/@babel/compat-data'));
  expect(compatData.homepage).toEqual('https://github.com/babel/babel.git');

  const testpkg = getPackage(path.resolve(process.cwd(), 'test'));
  expect(testpkg.author).toBeUndefined();
  expect(testpkg.homepage).toEqual('');
  expect(testpkg.description).toEqual('');
});

it('onebanner test case', async () => {
  const des = onebanner();
  expect(typeof des).toEqual('string');
  const desName = onebanner({ name: 'pkgname', version: '1.0.0' });
  expect(desName.indexOf('/*! pkgname v1.0.0')).toEqual(0);
  expect(desName.includes('pkgname v1.0.0')).toBeTruthy();
});

it('multibanner test case', async () => {
  const des = multibanner();
  expect(typeof des).toEqual('string');
  const desName = multibanner({ name: 'pkgname', version: '1.0.0' });
  expect(desName.indexOf(' * pkgname v1.0.0') > 1).toBeTruthy();
  expect(desName.includes('pkgname v1.0.0')).toBeTruthy();
});
