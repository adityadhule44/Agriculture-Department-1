class SignIn {
    constructor() {
        this.signinForm = document.querySelector('.signin-form');
        this.initEventListeners();
    }

    initEventListeners() {
        if (this.signinForm) {
            this.signinForm.addEventListener('submit', (event) => this.handleSignIn(event));
        }
    }

    handleSignIn(event) {
        event.preventDefault(); // Prevent form submission

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the user exists
        const user = users.find(user => user.email === email);

        if (!user) {
            alert('User not registered. Redirecting to registration page.');
            window.location.href = 'registration.html';
            return;
        }

        // Validate password
        if (user.password !== password) {
            alert('Incorrect password. Please try again.');
            return;
        }

        alert('Sign-in successful!');
        window.location.href = 'Mainpage.html';
    }
}

// Initialize the SignIn class when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new SignIn();
});
