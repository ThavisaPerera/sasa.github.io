let cost;
let output;
let cart;
let due;
let timeCost;
let slATik = 0;
let slCTik = 0;
let FATik = 0;
let FCTik = 0;

const ticketsForm = document.getElementById("ticketsForm")
const incrementButton = document.getElementsByClassName("inc");
const decrementButton = document.getElementsByClassName("dec");
const ladult = document.getElementById("ladult");
const lchild = document.getElementById("lchild");
const fadult = document.getElementById("fadult");
const fchild = document.getElementById("fchild");
const optDuration = document.getElementById("duration");
const btnAdd = document.getElementById("add");
const btnPlace = document.getElementById("place");
const txtCart = document.getElementById("cart");
const txtCost = document.getElementById("cost");
const txtOutput = document.getElementById("output");
const btnAddFav = document.getElementById("addfav");
const btnFav = document.getElementById("fav");
const txtfav = document.getElementById("favOrder");
const btnLoyal = document.getElementById("loyal");
const txtLoyal = document.getElementById("loyalPoints");
const txtDate = document.getElementById('selectedDate');

const sladult = 1200;
const slchild = 700;
const foradult = 5500;
const forchild = 2700;

let numTik;
let numPrice;

//loading event

window.addEventListener("load", initial)
function initial() {
    ladult.value = 0;
    lchild.value = 0;
    fadult.value = 0;
    fchild.value = 0;
    numTik = 0;
    cost = 0;
    output = 0;
    cart = 0;
    due = 0;
    timeCost = 0;
}


//calender

const currentDate = new Date();

const minDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

document.getElementById('startDate').min = minDate;

const startDateInput = document.getElementById('startDate');

startDateInput.addEventListener('change', (event) => {

    const selectedDate = event.target.value;

    txtDate.innerHTML = selectedDate;
}
);




//increment
for (let i = 0; i < incrementButton.length; i++) {
    let button = incrementButton[i];
    button.addEventListener('click', function (event) {
        let buttonClicked = event.target;
        //console.log(buttonClicked);
        let input = buttonClicked.parentElement.children[2];
        //console.log(input);
        let inputValue = input.value;
        //console.log(inputValue);
        let newValue = parseInt(inputValue) + 1;
        //console.log(newValue);
        input.value = newValue;

    })


    button.addEventListener('click', function (event) {
        let slA = parseInt(ladult.value);
        let slac = slA * sladult;
        slATik += slA;

        let slC = parseInt(lchild.value);
        let slcc = slC * slchild;
        slCTik += slC;

        let fA = parseInt(fadult.value);
        let fac = fA * foradult;
        FATik += fA;

        let fC = parseInt(fchild.value);
        let fcc = fC * forchild;
        FCTik += fC;

        cart = (slac + slcc + fac + fcc);
        txtCart.innerText = `${ladult.value} SL adult pass, ${lchild.value} SL child pass, ${fadult.value} Foreign adult pass, ${fchild.value} Foreign child pass for duration of ${optDuration.value} cost is RS.${cart + due}`;
    })
}


//decrement
for (let i = 0; i < decrementButton.length; i++) {
    let button = decrementButton[i];
    button.addEventListener('click', function (event) {
        let buttonClicked = event.target;
        //console.log(buttonClicked);
        let input = buttonClicked.parentElement.children[2];
        //console.log(input);
        let inputValue = input.value;
        //console.log(inputValue);
        let newValue = parseInt(inputValue) - 1;
        //console.log(newValue);
        if (newValue >= 0) {
            input.value = newValue;
        }
        else {
            input.value = 0;
            //alert("Can't go below zero");
        }
    })
    button.addEventListener('click', function (event) {
        event.defaultPrevented()
        let slA = parseInt(ladult.value);
        let slac = slA * sladult;
        slATik -= slA;

        let slC = parseInt(lchild.value);
        let slcc = slC * slchild;
        slCTik -= slC;

        let fA = parseInt(fadult.value);
        let fac = fA * foradult;
        FATik -= fA;

        let fC = parseInt(fchild.value);
        let fcc = fC * forchild;
        FCTik -= fC;

        cart = (slac + slcc + fac + fcc);
        txtCart.innerText = `${ladult.value} SL adult pass, ${lchild.value} SL child pass, ${fadult.value} Foreign adult pass, ${fchild.value} Foreign child pass for duration of ${optDuration.value} cost is RS.${cart + due}`;
    })
}

//duration price

optDuration.addEventListener("change", duCost);

function duCost() {
    if (optDuration.value === "3 Hours") {
        due = 0;
    }
    else if (optDuration.value === "Half Day") {
        due = (ladult.value * 350 + lchild.value * 350 + fadult.value * 450 + fchild.value * 450);
    }
    else if (optDuration.value === "Full Day") {
        due = (ladult.value * 600 + lchild.value * 600 + fadult.value * 800 + fchild.value * 800);
    }


    txtCart.innerText = `${ladult.value} SL adult pass, ${lchild.value} SL child pass, ${fadult.value} Foreign adult pass, ${fchild.value} Foreign child pass for duration of ${optDuration.value} cost is RS.${cart + due}`;
}


//add to oder

let totalOder;

btnAdd.addEventListener("click", AddToOrder);

function AddToOrder(event) {
    numTik = slATik + slCTik + FATik + FCTik;
    cost += (cart + due);
    txtCost.innerText = `Total number of tickets orderd is ${numTik} and total cost is RS.${cost}`;;
    console.log(txtCost.innerText)
    cart == 0;
    due == 0;

}

//add to fav

let message;

btnAddFav.addEventListener("click", favourite);

function favourite(event1) {
    message = txtCost.innerText;
    localStorage.setItem('message', JSON.stringify(message));
}

btnFav.addEventListener("click", showfavourite);

function showfavourite(event2) {
    message = JSON.parse(localStorage.getItem('message'));
    txtfav.innerText = message;
console.log(txtCost.value)


}

//loyality points


btnLoyal.addEventListener("click", loyalityPoints);

function loyalityPoints(event1) {
    if (numTik > 3) {

        numPrice = numTik * 15;
        txtLoyal.innerText = `${numPrice} loyalty points`;
        localStorage.setItem('loyalty',txtLoyal.innerText);
    }

    else {
        txtLoyal.innerText = "0 loyalty points";
    }
}


//validate text

const fname = document.getElementById("fname");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const cemail = document.getElementById("cemail");

ticketsForm.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});


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
const vaildEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const vaildCemail = cemail => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(cemail).toLowerCase());
}


const validateInputs = () => {
    const fnameValue = fname.value.trim();
    const emailValue = email.value.trim();
    const cemailValue = cemail.value.trim();
    const mobileValue = mobile.value.trim();

    if (fnameValue === '') {
        setError(fname, 'Name is required');
    }
    else {
        setSuccess(fname);
    }
    if (emailValue === '') {
        setError(email, 'Invalid Email Address');
    }
    else {
        setSuccess(email);
    }
    if (cemailValue === '') {
        setError(cemail, 'confirm your Email Address');
    }
    else if (cemailValue !== emailValue) {
        setError(cemail, "Email Address doesn't match");
    }
    else {
        setSuccess(cemail);
    }

    if (mobileValue === '') {
        setError(mobile, 'Mobile Number is required');
    }
    else if (mobileValue.length == 10 && /^\d+$/.test(mobileValue)) {
        setSuccess(mobile);
    }
    else {
        setError(mobile, 'Error');
    }

    if (txtDate.innerHTML != "" && fnameValue != '' && emailValue != '' && cemailValue != '' && cemailValue == emailValue && mobileValue != '' && mobileValue.length == 10 && /^\d+$/.test(mobileValue) && cost > 0) {
        txtOutput.innerText = `${fname.value} your reservation has been confirmed. The confirmation will be sent to your mobile: ${mobile.value}  & email address: ${email.value}`;
        txtDate.innerHTML = "";
        fname.value = "";
        email.value = "";
        cemail.value = "";
        mobile.value = "";
        txtCart.innerText="";
        txtCost.innerText = "";
        ladult.value = 0;
        lchild.value = 0;
        fadult.value = 0;
        fchild.value = 0;
    }

}
