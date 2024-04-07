const ITEMS_CONTAINER = document.getElementById("items");
const ITEMS_TEMPLATE = document.getElementById("itemTemplate");
const BUTTON_ADD = document.getElementById("add");
const BUTTON_CLEAR = document.getElementById("clear");

let items = getItems(); // let=items has the value of const=value (array: key, value - as JSON object)

function getItems() {
    const value = localStorage.getItem("to-do") || "[]";
    //function fetches the information stored in local storage
    //("to-do") is the key name, and where the local storage has list items stored
    //this function keeps the list items on the page even when the page is refreshed
    // ||"[]" is the condition - or have an empty array. this is for users visiting the page for the first time and don't have any items stored

    //console.log(value);

    return JSON.parse(value);
}

function setItems(items){ //funtion that passes in the items array
    const itemsJSON = JSON.stringify(items) //puts the items array and putting it back into JSON string
    // needs to be in a JSON string in order for it to be put in local storage

    localStorage.setItem("to-do", itemsJSON);
}


//////The logic for adding a new item
function addItem() {
    items.unshift ({   //unshift put the new input at the top, adds to the array top first, and is an object
        description: "",
        completed: false
    });

    setItems(items); //saves added item to local storage
    refreshList();
}

//////The logic to save the text put in the list
function updateItem(item, key, value) {
    item[key] = value;

    setItems(items);
    refreshList();
}


//////The logic to refresh the page and change the html so it has the new data when items are added/ changed in the list
function refreshList() {

    ITEMS_CONTAINER.innerHTML = "";

    for (const item of items) { //for...of loop interates over content of an object/ array
        //const=item could have any name

        const itemElement = ITEMS_TEMPLATE.content.cloneNode(true); // takes the ITEM_TEMPLATE (html <template>, takes the content within <div class="item" and make a copy)
        const descriptionInput = itemElement.querySelector(".item-description"); //use DOM, tap into the html <div class="item-description">
        const checkInput = itemElement.querySelector(".item-completed");

        descriptionInput.value = item.description; 
        //the content in <div class="item-description> is now filled in the items object 

        checkInput.checked = item.completed;
        //boolean connection for the checkbox

        descriptionInput.addEventListener("change", () => {
            updateItem(item, "description", descriptionInput.value)
        });

        checkInput.addEventListener("change", () => {
            updateItem(item, "completed", checkInput.checked)
        });


        ITEMS_CONTAINER.append(itemElement);
        //append() adds content of parameter to the array

    }
}


    function clearList() {
        // Clear the items array
        items = [];
    
        // Clear local storage
        localStorage.removeItem("to-do");
    
        // Refresh the displayed list
        refreshList();
}




BUTTON_CLEAR.addEventListener("click", () => {
    clearList();
});

BUTTON_ADD.addEventListener("click", () => {
    addItem();
} )

refreshList();