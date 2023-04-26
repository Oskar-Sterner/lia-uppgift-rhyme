// Get references to all the menu buttons and forms
const searchButtonMenu = document.getElementById("search-button-menu");
const deleteButtonMenu = document.getElementById("delete-button-menu");
const createButtonMenu = document.getElementById("create-button-menu");
const updateButtonMenu = document.getElementById("update-button-menu");

const searchForm = document.getElementById("search-form");
const deleteForm = document.getElementById("delete-form");
const createForm = document.getElementById("create-form");
const updateForm = document.getElementById("update-article-form");

// Set initial display style of all forms to none
searchForm.style.display = "none";
deleteForm.style.display = "none";
createForm.style.display = "none";
updateForm.style.display = "none";

// Function to toggle the display style of a form when its corresponding button is clicked
function toggleFormDisplay(button, form) {
  const forms = [searchForm, deleteForm, createForm, updateForm];

  forms.forEach(function(form) {
    if (form !== this && form.style.display === "flex") {
      form.style.display = "none";
      const button = document.querySelector(`[data-target="${form.id}"]`);
      button.classList.remove("active");
    }
  }, form);

  if (form.style.display === "none") {
    form.style.display = "flex";
    button.classList.add("active");
  } else {
    form.style.display = "none";
    button.classList.remove("active");
  }
}
// Add event listeners to each menu button to toggle the display of its corresponding form
searchButtonMenu.addEventListener("click", function() {
  toggleFormDisplay(searchButtonMenu, searchForm);
});
deleteButtonMenu.addEventListener("click", function() {
  toggleFormDisplay(deleteButtonMenu, deleteForm);
});
createButtonMenu.addEventListener("click", function() {
  toggleFormDisplay(createButtonMenu, createForm);
});
updateButtonMenu.addEventListener("click", function() {
  toggleFormDisplay(updateButtonMenu, updateForm);
});
