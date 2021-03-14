const ascending = (a, b) => {
  var keyA = a.productPrice
  var keyB = b.productPrice
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
}
const descending = (a, b) => {
  var keyA = a.productPrice
  var keyB = b.productPrice
  if (keyA < keyB) return 1;
  if (keyA > keyB) return -1;
  return 0;
}

const descendingByDate = (a, b) => {
  var keyA = a.approvalDate
  var keyB = b.approvalDate
  if (keyA <= keyB) return 1;
  if (keyA > keyB) return -1;
  return 0;
}


module.exports = {
  ascending,
  descending,
  descendingByDate
}