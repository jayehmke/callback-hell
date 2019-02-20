# Promise Optimizations

## Running Promises in Parallel

What if you need to wait on multiple unrelated promises to be finished before
doing some additional work? Should you wait for the first to be finished before
running the second?

A common practice might be to run the following:

```javascript
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
    log(result); // ['FINISHED 1', 'FINISHED 2', 'FINISHED 3']
  })
  .catch(e => {
    log(e);
  });
```

The index of your promise will always be the index of the array item.

## Can We Make This Any Better?

### Bluebird Promises

Bluebird promises can be faster than native promises and have additional
features not included in native promises.



## Bluebird Methods of Note

* `Promise.promisify()`: Wraps a single callback function in a promise
```javascript
const readFile = Promise.promisify(require('fs').readFile);

readFile('myfile.js', 'utf8')
  .then(contents => eval(contents))
  .then(result => {
    console.log('The result of evaluating myfile.js', result);
  })
  .catch(SyntaxError, e => {
    console.log('File had syntax error', e);
    // Catch any other error
  })
  .catch(e => {
    console.log('Error reading file', e);
  });
```
* `Promise.promisifyAll()`: Wraps any callback function as a Promise
```javascript
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

fs.readFile('somefile.text').then(data => {
  // do something with data here
});
```
* `Promise.map()`
```javascript
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
```
* `Promise.prototype.finally()`: This is a method that already exists in browser
based promises. However, it has not been implemented in Node.js yet. Bluebird
does support this method. It is used to execute code regardless of the outcome
of your promise.
### Example

```javascript

const Promise = require('bluebird');
const promise = new Promise(function(res, rej) {
  setTimeout(function() {
    rej(new Error('ERROR'));
  }, 5000);
});

promise
  .then(function(result) {
  // Not called since the promise has been rejected
    console.log(result);
  })
  .catch(function(error) {
    console.log(error.message); // ERROR
  })
  .finally(function() {
    console.log('FINALLY'); // Called even though the Promise was rejected
  })

```
