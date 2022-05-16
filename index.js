const cases = require('./load-tests.js')

function solution (matrix) {
  let undiscovered = {}
  let rivers = []

  for (let y in matrix) {
    for (let x in matrix[y]) {
      undiscovered[`${x},${y}`] = matrix[y][x]
    }
  }

  while (Object.keys(undiscovered).length) {
    let current = Object.keys(undiscovered)[0]
    if (undiscovered[current]) {
      let river = getBranches(current, undiscovered, [current])
      rivers.push(river)
    } else {
      delete undiscovered[current]
    }
  }

  let lengths = rivers.map(river => river.length)
  let sorted = lengths.sort((a, b) => a - b)
  return sorted
}

function getBranches (grid, undiscovered, river) {
  let xy = toXY(grid)
  let keyT = `${xy.x},${xy.y - 1}`
  let keyB = `${xy.x},${xy.y + 1}`
  let keyL = `${xy.x - 1},${xy.y}`
  let keyR = `${xy.x + 1},${xy.y}`
  let T = undiscovered[keyT] && keyT
  let B = undiscovered[keyB] && keyB
  let L = undiscovered[keyL] && keyL
  let R = undiscovered[keyR] && keyR

  delete undiscovered[keyT]
  delete undiscovered[keyB]
  delete undiscovered[keyL]
  delete undiscovered[keyR]
  delete undiscovered[grid]

  let hits = [T, B, L, R].filter(item => item)
  hits.forEach(hit => {
    river.push(hit)
    getBranches(hit, undiscovered, river)
  })

  return river
}

function toXY (grid) {
  let raw = grid.split(',')
  return { x: parseInt(raw[0]), y: parseInt(raw[1]) }
}

// eslint-disable-next-line no-unused-expressions
cases[0].in
solution(cases[0].in)
module.exports = solution
