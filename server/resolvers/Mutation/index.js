const AuthMutation = require('./AuthMutation');
const StudentMutation = require('./StudentMutation');
const UploadMutation = require('./UploadMutation');

module.exports = { ...AuthMutation, ...StudentMutation, ...UploadMutation };
