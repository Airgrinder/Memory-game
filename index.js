let button = document.querySelectorAll('.btn')
let list = document.querySelector('.score-list')

let comparisonItem = ''
let isReady = true
let doubles = 12
let target = false
let steps = 0

function restart() {
  for (const i of document.querySelectorAll('.button')) {
    i.classList = ''
    i.classList.add('btn')
    i.disabled = ''
    i.style.backgroundImage = 'url(assets/cloud.png)'
    i.style.backgroundColor = 'green'
    doubles = 12
    steps = 0
  }
  generate()
}

function generate() {
  let code = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu']
  code.sort(() => (Math.random() > .5) ? 1 : -1)
  for (let i = 0; i < code.length; i++) {
    button[i].classList.add(code[i])
  }
}

generate()

function comparison(item) {
  if (!isReady) {
    return console.log('not so fast')
  }
  steps++
  if (!target) {
    target = true
    item.toggle('target')
    document.querySelector('.target').style.backgroundImage = ''
    document.querySelector('.target').style.backgroundColor = ''
    comparisonItem = item[1]
  } else if (item[2] === 'target') {
    target = false
    document.querySelector('.target').style.backgroundImage = 'url(assets/cloud.png)'
    document.querySelector('.target').style.backgroundColor = 'green'
    item.toggle('target')
    comparisonItem = ''
  } else if (item[2] !== 'target' && target) {
    if (item[1] === comparisonItem) {
      doubles--
      comparisonItem = ''
      target = false
      for (const i of document.querySelectorAll('.' + item[1])) {
        i.style.backgroundImage = ''
        i.style.backgroundColor = ''
        i.disabled = 'disabled'
        i.classList.remove('btn')
        i.classList.add('button')
        i.classList.remove('target')
      }
    } else {
      item.add('target')
      for (const i of document.querySelectorAll('.target')) {
        i.style.backgroundImage = ''
        i.style.backgroundColor = ''
      }
      isReady = false
      target = false
      comparisonItem = ''
      setTimeout(() => {
        for (const i of document.querySelectorAll('.target')) {
          i.style.backgroundImage = 'url(assets/cloud.png)'
          i.style.backgroundColor = 'green'
          for (const i of button) {
            i.classList.remove('target')
          }
          isReady = true
        }
      }, 1000)
    }
  }
  if (doubles === 0) {
    localStorage.setItem(localStorage.length+1, steps)
    list.innerHTML = ''
    restart()
    score()
  }
}

for (const i of button) {
  i.addEventListener('click', () => comparison(i.classList))
}

function score() {
  let entries = Object.entries(localStorage)
  let sorted = entries.sort((a, b) => a[1] - b[1])
  for (let i = 0; i < 10; i++) {
    console.log(sorted[i].length-1)
    list.innerHTML += '<li>' + parseInt(i+1) + ' : ' + sorted[i][1] + ' steps' + '</li>'
  }

}

score()

