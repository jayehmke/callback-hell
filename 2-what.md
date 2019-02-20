# What Are Promises?

Simply put, a promise is an object that may product a single value some time in
the future: Either a resolved value, or a reason that it's not resolved.

A `Promise` is a proxy for a value not necessarily known when the promise is
created. It allows you to associate handlers with an asynchronous action's
eventual success value or failure reason. This lets asynchronous methods return
values like synchronous methods: instead of immediately returning the final
value, the asynchronous method returns a promise to supply the value at some
point in the future.

# How Do Promises Work

A promise has three possible states:

1. Pending: The Promise is still in process, and has not finished yet.
2. Fulfilled: The Promise has finished successfully
3. Rejected: The Promise has finished with an Error

## Syntax

```javascript
new Promise(executor)

```

`executor`: A function that is passed in with the arguments `resolve` and
`reject` commonly seen as `res` and `rej`.

The `executor` function is executed immediately by the Promise implementation,
passing `resolve` and `reject` functions.

The `resolve` and `reject` functions, when called, resolve or reject the promise.

## Successful Promise
```javascript
const promise = new Promise(function(res, rej) {
  setTimeout(function() {
    res('FINISHED');
  }, 5000);
});

promise.then(function(result) {
  console.log(result); // FINISHED
});
```

## Error Promise
```javascript
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
  });

```

