document.querySelector('.btn-login').addEventListener('click', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Read data from a text file (simulate with JS)
    fetch('users.txt')
        .then(response => response.text())
        .then(data => {
            const users = data.split('\n');
            let found = false;
            users.forEach(user => {
                const [savedEmail, savedPassword] = user.split(',');
                if (savedEmail === email && savedPassword === password) {
                    found = true;
                    window.location.href = "dashboard.html"; // Redirect to dashboard
                }
            });
            if (!found) alert("Invalid credentials");
        })
        .catch(error => console.error('Error:', error));
});
