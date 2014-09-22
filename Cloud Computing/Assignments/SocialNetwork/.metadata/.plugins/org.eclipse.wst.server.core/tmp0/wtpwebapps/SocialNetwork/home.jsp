<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="icon" type="image/png" href="icons/FB.png" />
<title>Social Networking Site by Milson Munakami "Milstein"</title>
<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="js/jquery.validate.min.js"></script>
<link rel="stylesheet" href="css/style.css" type="text/css" />
<script type="text/javascript">
	$(function() {
		$("#update").focus(function() {
			$(this).animate({
				"height" : "50px",
			}, "fast");
			$("#button_bar").slideDown("fast");
			return false;
		});

		// 	$("#update").blur(function() {
		// 			$(this).animate({
		// 				"height" : "30px",
		// 			}, "fast");
		// 			$("#button_bar").slideUp("fast");
		// 			return false;
		// 		});

	});
</script>
<script language="javascript">
	var BASE_URL = "http://localhost:8080/SocialNetwork/";

	onload = function() {
		var url = document.URL;
		getFeed();
	};
	function getFeed() {
		try {
			var request = new XMLHttpRequest();
			request.open("GET", BASE_URL + 'REST/tweet/GetFeeds', false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					var det = eval("(" + request.responseText + ")");
					var content = "";
					for (var int = 0; int < det.length; int++) {
						//alert(det[int].message + det[int].uid + det[int].msg_id);
						content += '<div class="stbody"><div class="sttext"><a title="Delete Update" id='+det[int].msg_id+' href="#" class="stdelete"></a></b>'
								+ det[int].message
								+ '<div class="sttime"><span id="retweet"><a title="Retweet" id='+det[int].msg_id+' class="retweet_button" href="#">Retweet</a></span></div></div></div>';
					}
					document.getElementById("content").innerHTML = content;
				} else {
					document.getElementById("content").innerHTML = "Unable to load the button";
					alert('Error');
				}
			};
			request.send();
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}
</script>
</head>
<body>
	<div id="container">
		<div id="nav_bar">

			<div style="float: right;">
				<table>
					<tr>
						<td><img
							src="http://www.gravatar.com/avatar.php?gravatar_id=e9b0831929db8a935e979dc07750b0d6" /></td>
						<td><a href="logout.jsp">Logout</a></td>
					</tr>
				</table>
			</div>

			<div style='width: 400px; float: left;'>
				<a href="home.jsp">Home</a>&nbsp;|&nbsp; <a href="show_user.jsp">Users</a>&nbsp;|&nbsp;

				<a href="profile.jsp?id=1">Profile</a>
			</div>
		</div>
		<div id="wall_container">
			<div id="updateboxarea">
				<form id="updateStatus" action="REST/tweet/PostMessage"
					method="POST">
					<div style="margin-bottom: 5px; font-weight: bold;">
						<img src="icons/2.png">&nbsp;Update Status
					</div>
					<textarea name="update" id="update" maxlength="128"
						placeholder="What's on your mind ?" title="What's on your mind ?" required></textarea>
					<div id="button_bar" style="width: 100%; clear: both;">
						<br> <input type="submit" value=" Update " id="update_button"
							class="update_button">
					</div>
				</form>
			</div>
			<%
				String message = request.getParameter("msg");
				if (message != null) {
			%>
			<div id="flashmessage">
				<div align="center" class="error_msg">Status updated
					successfully!</div>
			</div>
			<%
				}
			%>
			<div id="content"></div>
		</div>
		<div id="footer">
			&copy; Milson Munakami | <b><a href="http://www.milson.com.np"
				target="_blank">Milstein</a></b>
		</div>
	</div>
</body>
</html>