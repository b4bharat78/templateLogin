<!DOCTYPE html>
<html >
<head>
<meta charset="UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="description" content="Ro-Pro User Interface">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>

<title>Login Form</title>
<link rel="stylesheet" href="css/style.css">

</head>
<body>
<div class="login">
		<div class="login-screen">
			<div class="app-title">
				<h1>Login</h1>
			</div>

			<div class="login-form">
			<div class="red bolder center">${error}</div>
				<div class="control-group">
				<form role="form" method="post" name="loginForm" action="login" autocomplete="off">
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                        
				<input type="text" class="login-field" name="userName" id="userName" placeholder="username">
				<label class="login-field-icon fui-user" for="login-name"></label>
				</div>

				<div class="control-group">
				<input type="password" class="login-field" name="password" id="password" placeholder="password">
				<label class="login-field-icon fui-lock" for="login-pass"></label>
				
				</div>

				<!-- <a class="btn btn-primary btn-large btn-block" href="#">login</a> -->
				<button type="submit" class="btn btn-primary btn-large btn-block" name="loginBtn" id="loginBtn">Login <span class="glyphicon glyphicon-log-in"></span></button>
				<a class="login-link" href="#">Lost your password?</a>
				</form>
			</div>
		</div>
	</div>
    <!-- jQuery -->
    <script src="js/jquery.min.js"></script>

	<!-- Our JavaScript -->
    <script src="js/login.js"></script>
    
</body>
</html>
