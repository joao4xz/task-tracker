let addButton = document.getElementById("Add");
let addHelper = document.getElementById("add-helper");

addButton.addEventListener('click', () => {
  let addHelperDisplayStyle = window.getComputedStyle(addHelper).display;
  if(addHelperDisplayStyle === "none") {
    addHelper.style.display = "flex";
  }
  else{
    addHelper.style.display = "none";
  }
})