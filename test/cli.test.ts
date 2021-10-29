import { run } from '../src/cli';

const argv = process.argv.slice(0, 2);

it('-h test case', async () => {
  console.log = jest.fn();
  process.argv = [...argv, '-h'];
  expect(run()).toBeUndefined();
  // @ts-ignore
  const str: string = console.log.mock.calls[0][0];
  expect(str.indexOf('bannerjs') > -1).toBeTruthy();
  process.argv = [...argv];
});

// test('-m test case', async () => {

//   console.log = jest.fn();
//   process.argv = [...argv, '-m'];
//   expect(run()).toBeUndefined();
//   // @ts-ignore
//   const str: string = console.log.mock.calls[0][0];
//   expect(str.indexOf('bannerjs') > -1).toBeTruthy();
// });
