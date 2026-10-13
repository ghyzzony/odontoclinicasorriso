<?php if (!isset($_SESSION)) session_start();  

//expira a sessão depois de x minutos com sistema parado
if(isset($_SESSION['last_action'])){ 
    $secondsInactive = time() - $_SESSION['last_action']; 
    if($secondsInactive >= 7200){ 
        session_unset();
        session_destroy($_SESSION['usuario_id']); 
        session_destroy($_SESSION['usuario_username']); 
        session_destroy($_SESSION['usuario_nome']); 
        session_destroy($_SESSION['usuario_perfil']);  
        session_destroy();
    }    
} 
$_SESSION['last_action'] = time();
//end session expire

//safety of pages
if (!isset($_SESSION['usuario_id']) /* OR ($_SESSION['usuario_perfil'] != null)*/){
		session_destroy($_SESSION['usuario_id']); 
        session_destroy($_SESSION['usuario_username']); 
        session_destroy($_SESSION['usuario_nome']); 
        session_destroy($_SESSION['usuario_perfil']); 
        session_destroy();
        header("location: ../"); exit;
} ?>



<?PHP
/*
// Verifica se nao ha a variavel da sessao que identifica o usuario
if (!isset($_SESSION['usuario_id']) OR ($_SESSION['usuario_perfil'] > @$nivel_necessario)) {
    // Destroi a sessao por segurança
    //echo '<script>alert("você não tem permissão para isso!!"); window.history.back();</script>';
    session_destroy();
    // Redireciona o visitante de volta pro login
    header("Location: ../../index.php"); exit;
}

*/
?>