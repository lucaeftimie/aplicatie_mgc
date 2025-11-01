//Util used for transforming the "underscore" notation into the "camelCase" notation
module.exports = (rows) => {
  return rows.map((row) => {
    const replaced = {};
    console.log(row);
    for (let key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace('_', '')
      );
      replaced[camelCase] = row[key];
    }

    return replaced;
  });
};
//  /([-_][a-z])/gi - matches all occurances of "_<letter>" or "-<letter>" in a string, letter is case insensitive