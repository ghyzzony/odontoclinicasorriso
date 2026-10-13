<?php if (!isset($_SESSION)) session_start();

		session_start();
        session_destroy($_SESSION['usuario_id']); 
        session_destroy($_SESSION['usuario_username']); 
        session_destroy($_SESSION['usuario_nome']); 
        session_destroy($_SESSION['usuario_perfil']);            
        session_destroy();
        header("location: ../"); exit;
 

 //Iniciando a sessão:
//if (session_status() !== PHP_SESSION_ACTIVE) {  //Definindo o prazo para a cache expirar em 60 minutos.
//  session_cache_expire(60);
//  session_start();}/
?>