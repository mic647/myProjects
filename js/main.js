'use strict;'

var FLAG = '⛳'
var MINE = '💣'
var LIFE = 3
var gHint = false
var numOfHint = 3
var gBoard

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
    startTimeCounter()
}

function hint(elHint) {
    if (gGame.isOn) {
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
    // elLevel3.style.width = '400px'
    // elLevel3.style.height = '400px;'
}
function level1() {
    gLevel.SIZE = 4
    gBoard = buildBoard();
    renderBoard(gBoard);
    var elLevel3 = document.querySelector('.minesweeper')
    // elLevel3.style.width = '250px'
    // elLevel3.style.height = '250px;'
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
                numMinesAround: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            // console.log(cell.minesAroundCount)
            board[i][j] = cell;
            if (i === 2 && j === 1 || i === 0 && j === 3) cell.isMine = true;
        }
    }
    return board;
}


function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    cell.numMinesAround = setMinesNegsCount(i, j, gBoard);
    if (gGame.isOn) {
        if (gHint) {
            cell.isShown = true
            setTimeout(() => {
                cell.isShown = false;
                elCell.style.backgroundColor = 'gray'
                elCell.innerText = ''
            }, 3000);
            console.log(cell.isShown);
        }
        if (elCell.innerHTML = FLAG) {
            cell.isShown = false
            elCell.style.backgroundColor = 'gray'
            elCell.innerText = ''
        }
        if (!cell.isMine) {
            cell.isShown = true;
            elCell.style.backgroundColor = 'white'
            elCell.innerHTML = cell.numMinesAround;
            playSoundNums()
        } else {
            cell.isShown = true
            expandShown(gBoard, elCell)
            elCell.style.backgroundColor = 'red'
            elCell.innerHTML = MINE;
            if (LIFE === 3 || LIFE === 2) {
                checkGameOver()
                setTimeout(() => {
                    cell.isShown = false;
                    elCell.style.backgroundColor = 'gray'
                    elCell.innerText = ''
                }, 1500);
            } else {
                checkGameOver()
            }
        }
    }
}


function expandShown(board, elCell) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (board[i][j].isMine) {
                board[i][j].isShown = true
                elCell.style.backgroundColor = 'red'
                elCell.innerHTML = MINE;
                console.log(elCell);
            }
        }
    }
}


function cellMarked(elCell, i, j) {
    if (gGame.isOn) {
        if (gBoard[i][j].isShown === false) {
            if (gBoard[i][j].isMarked) {
                console.log(gBoard[i][j].isShown);
                elCell.innerHTML = ' '
                updateScore(-1)
                playSoundClick()
                gBoard[i][j].isMarked = false
                return;
            }
            if (!gBoard[i][j].isMarked) {
                elCell.innerHTML = FLAG;
                playSoundClick()
                updateScore(1)
                gBoard[i][j].isMarked = true
            }
        }
    }
}

function updateScore(value) {
    var markedCount = document.querySelector('h3 span')
    gGame.markedCount += value;
    markedCount.innerHTML = gGame.markedCount
    console.log(markedCount);
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
    if (!gHint) {
        if (LIFE === 3) {
            LIFE--
            elLife.innerText = '❤️❤️'
            playSound()
        } else if (LIFE === 2) {
            LIFE--
            elLife.innerText = '❤️'
            playSound()
        } else {
            gGame.isOn = false
            elLife.innerText = ''
            startTimeCounter()
            var elStart = document.querySelector('.btn-st')
            elStart.innerHTML = '😦'
            gGame.markedCount = 0
            playSoundGO()
            // gBoard = buildBoard();
            // renderBoard(gBoard);
        }
    }
}

function playSound() {
    var sound = new Audio("sound/buzz.mp3");
    sound.play();
}

function playSoundGO() {
    var sound = new Audio("sound/game-over.mp3");
    sound.play();
}
function playSoundClick() {
    var sound = new Audio("sound/click.mp3");
    sound.play();
}
function playSoundNums() {
    var sound = new Audio("sound/nums.mp3");
    sound.play();
}

var startTime = Math.floor(Date.now() / 1000);
localStorage.setItem("startTime", startTime);

function startTimeCounter() {
    if (gGame.isOn) {
        var now = Math.floor(Date.now() / 1000);
        var diff = now - startTime; // diff in seconds between now and start
        var m = Math.floor(diff / 60); // get minutes value (quotient of diff)
        var s = Math.floor(diff % 60); // get seconds value (remainder of diff)
        m = checkTime(m); // add a leading zero if it's single digit
        s = checkTime(s); // add a leading zero if it's single digit
        document.querySelector('.count').innerHTML = m + ":" + s;// update the element where the timer will appear
        var t = setTimeout(startTimeCounter, 500); // set a timeout to update the timer
    } else {
        startTime = Math.floor(Date.now() / 1000);
        localStorage.setItem("startTime", startTime);
    }
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;

}



