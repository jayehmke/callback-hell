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
