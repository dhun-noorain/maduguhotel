document.addEventListener("DOMContentLoaded", function() {
   /**
    * Get reserve form and its input for validation and manipulation
    */
   const reserve_form = document.querySelector("#reserve-form");
   const name = reserve_form.elements["name"];
   const email = reserve_form.elements["email"];
   const phone = reserve_form.elements["phone"];
   const checkIn = reserve_form.elements["checkIn"];
   const checkOut = reserve_form.elements["checkOut"];
   
   /**
    * check function eliminates errors displayed
    */
   name.addEventListener("keyup", check, false);
   email.addEventListener("keyup", check, false);
   phone.addEventListener("keyup", check, false);
   reserve_form.addEventListener("submit", validateForm, false);
   
   /**
    * Get contact form and its input for validation and manipulation
    */
   const contact_form = document.querySelector("#contact-form");
   const contact_name = contact_form.elements["name"];
   const contact_email = contact_form.elements["email"];
   const contact_msg = contact_form.elements["message"];
   
   contact_name.addEventListener("keyup", check, false);
   contact_email.addEventListener("keyup", check, false);
   contact_msg.addEventListener("keyup", check, false);
   contact_form.addEventListener("submit", submitContact, false);
   
   /**
    * validates reserve form
    */
   function validateForm(event) {
      event.preventDefault();
   
      validateInput("Name", name);
      validateInput("Email", email);
      validateInput("Phone", phone);
      validateInput("Check In", checkIn);
      validateInput("Check Out", checkOut);
   
      let form = Array.from(reserve_form.elements);
      count = 0;
      for(let index = 0; index < form.length; index++) {
         if(reserve_form[index].tagName == "INPUT") {
            if(reserve_form[index].nextElementSibling.classList.contains("show-error")){
               break;
            } else {
               count++;
            }
            if (count == 5) {
               document.querySelector("#success-msg").classList.remove("hidden");
               document.querySelector("#success-msg").classList.add("show-msg");
               reserve_form.submit();
            }
         }
      }
   }
   
   /**
    * validates contact form
    */
   function submitContact(event) {
      event.preventDefault();
   
      validateInput("Name", contact_name);
      validateInput("Email", contact_email);
      validateInput("Message", contact_msg);
   
      let form = Array.from(contact_form.elements);
      count = 0;
      for(let index = 0; index < form.length; index++) {
         if(contact_form[index].tagName == "INPUT" || contact_form[index].tagName == "TEXTAREA") {
            if(contact_form[index].nextElementSibling.classList.contains("show-error")){
               break;
            } else {
               count++;
            }
            alert(count)
            if (count == 3) {
               document.querySelector("#success-msg").classList.remove("hidden");
               document.querySelector("#success-msg").classList.add("show-msg");
               contact_form.submit();
            }
         }
      }
   }
   
   /** function uses parameter 'field name' to display field name in case of error.
    * Input parameter is the actual element in the DOM
   **/
   function validateInput(field_name, input) {
      if (input.value == '' || input.value == null) {
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
               if (new Date(input.value) == "Invalid Date") {
                  addError(input, "Invalid Date");
               } else {
                  input.classList.remove("danger");
                  input.nextElementSibling.classList.remove("show-error");
                  input.nextElementSibling.classList.add("hidden");
               }
               break;
            case "Check Out":
               if (new Date(input.value) == "Invalid Date") {
                  addError(input, "Invalid Date");
               } else if (new Date(checkIn.value) >= new Date(input.value)) {
                  addError(input, "You can only check out on a later date");
               } else {
                  input.classList.remove("danger");
                  input.nextElementSibling.classList.remove("show-error");
                  input.nextElementSibling.classList.add("hidden");
               }
               break;
         }
      }
   }
   
   // removes error message and make input normal when user starts to type
   function check() {
      this.classList.remove("danger");
      this.nextElementSibling.classList.remove("show-error");
      this.nextElementSibling.classList.add("hidden");
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
   
   /**
    * hides/display navigation on small screen
    */
   const navToggle = document.getElementById('navToggle');
   const navLinks = document.querySelector('.nav-links');
   
   navToggle.addEventListener('click', () => {
     navLinks.classList.toggle('active');
   });
}, false);
