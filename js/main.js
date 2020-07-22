'use strict;'

var FLAG = '⛳'
var MINE = '💣'



var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function addMine() {
    if (gGame.isOn) {
        var emptyCell = getEmptyCellCoord();
        board[emptyCell] = CHERRY;
        console.log(emptyCell);
        console.log(board[emptyCell]);
        renderCell(emptyCell, board[emptyCell]);
    }
}

// function init(){
gBoard = buildBoard();
renderBoard(gBoard);
gGame.isOn = true;
gGame.markedCount = 0
// }

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = board[i][j];
            var cellClass = '';
            if (cell.isShown) cellClass += ' shwon';
            if (cell.isMine) cellClass += ' mine';
            strHtml += `<td class="cell ${cellClass}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})">`
            // if (cell.isMine) {
            //     strHtml += MINE;
            //  console.log(cell.isMine);
            // }
            strHtml += '</td>';
        }
        strHtml += '</tr>';
    }

    var elMinesweeper = document.querySelector('.minesweeper-board');
    elMinesweeper.innerHTML = strHtml;
}

console.table(buildBoard());

function buildBoard() {
    var board = [];
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {
            var cell = {
                id: `call-${i}-${j}`,
                minesAroundCount: setMinesNegsCount(i, j, board),
                isShown: false,
                isMine: false,
                isMarked: false
            };
            // console.log(cell.minesAroundCount)
            board[i][j] = cell;
            if (i === 1 && j === 2) cell.isMine = true
        }
    }
    return board;
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    console.log(cell);
    if (cell.isMine) {
        elCell.innerHTML = MINE
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (cell.isMine[i][j]) {
                    elCell.innerHTML = MINE
                    elCell.style.backgroundColor = 'red'
                }
            }
        }

    }
    if (!cell.isMine) {
        cell.isShown = true;
        if ((cell.minesAroundCount === 0)) {
            elCell.innerHTML = ' ';
        } else {
            elCell.innerHTML = cell.minesAroundCount;
        }
    }
}

function cellMarked(elCell, i, j) {
    var elScore = document.querySelector('h3 span')
    if (gBoard[i][j].isMarked) return;
    if (!gBoard[i][j].isShown) {
        gBoard[i][j].isMarked = true;
        elScore.innerHTML = gGame.markedCount++
        elCell.innerHTML += FLAG;
    }
}


function setMinesNegsCount(cellI, cellJ, board) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine) neighborsSum++;
        }
    }
    return neighborsSum;
}


function checkGameOver() {

}
function expandShown(board, elCell, i, j) {

}
