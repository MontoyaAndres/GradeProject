import pick from 'lodash.pick';

export default (e, models) => {
  console.log('HERE');
  console.log(e);
  if (e instanceof models.mongoose.Error.ValidationError) {
    return e.errors.map(x => pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};
