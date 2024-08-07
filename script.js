document.addEventListener('DOMContentLoaded', () => {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [
        { name: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.', ingredients: ['eggs', 'cheese', 'pancetta', 'pepper'], method: 'Cook pancetta. Mix with eggs and cheese. Combine with pasta and pepper.' },
        { name: 'Chicken Tikka Masala', description: 'A popular Indian curry made with grilled chunks of chicken enveloped in a creamy tomato sauce.', ingredients: ['chicken', 'tomato sauce', 'cream', 'spices'], method: 'Marinate chicken. Grill chicken. Cook with tomato sauce and cream.' },
        { name: 'Beef Stroganoff', description: 'A Russian dish of sautéed pieces of beef served in a sauce with smetana (sour cream).', ingredients: ['beef', 'sour cream', 'onions', 'mushrooms'], method: 'Cook beef. Add onions and mushrooms. Stir in sour cream.' },
        { name: 'Vegetarian Pizza', description: 'A delicious pizza topped with bell peppers, olives, onions, and mushrooms.', ingredients: ['pizza dough', 'bell peppers', 'olives', 'onions', 'mushrooms'], method: 'Prepare dough. Add toppings. Bake in oven.' }
    ];

    const recipeList = document.getElementById('recipes');
    const searchBar = document.getElementById('search-bar');
    const subscribeForm = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email');

    function displayRecipes(recipes) {
        recipeList.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeItem = document.createElement('li');
            recipeItem.className = 'recipe-item';
            recipeItem.innerHTML = `<a href="${recipe.name.toLowerCase().replace(/ /g, '-')}.html">${recipe.name}</a>`;
            recipeList.appendChild(recipeItem);
        });
    }

    function filterRecipes() {
        const query = searchBar.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));
        displayRecipes(filteredRecipes);
    }

    searchBar.addEventListener('input', filterRecipes);

    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        if (validateEmail(email)) {
            alert('Thank you for subscribing!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const recipeForm = document.getElementById('recipe-form');
    if (recipeForm) {
        recipeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('recipe-name').value;
            const description = document.getElementById('recipe-description').value;
            const ingredients = document.getElementById('recipe-ingredients').value.split(',');
            const method = document.getElementById('recipe-method').value;

            const newRecipe = { name, description, ingredients, method };
            recipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            alert('Recipe added successfully!');
            recipeForm.reset();
            generateRecipePage(newRecipe);
        });
    }

    function generateRecipePage(recipe) {
        const pageContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${recipe.name}</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="details.html">Details</a></li>
                    <li><a href="recipe-form.html">Recipe Form</a></li>
                </ul>
            </nav>
            <header>
                <h1>${recipe.name}</h1>
            </header>
            <main>
                <section>
                    <h2>Ingredients</h2>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </section>
                <section>
                    <h2>Method</h2>
                    <p>${recipe.method}</p>
                </section>
                <button onclick="goBack()">Back to Home</button>
            </main>
            <footer>
                <p>&copy; 2024 Recipe Finder</p>
            </footer>
            <script>
                function goBack() {
                    window.location.href = 'index.html';
                }
            </script>
        </body>
        </html>
        `;

        const blob = new Blob([pageContent], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${recipe.name.toLowerCase().replace(/ /g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    displayRecipes(recipes);
});