const debug = require('debug');

const log = debug('PROMISE_PUSH');

const array = [1, 2, 3];
const promises = [];

for (let x = 0, n = array.length; x < n; x += 1) {
  log(`PUSHING INDEX ${x}`);
  promises.push(
    new Promise((res, rej) => {
      setTimeout(() => {
        log(`${array[x]} IS RESOLVED`);
        res(`FINISHED ${array[x]}`);
      }, 1500 * x);
    }),
  );
}

Promise.all(promises)
  .then(result => {
    log('ALL PROMISES RESOLVED');
    log(result); // ['FINISHED 0', 'FINISHED 1', 'FINISHED 2']
  })
  .catch(e => {
    log(e);
  });
