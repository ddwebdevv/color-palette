const mPart = document.querySelector('#countColors');
const shSelect = document.querySelector('#numShades');
const colSelect = document.querySelector('#numColors');
let inputArr = []; //for input color array
let array = []; 
let current = []; //array of inputs which we will change colors depending on settings


//creating palette elements
function generate() {
    mPart.innerHTML = '';
    inputArr = [];
    let htmlP = '';
    for (let i = 0; i < colSelect.value; i++) {
        htmlP += '<div class="row justify-content-center">';
        for (let k = 0; k < shSelect.value; k++) {
            htmlP += `<div class="col col-sm-2 mx-xs-2 p-2">                
            <div class="round1 input-group mx-auto"><input type="color" class="round invis form-control color${i}" value="#0000ff" data-colorn="${i}" data-indexn="${k}"></div>
            <label  class="mt-1 col-form-label clab">#0000ff</label>
            <label  class="mt-1 col-form-label clab">rgb(0, 0, 255)</label>
        </div>`; 
        };
        htmlP +='</div>';     
    }
    mPart.innerHTML = htmlP;    
    inputArr = document.querySelectorAll('input[type=color]');
    array = Array.from(inputArr);   //to convert inputArr to regular array so we can use forEach etc
    inputArr.forEach( input => {
        input.addEventListener('click', colorizeInit);
    });        
}

  // when click on input - going to put items in current array depending on settings
function colorizeInit(e){
    current.forEach(input => {
        input.removeEventListener('change', colorize);
        input.removeEventListener('input', colorize);
    });    
    if (document.querySelector('#sameColorRight').checked && document.querySelector('#sameColorLeft').checked) {
        current = array.filter( (input) => {
            if (input.dataset.colorn === e.target.dataset.colorn) {
                return true;
            }
        });
    } else if  (document.querySelector('#sameColorRight').checked)  {
        current = array.filter( (input) => {
            if (input.dataset.colorn === e.target.dataset.colorn && input.dataset.indexn >= e.target.dataset.indexn) {
                return true;
            }
        }); 
    } else if (document.querySelector('#sameColorLeft').checked){
        current = array.filter( (input) => {
            if (input.dataset.colorn === e.target.dataset.colorn && input.dataset.indexn <= e.target.dataset.indexn) {
                return true;
            }
        });
    }else {
        current = array.filter( (input) => {   //need to use it here because I want to work with regular array so I can use forEach on it
            if (input.dataset.colorn === e.target.dataset.colorn && input.dataset.indexn === e.target.dataset.indexn) {
                return true;
            }
        });
    }

    current.forEach(input => {
        input.addEventListener('change', colorize);
        input.addEventListener('input', colorize);
    }); 
}

//main function for changin colors of input color, div, and text in labels
function colorize(e) {
    current.forEach(input => {   
        input.value = e.target.value;//need to change color of other inputs color
        input.parentNode.style.backgroundColor = e.target.value;
        input.parentNode.nextElementSibling.innerText = e.target.value;
        input.parentNode.nextElementSibling.nextElementSibling.innerText = input.parentNode.style.backgroundColor;
    }); 
}   

//link home
function returnHome() {
    window.location = 'home.html';
}

document.querySelector('#goback').addEventListener('click', returnHome)
document.querySelector('#generate').addEventListener('click', generate);