<?php

namespace phpBlog\blog;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

class MailManager
{
  public string $name;
  public string $email;
  public string $message;

  public function __construct($name, $email, $message)
  {
    $this->name = $name;
    $this->email = $email;
    $this->message = $message;
  }

  public function sendMail(): bool
  {
    $mail = new PHPMailer(true);
    $from = $this->email;
    $to = 'contact@quentincvl.fr';
    $name = $this->name;

    try {
      //Server settings
      $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
      $mail->isSMTP();                                            //Send using SMTP
      $mail->Host       = 'smtp.ionos.fr';                     //Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
      $mail->SMTPDebug   = false;                                   //Enable SMTP Debug
      $mail->Username   = 'contact@quentincvl.fr';                     //SMTP username
      $mail->Password   = '###########';                               //SMTP password
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
      $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
      $mail->CharSet    = 'UTF-8';

      //Recipients
      $mail->setFrom('contact@quentincvl.fr', $this->name);
      $mail->addAddress('contact@quentincvl.fr', 'Contact - Quentin Cuvelier');
      $mail->addReplyTo($from, $this->name);


      //Content
      $mail->isHTML(true);
      $mail->Subject = 'Contact from ' . $this->name;
      $mail->Body    = $this->message . '<br/> Envoyé par : '.$from;
      $mail->AltBody = $this->message;

      return $mail->send();
    } catch (\Exception $e) {
      throw new \Exception("Mailer Error: {$mail->ErrorInfo}");
    }
  }
}
