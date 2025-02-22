class RegistrationForm {
    constructor() {
        this.stateList = [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
            "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
            "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
            "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
            "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
            "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
            "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
            "Ladakh", "Lakshadweep", "Puducherry"
        ];

        this.stateSearchInput = document.getElementById('state-search');
        this.registrationForm = document.querySelector('.register-form');
        this.suggestionBox = this.createSuggestionBox();

        this.initEvents();
    }

    createSuggestionBox() {
        const box = document.createElement('div');
        box.id = 'suggestion-box';
        box.style.position = 'absolute';
        box.style.border = '1px solid #ccc';
        box.style.backgroundColor = '#fff';
        box.style.zIndex = '1000';
        box.style.display = 'none';
        document.body.appendChild(box);
        return box;
    }

    initEvents() {
        this.stateSearchInput.addEventListener('input', () => this.showSuggestions());
        document.addEventListener('click', (event) => this.hideSuggestions(event));
        this.registrationForm.addEventListener('submit', (event) => this.registerUser(event));
    }

    showSuggestions() {
        const query = this.stateSearchInput.value.toLowerCase();
        this.suggestionBox.innerHTML = '';
        this.suggestionBox.style.display = 'none';

        if (query) {
            const suggestions = this.stateList.filter(state => state.toLowerCase().includes(query));
            
            suggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.textContent = suggestion;
                item.style.padding = '8px';
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    this.stateSearchInput.value = suggestion;
                    this.suggestionBox.style.display = 'none';
                });
                this.suggestionBox.appendChild(item);
            });

            if (suggestions.length > 0) {
                const rect = this.stateSearchInput.getBoundingClientRect();
                this.suggestionBox.style.left = `${rect.left + window.scrollX}px`;
                this.suggestionBox.style.top = `${rect.bottom + window.scrollY}px`;
                this.suggestionBox.style.width = `${rect.width}px`;
                this.suggestionBox.style.display = 'block';
            }
        }
    }

    hideSuggestions(event) {
        if (!this.stateSearchInput.contains(event.target) && !this.suggestionBox.contains(event.target)) {
            this.suggestionBox.style.display = 'none';
        }
    }

    registerUser(event) {
        event.preventDefault();

        const user = {
            fullName: document.getElementById('full-name').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value.trim(),
            state: this.stateSearchInput.value.trim(),
            district: document.getElementById('district').value.trim(),
            landSize: document.getElementById('land-size').value.trim(),
            landType: document.getElementById('land-type').value.trim(),
            crops: document.getElementById('crops').value.trim(),
            challenges: document.getElementById('challenges').value.trim()
        };

        if (Object.values(user).some(value => !value)) {
            alert('Please fill in all required fields.');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(u => u.email === user.email)) {
            alert('Email is already registered. Please use a different email.');
            return;
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful!');
        this.registrationForm.reset();
    }
}

// Initialize the registration functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => new RegistrationForm());
