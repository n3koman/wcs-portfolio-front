// login.js

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform login validation (you can replace this with your backend authentication logic)
    const isValidLogin = await validateLogin(username, password);

    if (isValidLogin) {
        window.location.href = 'admin-page.html';
    } else {
        alert('Invalid login credentials. Please try again.');
    }
}

async function validateLogin(username, password) {
    // You should implement your backend authentication logic here
    // For simplicity, let's assume a hardcoded username and password
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password';

    return username === hardcodedUsername && password === hardcodedPassword;
}
