<?php require_once '../models/conexao.php';
	  require_once '../email/email.php';
 
@$URL_= "http://$_SERVER[HTTP_HOST]";

	@$email_recuperacao = $_POST['email_recuperacao'];
	@$stmt = $conn->query("SELECT * FROM conf.usuario WHERE usuario_username = '{$email_recuperacao}' AND active='true' LIMIT 1;");

	if(@$stmt->rowCount()>0){
		$geraToken = bin2hex(random_bytes(150));	

		while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
			 $userId = $row->usuario_id;
			 $userEmail = $row->usuario_username;
			 $userName = $row->usuario_nome.'<br>';
			//echo $geraToken.'<br>';

			@$stmtIns = $conn->query("INSERT INTO conf.usuario_recuperacao( 
										recuperacao_token
										, recuperacao_email
									)VALUES ( 
										'{$geraToken}' 
										, '{$userEmail}'
									);");
		} 
						//
		$corpoEmailRecuperacaoSenha = '<br>
			Prezado(a) '.$userName.' <br><br>
			Clique no link a baixo para redefinir a senha do seu usuário.  <br><br>
			'.$URL_.'/login/recovery_password2.php?recoveryToken='.$geraToken.'&user_id='.$userId.'																						 
			<br><br><br>
			<span style="color:#191970">
			<strong>RO Investimentos</strong><br>
			  (54) xxxx-xxxx<br>
			  roinvestimentosesportivos.com.br
			</span>
			<br><br>

			</div>
			</body>';

	//envia email para usuário 
	//$corpoEmailRecuperacaoSenha = file_get_contents('../email/corpoEmailRecuperacaoSenha.html'); 
  if (smtpmailer($userEmail, 'noreply@roinvestimentosesportivos.com.br', 'RO Investimentos', 'Recuperação de Senha', $corpoEmailRecuperacaoSenha, false)) {
		//Header("index.php"); // Redireciona para uma página de obrigado.
	} if (!empty($error)) echo $error;
	//	 	

} 
 
?>