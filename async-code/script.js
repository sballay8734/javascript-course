function getValueWithDelay(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value)
    }, delay)
  })
}

function getValueWithError(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(value)
    }, delay)
  })
}

async function doStuff() {
  try {
    result1 = await getValueWithDelay('Hello', 250)
    console.log(result1)
    result2 = await getValueWithError('Error', 250)
    console.log(result2)
    result3 = await getValueWithDelay('Goodbye', 250)
    console.log(result3)
  } catch (error) {
    console.error(error)
  }
}

doStuff()
