function rainbow(lightness) {
    // 30 random hues with step of 12 degrees
    var hue = Math.floor(Math.random() * 30) * 12;

    return `hsl(${hue}, 90%, ${lightness}%)`;
}

function createBlockDiv(){
    let newDiv = document.createElement('div');
    newDiv.classList.add('block');
    let lightness = 60;
    let reductionAmt = 6 //10% of initial lightness 
    newDiv.addEventListener('mouseover', function()  {
        this.style.backgroundColor = rainbow(lightness);
        lightness = Math.max(lightness - reductionAmt, 0);
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

const resizeButton = document.querySelector('button.resize');
resizeButton.addEventListener('click', function() {
    let minGridSize = 1;
    let maxGridSize = 100;
    let input = prompt(`Enter a new grid size [${minGridSize}-${maxGridSize}]: `);
    let newGridSize = parseInt(input, 10);

    if (isNaN(newGridSize) || newGridSize < 1 || newGridSize > 100) {
        alert(`${input} is not a valid input. Must be a number between ${minGridSize} and ${maxGridSize}.`)
        return 
    }

    container.replaceChildren(...createGrid(newGridSize));
})