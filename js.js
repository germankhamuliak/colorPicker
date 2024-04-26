const base = document.querySelector('.base');
const mainColor = document.querySelector('.main-color');
const piker = document.querySelector('.base .piker');
const inputs = document.querySelectorAll('.color-control input');
const inputsControl = document.querySelectorAll('.control input');
const linePiker = document.querySelector('.line .piker');
const line = document.querySelector('.line');
const rangeWidth = line.getBoundingClientRect().width; 
const rangeScale = 1530 / rangeWidth; 
const R = document.querySelector('#R');
const G = document.querySelector('#G');
const B = document.querySelector('#B');
const opacityInput = document.querySelector('.opacity input');
const opacity = document.querySelector('#opacity');
const R2 = document.querySelector('#R2');
const G2 = document.querySelector('#G2');
const B2 = document.querySelector('#B2');
let white = 0;
let black = 0;
line.value = 0;


base.addEventListener('mousedown', () => { 
    function onMouseMove(e) { 
        colorChang2(e);
        moveBase(e.clientY, e.clientX);
    } 
    document.addEventListener('mousemove', onMouseMove); 
    document.onmouseup = () => { 
        document.removeEventListener('mousemove', onMouseMove); 
    }; 
}); 

function colorChang2(e) {
    const baseRect = base.getBoundingClientRect(); 
    let shiftX = e.clientX - baseRect.left; 
    black = (255 - e.clientY + 11);
    white = (255 - Math.round((e.clientX - (e.clientX - shiftX))/2)) ;
    let max = (white / 255).toFixed(2);
    let min = (black / 255).toFixed(2);
    contrastColor(max, min,line.value)
}


function moveBase(clientY, clientX) { 
    if (clientY - base.getBoundingClientRect().top  < 0 || clientY - base.getBoundingClientRect().top  > base.getBoundingClientRect().height) { 
        if (clientY - base.getBoundingClientRect().top - 11 < 0) { 
            piker.style.top = - 11 + 'px';  
        } else { 
            piker.style.top = base.getBoundingClientRect().height - 11 + 'px'; 
        } 
    } else { 
        piker.style.top = clientY - base.getBoundingClientRect().top - 11 + 'px'; 
    } 
    if (clientX - base.getBoundingClientRect().left < 0 || clientX - base.getBoundingClientRect().left > base.getBoundingClientRect().width) { 
        if (clientX - base.getBoundingClientRect().left - 11 < 0) { 
            piker.style.left = - 11 + 'px'; 
        } else { 
            piker.style.left = base.getBoundingClientRect().width - 11 + 'px'; 
        } 
    } else { 
        piker.style.left = clientX - base.getBoundingClientRect().left - 11 + 'px'; 
    } 
};

line.addEventListener('click', (e) => { 
    linePiker.style.left = e.clientX + 'px'; 
    line.value = ((e.clientX) * rangeScale).toFixed(0); 
    rangeChangeColor(line.value); 
    changeColor(); 
}); 
linePiker.addEventListener('mousedown', (e) => { 
    const rangePickerRect = linePiker.getBoundingClientRect(); 
    let shiftX = e.clientX - rangePickerRect.left; 
    moveAt(e.clientX, shiftX); 
    function onMouseMove(e) { 
        moveAt(e.clientX, shiftX); 
    } 
    document.addEventListener('mousemove', onMouseMove); 
    document.onmouseup = () => { 
        document.removeEventListener('mousemove', onMouseMove); 
    }; 
});



function moveAt(clientX, shiftX) { 
    if (clientX - shiftX < 0 || clientX - shiftX > rangeWidth) { 
        if (clientX - shiftX < 0) { 
            linePiker.style.left = 0 + 'px'; 
            line.value = 0; 
            rangeChangeColor(0); 
            changeColor(); 
        } else { 
            linePiker.style.left = rangeWidth - linePiker.getBoundingClientRect().width  + 'px'; 
            line.value = rangeWidth * rangeScale; 
            rangeChangeColor(1530); 
            changeColor(); 
        } 
    } else { 
        linePiker.style.left = clientX - shiftX - 8 + 'px'; 
        line.value = ((clientX - shiftX) * rangeScale).toFixed(0); 
        rangeChangeColor(line.value); 
        changeColor(); 
    } 
};


opacityInput.addEventListener('input', () => {
    opacity.value = opacityInput.value;
    mainColor.style.backgroundColor = `rgb(${R2.value},${G2.value},${B2.value},${opacityInput.value})`;
});


function rangeChangeColor(value) { 
    if (value <= 255) { 
    R.value = 255; 
    G.value = value; 
    B.value = 0; 
    } ;
    if (value > 255 && value <= 510) { 
    R.value = 255 - (value - 255); 
    G.value = 255; 
    B.value = 0; 
    } 
    if (value > 510 && value <= 765) { 
    R.value = 0; 
    G.value = 255; 
    B.value = value - 510; 
    } 
    if (value > 765 && value <= 1020) { 
    R.value = 0; 
    G.value = 255 - (value - 765); 
    B.value = 255; 
    } 
    if (value > 1020 && value <= 1275) { 
    R.value = value - 1020; 
    G.value = 0; 
    B.value = 255; 
    } 
    if (value > 1275 && value <= 1530) { 
    R.value = 255; 
    G.value = 0; 
    B.value = 255 - (value - 1275); 
    } 
    rRgGbB();
}; 

function changeColor() {
    base.style.backgroundColor = `rgb(${R.value},${G.value},${B.value})`;
    mainColor.style.backgroundColor = `rgb(${R.value},${G.value},${B.value},${opacityInput.value})`;
    linePiker.style.backgroundColor = `rgb(${R.value},${G.value},${B.value})`
    piker.style.backgroundColor = `rgb(${R2.value},${G2.value},${B2.value},0)`;
}


function contrastColor(max, min,value) {
    if (max > 1) {
        max = 1
    } else if (max < 0) {
        max = 0
    }
    if (min > 1) {
        min = 1
    } else if (min < 0) {
        min = 0
    }
    if (value <= 255) { 
        R2.value = Math.round(R.value * min); 
        G2.value = Math.round((((255 - Number(G.value)) * max) * min) + Number(G.value * min));
        B2.value = Math.round(((B.value + (255 - B.value)) * max) * min); 
    }
    if (value > 255 && value <= 510) { 
        R2.value = Math.round((((255 - Number(R.value)) * max) * min) + Number(R.value * min));  
        G2.value = Math.round(G.value * min);
        B2.value = Math.round(((B.value + (255 - B.value)) * max) * min); 
    }
    if (value > 510 && value <= 765) { 
        R2.value = Math.round(((R.value + (255 - R.value)) * max) * min);  
        G2.value = Math.round(G.value * min);
        B2.value = Math.round((((255 - Number(B.value)) * max) * min) + Number(B.value * min));   
        } 
    if (value > 765 && value <= 1020) { 
        R2.value = Math.round(((R.value + (255 - R.value)) * max) * min);  
        G2.value = Math.round((((255 - Number(G.value)) * max) * min) + Number(G.value * min));
        B2.value = Math.round(B.value * min);
    } 
    if (value > 1020 && value <= 1275) { 
        R2.value = Math.round((((255 - Number(R.value)) * max) * min) + Number(R.value * min));  
        G2.value = Math.round(((G.value + (255 - G.value)) * max) * min);
        B2.value = Math.round(B.value * min); 
    } 
    if (value > 1275 && value <= 1530) { 
        R2.value = Math.round(R.value * min); 
        G2.value = Math.round(((G.value + (255 - G.value)) * max) * min);
        B2.value = Math.round((((255 - Number(B.value)) * max) * min) + Number(B.value * min));
    }
    if (R2.value > 255 ) {
        R2.value = 255
    } 
    if (G2.value > 255 ) {
        G2.value = 255
    } 
    if (B2.value > 255 ) {
        B2.value = 255
    } 
    if (R2.value < 0 ) {
        R2.value = 0
    } 
    if (G2.value < 0 ) {
        G2.value = 0
    } 
    if (B2.value < 0 ) {
        B2.value = 0
    } 
    mainColor.style.backgroundColor = `rgb(${R2.value},${G2.value},${B2.value},${opacityInput.value})`;
    piker.style.backgroundColor = `rgb(${R2.value},${G2.value},${B2.value})`;
}

function linePikerPosition () {
    let Rn = Number(R.value);
    let Gn = Number(G.value);
    let Bn = Number(B.value);
    let min = 255 - Math.max(Rn, Gn, Bn);
    let max = 0;
    if (Rn >= Gn > Bn  ) {
        line.value = G2;
        max = 510 - (510 - Bn);
    } else if (  Gn >= Rn > Bn ) {
        line.value = 255 + (255 - R2);
        max = 510 - (510 - Bn);
    } else if ( Gn >= Bn > Rn  ) {
        line.value = 510 + B2;
        max = 510 - (510 - Rn);
    } else if (Bn >= Gn > Rn ) {
        line.value = 765 + B2;
        max = 510 - (510 - Rn);
    } else if (Bn >= Rn > Gn ) {
        line.value = 1020 + (255 - G2);
        max = 510 - (510 - Gn);
    } else if (Rn >= Bn > Gn  ) {
        line.value = 1275 + (255 - B2);
        max = 510 - (510 - Gn);
    }
    linePiker.style.left = line.value/2 + 'px';
    base.style.backgroundColor = `rgb(${R2.value},${G2.value},${B2.value})`;
    mainColor.style.backgroundColor = `rgb(${R2.value},${G2.value},${B2.value},${opacityInput.value})`;
    linePiker.style.backgroundColor = `rgb(${R2.value},${G2.value},${B2.value})`
    piker.style.left = 510 - max - 11 + 'px';
    piker.style.top = min + 'px';
}

function rRgGbB () {
    R2.value = R.value;
    G2.value = G.value;
    B2.value = B.value;
}

inputsControl.forEach(input => {
    input.addEventListener('input', () => {
        inputCorrect(input);
    });
});

function inputCorrect(input) {
    if (input.value > 255) {
        input.value = 255;
    }
    if (input.value < 0) {
        input.value = 0;
    }
    if (!+input.value && input.value != 0) {
        input.value = input.value.slice(0, -1);
    }
    if (input.value.length > 1 && input.value.slice(0, 1) == 0) {
        input.value = input.value.slice(1);
    }
    if (input.value == "") {
        input.value = 0;
    }
}