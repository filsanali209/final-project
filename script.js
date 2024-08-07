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
            displayRecipes(recipes);
        });
    }

    displayRecipes(recipes);
});