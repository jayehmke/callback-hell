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
      const [comment] = commentData;
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
