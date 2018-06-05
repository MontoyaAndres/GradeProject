const StudentModel = require('../../models/Student');
const UserModel = require('../../models/User');
const { authenticate } = require('../../utils');

async function allStudents(_, _, ctx) {
  const userId = authenticate(ctx);

  try {
    const user = await UserModel.findOne({ _id: userId }).lean();

    if (user) {
      const students = await StudentModel.find().lean();
      return students;
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function Student (_, { _id }, ctx) {
  const userId = authenticate(ctx);

  try {
    const user = await UserModel.findOne({ _id: userId }).lean();

    if (user) {
      const student = await StudentModel.findOne({ _id }).lean();

      if (!student) {
        throw new Error('No se pudo encontrar estudiante.');
      }

      return student;
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  allStudents,
  Student
}
