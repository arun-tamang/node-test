const errorCodes = require('./constants').errorCodes;

function handleError(errCode) {
  switch (errCode) {
    case errorCodes.ENOENT:
      console.log('ENOENT: No such file or directory');
      break;
    case errorCodes.ENOTDIR:
      console.log('ENOTDIR: This is not a directory. Please enter a directory');
      break;
    default:
      console.log('An error occured. Please try again and check that directory is correct');
      break;
  }
}

module.exports = handleError;