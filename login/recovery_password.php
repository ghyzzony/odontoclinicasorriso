<?php require_once '../models/conexao.php';
  
@$hojeNow = date("Y-m-d H:i");

@$recoveryToken = $_GET['recoveryToken']; 
@$user_id = $_GET['user_id']; 

//@$recoveryToken = 'f1cae54ad9b41cc5c81c0ed5b789996ab1b1517d4cf56d0e159834de2b0f68645756c7f17050d7a90a417b090c8a96c7045b'; 
	//@$stmt = $conn->query("SELECT * FROM conf.usuario_recuperacao WHERE recuperacao_token = '{$recoveryToken}'");
	@$stmt = $conn->query("SELECT * 
													FROM conf.usuario_recuperacao 
												 WHERE recuperacao_token = '{$recoveryToken}'");
	
	if(@$stmt->rowCount()>0){
		while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
			@$hojeBanco = (new DateTime($row->date_time_create))->format('Y-m-d H:i');

			$timestamp = strtotime($hojeBanco) + 60*10;  //pega hora do envio do email esqueci a senha e adiciona mais 10 minutos
			$hojeBancoFormated = strftime('%Y-%m-%d %H:%M', $timestamp); // 24 - 12 - 2016, 10:45
			//@$usuario_id = $row->usuario_id;
 
 			if($hojeNow <= $hojeBancoFormated){

              $stmt11 = $conn->query("UPDATE 
                    conf.usuario
                SET
                    active = true
                    , usuario_status = 1
                WHERE
                    usuario_id = '{$user_id}';
              ");         

              echo '<br><center><h3>Parabens, Sua conta foi ativada!!</h3><br><br><br></center>';
              echo '<center><a href="../account.html">Clique Aqui para acessar a conta.</a></center>';
              //header('Location:../account.html');

			}else{
				echo 'Não autorizado!';
			}
		}	
	} 


//echo $hojeBanco;
//echo '<br>';
//echo $hojeBancoFormated;

?>
 
<script type="text/javascript">
	function validaSenha (input){ 
      if (input.value != document.getElementById('recuperasenha').value) {
      input.setCustomValidity('Repita a senha corretamente');
    }else{
      input.setCustomValidity('');
    }
  } 
</script>