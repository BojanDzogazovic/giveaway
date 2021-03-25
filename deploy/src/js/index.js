import { inputFields, labelEffect, mandatoryFieldError } from "./labelEffect";
import {
  list,
  listElements,
  selectButton,
  selectCountry,
} from "./selectCountry";

import {
  form,
  uploadWindow,
  giftIcon,
  inputLabels,
  borderDiv,
  infoDiv,
  uploadIcon,
  uploadText,
  uploadBtn,
  uploadInput,
  uploadFeedback,
  uploadFormats,
  formMessage,
  formFields,
  formLabels,
  file,
  fileUploadedURL,
  formChildren,
  DragAndDrop,
  fileType,
  validFileTypes,
  fileState,
} from "./uploadFile";

labelEffect();
selectCountry();
DragAndDrop();

//Send form & store data
let nameState = false,
  lastNameState = false,
  addressState = false,
  streetNumberState = false,
  cityState = false,
  zipCodeState = false,
  phoneState = false,
  emailState = false,
  bankAccountState = false;

let nameInput = document.querySelector(".form__input--name"),
  lastNameInput = document.querySelector(".form__input--last-name"),
  addressInput = document.querySelector(".form__input--address"),
  streetNumberInput = document.querySelector(".form__input--street-number"),
  cityInput = document.querySelector(".form__input--city"),
  zipCodeInput = document.querySelector(".form__input--zipcode"),
  countryInput = document.querySelector(".form__select-btn"),
  phoneInput = document.querySelector(".form__input--phone"),
  emailInput = document.querySelector(".form__input--email"),
  bankAccountInput = document.querySelector(".form__input--bank-account");

let sendButton = document.getElementById("sendBtn");

sendButton.addEventListener("click", (e) => {
  let letters = /^[A-Za-z]+$/;
  let letterNumber = /^[0-9a-zA-Z]+$/;
  let numbers = /^[0-9]+$/;
  let phoneNumber = /^\d{11}$/;
  let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  let inputArr = [
    nameInput,
    lastNameInput,
    addressInput,
    streetNumberInput,
    cityInput,
    zipCodeInput,
    phoneInput,
    emailInput,
    bankAccountInput,
  ];

  inputArr.forEach((input) => {
    if (input.value.length > 0) {
      if (input == nameInput) {
        if (input.value.match(letters)) {
          nameState = true;
        } else {
          mandatoryFieldError(input, "Only letters a - Z are allowed.");
        }
      } else if (input == lastNameInput) {
        if (input.value.match(letters)) {
          lastNameState = true;
        } else {
          mandatoryFieldError(input, "Only letters a - Z are allowed.");
        }
      } else if (input == addressInput) {
        if (input.value.match(letterNumber)) {
          addressState = true;
        } else {
          mandatoryFieldError(
            input,
            "Only letters a - Z and numbers 0 - 9 are allowed."
          );
        }
      } else if (input == streetNumberInput) {
        if (input.value.match(numbers)) {
          streetNumberState = true;
        } else {
          mandatoryFieldError(input, "Only numbers 0 - 9 are allowed.");
        }
      } else if (input == cityInput) {
        if (input.value.match(letters)) {
          cityState = true;
        } else {
          mandatoryFieldError(input, "Only letters a - Z are allowed.");
        }
      } else if (input == zipCodeInput) {
        if (input.value.match(numbers)) {
          zipCodeState = true;
        } else {
          mandatoryFieldError(input, "Only numbers 0 - 9 are allowed.");
        }
      } else if (input == phoneInput) {
        if (input.value.match(phoneNumber)) {
          phoneState = true;
        } else {
          mandatoryFieldError(
            input,
            "Only numbers 0 - 9 are allowed, 11 digits."
          );
        }
      } else if (input == emailInput) {
        if (input.value.match(emailFormat)) {
          emailState = true;
        } else {
          e.preventDefault();
          mandatoryFieldError(input, "Invalid email.");
        }
      } else if (input == bankAccountInput) {
        if (input.value.match(letterNumber)) {
          bankAccountState = true;
        } else {
          mandatoryFieldError(
            input,
            "Only letters a - Z and numbers 0 - 9 are allowed."
          );
        }
      }
    } else {
      mandatoryFieldError(input, "Reqired field.");
    }
  });

  if (!fileState) {
    uploadWindow.classList.add("upload-window--error");
    uploadWindow.nextElementSibling.innerText = "*Add file";
    uploadWindow.nextElementSibling.style.visibility = "visible";
  }

  class Application {
    constructor(
      name,
      lastName,
      address,
      streetName,
      city,
      zipCode,
      country,
      phone,
      email,
      bankAccount,
      file
    ) {
      this.name = name;
      this.lastName = lastName;
      this.address = address;
      this.streetName = streetName;
      this.city = city;
      this.zipCode = zipCode;
      this.country = country;
      this.phone = phone;
      this.email = email;
      this.bankAccount = bankAccount;
      this.file = file;
    }
  }

  let application = new Application(
    nameInput.value,
    lastNameInput.value,
    addressInput.value,
    streetNumberInput.value,
    cityInput.value,
    zipCodeInput.value,
    countryInput.value,
    phoneInput.value,
    emailInput.value,
    bankAccountInput.value,
    fileUploadedURL
  );

  console.log(application);

  if (
    nameState &&
    lastNameState &&
    addressState &&
    streetNumberState &&
    cityState &&
    zipCodeState &&
    phoneState &&
    emailState &&
    bankAccountState &&
    fileState
  ) {
    sendButton.innerText = "Processing...";
    sendButton.classList.add("sendbtn--processing");

    let showModal = (numberOfSame) => {
      let modal = document.querySelector(".modal");
      let modalIcon = document.querySelector(".modal__icon");
      let modalTitle = document.querySelector(".modal__title");
      let modalSubtitle = document.querySelector(".modal__subtitle");
      let modalBtn = document.querySelector(".modal__btn");

      modal.classList.add("modal--show");

      if (numberOfSame > 0) {
        modalIcon.src = "./src/assets/images/error_upload_icon.svg";
        modalTitle.innerText = "Unsuccessfull application";
        modalSubtitle.innerText = "Better luck next time!";
        modalBtn.innerText = "Try again";
      } else if (numberOfSame == 0) {
        modalIcon.src = "./src/assets/images/success_upload_icon.svg";
        modalTitle.innerText = "Successfull application";
        modalSubtitle.innerText =
          "You did your part! There's nothing left you can do now but have a cold one and wait for giveaway results!";
        modalBtn.innerText = "OK";
      }
      console.log(numberOfSame);
      modalBtn.addEventListener("click", () => {
        if (numberOfSame !== 0) {
          modal.classList.remove("modal--show");
        } else if (numberOfSame == 0) {
          location.reload();
        }
      });
    };

    setTimeout(() => {
      sendButton.innerText = "Send";
      sendButton.classList.remove("sendbtn--processing");

      let giveawayApps = [];

      if (localStorage.getItem("giveaway_applications") === null) {
        giveawayApps.push(application);
        localStorage.setItem(
          "giveaway_applications",
          JSON.stringify(giveawayApps)
        );
        showModal(0);
      } else {
        let appExists = 0;
        giveawayApps = JSON.parse(
          localStorage.getItem("giveaway_applications")
        );
        giveawayApps.forEach((app) => {
          if (
            app.bankAccount == application.bankAccount ||
            app.email == application.email
          ) {
            appExists++;
          }
        });
        showModal(appExists);
        if (appExists == 0) {
          giveawayApps.unshift(application);
          localStorage.setItem(
            "giveaway_applications",
            JSON.stringify(giveawayApps)
          );
        }
      }
    }, 3000);
  } else {
    giftIcon.classList.add("gift-icon--shake");
    setTimeout(() => {
      giftIcon.classList.remove("gift-icon--shake");
    }, 500);

    form.classList.add("form--shake");
    setTimeout(() => {
      form.classList.remove("form--shake");
    }, 500);
  }
});
