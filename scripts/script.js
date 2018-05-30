console.log("Welcome to the Distort application.");

/*  ______
    These are some regular expressions stored as variables.
    Path coordinates contain a lot of non-numeric characters.
    These help in finding/targeting them.
    ______*/

const letters = /[a-zA-Z]/
const spacers = /\s{2,}/
const space = /\s/
const dash = /[-]/
const deci = /[.]/
const dashDeci = /[.-]/

/* 	______
    userVariance will be defined via input by the user in the future.
    Feel free to edit the value for greater or smaller changes in shape distortion.
    ______*/

let userVariance = 50;
let userInput = 3;
let numDistort = Math.floor(Math.random() * userVariance + 1);
let counter = 0;
let iRay = [];

/*  ______
    User control functions.
    ______*/

    function userI() {
        let userX = document.getElementById("user-input");
        userInput = parseInt(userX.value);
    }

    function mild() {
        userVariance = 25;
        mildAdd.classList.add('active-variance');
        mediumAdd.classList.remove('active-variance');
        extremeAdd.classList.remove('active-variance');
    }

    function medium() {
        userVariance = 100;
        mildAdd.classList.remove('active-variance');
        mediumAdd.classList.add('active-variance');
        extremeAdd.classList.remove('active-variance');
    }

    function extreme() {
        userVariance = 500;
        mildAdd.classList.remove('active-variance');
        mediumAdd.classList.remove('active-variance');
        extremeAdd.classList.add('active-variance');
    }

/* 	______
    Cleaner() is a callback function to be used with the .forEach() method.
    It removes any chained white-space characters.
    ______*/

function cleaner(coord, i, path) {
    if (path[i].match(spacers)) {
        let tempPath = path[i].split(spacers);
        for (let j = 0; j < tempPath.length; j++) {
            tempPath[j].trim();
        }
        path[i] = tempPath.join('');
    }

    else if (path[i].match(space)) {
        let tempPathTwo = path[i].split(' ');
        path[i] = tempPathTwo.join('');
    }
}

/*  ______
    Scrambler() is re-used to redefine coordinates with instructions via specific letters.
    ______*/
    
function scrambler(cor, letter) {
    let temp = cor.split(letter);
    for (let j = 0; j < temp.length; j++) {
        if (temp[j].match(letters) === null && temp[j].match(deci)) {
            let tempTwo = temp[j].split('.')
            for (let k = 0; k < tempTwo.length; k++) {
                if (tempTwo[k].match(dash) === null) {
                    tempTwo[k] = parseInt(tempTwo[k]) + Math.floor(Math.random() * numDistort);
                }
            }
            temp[j] = tempTwo.join('.');
        }
        else if (temp[j].match(letters) === null && temp[j].match(dashDeci) === null && temp[j].match('') === null) {
            temp[j] = parseInt(temp[j]) + Math.floor(Math.random() * numDistort);
        }
    }
    cor = temp.join(letter);
}

/*  ______
    Randomizer() is a callback function used as an argument with the .forEach() method.
    
    Current Iteration:
    1. Randomizes any path coordinates that are whole numbers.
    2. Randomizes any values with a dash in it.
    3. Randomizes any decimal values.
    ______*/

function randomizer(coord, i, path) {
    
    // Redefines 'i' as a random index in the 'path' array.
    i = Math.floor(Math.random() * path.length);

    numDistort = Math.floor(Math.random() * userVariance + 1);

    // Check to see if the current coordinate has been iterated over.
    // If so, randomize 'i'. If not, .push() it into the iRay array.
    if (iRay.includes(i)) {
        i = Math.floor(Math.random() * path.length);
    } else {
        iRay.push(i);
    }

    // Targets values with any dashes in them.
    if (path[i].match(dash)) {
        let tempArr = path[i].split('-');
        for (let j = 0; j < tempArr.length; j++) {
            if (path[i].match(deci) && path[i].match(letters) === null && path[i].match(dash) === null) {
                let temp = path[i].split('.');
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = parseInt(temp[j]) + Math.floor(Math.random() * numDistort / 2);
                }
                path[i] = temp.join('.');
            }
            else if (path[i].match(letters) === null && path[i].match(dashDeci) === null) {
                path[i] = parseInt(path[i]) + Math.floor(Math.random() * numDistort);
                path[i] = path[i].toString();
            }
        }
        path[i] = tempArr.join('-');
    }
    
    // Target coordinates with letter 's'.
    if (path[i].match('s')) {
        scrambler(coord, 's');
    }

    // Target coordinates with letter 'c'.
    if (coord.match('c')) {
        scrambler(coord, 'c');
    }

    // Target coordinates with letter 'l'.
    if (coord.match('l')) {
        scrambler(coord, 'l');
    }

    // Target coordinates with letter 'h'.
    if (coord.match('h')) {
        scrambler(coord, 'h');
    }

    // Target coordinates with letter 'v'.
    if (coord.match('v')) {
        scrambler(coord, 'v');
    }

    // Target coordinates with letter 'z'.
    if (coord.match('z')) {
        scrambler(coord, 'z');
    }

    // Targets values with JUST decimals in them.
    else if (path[i].match(deci) && path[i].match(letters) === null && path[i].match(dash) === null) {
        let temp = path[i].split('.');
        for (let j = 0; j < temp.length; j++) {
            temp[j] = parseInt(temp[j]) + Math.floor(Math.random() * numDistort / 2);
        }
        path[i] = temp.join('.');
    }

    // Targets whole numbers.
    else if (path[i].match(letters) === null && path[i].match(dashDeci) === null) {
        path[i] = parseInt(path[i]) + Math.floor(Math.random() * numDistort);
        path[i] = path[i].toString();
    }

    // Notch the counter up by one and check to see if it's greater than the userInput.
    // If so, end the iterator.
    counter++
    if (counter > userInput) {
        return path[i];
    }

}