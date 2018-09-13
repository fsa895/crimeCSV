x = {
  2001: 18441, 2002: 18522, 2003: 17332, 2004: 15978,
};
y = [];

for (const prop in x) {
  // console.log(prop+" "+ x[prop]);
  z = { year: '', mdata: 0 };
  z.year = prop;
  z.mdata = x[prop];
  y.push(z);
}

console.log(y);
