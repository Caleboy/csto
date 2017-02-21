<?php
    header('Content-Type:text/html;Charset=utf-8');
    $useremail=$_POST['username'];

    // echo $useremail;

    try{
        $pdo=new PDO('mysql:host=localhost;dbname=blizzard','root','');
        $sql="SELECT * FROM `caleb` WHERE `email`=:email";
        $stmt=$pdo->prepare($sql);
        $stmt->bindParam(":email",$useremail,PDO::PARAM_STR);
        $stmt->execute();
        // echo $stmt->rowCount();
        if($stmt->rowCount()){
            echo 1;
        }else{
            echo 2;
        }
    }catch(PDOException $e){
        echo $e->message();
    }

