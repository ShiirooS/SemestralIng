const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';
function generateRecipes() {
    const ingredients = JSON.parse(localStorage.getItem('ingredients'));

    if (!ingredients || ingredients.length === 0) {
        alert('No se encontraron ingredientes. Regresa y añade ingredientes.');
        window.location.href = 'indexIngredientes.html';
        return;
    }
    const prompt = `Genera 4 recetas creativas utilizando los siguientes ingredientes: ${ingredients.join(
        ', '
    )}. Cada receta debe incluir:
    - Título.`;

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al comunicarse con la API');
            }
            return response.json();
        })
        .then(data => {
            const rawResponse = data.choices[0].message.content.trim();
            const recipes = processRecipes(rawResponse);

            displayRecipes(recipes);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al generar las recetas. Inténtalo de nuevo.');
        });
}

function processRecipes(rawResponse) {
    const recipeBlocks = rawResponse.split('\n\n');
    return recipeBlocks.map(block => {
        const lines = block.split('\n');
        const title = lines[0]?.replace('Título: ', '').trim();
        return { title };
    });
}

function displayRecipes(recipes) {
    const grid = document.getElementById('recipe-grid');
    grid.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <div>
            <h3>${recipe.title}</h3>
            </div>
        `;
        grid.appendChild(recipeDiv);
    });
}

function goBack() {
    window.location.href = 'indexIngredientes.html';
}
