'use strict;'

var FLAG = '⛳'
var MINE = '💣'
var LIFE = 3
var gHint = false
var numOfHint = 3

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


function init() {
    gGame.isOn = true;
    gLevel.SIZE = 4
    level1()
    var elStart = document.querySelector('.btn-st')
    var elLife = document.querySelector('.life')
    LIFE = 3
    elLife.innerText = '❤️❤️❤️'
    elStart.innerHTML = '😀'
    gGame.markedCount = 0
    // startTimeCounter()
}

function hint(elHint) {
    if (numOfHint === 3) {
        numOfHint--
        elHint.innerText = '💡💡'
        gHint = true
        setTimeout(() => {
            gHint = false
        }, 3000);

    } else if (numOfHint === 2) {
        numOfHint--
        elHint.innerText = '💡'
        gHint = true
        setTimeout(() => {
            gHint = false
        }, 3000);

    } else {
        numOfHint--
        elHint.innerText = ''
        gHint = true
        setTimeout(() => {
            gHint = false
        }, 3000);
    }
}


function level3() {
    gLevel.SIZE = 16
    gBoard = buildBoard();
    renderBoard(gBoard);
    var elLevel3 = document.querySelector('.minesweeper')
    elLevel3.style.width = '550px'
    elLevel3.style.height = '550px;'


}
function level2() {
    gLevel.SIZE = 8
    gBoard = buildBoard();
    renderBoard(gBoard);
    var elLevel3 = document.querySelector('.minesweeper')
    elLevel3.style.width = '400px'
    elLevel3.style.height = '400px;'
}
function level1() {
    gLevel.SIZE = 4
    gBoard = buildBoard();
    renderBoard(gBoard);
    var elLevel3 = document.querySelector('.minesweeper')
    elLevel3.style.width = '250px'
    elLevel3.style.height = '250px;'
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = board[i][j];
            var cellClass = '';
            if (!cell.isShown) cellClass += ' hide';
            if (cell.isMine) cellClass += ' mine';
            strHtml += `<td class="${cellClass}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})">`
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
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                id: `call-${i}-${j}`,
                minesAroundCount: setMinesNegsCount(i, j, board),
                isShown: false,
                isMine: false,
                isMarked: false
            };
            // console.log(cell.minesAroundCount)
            board[i][j] = cell;
            if (i === 1 && j === 2 || i === 2 && j === 3) cell.isMine = true
        }
    }
    return board;
}


// var elSpansBox = document.querySelectorAll('.hide');
// for (var i = 0; i < gLevel.SIZE; i++) {
//     for (var j = 0; j < gLevel.SIZE; j++) {
//         if (cell.isMine)
//             elCell[i][j].classList.add('mine')
//     }
// }



function cellClicked(elCell, i, j) {
    if (gGame.isOn = true) {
        var cell = gBoard[i][j];
        if (cell.isMine) {
            elCell.innerHTML = MINE
            elCell.style.backgroundColor = 'red'
            checkGameOver()
        }
        if (!cell.isShown) {
            if (gHint) {
                cell.isShown = true
                setTimeout(() => {
                    cell.isShown = false;
                    elCell.style.backgroundColor = 'gray'
                    elCell.innerText = ''
                }, 3000);
                console.log(cell.isShown);
            }
            cell.isShown = true;
            elCell.style.backgroundColor = 'white'
            if (cell.minesAroundCount === 0) {
                expandShown(gBoard, elCell, i, j)
                console.log(expandShown(gBoard, elCell, i, j))
                elCell.innerHTML = 0;
            } else {
                elCell.innerHTML = cell.minesAroundCount;
            }
        }
    }
}
function expandShown(board, elCell, cellI, cellJ) {

}


function cellMarked(elCell, i, j) {
    var elScore = document.querySelector('h3 span')
    if (gBoard[i][j].isMarked) gBoard[i][j].isMarked;
    if (!gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = true
        elCell.innerHTML = FLAG;
    }
    elScore.innerHTML = gGame.markedCount++
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
    var elLife = document.querySelector('.life')
    if (LIFE === 3) {
        LIFE--
        elLife.innerText = '❤️❤️'
    } else if (LIFE === 2) {
        LIFE--
        elLife.innerText = '❤️'
    } else {
        elLife.innerText = ''
        gGame.isOn = false
        startTimeCounter()
        var elStart = document.querySelector('.btn-st')
        elStart.innerHTML = '😦'
        gGame.markedCount = 0
        // gBoard = buildBoard();
        // renderBoard(gBoard);
    }
}


var startTime = Math.floor(Date.now() / 1000);
localStorage.setItem("startTime", startTime);

function startTimeCounter() {
    var now = Math.floor(Date.now() / 1000);
    var diff = now - startTime; // diff in seconds between now and start
    var m = Math.floor(diff / 60); // get minutes value (quotient of diff)
    var s = Math.floor(diff % 60); // get seconds value (remainder of diff)
    m = checkTime(m); // add a leading zero if it's single digit
    s = checkTime(s); // add a leading zero if it's single digit
    document.querySelector('.count').innerHTML = m + ":" + s;// update the element where the timer will appear
    var t = setTimeout(startTimeCounter, 500); // set a timeout to update the timer
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;

}

var elSpansBox = document.querySelectorAll('.box span');
for (var i = 0; i < elSpansBox.length; i++) {
    elSpansBox[i].classList.toggle('mark')
}