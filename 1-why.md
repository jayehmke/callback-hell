# Why Promises?

1. Promises provide a simpler alternative for executing, composing, and managing
asynchronous operations when compared to traditional callback-based approaches.


## Callback Hell

### What Are Callbacks?

A callback is a function that is to be executed after another function has
finished executing.

```javascript
/**
 * Simple callback example
 * @param {string} language The language argument
 * @param {function} callback The callback function
 * @return {void}
 */
function writeCode(language, callback) {
  console.log(`Starting my ${language} coding.`);
  setTimeout(function() {
    callback();
  }, 2000);
}

writeCode('node', function(){
  console.log('Finished my programming');
});
```

If you've been coding in JavaScript for a little while, you may have come across
something that looks like this using callbacks:

```javascript
function getData() {
  setTimeout(function() {
    console.log('1. First thing setting up second thing');
    setTimeout(function() {
      console.log('2. Second thing setting up third thing');
      setTimeout(function() {
        console.log('3. Third thing setting up fourth thing');
        setTimeout(function() {
          console.log('4. Fourth thing');
        }, 2000);
      }, 2000);
    }, 2000);
  }, 2000);
};
```



## A More Robust Example

### Get the user of a post for a specific comment

```javascript
const request = require('request');
const debug = require('debug');

const log = debug('CALLBACKS');

request(
  'https://jsonplaceholder.typicode.com/comments',
  (commentError, commentResponse, comments) => {
    if (commentError) {
      log('Error Fetching Comments');
    }
    const commentData = JSON.parse(comments);
    if (commentData && commentData.length) {
      const comment = commentData[0];
      log('Comment');
      log(comment);
      request(
        `https://jsonplaceholder.typicode.com/posts/${comment.postId}`,
        (postError, postResponse, post) => {
          if (postError) {
            log('Error Fetching Posts');
          }

          const postData = JSON.parse(post);
          if (postData) {
            log('Post');
            log(postData);
            request(
              `https://jsonplaceholder.typicode.com/users/${postData.userId}`,
              (userError, userResponse, user) => {
                if (userError) {
                  log('Error Fetching User');
                }
                const userData = JSON.parse(user);
                log('Found the User');
                log(userData);
              },
            );
          }
        },
      );
    }
  },
);

```
