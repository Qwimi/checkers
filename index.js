const gameField = document.getElementById('board')
let fieldView = []
let field = [
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1]
]
let currentItem = null
let currentCell = null
let moves = []

function InitBoard() {
    for (let row = 0; row < 8; row++) {
        let rowBlock = document.createElement('div')
        rowBlock.classList.add('row')
        let fieldWiewRow = []
        for (let col = 0; col < 8; col++) {
            let cell = document.createElement('div')
            let checkersItem = document.createElement('div')
            let occupied = false
            cell.classList.add('cell')
            if (row % 2 == 0) {
                if (col % 2 == 0) {
                    cell.classList.add('cell-black')
                }
            } else {
                if (col % 2 !== 0) {
                    cell.classList.add('cell-black')
                }
            }

            if (field[row][col] !== 0) {
                checkersItem.classList.add('checkers-item')
                occupied = true
                let direction = 'up'
                if (field[row][col] == -1) {
                    checkersItem.classList.add('checkers-item--black')
                    direction = 'down'
                    color = 'black'

                } else {
                    color = 'white'
                }
                checkersItem.addEventListener('click', SelectCell)
                checkersItem.setAttribute('color', color)
                checkersItem.setAttribute('row', row)
                checkersItem.setAttribute('col', col)
                checkersItem.setAttribute('direction', direction)
            }
            cell.setAttribute('occupied', occupied)
            fieldWiewRow.push(cell)
            cell.appendChild(checkersItem)
            cell.addEventListener('click', Move)
            rowBlock.appendChild(cell)
        }
        fieldView.push(fieldWiewRow)
        gameField.appendChild(rowBlock)
    }
}


function SelectCell(e) {
    if (currentItem !== null) {
        let y = parseInt(currentItem.getAttribute('row'))
        let x = parseInt(currentItem.getAttribute('col'))
        let dir = currentItem.getAttribute('direction')
        currentCell = fieldView[y][x]
        currentCell.classList.add('selected')
        ShowPossibleMove(currentCell, y, x, dir)
        if (currentItem == e.target) {
            currentItem = null
            currentCell.classList.remove('selected')
            currentCell = null
            UnshowMove()
        }
    } else {
        currentItem = e.target
        SelectCell(currentItem)
    }
}

function ShowPossibleMove(prev, row, col, dir) {
    if (dir == 'up' & row - 1 >= 0) {
        if (col + 1 < 8) {
            if (fieldView[row - 1][col + 1].getAttribute('occupied') == 'false') {
                fieldView[row - 1][col + 1].classList.add('access')
            }
        }
        if (col - 1 >= 0) {
            if (fieldView[row - 1][col - 1].getAttribute('occupied') == 'false') {
                fieldView[row - 1][col - 1].classList.add('access')
            }
        }
    } else {
        if (col + 1 < 8 && fieldView[row - 1][col + 1].getAttribute('occupied') == 'false') {
            fieldView[row + 1][col + 1].classList.add('access')
        }
        if (col - 1 >= 0 && fieldView[row - 1][col + 1].getAttribute('occupied') == 'false') {
            fieldView[row + 1][col - 1].classList.add('access')
        }
    }
    document.getElementsByClassName('access').forEach(element => {
        moves.push(element)
    })
}

function UnshowMove() {
    [...document.getElementsByClassName('access')].forEach(element => {
        element.classList.remove('access')
    })
    moves = []
}

function Move(e) {
    console.log(e.target);
    console.log(moves);
    console.log(e.target in moves);
    if (e.target in moves){
        console.log(e.target);
        let nextCell = e.target
        let y2 = parseInt(nextCell.getAttribute('row'))
        let x2 = parseInt(nextCell.getAttribute('col'))
        currentCell.innerHtml = 'a'

    }
}

InitBoard()