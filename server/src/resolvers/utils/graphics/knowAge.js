export default function knowAge(values) {
  const ages = [];
  const counts = {};

  // Saving ages on the "ages" array
  values.filter(value => ages.push(value.Edad));

  // Filling the "counts" object with ages
  ages.forEach(i => {
    counts[i] = (counts[i] || 0) + 1;
  });

  // Get percent of the ages
  // eslint-disable-next-line
  for (const prop in counts) {
    counts[prop] = Math.round((counts[prop] / ages.length) * 100);
  }

  if (Object.keys(counts).length) {
    return {
      ok: true,
      values: counts
    };
  }

  return {
    ok: true,
    errors: [{ path: "graphics", message: "No se encontraron datos." }]
  };
}
