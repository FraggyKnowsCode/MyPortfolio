<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all fields.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
        exit;
    }

    $to = 'fahadsikder29@gmail.com';
    $email_subject = 'New Contact Form Submission: ' . $subject;
    $email_body = "You have received a new message from your portfolio contact form.\n\n" .
                  "Name: $name\n" .
                  "Email: $email\n" .
                  "Message:\n$message\n";
    $headers = "From: noreply@yourdomain.com\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Thank you for your message. It has been sent.']);
    } else {
        error_log("Mail failed to send from $email");
        echo json_encode(['success' => false, 'message' => 'Sorry, something went wrong. Please try again later.']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>