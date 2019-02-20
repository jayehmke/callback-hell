# Async/Await

Promises are great and easy to use, but can I make it even easier to read and
work with?

### Async
The keyword `async` does one simple thing to a function: it makes it return a
`Promise`.

```javascript
async function foo() {
  return 1;
}

foo() instanceof Promise; // True

foo().then(response => {
  console.log(response); // 1
})
```

### Await
The keyword `await` does one simple thing: it makes JavaScript wait until the
`Promise` `resolves` or `rejects` and then returns the result. `Await` can only
be used in an `async` function.

```javascript
async function foo() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('DONE!'), 1000);
  });

  // Awaiting a Promise works the same as awaiting an async function
  const result = await promise; // Waits for the promise to resolve
  console.log(result); // "DONE!"
}

foo();
```

### Error Handling
Unlike normal promises, when you `await` a `Promise`, there is no `catch` method.
You have to wrap your `await` calls in a `try` `catch` block to handle errors
that would normally be caught in a `catch` `Promise` chain.

```javascript
/**
 * @return {Promise} a promise with the result
 */
async function foo() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('ERROR')), 1000);
  });
  try {
    const result = await promise; // Waits for the promise to resolve
    console.log(result); // Not called
  } catch (e) {
    console.error(e); // ERROR
  }
}

foo();

```

Catching errors for subsequent awaited promises can get a little strange...

```javascript
const debug = require('debug');
const axios = require('axios');

const log = debug('PROMISE_CHAIN');

/**
 * @return {Promise} A Promise for the User data
 */
async function getUserData() {
  let comments;
  try {
    comments = await axios.get('https://jsonplaceholder.typicode.com/comments');
  } catch (e) {
    log(e);
  }

  if (!comments.data || !comments.data.length) {
    throw new Error('No Comments');
  }
  const [comment] = comments.data;
  log('Comment');
  log(comment);

  let post;
  try {
    post = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${comment.id}`,
    );
  } catch (e) {
    log(e);
  }

  if (!post || !post.data) {
    throw new Error('Post Does Not Exist');
  }
  log('Post');
  log(post.data);

  return axios.get(
    `https://jsonplaceholder.typicode.com/users/${post.data.userId}`,
  );
}

getUserData()
  .then(userData => {
    log('User Data');
    log(userData.data);
  })
  .catch(e => {
    log(e);
  });
```



```javascript
const debug = require('debug');
const axios = require('axios');

const log = debug('PROMISE_CHAIN');

/**
 * @return {Promise} A Promise for the User data
 */
async function getUserData() {
  const comments = await axios.get(
    'https://jsonplaceholder.typicode.com/comments',
  );

  if (!comments.data || !comments.data.length) {
    throw new Error('No Comments');
  }
  const [comment] = comments.data;
  log('Comment');
  log(comment);

  const post = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${comment.id}`,
  );

  if (!post || !post.data) {
    throw new Error('Post Does Not Exist');
  }
  log('Post');
  log(post.data);

  return axios.get(
    `https://jsonplaceholder.typicode.com/users/${post.data.userId}`,
  );
}

getUserData()
  .then(userData => {
    log('User Data');
    log(userData.data);
  })
  .catch(e => {
    log(e);
  });
```


## An Important Consideration Regarding Async/Await
`Async`/`await` may make your asynchronous calls look more synchronous but it is
still executed the same way as if it were using a callback or `Promise` based
API. The asynchronous I/O operations will still be processed in parallel and
the code handling the responses in the `async` functions will not be executed
until that asynchronous operation has a result. Also, even though you are using
`async/await` you have to sooner or later resolve it as a `Promise` in the top
level of your program. This is because `async` and `await` are just syntactical
sugar for automatically creating, returning and resolving `Promises`.
