<?php

// echo $_POST['Email_Address'];
// echo "was the first post item processed?";
if(isset($_POST['Email_Address'])) {
	// echo "inside the if";
	require('./mail_settings.php');

	// echo "loaded mail settings";

	function died($error) {
		echo "Sorry, but there were error(s) found with the form you submitted. ";
		echo "These errors appear below.<br /><br />";
		echo $error."<br /><br />";
		echo "Please go back and fix these errors.<br /><br />";
		die();
	}
	
	if(!isset($_POST['Full_Name']) ||
		!isset($_POST['Your_Message']) || 
		!isset($_POST['Email_Address']) 	
		) {
		died('Sorry, there appears to be a problem with your form submission.');		
	}
	
	$email = $_POST['Email_Address']; 
	$full_name = $_POST['Full_Name']; 
	$comments = $_POST['Your_Message']; 
		
	$error_message = "";
	
	$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(preg_match($email_exp,$email)==0) {
  	$error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }
  if(strlen($full_name) < 2) {
  	$error_message .= 'Name field is not correct. Please try another Name.<br />';
  }
  if(strlen($comments) < 2) {
  	$error_message .= 'Please enter your message.<br />';
  }
  
  // echo "initial checks passed";

  if(strlen($error_message) > 0) {
	    echo ($error_message); die;
  	died($error_message);
  }
	$email_message = "Form details below.\r\n";

	// echo "EMAIL_MESSAGE CREATED";
	
	function clean_string($string) {
	  $bad = array("content-type","bcc:","to:","cc:");
	  return str_replace($bad,"",$string);
	}
	
	$email_message .= "Full Name: ". $full_name."\r\n";
	$email_message .= "Message: ". $comments."\r\n";
	$email_message .= "Reply-To: ". $email."\r\n";


// echo "CLEANED MESSAGE FORMED";

$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email."\r\n" ;

mail($email_to, $email_subject, $email_message, $headers);
// echo "MAIL SENT!";

// echo "email message" . $email_message . "\r\n";
// echo "email to" . $email_to . "\r\n";
// echo "email_subject " . $email_subject . "\r\n";
// echo "headers" . $headers . "\r\n";

$thankyou = "http://mikesitu.com/thanks.html";
header("Location: $thankyou");
?>
<script>location.replace('<?php echo $thankyou;?>')</script>
<?php
}
die();
?>