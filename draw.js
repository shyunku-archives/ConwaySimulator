let cv, c;

let horizontalNum = 300;
let verticalNum = 300;
let padding = 30;

let matrix = [];
let generation = 0;

let period = 0;
let thread = null;

$(() => {
    let canvasObject, canvasWrapper;
    canvasWrapper = $('#canvas_wrapper');
    canvasObject = document.getElementById("main_canvas");

    cv = new Canvas(canvasObject, canvasWrapper);
    c = cv.context;

    matrix = initMatrix();
    start();

    draw();
    setInterval(draw);
});

function draw(){
    c.fillStyle = 'black';
    c.fillRect(0, 0, cv.width, cv.height);

    c.fillStyle = 'white';

    let boxPadX = (cv.width - 2 * padding)/(3 * horizontalNum - 1);
    let boxPadY = (cv.height - 2 * padding)/(3 * verticalNum - 1);
    let boxWidth = 2 * boxPadX;
    let boxHeight = 2 * boxPadY;

    for(let i=0; i<verticalNum; i++){
        for(let j=0; j<horizontalNum; j++){
            c.fillStyle = matrix[i][j] ? 'white' : '#101010';

            c.fillRect(padding + i * (boxWidth + boxPadX), padding + j * (boxHeight + boxPadY), boxWidth, boxHeight);
        }
    }

    c.fillStyle = 'white';
    c.fillText("Generation: " + generation, 10, 15);
}

function initMatrix(){
    mat = [];
    for(let i=0; i<verticalNum; i++){
        let horMat = [];
        for(let j=0;j<horizontalNum; j++){ 
            horMat.push(Math.random() < 0.06);
        }
        mat.push(horMat);
    }

    return mat;
}

function start(){
    thread = setInterval(() => {
        // calculation
        generation++;

        let newMatrix = initMatrix();
        let changed = false;

        for(let i=0; i<verticalNum; i++){
            for(let j=0; j<horizontalNum; j++){
                let sum = getValue(matrix, i-1, j) + getValue(matrix, i+1, j) + getValue(matrix, i, j-1) + getValue(matrix, i, j+1);

                let cnt = 0;
                for(let k=-1; k<=1; k++){
                    for(let l=-1; l<=1; l++){
                        if(k === 0 && l === 0)continue;
                        let ni = i + k;
                        let nj = j + l;
                        cnt += getValue(matrix, ni, nj) ? 1 : 0;
                    }
                }

                if(matrix[i][j] === false && cnt === 3){
                    newMatrix[i][j] = true;
                }else if(matrix[i][j] === true && cnt === 2 || cnt === 3){
                    newMatrix[i][j] = true;
                }else{
                    newMatrix[i][j] = false;
                }

                // if((getValue(matrix, i-1, j+1) === false || getValue(matrix, i+1, j-1) === false) && cnt === 3){
                //     newMatrix[i][j] = true;
                // }
                // else if((getValue(matrix, i+1, j+1) === false || getValue(matrix, i-1, j-1) === false) && cnt === 3){
                //     newMatrix[i][j] = true;
                // }
                // else if(sum === 3 || (sum === 4 && cnt === 5)){
                //     newMatrix[i][j] = true;
                // }
                // else{
                //     newMatrix[i][j] = false;
                // }

                // if(cnt === 3 || cnt === 5){
                //     newMatrix[i][j] = true;
                // }
                // else if(getValue(matrix, i-sum, j+cnt) && getValue(matrix, i+cnt, j-sum)){
                //     newMatrix[i][j] = true;
                // }
                // else if(getValue(matrix, i+cnt, j-sum) && getValue(matrix, i-sum, j+cnt)){
                //     newMatrix[i][j] = true;
                // }
                // else if(sum === 3 && cnt === 5){
                //     newMatrix[i][j] = true;
                // }
                // else{
                //     newMatrix[i][j] = false;
                // }

                // if(matrix[i][j] !== newMatrix[i][j]) changed = true;
            }
        }

        // console.log(changed);
        // if(!changed) stop();
        matrix = Object.assign([], newMatrix);
    }, period);
}

function stop(){
    clearInterval(thread);
}

function init(){
}

function getValue(mat, x, y){
    if(mat[x] === undefined) return false;
    if(mat[x][y] === undefined) return false;
    return mat[x][y];
}