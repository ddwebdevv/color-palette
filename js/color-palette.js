const mPart = document.querySelector('#countColors');
const shSelect = document.querySelector('#numShades');
const colSelect = document.querySelector('#numColors');
let inputArr = []; //for input color array
let array = []; //to convert inputArr to regular array so we can use forEach etc

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
    array = Array.from(inputArr); 
    colorizeInit();    
}

//getting settings for what elemets user want to change
//activating on generate button click and changes in chexboxes
function colorizeInit(){
    if (document.querySelector('#sameColorChild').checked && !document.querySelector('#sameColorParent').checked)  {
        inputArr.forEach(input => { 
            input.removeEventListener('change', colorizeAllparent);
            input.removeEventListener('input', colorizeAllparent);
            input.removeEventListener('change', colorizeAll);
            input.removeEventListener('input', colorizeAll);
            input.removeEventListener('change', colorizeSingle);
            input.removeEventListener('input', colorizeSingle);
            input.addEventListener('change', colorizeAllchild);
            input.addEventListener('input', colorizeAllchild);
        });
    } else if (document.querySelector('#sameColorChild').checked && document.querySelector('#sameColorParent').checked) {
        inputArr.forEach(input => {             
            input.removeEventListener('change', colorizeAllparent);
            input.removeEventListener('input', colorizeAllparent);
            input.removeEventListener('change', colorizeAllchild);
            input.removeEventListener('input', colorizeAllchild);
            input.removeEventListener('change', colorizeSingle);
            input.removeEventListener('input', colorizeSingle);
            input.addEventListener('change', colorizeAll);
            input.addEventListener('input', colorizeAll);
        });
    } else if (!document.querySelector('#sameColorChild').checked && document.querySelector('#sameColorParent').checked){
        inputArr.forEach(input => {             
            input.removeEventListener('change', colorizeAll);
            input.removeEventListener('input', colorizeAll);
            input.removeEventListener('change', colorizeAllchild);
            input.removeEventListener('input', colorizeAllchild);
            input.removeEventListener('change', colorizeSingle);
            input.removeEventListener('input', colorizeSingle);
            input.addEventListener('change', colorizeAllparent);
            input.addEventListener('input', colorizeAllparent);
        });
    }else if (!document.querySelector('#sameColorChild').checked && !document.querySelector('#sameColorParent').checked) {
        inputArr.forEach(input => {             
            input.removeEventListener('change', colorizeAllparent);
            input.removeEventListener('input', colorizeAllparent);
            input.removeEventListener('change', colorizeAllchild);
            input.removeEventListener('input', colorizeAllchild);
            input.removeEventListener('change', colorizeAll);
            input.removeEventListener('input', colorizeAll);
            input.addEventListener('change', colorizeSingle);
            input.addEventListener('input', colorizeSingle);
        });
    }
}

//change color of single element
function colorizeSingle(e){
    colorize(e.target, e.target.value);
}

//main function for changin colors of input color, div, and text in labels
function colorize(target, color) {
    target.value = color;//need to change color of other inputs color
    target.parentNode.style.backgroundColor = color;
    target.parentNode.nextElementSibling.innerText = color;
    target.parentNode.nextElementSibling.nextElementSibling.innerText = target.parentNode.style.backgroundColor;
  
}

//change color of all elements to the right
function colorizeAllchild(e){  
    const current = array.filter( (input) => {
        if (input.dataset.colorn === e.target.dataset.colorn && input.dataset.indexn >= e.target.dataset.indexn) {
            return true;
        }
    });    
    current.forEach(item => {
        colorize(item, e.target.value);
    });
}

//change color of all elements to the left
function colorizeAllparent(e){
    const current = array.filter( (input) => {
        if (input.dataset.colorn === e.target.dataset.colorn && input.dataset.indexn <= e.target.dataset.indexn) {
            return true;
        }
    });    
    current.forEach(item => {
        colorize(item, e.target.value);
    });
}

//change color of all elements in the row
function colorizeAll(e){ 
    const current = array.filter( (input) => {
        if (input.dataset.colorn === e.target.dataset.colorn) {
            return true;
        }
    });    
    current.forEach(item => {
        colorize(item, e.target.value);
    });
}

//link home
function returnHome() {
    window.location = 'home.html';
}


document.querySelector('#goback').addEventListener('click', returnHome)
document.querySelector('#sameColorParent').addEventListener('change', colorizeInit);
document.querySelector('#sameColorChild').addEventListener('change', colorizeInit);
document.querySelector('#generate').addEventListener('click', generate);