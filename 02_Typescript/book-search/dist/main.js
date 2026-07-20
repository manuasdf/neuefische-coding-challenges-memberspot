"use strict";
// const InputField = document.getElementById("search-input") as HTMLInputElement;
const InputForm = document.getElementById("search-form");
const BookList = document.getElementById("book-list");
InputForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(formElement);
    const query = formData.get("query");
    const response = await fetchBooks(query);
    setList(response);
});
function setList(data) {
    BookList.innerHTML = ``;
    data.forEach((book) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${book.title} by ${book.authors.split(',')[0]}`;
        BookList.append(listItem);
    });
}
async function fetchBooks(term) {
    const url = `https://www.dbooks.org/api/search/${term}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.books;
}
// Update Text on Button Click
const helloBtn = document.getElementById("helloBtn");
const output = document.getElementById("output");
helloBtn.addEventListener("click", () => {
    output.innerHTML = `Hello from TypeScript!`;
});
// Input and Display
const nameInput = document.getElementById("nameInput");
const submitBtn = document.getElementById("submitBtn");
const displayName = document.getElementById("displayName");
submitBtn.addEventListener("click", () => {
    displayName.innerHTML = `${nameInput.value}`;
});
// Toggle Visibility
const toggleBtn = document.getElementById("toggleBtn");
const hiddenText = document.getElementById("hiddenText");
toggleBtn.addEventListener("click", () => {
    if (hiddenText.style.display === "none") {
        hiddenText.style.display = "block";
    }
    else {
        hiddenText.style.display = "none";
    }
});
// Add Items to List + Delete Items from List
const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");
addBtn.addEventListener("click", () => {
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteBtn";
    deleteButton.innerText = "Delete Item";
    deleteButton.addEventListener("click", () => {
        deleteButton.parentElement?.remove();
    });
    listItem.innerHTML = itemInput.value + "&nbsp;";
    listItem.appendChild(deleteButton);
    itemList.append(listItem);
    itemInput.value = "";
});
// Counter with Increment and Decrement
const counter = document.getElementById("counter");
const decreaseBtn = document.getElementById("decreaseBtn");
const increaseBtn = document.getElementById("increaseBtn");
decreaseBtn.addEventListener("click", () => {
    const currentValue = parseInt(counter.innerHTML) - 1;
    counter.innerHTML = currentValue.toString();
});
increaseBtn.addEventListener("click", () => {
    const currentValue = parseInt(counter.innerHTML) + 1;
    counter.innerHTML = currentValue.toString();
});
// Change Background Color
const colorSelect = document.getElementById("colorSelect");
const colorBox = document.getElementById("colorBox");
colorSelect.addEventListener("change", (event) => {
    const selectedColor = colorSelect.options[event.target.selectedIndex].value;
    colorBox.style.backgroundColor = selectedColor;
});
// Bonus Challenge: To-Do App
const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");
addTodo.addEventListener("click", () => {
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete Item";
    deleteButton.addEventListener("click", () => {
        deleteButton.parentElement?.remove();
    });
    const doneCheckbox = document.createElement("input");
    doneCheckbox.type = "checkbox";
    doneCheckbox.addEventListener("change", () => {
        if (doneCheckbox.parentElement) {
            doneCheckbox.parentElement.style.textDecoration = "line-through";
        }
    });
    const listContent = document.createElement("span");
    listContent.innerHTML = todoInput.value + "&nbsp;";
    listItem.appendChild(doneCheckbox);
    listItem.appendChild(listContent);
    listItem.appendChild(deleteButton);
    todoList.append(listItem);
    todoInput.value = "";
});
//# sourceMappingURL=main.js.map