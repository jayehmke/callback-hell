const debug = require('debug');

const logSuccessPromise = debug('SUCCESS_PROMISE');
const logErrorPromise = debug('ERROR_PROMISE');
const logPromiseFinally = debug('PROMISE_FINALLY');

const successPromise = new Promise(res => {
  setTimeout(() => {
    res('FINISHED');
  }, 5000);
});

const errorPromise = new Promise((res, rej) => {
  setTimeout(() => {
    rej(new Error('ERROR AT ERROR PROMISE'));
  }, 3000);
});
const successWatcher = setInterval(() => {
  logSuccessPromise(successPromise);
}, 500);

const errorWatcher = setInterval(() => {
  logErrorPromise(errorPromise);
}, 500);

successPromise.then(result => {
  clearInterval(successWatcher);
  logSuccessPromise(successPromise);
  logSuccessPromise(result);
});

errorPromise
  .then(result => {
    logErrorPromise(result);
  })
  .catch(error => {
    clearInterval(errorWatcher);
    logErrorPromise(error.message);
  });
