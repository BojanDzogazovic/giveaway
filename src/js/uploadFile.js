import { selectButton } from "./selectCountry";
import { inputFields } from "./labelEffect";

export let form = document.querySelector(".form");
export let uploadWindow = document.querySelector(".upload-window");
export let giftIcon = document.querySelector(".gift-icon");
export let inputLabels = document.querySelectorAll(".form__label");
export let borderDiv = document.querySelector(".form__section--border");
export let infoDiv = document.querySelector(".form__section--info");
export let uploadIcon = document.querySelector(".upload-window__icon");
export let uploadText = document.querySelector(".upload-window__text");
export let uploadBtn = document.querySelector(".upload-window__btn");
export let uploadInput = document.querySelector(".upload-window__input");
export let uploadFeedback = document.querySelector(".upload-window__feedback");
export let uploadFormats = document.querySelector(".upload-window__formats");
export let formMessage = document.querySelectorAll(".form__message");
export let formFields = document.querySelectorAll(".form__field");
export let formLabels = document.querySelectorAll(".form__label");

export let file;
export let fileUploadedURL;

export let fileState = false;

export let formChildren = [
  ...inputFields,
  selectButton,
  giftIcon,
  ...inputLabels,
  borderDiv,
  infoDiv,
  uploadIcon,
  uploadText,
  uploadBtn,
  uploadInput,
  uploadFormats,
  uploadFeedback,
  ...formMessage,
  ...formFields,
  ...formLabels,
];

export function DragAndDrop() {
  form.addEventListener(
    "dragover",
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      formChildren.forEach((el) => {
        if (el !== uploadWindow) {
          el.classList.add("stop-bubbling");
        }
        if (el == uploadIcon || el == uploadText || el == uploadWindow) {
          el.style.opacity = 1;
        } else {
          el.style.opacity = 0.5;
        }
      });

      uploadIcon.classList.add("upload-window__icon--active");
      uploadText.classList.add("upload-window__text--active");
      uploadText.innerText = "Drop file";
      uploadBtn.style.visibility = "hidden";
      uploadFormats.style.opacity = 0.5;
      uploadWindow.classList.add("upload-window--active");
    },
    true
  );

  form.addEventListener(
    "dragleave",
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      formChildren.forEach((el) => {
        el.style.opacity = 1;
      });

      uploadIcon.classList.remove("upload-window__icon--active");
      uploadText.innerText = "Drag & drop file to start transfer";
      uploadText.classList.remove("upload-window__text--active");
      uploadBtn.style.visibility = "visible";
      uploadFormats.style.opacity = 1;
      uploadWindow.classList.remove("upload-window--active");
    },
    true
  );

  uploadBtn.addEventListener("click", () => {
    uploadInput.click();
  });

  uploadInput.addEventListener("change", function () {
    file = this.files[0];
    uploadFile(this.files[0].name);
    uploadFormats.style.display = "none";
  });

  form.addEventListener("drop", (e) => {
    if (e.target == uploadWindow) {
      e.preventDefault();

      file = e.dataTransfer.files[0];
      uploadFile(e.dataTransfer.files[0].name);

      uploadText.classList.remove("upload-window__text--active");
      uploadText.innerText = "Drag & drop file to start transfer";
      uploadBtn.style.visibility = "visible";
      uploadFormats.style.display = "none";

      formChildren.forEach((el) => {
        el.style.opacity = 1;
        el.classList.remove("stop-bubbling");
      });
    }
  });

  function uploadFile(fileName) {
    let fileType = file.type;

    let validFileTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    if (validFileTypes.includes(fileType) && file.size < 5243000) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        let fileURL = fileReader.result;
        /*  console.log(fileURL);
      console.log(fileName); */
        uploadIcon.src = "./src/assets/images/uploaded_file_success.svg";
        uploadIcon.style.opacity = 1;
        if (window.innerWidth < 756) {
          uploadIcon.style.height = "150px";
          uploadIcon.style.width = "auto";
        } else {
          uploadIcon.style.height = "auto";
          uploadIcon.style.width = "auto";
        }
        uploadFeedback.style.display = "inline-block";
        uploadFeedback.innerText = fileName;
        uploadWindow.nextElementSibling.innerText = "*Invalid format";
        uploadWindow.classList.remove("upload-window--error");
        uploadWindow.nextElementSibling.style.visibility = "hidden";
        uploadFeedback.style.color = "#ffffff";
        fileState = true;
        fileUploadedURL = fileURL;
      };
    } else {
      uploadIcon.src = "./src/assets/images/uploaded_file_error.svg";
      uploadIcon.style.opacity = 1;
      if (window.innerWidth < 756) {
        uploadIcon.style.height = "150px";
        uploadIcon.style.width = "auto";
      } else {
        uploadIcon.style.height = "auto";
        uploadIcon.style.width = "auto";
      }
      uploadFeedback.style.display = "inline-block";
      uploadFeedback.innerText = "Transfer failed";
      uploadFeedback.style.color = "#d9452d";
      uploadWindow.classList.add("upload-window--error");
      uploadWindow.nextElementSibling.style.visibility = "visible";

      if (!validFileTypes.includes(fileType)) {
        uploadWindow.nextElementSibling.innerText = "*Invalid format";
      } else if (file.size >= 5243000) {
        uploadWindow.nextElementSibling.innerText =
          "*Added file excedes max size of 5MB.";
      }
    }
  }
}

window.addEventListener("dragover", function (e) {
  e.preventDefault();
});
