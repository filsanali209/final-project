document.addEventListener('DOMContentLoaded', () => {
    const recipes = [
        { name: 'Spaghetti Carbonara', link: 'carbonara.html' },
        { name: 'Chicken Tikka Masala', link: 'tikka-masala.html' },
        { name: 'Beef Stroganoff', link: 'stroganoff.html' },
        { name: 'Vegetarian Pizza', link: 'vegetarian-pizza.html' },
        { name: 'Pancakes', link: 'pancakes.html' },
        { name: 'Margarita Pizza', link: 'margarita-pizza.html' },
        { name: 'Lemon Garlic Shrimp', link: 'lemon-garlic-shrimp.html' },
        { name: 'Beef Tacos', link: 'beef-tacos.html' },
        { name: 'Caesar Salad', link: 'caesar-salad.html' },
        { name: 'Chocolate Cake', link: 'chocolate-cake.html' }
    ];

    const recipeList = document.getElementById('recipes');
    const searchBar = document.getElementById('search-bar');
    const searchResults = document.getElementById('search-results');
    const subscribeForm = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email');
    const searchButton = document.getElementById('search-button');
    const recipeForm = document.getElementById('recipe-form');
    const feedbackMessage = document.getElementById('feedback-message');

    
    // Display frequently searched recipes
    const popularRecipes = [
        { name: 'Spaghetti Carbonara', link: 'carbonara.html' },
        { name: 'Chicken Tikka Masala', link: 'tikka-masala.html' },
        { name: 'Beef Stroganoff', link: 'stroganoff.html' },
        { name: 'Vegetarian Pizza', link: 'vegetarian-pizza.html' }
    ];
    
    function displayPopularRecipes() {
        recipeList.innerHTML = '';
        popularRecipes.forEach(recipe => {
            const recipeItem = document.createElement('li');
            recipeItem.innerHTML = `<a href="${recipe.link}">${recipe.name}</a>`;
            recipeList.appendChild(recipeItem);
        });
    }

    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        if (results.length === 0) {
            searchResults.style.display = 'none';
            return;
        }
        const ul = document.createElement('ul');
        results.forEach(recipe => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${recipe.link}">${recipe.name}</a>`;
            ul.appendChild(li);
        });
        searchResults.appendChild(ul);
        searchResults.style.display = 'block';
    }

    function filterRecipes() {
        const query = searchBar.value.toLowerCase();
        if (query.length === 0) {
            searchResults.style.display = 'none'; // Hide dropdown when search bar is empty
            return;
        }
        const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));
        displaySearchResults(filteredRecipes);
    }

    searchBar.addEventListener('input', filterRecipes);

    searchButton.addEventListener('click', () => {
        const query = searchBar.value.toLowerCase();
        const recipe = recipes.find(recipe => recipe.name.toLowerCase() === query);
        if (recipe) {
            window.location.href = recipe.link;
        } else {
            alert('No matching recipe found.');
        }
    });

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

    displayPopularRecipes();


    // Event listener for form submission
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Get form values
        const name = document.getElementById('recipe-name').value;
        const description = document.getElementById('recipe-description').value;
        const ingredients = document.getElementById('recipe-ingredients').value;
        const method = document.getElementById('recipe-method').value;

        // Display the confirmation message
        feedbackMessage.innerHTML = `
            <p>Thank you! Your recipe "<strong>${name}</strong>" has been submitted successfully.</p>
        `;

        // Optionally clear the form
        recipeForm.reset();
    });

});
