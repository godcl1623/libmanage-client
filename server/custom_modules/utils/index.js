module.exports = {
  getRandom: () => String(Math.random()).split('.')[1].slice(0, 6)
}