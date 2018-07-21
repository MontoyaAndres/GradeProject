export async function userBatcher(ids, models, user) {
  const data = {};

  const response = models.User.find({ _id: { $in: ids } });

  return response.then(res => {
    res.forEach(result => {
      if (data[result._id]) {
        data[result._id] += result;
      } else {
        data[result._id] = result;
      }
    });

    return ids.map(id => data[id]);
  });
}

export async function StudentDistinctBatcher(Param, models, user) {
  const data = {};

  const response = models.Student.find().distinct(Param.toString());

  return response.then(res => {
    Param.forEach(result => {
      if (data[result]) {
        data[result].push(res);
      } else {
        data[result] = res;
      }
    });

    return Param.map(param => data[param]);
  });
}
