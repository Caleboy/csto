<?php
    header('Content-Type:text/html;Charset=utf-8');
    $email=$_POST['username'];
    $password=$_POST['password'];

    try{
        $pdo=new PDO('mysql:host=localhost;dbname=blizzard','root','');
        $sql="SELECT * FROM `caleb` WHERE `email`=:email AND `password`=:password";
        $stmt=$pdo->prepare($sql);
        $stmt->bindParam(":email",$email,PDO::PARAM_STR);
        $stmt->bindParam(":password",$password,PDO::PARAM_STR);
        $stmt->execute();
        if($stmt->rowCount()){
            echo 1;
        }else{
            echo 2;
        }
    }catch(PDOException $e){
        echo $e->message();
    }

