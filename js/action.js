document.addEventListener("DOMContentLoaded", function() {
}, false);

const reserve_form = document.querySelector("#reserve-form");
const name = reserve_form.elements["name"];
const email = reserve_form.elements["email"];
const phone = reserve_form.elements["phone"];
const checkIn = reserve_form.elements["checkIn"];
const checkOut = reserve_form.elements["checkOut"];

name.addEventListener("keyup", check, false);
email.addEventListener("keyup", check, false);
phone.addEventListener("keyup", check, false);
checkIn.addEventListener("keyup", check, false);
checkOut.addEventListener("keyup", check, false);
reserve_form.addEventListener("submit", validateForm, false);

function validateForm(event) {
   event.preventDefault();

   validateInput("Name", name);
   validateInput("Email", email);
   validateInput("Phone", phone);
   validateInput("Check In", checkIn);
   validateInput("Check Out", checkOut);
}

/** function uses parameter 'field name' to display field name in case of error.
 * Input parameter is the actual element in the DOM
**/
function validateInput(field_name, input) {
   if (input.value == '' || input.value == null) {
      console.log(input.value)
      // get the error div next to each input element
      const errorDiv = input.nextElementSibling;
      input.classList.add("danger");
      // remove the hidden class and add the show-error class to display error div
      errorDiv.classList.remove("hidden");
      errorDiv.classList.add("show-error");
      // add error message to div
      errorDiv.textContent = `${field_name} cannot be empty`;
   } else {
      switch (field_name) {
         case "Name":
            const re = new RegExp("[0-9]+|[@*&%$#\(\)\\\/\.\,<>]+", "g");
            if (re.exec(input.value) != null) {
               addError(input, "Invalid! Name can only contain letters");
            }
            break;
         case "Email":
            if ((input.value.indexOf('@') == -1) || input.value.indexOf(".") == -1) {
               addError(input, "Invalid email address");
            }
            break;
         case "Phone":
            const phn_re = new RegExp("0[879][01][0-9]{8}", "g");
            if (phn_re.exec(input.value) == null) {
               addError(input, "Inavlid Phone Number");
            }
            break;
         case "Check In":
            alert("We outside!");
            console.log(input.value);
            const date_re = new RegExp("[0-9]{4}-[0-1][0-2]-[0-3][0-9]", "g");
            if (date_re.exec(input.value) != null) {
               addError(input, "Invalid date");
            }
            break;
         case "Check Out":
            alert("Oka")
            const co_re = new RegExp("[0-9]{4}-[0-1][0-2]-[0-3][0-9]", "g");
            if (co_re.exec(input.value) != null) {
               addError(input, "Invalid date");
               check(input);
            } else {
               check(input);
            }
            break;
      }
   }
}

// removes error message and make input normal when user starts to type
function check(event) {
   if (this.value.trim() != "" || this.value != null) {
      this.classList.remove("danger");
      this.nextElementSibling.classList.remove("show-error");
      this.nextElementSibling.classList.add("hidden");
   }
}

// displays error message and makes input red by adding the danger class
function addError(input, errorMsg) {
   const errorDiv = input.nextElementSibling;
   input.classList.add("danger");
   // remove the hidden class and add the show-error class to display error div
   errorDiv.classList.remove("hidden");
   errorDiv.classList.add("show-error");
   // add error message to div
   errorDiv.textContent = errorMsg;
}

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});