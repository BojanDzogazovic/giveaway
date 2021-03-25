export let list = document.getElementById("form__select");
export let listElements = document.querySelectorAll(".form__select-option");
export let selectButton = document.getElementById("form__select-btn");

export function selectCountry() {
  listElements.forEach((element) => {
    element.innerHTML = `<img class="form__select-option-img" src="${element.getAttribute(
      "data-thumbnail"
    )}"/> <span>${element.innerText}</span>`;

    element.onclick = () => {
      list.style.display = "none";
      selectButton.setAttribute("value", element.getAttribute("value"));
      selectButton.innerHTML = `${element.outerHTML} <img class="form__select-arrow" src="./src/assets/images/arrow_down.svg" alt="Arrow down"/>`;
    };
  });

  selectButton.innerHTML = `${listElements[0].outerHTML} <img class="form__select-arrow" src="./src/assets/images/arrow_down.svg" alt="Arrow down"/>`;
  selectButton.setAttribute("value", listElements[0].getAttribute("value"));
  selectButton.onclick = () => {
    list.style.display = list.style.display === "block" ? "none" : "block";
  };

  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("form__select-option")) {
      list.style.display = "none";
    }
  });
}
