let mat = [], isVisited = [];
let ans = [], i = 0;
let rowCount, colCount;


function initiate_Board() {
    const d = prompt("Enter the no of rows and cols (ex. 10 10)");
    let dimensions = d.split(" ");
    rowCount = dimensions[0];
    colCount = dimensions[1];
    if (document.getElementsByClassName('board')[0].innerHTML == "") {
        let tab = document.createElement("table");
        tab.classList.add("plane");
        tab.style.height = "500px";
        tab.style.width = "1200px";
        tab.style.backgroundColor = "white";
        for (let i = 0; i < rowCount; i++) {
            let row = document.createElement("tr");
            row.classList.add("tr");
            mat[i] = [];
            isVisited[i] = [];
            for (k = 0; k < colCount; k++) {
                mat[i][k] = 1;
                isVisited[i][k] = false;
                let col = document.createElement("td");
                col.classList.add("square");
                col.style.height = "25px";
                col.style.width = "25px";
                col.style.border = "1px solid black";
                col.style.textAlign = "center";
                row.appendChild(col);
            }
            tab.appendChild(row);
        }
        document.getElementsByClassName("board")[0].appendChild(tab);
    }
}

function removeEvent() {
    i = 1;
    let r = document.getElementsByClassName("tr")[0];
    let ele = r.children[0];
    document.getElementsByClassName("paths")[0].style.display = "block";
    document.getElementsByClassName("btn3")[0].disabled = true;
    document.getElementsByClassName("btn2")[0].disabled = true;
    if (isSafe(0,0)) {
        if(!isSafe(rowCount-1, colCount-1)){
            document.getElementsByClassName("content")[0].innerHTML += "The goal block is blocked so no path possible.";
            document.getElementsByClassName("btn3")[0].disabled = false;
            document.getElementsByClassName("btn2")[0].disabled = false;
        }
        else{
            ele.classList.add("startNode");
            var c = findPaths(0, 0, ans, "", "");
            c.then(function () {
                document.getElementsByClassName("content")[0].innerHTML += "<hr>All paths are printed."; 
                document.getElementsByClassName("btn3")[0].disabled = false;
                document.getElementsByClassName("btn2")[0].disabled = false;
            });
        }
    }
    else{
        document.getElementsByClassName("content")[0].innerHTML += "The initial block at row 0 and column 0 is blocked so no path possible.";
        document.getElementsByClassName("btn3")[0].disabled = false;
        document.getElementsByClassName("btn2")[0].disabled = false;
    }
}

function addEvent() {
    document.getElementsByClassName("plane")[0].addEventListener('mouseover', changeColor);
    document.getElementsByClassName("plane")[0].addEventListener('mousedown', changeBlock);
}

function changeColor(e) {
    if (e.shiftKey) {
        x = event.clientX;
        y = event.clientY;
        el = document.elementFromPoint(x, y);
        if (el.className == "square") {
            el.style.backgroundColor = "black";
            let col = Array.from(el.parentNode.children).indexOf(el);
            let row = Array.from(el.parentNode.parentNode.children).indexOf(el.parentNode);
            mat[row][col] = 0;
        }
    }
}
function changeBlock(e) {
    x = event.clientX;
    y = event.clientY;
    el = document.elementFromPoint(x, y);
    if (el.className == "square") {
        el.style.backgroundColor = "black";
        let col = Array.from(el.parentNode.children).indexOf(el);
        let row = Array.from(el.parentNode.parentNode.children).indexOf(el.parentNode);
        mat[row][col] = 0;
    }
}
function printMat() {
    let paths = document.getElementsByClassName("content")[0];
    paths.innerHTML = "Matrix of Maze<br>";
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            paths.innerHTML += mat[i][j] + " ";
        }
        paths.innerHTML += "<br>";
    }
}

async function findPaths(x, y, ans, path, content) {
    await wait(100);
    var c = 0;
    let r = document.getElementsByClassName("tr")[x];
    let ele = r.children[y];
    // ele.style.backgroundColor = "red";
    ele.classList.add("anim");
    ele.innerHTML = content;

    if (x == rowCount - 1 && y == colCount - 1) {
        ans.push(path);
        ele.innerHTML = "";
        // ele.innerHTML = "&#x2713;";
        ele.style.background = "url('./images/goal.webp')";
        await wait(1000);
        document.getElementsByClassName("content")[0].innerHTML += i++ + ") " + path + "<br>";
        changeXYcolor(x, y, "white");
        return 1;
    }

    isVisited[x][y] = true;
    // D
    let newX = x + 1;
    let newY = y;
    if (isSafe(newX, newY)) {
        path += "D";
        c = await findPaths(newX, newY, ans, path, "&#129147;");
        path = path.slice(0, -1);
        while (c != 1) {
            await wait(100);
        }
    }

    // L
    newX = x;
    newY = y - 1;
    if (isSafe(newX, newY)) {
        path += "L";
        c = await findPaths(newX, newY, ans, path, "&#129144;");
        path = path.slice(0, -1);
        while (c != 1) {
            await wait(100);
        }
    }

    // R
    newX = x;
    newY = y + 1;
    if (isSafe(newX, newY)) {
        path += "R";
        c = await findPaths(newX, newY, ans, path, "&#129146;");
        path = path.slice(0, -1);
        while (c != 1) {
            await wait(100);
        }
    }

    // U
    newX = x - 1;
    newY = y;
    if (isSafe(newX, newY)) {
        path += "U";
        c = await findPaths(newX, newY, ans, path, "&#129145;");
        path = path.slice(0, -1);
        while (c != 1) {
            await wait(100);
        }
    }
    await wait(100);
    isVisited[x][y] = false;
    changeXYcolor(x, y, "white");
    ele.innerHTML = "";
    return 1;
}

function isSafe(x, y) {
    if ((x >= 0 && x < rowCount) && (y >= 0 && y < colCount) && isVisited[x][y] == false && mat[x][y] == 1) {
        return 1;
    }
    return 0;
}

function changeXYcolor(x, y, color) {
    let r = document.getElementsByClassName("tr")[x];
    let ele = r.children[y];
    ele.style.backgroundColor = color;
    ele.classList.remove("anim");
}

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('')
        }, ms);
    })
}