<?php
// csrf_token.php (Token Generator)
session_start();
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>

<!-- saveuser.php (Registration Handler) -->
<?php
session_start();
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        die("Invalid CSRF token");
    }

    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();

    header("Location: signin.html");
    exit;
}
?>

<!-- signin.php (Login Handler) -->
<?php
session_start();
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        die("Invalid CSRF token");
    }

    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            header("Location: dashboard.html");
            exit;
        }
    }
    header("Location: signin.html?error=invalid");
}
?>

<!-- auth_check.php -->
<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: signin.html");
    exit;
}
?>

<!-- dashboard.html (Protected Page Example) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="css/dashboard.css">
</head>
<body>
    <?php include 'auth_check.php'; ?>
    <h1>Welcome to the Dashboard</h1>
    <a href="logout.php">Logout</a>
</body>
</html>

<!-- logout.php -->
<?php
session_start();
session_destroy();
header("Location: signin.html");
exit;
?>

