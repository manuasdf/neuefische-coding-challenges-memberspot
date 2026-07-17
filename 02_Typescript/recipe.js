"use strict";
const recipe_1 = {
    name: "Lasange",
    servings: 4,
    vegetarian: false,
    ingredients: [
        {
            name: "Pasta",
            amountGrams: 300
        },
        {
            name: "Meat",
            amountGrams: 400
        },
        {
            name: "Tomato Paste",
            amountGrams: 500
        }
    ]
};
const recipe_2 = {
    name: "Rucola Salad",
    servings: 2,
    vegetarian: true,
    ingredients: [
        {
            name: "Rucola",
            amountGrams: 200
        },
        {
            name: "Cherry Tomatoes",
            amountGrams: 150
        },
        {
            name: "Olive Oil",
            amountGrams: 4
        }
    ]
};
function summarize(recipe) {
    let line = "";
    line += `Name: ${recipe.name}, `;
    line += `Servings: ${recipe.servings}, `;
    line += `Vegetarian: ${recipe.vegetarian ? "Yes" : "No"}, `;
    line += `Ingredients: `;
    recipe.ingredients.forEach((ingredient) => {
        line += `${ingredient.name} (${ingredient.amountGrams}), `;
    });
    return line;
}
console.log(summarize(recipe_1));
console.log(summarize(recipe_2));
