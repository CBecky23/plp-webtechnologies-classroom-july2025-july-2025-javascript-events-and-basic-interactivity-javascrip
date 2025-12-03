document.addEventListener('DOMContentLoaded', () => {
    
  
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    
    themeToggleBtn.addEventListener('click', () => {
        // Toggle the 'dark-mode' class on the body element
        body.classList.toggle('dark-mode');
        
        // Change button text based on mode
        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = '☀️ Light Mode';
        } else {
            themeToggleBtn.textContent = '🌙 Dark Mode';
        }
    });

    /* --- Feature 2: Collapsible FAQ (Accordion) --- */
    const faqQuestions = document.querySelectorAll('.faq-question');

    // Loop through all FAQ buttons and add click listeners
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle 'active' class for styling
            this.classList.toggle('active');

            // Select the answer div (the next sibling element)
            const answer = this.nextElementSibling;

            // Logic to expand or collapse the content
            if (answer.style.maxHeight) {
                // If it is open, close it (remove max-height)
                answer.style.maxHeight = null;
            } else {
                // If closed, set max-height to its scrollHeight (actual height)
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // ==========================================
    // PART 3: FORM VALIDATION
    // ==========================================

    const form = document.getElementById('signup-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const successMessage = document.getElementById('success-message');

    // Listen for the 'submit' event on the form
    form.addEventListener('submit', (e) => {
        // 1. Prevent the default browser submission (page reload)
        e.preventDefault();

        // 2. Run validation checks
        const isUsernameValid = checkUsername();
        const isEmailValid = checkEmail();
        const isPasswordValid = checkPassword();
        const isConfirmValid = checkConfirmPassword();

        // 3. If all checks pass, show success message
        if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid) {
            successMessage.classList.remove('hidden');
            // Optional: clear form
            // form.reset(); 
        } else {
            successMessage.classList.add('hidden');
        }
    });

    // --- Validation Helper Functions ---

    // Validate Username: Must be at least 3 chars
    function checkUsername() {
        let valid = false;
        const min = 3;
        const usernameVal = username.value.trim(); // Remove whitespace

        if (!isRequired(usernameVal)) {
            showError(username, 'Username cannot be blank.');
        } else if (usernameVal.length < min) {
            showError(username, `Username must be at least ${min} characters.`);
        } else {
            showSuccess(username);
            valid = true;
        }
        return valid;
    }

    // Validate Email: Uses Regex
    function checkEmail() {
        let valid = false;
        const emailVal = email.value.trim();
        if (!isRequired(emailVal)) {
            showError(email, 'Email cannot be blank.');
        } else if (!isEmailValid(emailVal)) {
            showError(email, 'Email is not valid.');
        } else {
            showSuccess(email);
            valid = true;
        }
        return valid;
    }

    // Validate Password: At least 8 chars, 1 uppercase, 1 number
    function checkPassword() {
        let valid = false;
        const passwordVal = password.value.trim();
        
        // Regex: At least 8 chars, 1 lowercase, 1 uppercase, 1 number
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

        if (!isRequired(passwordVal)) {
            showError(password, 'Password cannot be blank.');
        } else if (!passwordRegex.test(passwordVal)) {
            showError(password, 'Password must have 8+ chars, 1 uppercase, & 1 number.');
        } else {
            showSuccess(password);
            valid = true;
        }
        return valid;
    }

    // Validate Confirm Password: Must match Password
    function checkConfirmPassword() {
        let valid = false;
        const confirmVal = confirmPassword.value.trim();
        const passwordVal = password.value.trim();

        if (!isRequired(confirmVal)) {
            showError(confirmPassword, 'Please confirm your password.');
        } else if (passwordVal !== confirmVal) {
            showError(confirmPassword, 'Passwords do not match.');
        } else {
            showSuccess(confirmPassword);
            valid = true;
        }
        return valid;
    }

    // --- Utility Functions ---

    // Check if value is empty
    const isRequired = value => value === '' ? false : true;

    // Regex check for email format
    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // Show Error: add 'error' class, remove 'success', set message text
    const showError = (input, message) => {
        const formField = input.parentElement;
        // remove success class
        formField.classList.remove('success');
        // add error class
        formField.classList.add('error');
        // show the error message
        const error = formField.querySelector('small');
        error.textContent = message;
    };

    // Show Success: add 'success' class, remove 'error', clear message
    const showSuccess = (input) => {
        const formField = input.parentElement;
        formField.classList.remove('error');
        formField.classList.add('success');
        const error = formField.querySelector('small');
        error.textContent = '';
    };
});
