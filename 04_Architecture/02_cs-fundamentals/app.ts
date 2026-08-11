interface EditState {
    backStack: string[];
    forwardStack: string[];
    currentValue: string;
}

const state: EditState = {
    backStack: [],
    forwardStack: [],
    currentValue: "",
};

const textInput = document.getElementById("textInput") as HTMLInputElement;
const undoBtn = document.getElementById("undoBtn") as HTMLButtonElement;
const redoBtn = document.getElementById("redoBtn") as HTMLButtonElement;

function updateUI(): void {
    textInput.value = state.currentValue;
    undoBtn.disabled = state.backStack.length === 0;
    redoBtn.disabled = state.forwardStack.length === 0;
}

function pushToBackStack(value: string): void {
    state.backStack.push(value);
}

function pushToForwardStack(value: string): void {
    state.forwardStack.push(value);
}

function popFromBackStack(): string | undefined {
    return state.backStack.pop();
}

function popFromForwardStack(): string | undefined {
    return state.forwardStack.pop();
}

function handleInputChange(newValue: string): void {
    pushToBackStack(state.currentValue);
    // Clear forward stack on new input
    state.forwardStack = [];
    state.currentValue = newValue;
    updateUI();
}

function handleUndo(): void {
    if (state.backStack.length === 0) return;

    const previousValue = popFromBackStack();
    if (previousValue === undefined) return;

    pushToForwardStack(state.currentValue);
    state.currentValue = previousValue;
    updateUI();
}

function handleRedo(): void {
    if (state.forwardStack.length === 0) return;

    const nextValue = popFromForwardStack();
    if (nextValue === undefined) return;

    pushToBackStack(state.currentValue);
    state.currentValue = nextValue;
    updateUI();
}

textInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    handleInputChange(target.value);
});

undoBtn.addEventListener("click", handleUndo);
redoBtn.addEventListener("click", handleRedo);

updateUI();
