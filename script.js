document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const subscribeForm = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email');

    function filterRecipes() {
        const query = searchBar.value.toLowerCase();
        const recipeItems = document.querySelectorAll('#recipes li a');
        recipeItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.parentElement.style.display = 'block';
            } else {
                item.parentElement.style.display = 'none';
            }
        });
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
});