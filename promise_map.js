const Promise = require('bluebird');
const debug = require('debug');

const log = debug('PROMISE_MAP');
const array = [1, 2, 3];

Promise.map(array, arrayItem => {
  log(arrayItem);
  return new Promise((res, rej) => {
    setTimeout(() => {
      log('RESOLVING');
      log(arrayItem);
      res(arrayItem);
    }, 1000 * arrayItem);
  });
})
  .then(result => {
    log(result);
  })
  .then(e => {
    log(e);
  });

