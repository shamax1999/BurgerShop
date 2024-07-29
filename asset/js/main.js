// Navbar
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}
// Dark Mode
let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if(darkmode.classList.contains('bx-moon')){
        darkmode.classList.replace('bx-moon','bx-sun');
        document.body.classList.add('active');
    }else{
        darkmode.classList.replace('bx-sun','bx-moon');
        document.body.classList.remove('active');
    }
}

// Scroll Reveal
const sr = ScrollReveal ({
    origin: 'top',
    distance: '40px',
    duration: 2000,
    reset: true
});


sr.reveal(`.home-text, .home-img,
            .about-img, .about-text,
            .box, .s-box,
            .btn, .connect-text,
            .contact-box`, {
    interval: 200
})






    document.addEventListener('DOMContentLoaded', function() {
        const toggleButton = document.getElementById('toggle-contact-form');
        const contactForm = document.getElementById('contact-form');
        const formMessage = document.getElementById('form-message');
        
        toggleButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            contactForm.classList.toggle('active'); // Toggle the 'active' class
        });

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Simulate a successful form submission
            setTimeout(() => {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.classList.remove('error');
                
                // Clear form fields (optional)
                contactForm.reset();
            }, 500); // Simulate a delay
        });
    });



