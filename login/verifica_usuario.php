<?php

session_start(); //inicia a sessao
require_once '../models/conexao.php';

$usuario = $_POST['usuario'];
$senha = md5($_POST['senha']);

if((!$usuario) || (!$senha) || (!filter_var($usuario, FILTER_VALIDATE_EMAIL))){  
    //echo "Por favor, todos campos devem ser preenchidos! <br /><br />";
    header("location: ../account.php?authentication=fail");  
}else{
    $stmt = $conn->query("SELECT * FROM conf.usuario WHERE usuario_username = '{$usuario}' AND usuario_senha = '{$senha}' AND active='true' AND usuario_status=1;");
        
    if($stmt->rowCount()>0){
        
        while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
            //echo $row->usuario_nome;

            foreach ($row as $key => $val){
                $$key = stripslashes( $val );
            }
            
            $_SESSION['usuario_id'] = $usuario_id;
            $_SESSION['usuario_username'] = $usuario_username;
            $_SESSION['usuario_nome'] = $usuario_nome;
            $_SESSION['usuario_perfil'] = $usuario_perfil; 

            //salva log no banco quando sucesso
            /*$stmtLog = $conn->query("INSERT INTO log.usuario_login(usuario_login_usuario_id, usuario_login_data_hora, usuario_login_username, usuario_login_status_login) 
                                     VALUES ('$usuario_id', (now()), '$usuario_username', 'sucesso');");*/
            
            //if($usuario_perfil == 2){
                header("location: ../conta/"); 
            //}
                
        }
    }else{
        //echo "Login Invalido! <br /><br />";

        //salva log no banco quando Falha
        /*$stmtLog = $conn->query("INSERT INTO log.usuario_login(usuario_login_data_hora, usuario_login_username, usuario_login_status_login) 
                                 VALUES ((now()), '$usuario', 'falha');");*/
        
        //include "../index.php";
    header("location: ../account.php?authentication=fail"); 
    }
    
} ?>