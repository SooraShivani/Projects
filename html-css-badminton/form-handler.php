<?php
$name = $_POST['name'];
$visitor_email = $_POST['email']
$program = $_POST['coaching_program'];
$message = $_POST['message'];

$email_from = 'badminton.academy@blore.com';

$email_subject = 'New Form Submission';

$email_body = "User Name: $name. \n".
"User Email: $visitor_email. \n".
"Coaching Program: $program. \n".
"User Message: $message. \n";

$to = 'soorashivani.s@gmail.com';

$headers = "From: $email_from \r\n";

$headers .= "Reply-To: $visitor_email \r\n";

mail($to, $email_subject, $email_body, $headers);

header("Location: contact.html");
?>