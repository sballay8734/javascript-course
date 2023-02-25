function sumCallback(a, b, callback) {
  sum = a + b
  callback(sum)
}

function handleSum(num) {
  console.log(num)
}

sumCallback(2, 5, handleSum)