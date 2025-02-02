// Hämtar elementen från DOM
const burgerMenu = document.getElementById('burger');
const nav = document.getElementById('nav');

// Hanterar klick på hamburgermenyn
burgerMenu.addEventListener('click', function () {
    nav.classList.toggle('hidden'); // Växlar mellan synlig/dold meny
});

// Hanterar skärmstorleksändringar för att menyn inte ska ligga kvar öppen om man 
// går fram och tillbaka mellan desktop och mobil
window.addEventListener('resize', function () {
    if (window.innerWidth < 600) {
        nav.classList.add('hidden');
    }
});
