const path = require('path');

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  moduleNameMapper: {
    '^@root/(.*)$': path.join(__dirname, '$1'),
  },
};