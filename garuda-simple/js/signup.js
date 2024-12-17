const form = document.getElementById('registration-form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordStrength = document.getElementById('password-strength');

// Kriteria untuk mengevaluasi kekuatan password
const criteria = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /[0-9]/,
    specialChar: /[!@#$%^&*]/,
    minLength: /^.{8,}$/
};

// Fungsi untuk menghitung kekuatan password
function checkPasswordStrength(password) {
    let strength = 0;

    // Memeriksa kriteria password
    if (criteria.lowercase.test(password)) strength++;
    if (criteria.uppercase.test(password)) strength++;
    if (criteria.number.test(password)) strength++;
    if (criteria.specialChar.test(password)) strength++;
    if (criteria.minLength.test(password)) strength++;

    return strength;
}

// Menangani input password
passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    const strength = checkPasswordStrength(value);

    // Menentukan teks dan kelas berdasarkan kekuatan password
    if (strength <= 2) {
        passwordStrength.textContent = 'Lemah';
        passwordStrength.className = 'weak'; // Menambahkan kelas untuk efek warna
    } else if (strength === 3 || strength === 4) {
        passwordStrength.textContent = 'Sedang';
        passwordStrength.className = 'medium'; // Menambahkan kelas untuk efek warna
    } else if (strength === 5) {
        passwordStrength.textContent = 'Kuat';
        passwordStrength.className = 'strong'; // Menambahkan kelas untuk efek warna
    }
});

// Verifikasi apakah password cocok dengan konfirmasi password
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (passwordInput.value === confirmPasswordInput.value) {
        // Form akan dikirimkan setelah validasi
        form.submit();
    } else {
        alert('Kata sandi tidak cocok!');
    }
});
