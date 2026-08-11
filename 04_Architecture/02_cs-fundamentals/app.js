"use strict";
const state = {
    backStack: [],
    forwardStack: [],
    currentValue: "",
};
const textInput = document.getElementById("textInput");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
function updateUI() {
    textInput.value = state.currentValue;
    undoBtn.disabled = state.backStack.length === 0;
    redoBtn.disabled = state.forwardStack.length === 0;
}
function pushToBackStack(value) {
    state.backStack.push(value);
}
function pushToForwardStack(value) {
    state.forwardStack.push(value);
}
function popFromBackStack() {
    return state.backStack.pop();
}
function popFromForwardStack() {
    return state.forwardStack.pop();
}
function handleInputChange(newValue) {
    pushToBackStack(state.currentValue);
    // Clear forward stack on new input
    state.forwardStack = [];
    state.currentValue = newValue;
    updateUI();
}
function handleUndo() {
    if (state.backStack.length === 0)
        return;
    const previousValue = popFromBackStack();
    if (previousValue === undefined)
        return;
    pushToForwardStack(state.currentValue);
    state.currentValue = previousValue;
    updateUI();
}
function handleRedo() {
    if (state.forwardStack.length === 0)
        return;
    const nextValue = popFromForwardStack();
    if (nextValue === undefined)
        return;
    pushToBackStack(state.currentValue);
    state.currentValue = nextValue;
    updateUI();
}
textInput.addEventListener("input", (e) => {
    const target = e.target;
    handleInputChange(target.value);
});
undoBtn.addEventListener("click", handleUndo);
redoBtn.addEventListener("click", handleRedo);
updateUI();
