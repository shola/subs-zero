<?php

$to = $_POST['inputEmail'];
$subject = $_POST['inputSubject'];
$body = $_POST['inputBody'];
$from = "mike@mikesitu.com";
$headers = "From:" . $from;


mail($to, $subject, $body, $headers);