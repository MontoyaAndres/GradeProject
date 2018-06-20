import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'apollo-upload-server';
import formatErrors from '../utils/formatErrors';
import requiresAuth from '../utils/permissions';

function storeUpload({ stream, filename }) {
  const file = new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on('finish', () => resolve())
      .on('error', reject)
  );
  return file;
}

export default {
  Upload: GraphQLUpload,
  Mutation: {
    uploadFile: requiresAuth.createResolver(async (parent, { file }, { models }) => {
      try {
        const { stream, filename } = await file;
        await storeUpload({ stream, filename });
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    })
  }
};
