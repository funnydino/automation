<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';
  require 'phpmailer/src/SMTP.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language');
  $mail->IsHTML(true);

  // Настройки SMTP
  $mail->isSMTP();
  $mail->SMTPAuth = true;
  $mail->SMTPDebug = 0;

  $mail->Host = 'ssl://smtp.timeweb.ru';
  $mail->Port = 465;
  $mail->Username = 'admin@vorotakgd.ru';
  $mail->Password = 'U2ph7U8Q';
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

  // Настройки DKIM:

  $mail->DKIM_domain = "vorotakgd.ru";
  $mail->DKIM_private = "./dkim_key/rsa.private";
  $mail->DKIM_selector = "mainkey";
  $mail->DKIM_passphrase = "";
  $mail->DKIM_identifier = $mail->From;

  // От кого письмо:
  $mail->setFrom('admin@vorotakgd.ru', 'FunnyDino');
  // Кому отправить:
  $mail->addAddress('funnydino1@gmail.com');
  // Тема письма:
  $mail->Subject = 'Новое личное сообщение';

  // Тело письма:
  $body = '<h1>Получена новая заявка с сайта ИП Семенюк А. И.</h1>';

  if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
  }
  if(trim(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
  }
  if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
  }

  $mail->Body = $body;

  // Отправляем:
  if (!$mail->send()) {
    $message = 'Ошибка :(';
  } else {
    $message = 'Заявка отправлена.';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>