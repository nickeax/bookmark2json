const output = document.querySelector("#output");
const clearButton = document.querySelector("#clearButton");
const addButton = document.querySelector("#addButton");
const saveButton = document.querySelector("#saveButton");
const textArea = document.querySelector('#textArea');
const clipboard = document.querySelector("#clipboard");

clipboard.addEventListener("click", copyToClipboard);
clearButton.addEventListener('click', clearAll);
const boundarySymbol = '|';

saveButton.addEventListener('click', process);

textArea.addEventListener('keyup', process);

function clearAll() {
    textArea.value = "";
    output.innerHTML = "";
    bookmarksArray = [];
};

function copyToClipboard() {
    var range = document.createRange();
    range.selectNode(output);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}

function process() {
    let bookmarksArray = [];
    let tmpJson = "";
    let tmpArr = textArea.value.split('\n');

    tmpArr.forEach(x => {
        let tempWordsArr = [];
        tempWordsArr = x.split(boundarySymbol);
        tmpJson = `{"name": "${tempWordsArr[0]}", "url": "${tempWordsArr[1]}", "path": "${tempWordsArr[2]}"}`;
        bookmarksArray.push(tmpJson);
        tmpJson = "";
    });

    displayBookmarks(bookmarksArray);
}

function displayBookmarks(arr) {
    output.innerHTML = "";
    arr.forEach(x => {
        let additions = arr.length > 0 ? ",<br>" : "";
        output.innerHTML += x + additions;
    })
}
