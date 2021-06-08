// HELPER FUNCTION

const $ = (elem) => {
    return document.querySelector(elem);
};


// GET DOM ELEMENTS

let firstName = $('#inputFirstName');
let lastName = $('#inputLastName');
let addressType = $('#addressType');
let other = $('#inputOther');
let address1 = $('#inputAddress1');
let address2 = $('#inputAddress2');
let city = $('#inputCity');
let state = $('#inputState');
let zip = $('#inputZip');
let email = $('#inputEmail');
let phone = $('#inputPhone');


// VALIDATION FUNCTION AFTER DELIVERY INFO (STEP 1)

const validation = () => {
    let isValid = true;

    // ERASE ANY VALIDATION MESSAGES FROM PREVIOUS INPUT CHECKS
    let validationMsgs = document.querySelectorAll('.validation-msg');
    for (msg of validationMsgs) {
        msg.innerText = "";
    }

    // FIRST NAME VALIDATION
    
    // check if field is blank
    if (firstName.value.length < 1) {
        $('#inputFirstName + p').innerText = "First name is required.";
        isValid = false;        
    } else if (firstName.value.match(/\d/)) {   // check if digits in first name
        $('#inputFirstName + p').innerText = "First name cannot contain numbers.";
        isValid = false;
    }

    // LAST NAME VALIDATION
    
    // check if field is blank
    if (lastName.value.length < 1) {
        $('#inputLastName + p').innerText = "Last name is required.";
        isValid = false;        
    } else if (lastName.value.match(/\d/)) {   // check if digits in first name
        $('#inputLastName + p').innerText = "Last name cannot contain numbers.";
        isValid = false;
    }

    // ADDRESS TYPE VALIDATION

    // check if no selection made
    if (addressType.value.length < 1) {
        $('#addressType + p').innerText = "Please select an Address Type.";
        isValid = false;
    }        

    // check if no entry made for Other Address Type
    if (addressType.value === "Other" && other.value.length === 0) {
        $('#inputOther + p').innerText = "Other Address Type required.";
        isValid = false;
    }        


    // ADDRESS LINE 1 VALIDATION

    // check if field is blank
    if (address1.value.length < 1) {
        $('#inputAddress1 + p').innerText = "Street address is required.";
        isValid = false;
    }  
    // ADDRESS LINE 2 VALIDATION - NOT REQUIRED BECAUSE OPTIONAL      

    // CITY VALIDATION

    // check if field is blank
    if (city.value.length < 1) {
        $('#inputCity + p').innerText = "City is required.";
        isValid = false;
    }  

    // STATE VALIDATION

    // check if field is blank
    if (state.value.length < 1) {
        $('#inputState + p').innerText = "State is required.";
        isValid = false;
    } else if (state.value.length !== 2 || !state.value.match(/^[a-zA-Z]{2}$/)) { 
        $('#inputState + p').innerText = "Must be a 2 letter abbreviation, i.e. NY";
        isValid = false;
    }  

    // ZIP VALIDATION

    // check if field is blank
    if (zip.value.length < 1) {
        $('#inputZip + p').innerText = "Zip code is required.";
        isValid = false;
    } else if (!zip.value.match(/(^\d{5}$|^\d{5}-\d{4}$)/)) { 
        $('#inputZip + p').innerText = "Must be either 5 numbers or 5 numbers followed by a dash and 4 numbers.";
        isValid = false;
    }  

    // EMAIL VALIDATION

    // check if field is blank
    if (email.value.length < 1) {
        $('#inputEmail + p').innerText = "Email is required.";
        isValid = false;
    } else if (!email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) { 
        $('#inputEmail + p').innerText = "Must be a valid email address in the format XX@XX.XX.";
        isValid = false;
    }  

    // PHONE VALIDATION

    // check if field is blank
    if (phone.value.length < 1) {
        $('#inputPhone + p').innerText = "Phone number is required.";
        isValid = false;
    } else if (!phone.value.match(/^(?:\d{3})([-\.])\d{3}\1\d{4}$/)) { 
        $('#inputPhone + p').innerText = "Must be in the format XXX-XXX-XXXX.";
        isValid = false;
    }  





    return isValid;
};

window.addEventListener('load', (e) => {

    addressType.addEventListener('change', (e) => {
        if (addressType.value === 'Other') {
            $('#otherAddress1').classList.remove('hidden');
            $('#otherAddress2').classList.remove('hidden');
        } else {
            $('#otherAddress1').classList.add('hidden');
            $('#otherAddress2').classList.add('hidden');
        }
    });

    $('#btnStep1').addEventListener('click', (e) => {
        if (!validation()) {
            alert('Please go back and fix errors.');
        } else {
            $('#delivery-info-edit').classList.remove("hidden");
            $('#delivery-info').setAttribute("disabled", "");
        }
    });







});