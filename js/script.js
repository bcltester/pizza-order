// HELPER FUNCTION

const $ = (elem) => {
    return document.querySelector(elem);
};

// GLOBAL VARIABLES

let EXP_DATE_MAX = 50;      // Maximum number of years into the future we allow a credit card expiration date to be inputted in billing info


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

let billingFirstName = $('#inputBillingFirstName');
let billingLastName = $('#inputBillingLastName');
let billingAddress1 = $('#inputBillingAddress1');
// let billingAddress2 = $('#inputBillingAddress2');
let billingCity = $('#inputBillingCity');
let billingState = $('#inputBillingState');
let billingZip = $('#inputBillingZip');


let sizeDropdown = $('#select-size');
let cheeseDropdown = $('#select-cheese');
let sauceDropdown = $('#select-sauce');

// OBJECT LITERAL FOR PIZZA SIZES

const Size = {
    'Hand-tossed': {
        Small: 9.99,
        Medium: 12.99,
        Large: 14.99
    },
    'Thin Crust': {
        Medium: 11.99,
        Large: 13.99
    },
    'New York Style': {
        Large: 16.99,
        XLarge: 19.99
    },
    'Gluten Free': {
        Small: 10.99
    }
};

// OBJECT LITERAL FOR CHEESE, SAUCE, TOPPINGS

const Cheese = {
    Light: 0,
    Normal: 0,
    Extra: 2.99,
    Double: 3.99
};

const Sauce = {
    'Regular Tomato': 0,
    'Hearty Tomato': 0.99,
    'BBQ Sauce': 1.99
};

const Toppings = 0.99;

// VARIABLE TO STORE TOTAL COST

let totalCost = 0.00;


// FUNCTION TO POPULATE SIZE DROPDOWN

function sizeSelections (crustName) {
    // FIRST GET RID OF ANY PRE-EXISTING <OPTION>s IN THE <SELECT> DROPDOWN
    let selectDropdown = $('#select-size');
    while (selectDropdown.lastChild) {
        selectDropdown.removeChild(selectDropdown.lastChild);
    };

    // DEFAULT OPTION THAT SAYS TO CHOOSE A SIZE
    let def = document.createElement('OPTION');
    def.innerText = `Choose Size...`;
    def.setAttribute("value", "none");
    selectDropdown.appendChild(def);    
    for (size in Size[crustName]) {
        let elem = document.createElement('OPTION');
        elem.innerText = `${size} ($${Size[crustName][size]})`;
        elem.setAttribute("value", size);
        selectDropdown.appendChild(elem);
    }
};


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

// VALIDATION FUNCTION AFTER BILLING INFO (STEP 3)

const validationBilling = () => {
    let isValid = true;

    // ERASE ANY VALIDATION MESSAGES FROM PREVIOUS INPUT CHECKS
    let validationMsgs = document.querySelectorAll('.validation-msg');
    for (msg of validationMsgs) {
        if (!msg.classList.contains('cc-msg')) {        // So that it doesn't erase the onBlur validation message on the Credit Card fields
            msg.innerText = "";
        }
    }

    // FIRST NAME VALIDATION
    
    // check if field is blank
    if (billingFirstName.value.length < 1) {
        $('#inputBillingFirstName + p').innerText = "First name is required.";
        isValid = false;        
    } else if (billingFirstName.value.match(/\d/)) {   // check if digits in first name
        $('#inputBillingFirstName + p').innerText = "First name cannot contain numbers.";
        isValid = false;
    }

    // LAST NAME VALIDATION
    
    // check if field is blank
    if (billingLastName.value.length < 1) {
        $('#inputBillingLastName + p').innerText = "Last name is required.";
        isValid = false;        
    } else if (billingLastName.value.match(/\d/)) {   // check if digits in first name
        $('#inputBillingLastName + p').innerText = "Last name cannot contain numbers.";
        isValid = false;
    }

    // ADDRESS LINE 1 VALIDATION

    // check if field is blank
    if (billingAddress1.value.length < 1) {
        $('#inputBillingAddress1 + p').innerText = "Street address is required.";
        isValid = false;
    }  
    // ADDRESS LINE 2 VALIDATION - NOT REQUIRED BECAUSE OPTIONAL      

    // CITY VALIDATION

    // check if field is blank
    if (billingCity.value.length < 1) {
        $('#inputBillingCity + p').innerText = "City is required.";
        isValid = false;
    }  

    // STATE VALIDATION

    // check if field is blank
    if (billingState.value.length < 1) {
        $('#inputBillingState + p').innerText = "State is required.";
        isValid = false;
    } else if (billingState.value.length !== 2 || !billingState.value.match(/^[a-zA-Z]{2}$/)) { 
        $('#inputBillingState + p').innerText = "Must be a 2 letter abbreviation, i.e. NY";
        isValid = false;
    }  

    // ZIP VALIDATION

    // check if field is blank
    if (billingZip.value.length < 1) {
        $('#inputBillingZip + p').innerText = "Zip code is required.";
        isValid = false;
    } else if (!billingZip.value.match(/(^\d{5}$|^\d{5}-\d{4}$)/)) { 
        $('#inputBillingZip + p').innerText = "Must be either 5 numbers or 5 numbers followed by a dash and 4 numbers.";
        isValid = false;
    }  
    return isValid;
};

// PRICE UPDATER

const totalRefresh = function (amount, add=true) {
    if (add) {
        totalCost += amount;
    } else {
        totalCost -= amount;
    }
    let lstChld = $('.total-row').lastElementChild;
    $('.total-row').removeChild(lstChld);
    let newTot = document.createElement('TD');
    newTot.innerText = '$'.concat(String(totalCost.toFixed(2)));
    $('.total-row').appendChild(newTot);
}


// POPULATE THE ORDER COST TALLY

const costUpdater = function (choicesSelector, tallyRowClass, priceObject) {
    // SUBTRACT EXISTING PRICE FROM INTERNAL totalCost
    let queryStr = tallyRowClass.concat(' td[class="cost"]');
    let costCell = document.querySelector(queryStr);
    if (costCell) {
        let val = costCell.innerText;
        let num = Number(val.match(/\d+\.\d+/));
        totalRefresh(num, false);
    }

    // REMOVE EXISTING PRICE FROM DISPLAY
    while ($(tallyRowClass).lastChild) {
        $(tallyRowClass).removeChild($(tallyRowClass).lastChild);
    }
    // ADD NEW PRICE TO DISPLAY
    if (choicesSelector.value !== 'none') {
        let item = document.createElement('TD');
        let price = document.createElement('TD');
        price.classList.add('cost');
        $(tallyRowClass).appendChild(item);
        $(tallyRowClass).appendChild(price);
        item.innerText = choicesSelector.value;
        price.innerText = `$${priceObject[choicesSelector.value].toFixed(2)}`;
        totalRefresh(priceObject[choicesSelector.value]);
    }


}

const costUpdaterCheckbox = function (add, checkboxValue) {
    if (add) {
        let row = document.createElement('TR');
        row.setAttribute('value', checkboxValue);
        let item = document.createElement('TD');
        let price = document.createElement('TD');
        price.classList.add('cost');        
        $('tbody').insertBefore(row, $('.line'));       // INSERT ROW BEFORE THE <tr class="line">
        row.appendChild(item);
        row.appendChild(price);
        item.innerText = checkboxValue;
        price.innerText = `$${Toppings.toFixed(2)}`;
        totalRefresh(Toppings);
    } else {
        let removeStr = `tr[value=${checkboxValue}]`;
        let toRemove = document.querySelector(removeStr);
        $('tbody').removeChild(toRemove);
        totalRefresh(Toppings, false);
    }
}

// DATE

let today = new Date();
let thisMonth = today.getMonth() + 1;
let thisYear = today.getFullYear();

// POPULATE EXPIRATION DATE YEAR DROPDOWN WITH YEARS UP TO EXP_DATE_MAX

let creditExpYearSelect = $('#expirationYear')
for (let y = thisYear; y <= (thisYear + EXP_DATE_MAX); y++) {
    let opt = document.createElement('OPTION');
    opt.innerText = y;
    creditExpYearSelect.appendChild(opt);
}

// CREDIT CARD VALIDATION FUNCTIONS
const isLundValid = (number) => {
    let digitArray = String(number).split('');
    digitArray.reverse();
    let lundSum = 0;
    for (let i = 0; i < digitArray.length; i++) {
        if (i % 2 === 0) {
            lundSum += Number(digitArray[i]);
        } else {
            let n = String(2 * Number(digitArray[i])).split('');
            // console.log(n);
            for (let z = 0; z<n.length; z++) {
                lundSum += Number(n[z]);
            } 
        }
        // console.log(`lundSum is ${lundSum}`);
    }
    if ((lundSum % 10) === 0) {
        return true;
    } else {
        return false;
    }
}

let ccNumValid = false;
let ccCvcValid = false;
let ccMonValid = false;
let ccYrValid = false;

const ccLogo = (filename, altTxt) => {
    let logoDest = $('#cc-logo');
    logoDest.innerHTML = `<br>`;
    let addn = document.createElement('IMG');
    let imgStr = `img/${filename}`;
    addn.setAttribute("src", imgStr);
    addn.setAttribute("alt", altTxt);
    logoDest.appendChild(addn);
}


const ccNumberValid = (selector) => {
    // REMOVE PREEXISTING CREDIT CARD LOGO
    while ($('#cc-logo').lastChild) {
        $('#cc-logo').removeChild($('#cc-logo').lastChild);
    }

    // PERFORM VALIDATION
    let v = String($(selector).value);
    let selStr = `${selector} + p`;    
    if (v.length !== 16 && v.length !== 13) {
        $(selStr).innerText = "Credit card number must be 13 or 16 digits.";
        ccNumValid = false;
    } else if (v.match(/\D/)) {
        $(selStr).innerText = "Must contain only numbers.";
        ccNumValid = false;
    } else if (!v.match(/^(4|5[1-5]|37)/)) {
        $(selStr).innerText = "Must be Visa, MasterCard, or American Express.";
        ccNumValid = false;
    } else if (!isLundValid(v)) {
        $(selStr).innerText = "Must be a valid credit card number.";
        ccNumValid = false;
    } else if (v.match(/^4/)) {
        ccLogo('visa.png', 'Visa logo');
        $(selStr).innerText = "";
        ccNumValid = true;
    } else if (v.match(/^(5[1-5])/)) {
        ccLogo('mc.png', 'MasterCard logo');
        $(selStr).innerText = "";        
        ccNumValid = true;
    } else if (v.match(/^37/)) {
        ccLogo('amex.png', 'American Express logo');
        $(selStr).innerText = "";        
        ccNumValid = true;
    }
}
 
const cvcValid = (selector) => {

    // PERFORM VALIDATION
    let v = String($(selector).value);
    let selStr = `${selector} + p`;    
    if (v.length !== 3) {
        $(selStr).innerText = "CVC must be 3 digits.";
        ccCvcValid = false;
    } else if (v.match(/\D/)) {
        $(selStr).innerText = "Must contain only numbers.";
        ccCvcValid = false;
    } else {
        $(selStr).innerText = "";
        ccCvcValid = true;
    }
}

const ccMonthValid = (selector) => {
    let selStr = `${selector} + p`;
    if ($(selector).value === 'none') {
        $(selStr).innerText = "Select month.";
        ccMonValid = false;
    } else if (Number($(selector).value) <= thisMonth) {
        $(selStr).innerText = "Expiration date must be later than current month.";
        ccMonValid = false;
    } else {
        $(selStr).innerText = "";
        ccMonValid = true;
    }
}

const ccYearValid = (selector) => {
    let selStr = `${selector} + p`;
    if ($(selector).value === 'none') {
        $(selStr).innerText = "Select year.";
        ccYrValid = false;
    } else {
        $(selStr).innerText = "";
        ccYrValid = true;
    }
}
            

// APPLY EVENT LISTENERS TO CREDIT CARD INPUT FIELDS
const creditValidSetup = () => {
    $('#inputCreditNumber').addEventListener('blur', (e) => {
        ccNumberValid('#inputCreditNumber');
    });
    $('#inputCreditCVC').addEventListener('blur', (e) => {
        cvcValid('#inputCreditCVC');
    });
    $('#expirationMonth').addEventListener('blur', (e) => {
        ccMonthValid('#expirationMonth');
    });
    $('#expirationYear').addEventListener('blur', (e) => {
        ccYearValid('#expirationYear');
    });


};


// MAIN CODE

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
            // SHOW 'EDIT' LINK AND PENCIL FOR STEP 1
            $('#delivery-info-edit').classList.remove("hidden");

            // DISABLE STEP 1 INPUTS TO PREVENT MODIFICATION OF DATA TO INVALID INPUTS
            $('#delivery-info').setAttribute("disabled", "");

            // REVEAL AND ENABLE STEP 2
            $('#build-pizza').classList.remove("hidden")
            $('#build-pizza').removeAttribute("disabled");            
        }
    });

    $('#step1-edit').addEventListener('click', (e) => {
        // CLICKING THE EDIT LINK IN STEP 1 ENABLES THE STEP 1 FORM 
        e.preventDefault();
        $('#delivery-info').removeAttribute("disabled");
        // HIDE THE EDIT PENCIL
        $('#delivery-info-edit').classList.add("hidden");


        // DISABLES AND HIDES STEP 2 FORM
        $('#build-pizza').setAttribute("disabled", "")
        $('#build-pizza').classList.add('hidden');
        // HIDE STEP 2 EDIT PENCIL
        $('#build-pizza-edit').classList.add('hidden');

        // DISABLE AND HIDES STEP 3 FORM
        $('#billing-info').setAttribute("disabled", "")
        $('#billing-info').classList.add('hidden');        
    });

    let crust;
    $('#select-crust').addEventListener('click', (e) => {
        if (e.target.tagName === "INPUT") {         // ?? HAD TO ADD THIS BECAUSE CLICKING ON A RADIO BUTTON LABEL WOULD TRIGGER CLICK EVENT TWICE. IT LOOKS LIKE IT TRIGGERS ONE CLICK FOR CLICKING ON THE LABEL, AND THEN A SECOND CLICK WHEN THE LABEL CAUSES SELECTION OF THE RADIO BUTTON ITSELF.
            let radioButtons = document.querySelectorAll('input[name="crust"]');
            for (button of radioButtons) {
                if (button.checked) {
                    crust = button.value;
                    sizeSelections(crust);
                    $('#group-cheese').classList.remove('hidden');
                    $('#group-sauce').classList.remove('hidden');
                    $('#group-toppings').classList.remove('hidden');
                    $('#btn-build-finish').classList.remove('hidden');
                    costUpdater(cheeseDropdown, '.cheese-row', Cheese);     // Because these are the default options
                    costUpdater(sauceDropdown, '.sauce-row', Sauce);        // Because these are the default options
                }
            }
        }
    });

    sizeDropdown.addEventListener('change', (e) => {
        costUpdater(sizeDropdown, '.size-row', Size[crust]);
    });

    cheeseDropdown.addEventListener('change', (e) => {
        costUpdater(cheeseDropdown, '.cheese-row', Cheese);
    });

    sauceDropdown.addEventListener('change', (e) => {
        costUpdater(sauceDropdown, '.sauce-row', Sauce);
    });

    $('#group-toppings').addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT') {
            if (e.target.checked) {
                costUpdaterCheckbox(true, e.target.value);
            } else {
                costUpdaterCheckbox(false, e.target.value);
            }
        }
    });

    $('#btn-build-finish').addEventListener('click', (e) => {
        if ($('#select-size').value === 'none') {
            alert('Please go back and make a selection for each pizza option.');
        } else {
            if (confirm("Complete pizza and proceed to payment information?")) {
                // SHOW 'EDIT' LINK AND PENCIL FOR STEP 1
                $('#build-pizza-edit').classList.remove("hidden");

                // DISABLE STEP 1 INPUTS TO PREVENT MODIFICATION OF DATA TO INVALID INPUTS
                $('#build-pizza').setAttribute("disabled", "");

                // REVEAL AND ENABLE STEP 3
                $('#billing-info').classList.remove("hidden")
                $('#billing-info').removeAttribute("disabled");
            }            
        }
    });

    $('#step2-edit').addEventListener('click', (e) => {
        // CLICKING THE EDIT LINK IN STEP 2 ENABLES THE STEP 2 FORM 
        e.preventDefault();
        $('#build-pizza').removeAttribute("disabled");
        // HIDE THE EDIT PENCIL
        $('#build-pizza-edit').classList.add("hidden");

        // DISABLES AND HIDES STEP 3 FORM
        $('#billing-info').setAttribute("disabled", "")
        $('#billing-info').classList.add('hidden');
    });

    // SAME AS DELIVERY CHECKBOX FUNCTIONALITY 
    $('#sameAsDelivery').addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT') {
            if (e.target.checked) {
                $('#inputBillingFirstName').value = $('#inputFirstName').value;
                $('#inputBillingLastName').value = $('#inputLastName').value;
                $('#inputBillingAddress1').value = $('#inputAddress1').value;
                $('#inputBillingAddress2').value = $('#inputAddress2').value;
                $('#inputBillingCity').value = $('#inputCity').value;
                $('#inputBillingState').value = $('#inputState').value;
                $('#inputBillingZip').value = $('#inputZip').value;

            } else if (!e.target.checked) {
                $('#inputBillingFirstName').value = "";
                $('#inputBillingLastName').value = "";
                $('#inputBillingAddress1').value = "";
                $('#inputBillingAddress2').value = "";
                $('#inputBillingCity').value = "";
                $('#inputBillingState').value = "";
                $('#inputBillingZip').value = "";
            }
        }
    });

    creditValidSetup();

    $('#btnStep3').addEventListener('click', (e) => {
        ccNumberValid('#inputCreditNumber');
        cvcValid('#inputCreditCVC');
        ccMonthValid('#expirationMonth');   
        ccYearValid('#expirationYear');

        if (!validationBilling() || !ccNumValid || !ccCvcValid || !ccMonValid || !ccYrValid) {
            alert('Please go back and fix errors.');
        } else {
            if (confirm("Submit order?")) {
                alert("Congratulations! Your order is on its way.");
            }
        }
    });
});