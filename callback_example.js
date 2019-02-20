const debug = require('debug');

const log = debug('SIMPLE_CALLBACK_EXAMPLE');
/**
 * Simple callback example
 * @param {string} language The language argument
 * @param {function} callback The callback function
 * @return {void}
 */
function writeCode(language, callback) {
  log(`Starting my ${language} coding.`);
  setTimeout(() => {
    callback();
  }, 2000);
}

writeCode('node', () => {
  log('Finished my programming');
});
