<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Social Networking Site by Milson Munakami "Milstein"</title>
<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="js/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/jquery.tipsy.js"></script>
<script type="text/javascript" src="js/validateindex.js"></script>

<link rel="stylesheet" href="css/style.css" type="text/css" />
<link rel="stylesheet" href="css/tipsy.css" type="text/css" />
</head>
<script language="javascript">
	$(function() {
		var userSession =
<%=session.getAttribute("userid")%>
	;
		if (userSession != null) {
			window.location = 'home.jsp';
		} 
	});
</script>

<body>
	<div class="index_container">
		<div>
			<img src="icons/header.jpg" id="header">
		</div>
		<div id="form_holder">
			<div class="form_login">
				<h3>Curious? Sign in fast.</h3>
				<form id="signinForm" action="REST/user/login" method="POST">
					<label for="signin_email">Email/ Username :</label>
					<div>
						<input id="signin_email" type="text" name="email" class="input"
							minlength="2" required>
					</div>
					<br /> <label for="signin_password">Password :</label>
					<div>
						<input id="signin_password" type="password" name="password"
							class="input" minlength="5" maxlength="12" required>
					</div>
					<div>
						<input type="submit" value="Sign In" class="btn signin_btn">
					</div>
				</form>
				<%
					String message = request.getParameter("msg");
					if (message != null) {
				%>
				<br />
				<div class="error_msg" id="divemailpwdverify">Email and
					Password do not match.</div>
				<%
					}
				%>
			</div>

			<div class="form_signup">
				<h2>Stay connected</h2>
				<h3>It's free and always will be.</h3>

				<form id="signupForm" action="REST/user/Register" method="POST">
					<label for="first_name">First name :</label>
					<div>
						<input id="first_name" type="text" name="firstname" class="input"
							minlength="2" required>
					</div>
					<label for="last_name">Last name :</label>
					<div>
						<input id="last_name" type="text" name="lastname" class="input"
							minlength="2" required>
					</div>
					<br /> <label for="username">User name :</label>
					<div>
						<input id="username" type="username" name="username" class="input"
							required>
					</div>
					<br /> <label for="signup_email">Email Address :</label>
					<div>
						<input id="signup_email" type="email" name="email" class="input"
							required>
					</div>
					<br /> <label for="signup_password">Password :</label>
					<div>
						<input id="signup_password" type="password" name="password"
							class="input" minlength="5" maxlength="12" required>
					</div>
					<div>
						<input type="submit" value="Sign Up" class=".btn signup_btn">
					</div>
				</form>
				<%
					String error = request.getParameter("error");
					if (error != null) {
				%>
				<br />
				<div class="error_msg" id="divemailalready">Username/ Email
					address already registered.</div>
				<%
					}
				%>
			</div>

		</div>
		<div id="footer">
			&copy; Milson Munakami | <b><a href="http://www.milson.com.np"
				target="_blank">Milstein</a></b>
		</div>
	</div>
</body>
</html>