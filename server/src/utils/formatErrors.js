import pick from 'lodash.pick';

export default (e, models) => {
  if (e) {
    return e.errors.map(x => pick(x, ['mongodb', e]));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};
