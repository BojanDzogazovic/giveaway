//Input label animation
export let inputFields = document.querySelectorAll(".form__input");

export function mandatoryFieldError(field, text) {
  field.parentElement.classList.add("form__field--mandatory");
  field.nextElementSibling.style.visibility = "visible";
  field.nextElementSibling.innerText = text;
}

export function labelEffect() {
  inputFields.forEach((inputField) => {
    inputField.addEventListener("focus", () => {
      inputField.parentElement.classList.remove("form__field--mandatory");

      inputField.labels[0].classList.add("form__label--active");
      inputField.nextElementSibling.innerText = "*Required";
      inputField.nextElementSibling.style.visibility = "visible";
    });

    inputField.addEventListener("focusout", () => {
      if (inputField.value.length == 0) {
        inputField.labels[0].classList.remove("form__label--active");
      }
      inputField.nextElementSibling.style.visibility = "hidden";
      if (
        inputField.parentElement.classList.contains("form__field--mandatory")
      ) {
        inputField.parentElement.classList.remove("form__field--mandatory");
      }
    });

    inputField.addEventListener("keyup", () => {
      if (inputField.value.length == 0) {
        mandatoryFieldError(inputField, "*Required field.");
      }
    });
  });
}
