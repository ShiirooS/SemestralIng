let selectedIngredients = [];

function addIngredientFromDropdown(categoryId) {
    const dropdown = document.getElementById(categoryId);
    const selectedValue = dropdown.value;

    if (selectedValue && !selectedIngredients.includes(selectedValue)) {
        selectedIngredients.push(selectedValue);
        updateIngredientList();
        dropdown.selectedIndex = 0; // Resetea el menú desplegable
    } else if (selectedIngredients.includes(selectedValue)) {
        alert('Este ingrediente ya está seleccionado.');
    }
}

function updateIngredientList() {
    const list = document.getElementById('ingredient-list');
    list.innerHTML = ''; 

    selectedIngredients.forEach((ingredient, index) => {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add('ingredient');

        ingredientDiv.innerHTML = `
            <p>${ingredient}</p>
            <button class="remove" onclick="removeIngredient(${index})">X</button>
        `;
        list.appendChild(ingredientDiv);
    });
}

function removeIngredient(index) {
    selectedIngredients.splice(index, 1);
    updateIngredientList();
}

function goToRecipes() {
    if (selectedIngredients.length < 3) {
        alert('Por favor, selecciona al menos 3 ingredientes antes de continuar.');
        return;
    }
    localStorage.setItem('ingredients', JSON.stringify(selectedIngredients));
    window.location.href = 'recetas.html';
}
