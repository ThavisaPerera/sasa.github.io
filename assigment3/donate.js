const payForm = document.getElementById("payForm");
const amount = document.getElementById("amount");
const cardNo = document.getElementById("cardNo");
const owner = document.getElementById("owner")
const cvv = document.getElementById("cvv");
const months = document.getElementById("months");
const years = document.getElementById("years");
const btnPay = document.getElementById("pay");
const btnOk = document.getElementById("ok");


window.addEventListener("load", initial)
function initial() {
    amount.value = "1000";
    months.value = "Dec";
    years.value = "2025";
}

payForm.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();

});

let msg = document.getElementById("msg");


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}


const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}


const validateInputs = () => {
    const cardNoValue = cardNo.value.trim();
    const ownerValue = owner.value.trim();
    const cvvValue = cvv.value.trim();
    let popup = document.getElementById("popup")

    if (cardNoValue === '') {
        setError(cardNo, 'Card number is required');
    }
    else if (cardNoValue.length == 16 && /^\d+$/.test(cardNoValue)) {
        setSuccess(cardNo);
    }
    else {
        setError(cardNo, 'Invaild Card number');
    }

    if (ownerValue === '') {
        setError(owner, 'Name is required');
    }
    else {
        setSuccess(owner);
    }

    if (cvvValue === '') {
        setError(cvv, 'CVV is required');
    }
    else if (cvvValue.length == 3 && /^\d+$/.test(cvvValue)) {
        setSuccess(cvv);
    }
    else {
        setError(cvv, 'Invalid CVV');
    }
    if(cardNoValue != '' && cardNoValue.length == 16 && ownerValue != '' && cvvValue != '' && cvvValue.length == 3 && /^\d+$/.test(cvvValue) && /^\d+$/.test(cardNoValue)){
        popup.classList.remove("msg");
        popup.classList.add("openMsg");
    }
    
}

btnOk.addEventListener("click", OK);

function OK(event) {
    popup.classList.remove("openMsg");
    popup.classList.add("msg");
    cardNo.value='';
    owner.value='';
    cvv.value='';
}