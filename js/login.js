document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const categorySelect = document.getElementById('category-select');
    const usernameInput = document.getElementById('txt-username');
    const passwordInput = document.getElementById('txt-password');
    const invalidCredentialsMsg = document.getElementById('msg-invalid-credentials');
    const loginButton = document.getElementById('btn-login');

    const mockCredentials = {
        admin: {
            username: 'admin',
            password: 'admin123'
        },
        staff: {
            username: 'staff',
            password: 'staff123'
        }
    };

    loginButton.addEventListener('click', (event) => {
        event.preventDefault();

        const selectedCategory = categorySelect.value;
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (username === '' || password === '' || selectedCategory === 'Select category') {
            invalidCredentialsMsg.textContent = 'All fields are required!';
            invalidCredentialsMsg.style.display = 'block';
            return;
        }

        if (mockCredentials[selectedCategory] &&
            mockCredentials[selectedCategory].username === username &&
            mockCredentials[selectedCategory].password === password) {
            invalidCredentialsMsg.style.display = 'none';
            
            // Store authentication status in local storage
            localStorage.setItem('authenticatedUser', selectedCategory);
            window.location.href = selectedCategory + '.html'; 
        } else {
            invalidCredentialsMsg.textContent = 'Username or password is incorrect!';
            invalidCredentialsMsg.style.display = 'block';
        }
    });
});
