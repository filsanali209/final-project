document.addEventListener('DOMContentLoaded', () => {
    const recipes = [
        { name: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.', link: 'carbonara.html' },
        { name: 'Chicken Tikka Masala', description: 'A popular Indian curry made with grilled chunks of chicken enveloped in a creamy tomato sauce.', link: 'tikka-masala.html' },
        { name: 'Beef Stroganoff', description: 'A Russian dish of sautéed pieces of beef served in a sauce with smetana (sour cream).', link: 'stroganoff.html' },
        { name: 'Vegetarian Pizza', description: 'A delicious pizza topped with bell peppers, olives, onions, and mushrooms.', link: 'vegetarian-pizza.html' }
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
            recipeItem.innerHTML = `<h3><a href="${recipe.link}">${recipe.name}</a></h3><p>${recipe.description}</p>`;
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

    displayRecipes(recipes);
});