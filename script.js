
function createBlockDiv(){
    let newDiv = document.createElement('div');
    newDiv.classList.add('block');
    newDiv.addEventListener('mouseover', function()  {
        this.classList.add('red-element');
    })
    return newDiv;
}

function createRowDiv() {
    let newDiv = document.createElement('div');
    newDiv.classList.add('row');
    return newDiv;
}

/**
 * Creates an array of div elements.
 * @param {number} num - The number of divs to create.
 * @returns {HTMLDivElement[]} An array of div elements.
 */
function createDivs(num, divCreator) {
    return Array.from({length: num}, () => divCreator()); 
}

/**
 * Creates num divs and appends num divs to each, producing n^2 total nested divs 
 * @param {number} num - The length of the grid to create.
 * @returns {HTMLDivElement[]} An array of div elements.
 */
function createGrid(num) {
    let rows = createDivs(num, createRowDiv);
    rows.forEach(div => div.append(...createDivs(num, createBlockDiv)));
    return rows;
}

const container = document.querySelector('.container');



container.append(...createGrid(16));

