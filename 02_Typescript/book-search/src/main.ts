interface Book {
    id: number,
    title: string,
    subtitle: string,
    authors: string,
    image: string,
    url: string
}

interface SearchResult {
    status: string,
    total: number, 
    books: Book[]
}


// const InputField = document.getElementById("search-input") as HTMLInputElement;
const InputForm = document.getElementById("search-form") as HTMLFormElement;
const BookList = document.getElementById("book-list") as HTMLDivElement;

InputForm.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const query = formData.get("query") as string;
    const response: Book[] = await fetchBooks(query);
    setList(response);
})

function setList(data: Book[]): void {
    BookList.innerHTML = ``;
    data.forEach((book) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${book.title} by ${book.authors.split(',')[0]}`
        BookList.append(listItem);
    })
}

async function fetchBooks(term: string): Promise<Book[]> {
    const url = `https://www.dbooks.org/api/search/${term}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.books as Book[];
}

// Update Text on Button Click

const helloBtn = document.getElementById("helloBtn") as HTMLButtonElement;
const output = document.getElementById("output") as HTMLDivElement;

helloBtn.addEventListener("click", () => {
    output.innerHTML = `Hello from TypeScript!`;
});

// Input and Display

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const displayName = document.getElementById("displayName") as HTMLDivElement;

submitBtn.addEventListener("click", () => {
    displayName.innerHTML = `${nameInput.value}`;
});

// Toggle Visibility

const toggleBtn = document.getElementById("toggleBtn") as HTMLButtonElement;
const hiddenText = document.getElementById("hiddenText") as HTMLDivElement;

toggleBtn.addEventListener("click", () => {
    if (hiddenText.style.display === "none") {
        hiddenText.style.display = "block";
    } else {
        hiddenText.style.display = "none";
    }
});

// Add Items to List + Delete Items from List

const itemInput = document.getElementById("itemInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const itemList = document.getElementById("itemList") as HTMLDivElement;

addBtn.addEventListener("click", () => {
    const listItem = document.createElement("li");

    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteBtn";
    deleteButton.innerText = "Delete Item";
    deleteButton.addEventListener("click", () => {
        deleteButton.parentElement?.remove();
    })

    listItem.innerHTML = itemInput.value + "&nbsp;";
    listItem.appendChild(deleteButton);
    itemList.append(listItem);
    itemInput.value = "";
});

// Counter with Increment and Decrement

const counter = document.getElementById("counter") as HTMLDivElement;
const decreaseBtn = document.getElementById("decreaseBtn") as HTMLButtonElement;
const increaseBtn = document.getElementById("increaseBtn") as HTMLButtonElement;

decreaseBtn.addEventListener("click", () => {
    const currentValue = parseInt(counter.innerHTML) - 1;
    counter.innerHTML = currentValue.toString();
})
increaseBtn.addEventListener("click", () => {
    const currentValue = parseInt(counter.innerHTML) + 1;
    counter.innerHTML = currentValue.toString();
})

// Change Background Color

const colorSelect = document.getElementById("colorSelect") as HTMLSelectElement;
const colorBox = document.getElementById("colorBox") as HTMLDivElement;

colorSelect.addEventListener("change", (event) => {
    const selectedColor = colorSelect.options[(event.target as HTMLSelectElement).selectedIndex].value;
    colorBox.style.backgroundColor = selectedColor;
})

// Bonus Challenge: To-Do App

const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const addTodo = document.getElementById("addTodo") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLDivElement;

addTodo.addEventListener("click", () => {
    const listItem = document.createElement("li");

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete Item";
    deleteButton.addEventListener("click", () => {
        deleteButton.parentElement?.remove();
    })

    const doneCheckbox = document.createElement("input");
    doneCheckbox.type = "checkbox";
    doneCheckbox.addEventListener("change", () => {
        if (doneCheckbox.parentElement) {
            doneCheckbox.parentElement.style.textDecoration = "line-through";
        }
    })

    const listContent = document.createElement("span");
    listContent.innerHTML = todoInput.value + "&nbsp;";

    listItem.appendChild(doneCheckbox);
    listItem.appendChild(listContent);
    listItem.appendChild(deleteButton);

    todoList.append(listItem);
    todoInput.value = "";
});