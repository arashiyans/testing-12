<?php
// Konfigurasi koneksi database
$host = 'localhost';
$username = 'root'; // default XAMPP username
$password = ''; // default XAMPP password
$dbname = 'garuda_db';

$conn = new mysqli($host, $username, $password, $dbname);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Enkripsi password

    // Siapkan query untuk memasukkan data user
    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $password);

    // Eksekusi query dan periksa hasilnya
    if ($stmt->execute()) {
        echo 'Pendaftaran berhasil!';
    } else {
        echo 'Terjadi kesalahan. Silakan coba lagi.';
    }

    $stmt->close();
}

$conn->close();
?>
