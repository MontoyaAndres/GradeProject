const { createWriteStream } = require("fs");
const UserModel = require('../../models/User');
const { authenticate } = require('../../utils');

function storeUpload({ stream, filename }) {
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on('finish', () => resolve())
      .on('error', reject)
  )
}

async function uploadFile(_, { file }, ctx) {
  const userId = authenticate(ctx);
  try {
    const user = await UserModel.findOne({ _id: userId });

    if (user) {
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      return true;
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  uploadFile
}
