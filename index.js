const form = document.getElementById("sign-form");
const email = document.getElementById("email");
const emailMsg = email.nextElementSibling;

const phone = document.getElementById("phone");
const phoneMsg = phone.nextElementSibling;

const password = document.getElementById("password");
const passMsg = password.nextElementSibling;

const passConf = document.getElementById("confirm_password");
const passConfMsg = passConf.nextElementSibling;

email.addEventListener("focusout", (event) => {
    if (email.validity.valid) {
        emailMsg.textContent = "";
        emailMsg.className = "error";
    }
    else {
        emailShowError();
    }
});

phone.addEventListener("focusout", (event) => {
    if (phone.validity.valid) {
        phoneMsg.textContent = "";
        phoneMsg.className = "error";
    }
    else {
        phoneShowError();
    }
})

password.addEventListener("focusout", (event) => {
    passShowError();
})

passConf.addEventListener("focusout", (event) => {
    passConfShowError();
})

form.addEventListener("submit", (event) => {
    if (!email.validity.valid) {
        emailShowError();
        event.preventDefault();
    }
    if (!phone.validity.valid) {
        phoneShowError();
        event.preventDefault();
    }
    if (!password.validity.valid) {
        phoneShowError();
        event.preventDefault();
    }
    if (!passConf.validity.valid){
        passConfShowError();
        event.preventDefault();
    }
})

function emailShowError() {
    if (email.validity.valueMissing) {
        emailMsg.textContent = "Please fill in the email address."
        emailMsg.classList.add("active");
    } else if (email.validity.typeMismatch) {
    emailMsg.classList.add("active");
    emailMsg.textContent = "Please enter a valid email address."
    }
    else if (email.validity.tooShort) {
    emailMsg.classList.add("active");
    emailMsg.textContent = `Email should be at least ${email.minLength} charachters. You entered ${email.value.length}.`
    }
}


function phoneShowError() {
    if (phone.validity.valueMissing) {
        phoneMsg.textContent = "Please fill in your phone number.";
        phoneMsg.classList.add("active");
    }
    else if (phone.validity.typeMismatch || phone.validity.rangeUnderflow || phone.validity.rangeOverflow) {
        phoneMsg.textContent = "Sorry but this is not a valid phone number."
    }
}

function passShowError() {
    if (password.validity.valueMissing) {
        passMsg.textContent = "Please add a password.";
        passMsg.classList.add("active");
    }
    else if (password.validity.tooShort || password.validity.tooLong) {
        passMsg.textContent = "Password should be at least 8 charachters and no more than 20."
        passMsg.classList.add("active");
    }
    else {
        if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password.value) 
         && /[0-9]/.test(password.value)) {
            passMsg.textContent = "Strong!";
            passMsg.classList.add("strong");
        }
        else {
            passMsg.textContent = "Weak Password. Consider adding a number and a special charachter."
            passMsg.classList.add("active");
        }
    }
}

function passConfShowError() {
    if (password.validity.valid) {
        passConfMsg.classList.add("active");
        if (password.value !== passConf.value) {
            passConfMsg.textContent = "Passwords do not match.";
        }
        else {
            passConfMsg.textContent = "✔️ Passwords match.";
        }
    }
    else {
        passConfMsg.textContent = "Please fix the password first";
        passConfMsg.classList.add("active");
    }
}
