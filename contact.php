---
layout: default
---

<?php session_start();
include "./libs/class.smtp.php";
include "./libs/class.phpmailer.php";
include "./simple-php-captcha.php";

//SMTP/Mail server settings
$SMTP_SERVER = ''; 
$SMTP_PORT = ''; 
$SMTP_USER = '';
$SMTP_PASS =  '';  
$FROM_EMAIL = '';
$FROM_NAME = '';
$TO_EMAIL = '';

//Website name
$WEBSITE = "";

//Airtable related setting
$API_KEY = '{{site.airtable.apikey}}';

//Airtable API URL
$AIRTABLE_URL = "https://api.airtable.com/v0/{{ site.airtable.contact }}/Contact_Responses";

$message = '';

if (empty($_POST['send'])){
    $_SESSION['captcha'] = simple_php_captcha();
}


if(isset($_POST) and $_POST['send'] == "Send" ) {
    $name = mysql_escape_string($_POST['name']);
    $email = mysql_escape_string($_POST['email']);   
    $phone = mysql_escape_string($_POST['phone']);  
    $message = mysql_escape_string($_POST['message']);     
    $error = array();
    $captcha = mysql_escape_string($_POST['captcha']);    

    if (strtolower($captcha) == strtolower($_SESSION['captcha']['code'])) {

	    if(empty($name) ||  empty($email) ){
		$error['mail'] = "Name or Email value missing!!";
	    }   
	    
	    if(count($error) == 0){
			//send email
			$msg = "";
			$msg .= "Someone visited the church website and left you a message:\n\n";
			$msg .= "Message from: ".$name."\n";
			$msg .= "Email: ".$email."\n";
			$msg .= "Phone: ".$phone."\n\n";
			$msg .= "----------------------\n\n";
			$msg .= $message;
			
			$mail = new PHPMailer();
			$mail->IsSMTP();
			$mail->SMTPAuth = true;
			//$mail->SMTPSecure = "tls";
			//$mail->SMTPDebug = true;
		
			$mail->Host = $SMTP_SERVER;
			$mail->Port = $SMTP_PORT;
			$mail->Username = $SMTP_USER;
			$mail->Password = $SMTP_PASS;
				
			$mail->SetFrom($FROM_EMAIL, $FROM_NAME);
			$mail->AddReplyTo("", "");
		    
			$mail->Subject = "New message from the church website: ".$WEBSITE;

			$mail->AddAddress($TO_EMAIL, $TO_EMAIL);
		
			$mail->Body = $msg;
			if ($mail->Send()) {
			    $emailmsg = "Email sent.";
			}
		
			//post to airtable api
			$data_to_post =  '{
				    "fields": {
				    "Name": "'.$name.'",
				    "Email": "'.$email.'",';
			if(!empty($phone)){
			    $data_to_post .= '"Phone Number": "'.$phone.'",';
			}
			if(!empty($message)){
			    $data_to_post .= '"Message": "'.$message.'"';
			}	    
			$data_to_post .= '
				}
			  }';
			  
			//print $data_to_post; 
			  
			$request_headers = array();
			$request_headers[] = 'Authorization: Bearer '. $API_KEY;
			$request_headers[] = 'Content-type: application/json';

			$curl = curl_init();
			curl_setopt($curl,CURLOPT_URL, $AIRTABLE_URL);
			curl_setopt($curl,CURLOPT_POST, sizeof($data_to_post));
			curl_setopt($curl,CURLOPT_POSTFIELDS, $data_to_post);
			curl_setopt($curl, CURLOPT_HTTPHEADER, $request_headers);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			$result = curl_exec($curl);

			//print_r($result);

			curl_close($curl);
			
			$arr = json_decode($result, true);
			if ($arr['error']){
			    $emailmsg .= "ERROR sending data to Airtable.";
			} else {
			    $emailmsg .= "Data posted to Airtable.";
			}
		
		} else {
			print "Either Name or email missing.";
		}
	} else {
	    print "Incorrect CAPTCHA input.";
	    //$_SESSION['captcha'] = $_POST['cap'];
	}	
 }   
?>
<html>
<head>
    <meta charset="utf-8">
    <title>Airtable data insert demo</title>
</head>
<body>
<form action="" method="POST">
<table border='1'>
<?php
 if (!empty($emailmsg)){
?>
<tr><td>
</td><td><?php print $emailmsg; ?></td></tr><br/>
<?php     
 }
?>  
<input type="hidden" id="cap" name="cap" value = '<?php print $_SESSION['captcha'];?>'/>  
<tr><td>Name:
</td><td><input type="text" id="name" name="name" /></td></tr><br/>
<tr><td>Email:
</td><td><input type="text" id="email" name="email" /></td></tr><br/>
<tr><td>Phone:
</td><td><input type="text" id="phone" name="phone" /></td></tr><br/>
<tr><td>Message: 
</td><td><textarea name="message" rows="5" cols="50"></textarea></td></tr><br/>
<tr><td><img src = '<?php echo $_SESSION['captcha']['image_src']; ?>'>
</td><td>Pls type the displayed characters in the text box<input type="text" id="captcha" name="captcha" ></td></tr><br/>
<tr><td>&nbsp;</td><td>
<input  name="send" id="send" type="submit" value="Send" /></td></tr>
</table>
</form>
</body>
</html>	


<div class="informed-header">
 {% include header.html %}
  <div class="main-content">

      <div class="normal-page">
       <h2>{{ site.data.involved[0].Page_Heading }}</h2>
    <article class="ministry-update">
        {% if  site.data.involved[0].Featured_Image %}
        {% for img in site.data.involved[0].Featured_Image %}
        <a href="#" class="featured_image">
        <img src="{{img.url}}" alt="" class="thumbnail"></a><!--/featured_image-->
        {% endfor %}
        {% endif %}

        {{ site.data.involved[0].Content | markdownify }}
      
    </article><!--/ministry-update-->
    </div><!--/archives-page-->
    </div><!--/informed-header-->
  </div><!--/main-content-->
