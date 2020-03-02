export function fakerWaiter() {
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const num = Math.floor(Math.random() * 10)

        if (num % 2 === 1) {
          reject({ message: 'Sorry, rejected'})
          return
        }

        resolve({ success: true })
      }, 5000)
    }
  )
}
