
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function playSound() {
    var sound = new Audio("sound/pop.mp3");
    sound.play();
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsSum++;
        }
    }
    return neighborsSum;
}

function countWordApperance(txt) {
    var words = txt.split(' ');
    var wordCountMap = {} // key: word, value: count

    for (var i = 0; i < words.length; i++) {
        var word = words[i]
        // var count = (wordCountMap[word])? wordCountMap[word]+1 : 1;
        var count = wordCountMap[word] || 0;
        wordCountMap[word] = ++count;

    }
    return wordCountMap;
}


function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}


function createBalloon() {
    return {
        id: gNextId++,
        bottom: 0,
        speed: 10,
        isPopped: false,
        color: getRandomColor()
    }
}

// create items in an array:
function createBalloons() {
    var balloons = []
    for (var i = 0; i < currBallon; i++) {
        balloons.push(createBalloon())
    }
    return balloons
}

function sumCol(squareMat, colIdx) {
    var sum = 0;
    for (var i = 0; i < squareMat.length; i++) {
        sum += squareMat[i][colIdx]
    }
    return sum
};

function sumRow(squareMat, rowIdx) {
    var rowSum = 0;
    for (var j = 0; j < squareMat.length; j++) {

        rowSum += squareMat[rowIdx][j]
    }
    return rowSum
}

function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;


    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            moveTo(i + 1, j);
            break;

    }

}

function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

