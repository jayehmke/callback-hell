const debug = require('debug');
const axios = require('axios');

const log = debug('PROMISE_CHAIN');

axios
  .get('https://jsonplaceholder.typicode.com/comments')
  .then(comments => {
    if (comments.data && comments.data.length) {
      const [comment] = comments.data;
      log(comment);
      return axios.get(
        `https://jsonplaceholder.typicode.com/posts/${comment.id}`,
      );
    }
    throw new Error('Comment Does Not Exist');
  })
  .then(post => {
    if (post.data) {
      log(post.data);
      return axios.get(
        `https://jsonplaceholder.typicode.com/users/${post.data.userId}`,
      );
    }
    throw new Error('Post Does Not Exist');
  })
  .then(user => {
    log(user.data);
  })
  .catch(e => {
    log('PROMISE CHAIN ERROR');
    log(e);
  });
