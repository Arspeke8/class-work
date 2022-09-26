var addChecklistItemEl = document.querySelector("#add-checklist-item");
var checklistSubmitBtn = document.querySelector("#checklist-submit");
var checklistEl = document.querySelector(".checklist");

var checklistArray = [];

function init() {
    // Get stored checklist from local storage
    var storedChecklist = JSON.parse(localStorage.getItem("checklist"));

    // Updates checklist array if there was a stored checklist from local storage
    if (storedChecklist !== null) {
        checklistArray = storedChecklist;
    }

    renderChecklist();
}

// Renders checklist items as <li> elements
function renderChecklist() {
    checklistEl.innerHTML = "";

    for (var i = 0; i < checklistArray.length; i++) {
        var checklistItemText = checklistArray[i];

        var checklistItem = document.createElement("label");
        checklistItem.classList.add("checkbox");
        checklistItem.innerHTML = "<input type='checkbox' id='individualCheckbox' data-index='" + i + "'>" + checklistItemText;
        checklistEl.appendChild(checklistItem);
    }
}

// Stores checklist array in local storage
function storeChecklist() {
    localStorage.setItem("checklist", JSON.stringify(checklistArray));
}

// When user clicks submit after typing checklist item
checklistSubmitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var item = addChecklistItemEl.value.trim();
    
    // Returns from function early if item is blank
    if(item === "") {
        return;
    }

    // Adds checklist item to checklist array and clears input box
    checklistArray.push(item);
    addChecklistItemEl.value = "";

    storeChecklist();
    renderChecklist();
});

// Retrieves any data from local storage and loads (if there are any)
init();

checklistEl.addEventListener("click", function(event) {
    var element = event.target;
  
    // Checks if element is a checkbox
    if (element.matches("#individualCheckbox") === true) {
      // Get its data-index value and remove the checklist element from the list
      var index = element.getAttribute("data-index");
      console.log(index);
      checklistArray.splice(index, 1);
      console.log(checklistArray);
  
      // Store updated checklist array in localStorage, re-render the list
      storeChecklist();
      renderChecklist();
    }
  });