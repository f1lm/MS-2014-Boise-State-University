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
	var BASE_URL = "http://localhost:8080/socialnetworking/";

	var userId =
<%=session.getAttribute("userid")%>
	;

	onload = function() {
		var url = document.URL;
		if (userId == null) {
			window.location = 'index.jsp';
		} else {
			$("a.lnkProfile").attr("href", "profile.jsp?id=" + userId + "");
			getFeed();
		}
	};
	function getFeed() {
		try {
			var request = new XMLHttpRequest();
			request.open("GET", BASE_URL + 'RESTQ/tweet/GetFeeds', false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					var det = eval("(" + request.responseText + ")");
					var content = "";
					if (det.length > 0) {
						for (var i = 0; i < det.length; i++) {
							//alert(det[i].message + det[i].uid + det[i].msg_id);
							content += '<div class="stbody"><div class="sttext"><a title="Delete Update" href="#" class="stdelete" onclick="deleteUpdate('
									+ det[i].msg_id
									+ ');"></a></b>'
									+ det[i].message
									+ '<div class="sttime"><span><a title="Show detail" class="retweet_button" href="#" onclick="showTweetDetail('
									+ det[i].msg_id
									+ ');">Show</a>&nbsp;</span><span><a title="Retweet" class="retweet_button" href="#" onclick="retweetUpdate('
									+ det[i].msg_id
									+ ');">Retweet</a></span></div></div></div>';
						}
					} else {
						content = "No status update so far!";
					}
					document.getElementById("content").innerHTML = content;
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function showTweetDetail(msg_id) {
		try {
			var request = new XMLHttpRequest();
			request.open("GET", BASE_URL + 'RESTQ/tweet/GetMessageDetails'
					+ '?msgid=' + msg_id, false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					alert("This is the tweet you viewing : "
							+ request.responseText);
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function deleteUpdate(msg_id) {
		try {
			var request = new XMLHttpRequest();
			request.open("POST", BASE_URL + 'RESTQ/tweet/DeleteMessage'
					+ '?msgid=' + msg_id + '&uid=' + userId, false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					getFeed();
					alert(request.responseText + " is deleted!");
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function retweetUpdate(msg_id) {
		try {
			var request = new XMLHttpRequest();
			request.open("POST", BASE_URL + 'RESTQ/tweet/RetweetThisMessage'
					+ '?msgid=' + msg_id + '&uid=' + userId, false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					alert(" Retweeted succesfully");
					getFeed();
				} else {
					document.getElementById("content").innerHTML = "Unable to load the button";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function showUsers() {
		try {
			var request = new XMLHttpRequest();
			request
					.open("GET", BASE_URL
							+ 'RESTQ/friendandfollower/GetAllUsers?uid='
							+ userId, false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					var det = eval("(" + request.responseText + ")");
					var content = "";
					if (det.length > 0) {
						for (var i = 0; i < det.length; i++) {
							content += '<div class="userlist"><div><div style="float:right;"><div><a href="#" onclick="doFollow('
									+ det[i]._uid
									+ ')" class="follow"><span class="follow_btn"> Follow </span></a>';
							content += '&nbsp;<a href="#" onclick="doFriend('
									+ det[i]._uid
									+ ')" class="follow"><span class="follow_btn"> Send Friend Request </span></a></div>';
							content += '</div><div class="userlist_body"><a href="profile.jsp?id='
									+ det[i]._uid
									+ '"><b>'
									+ det[i]._firstname
									+ '&nbsp;'
									+ det[i]._lastname
									+ '</b></a></div></div></div>';
						}
					} else {
						content = "No Friends";
					}
					document.getElementById("content").innerHTML = content;
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function doAcceptFriend(frienduid) {
		try {
			var request = new XMLHttpRequest();
			request.open("POST", BASE_URL
					+ 'RESTQ/friendandfollower/ApproveFriendRequest' + '?uid='
					+ userId + '&fuid=' + frienduid, false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					showAllIncomingRequest();
					alert(request.responseText);
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function doFollow(followUserId) {
		try {
			var request = new XMLHttpRequest();
			request.open("POST", BASE_URL + 'RESTQ/friendandfollower/FollowUser'
					+ '?uid=' + userId + '&fuid=' + followUserId, false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					showUsers();
					alert("Followed successfully!");
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function doFriend(friendUserId) {
		try {
			var request = new XMLHttpRequest();
			request.open("POST", BASE_URL
					+ 'RESTQ/friendandfollower/SendFriendRequest' + '?uid='
					+ userId + '&fuid=' + friendUserId, false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					showUsers();
					alert(request.responseText);
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function showAllFriends() {
		try {
			var request = new XMLHttpRequest();
			request.open("GET", BASE_URL
					+ 'RESTQ/friendandfollower/GetAllFriends?uid=' + userId,
					false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					var det = eval("(" + request.responseText + ")");
					var content = "";
					if (det.length > 0) {
						for (var i = 0; i < det.length; i++) {
							content += '<div class="userlist"><div>';
							content += '<div class="userlist_body"><a href="profile.jsp?id='
									+ det[i]._uid
									+ '"><b>'
									+ det[i]._firstname
									+ '&nbsp;'
									+ det[i]._lastname
									+ '</b></a></div></div></div>';
						}
					} else {
						content = "No Friends";
					}
					document.getElementById("content").innerHTML = content;
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function showAllFollowers() {
		try {
			var request = new XMLHttpRequest();
			request.open("GET", BASE_URL
					+ 'RESTQ/friendandfollower/GetAllFollowers?uid=' + userId,
					false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					var det = eval("(" + request.responseText + ")");
					var content = "";
					if (det.length > 0) {
						for (var i = 0; i < det.length; i++) {
							content += '<div class="userlist"><div>';
							content += '<div class="userlist_body"><a href="profile.jsp?id='
									+ det[i]._uid
									+ '"><b>'
									+ det[i]._firstname
									+ '&nbsp;'
									+ det[i]._lastname
									+ '</b></a></div></div></div>';
						}
					} else {
						content = "No Followers";
					}
					document.getElementById("content").innerHTML = content;
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function showAllPendingOutgoingRequests() {
		try {
			var request = new XMLHttpRequest();
			request
					.open(
							"GET",
							BASE_URL
									+ 'RESTQ/friendandfollower/GetAllPendingOutgoingRequests?uid='
									+ userId, false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					var det = eval("(" + request.responseText + ")");
					var content = "";
					if (det.length > 0) {
						for (var i = 0; i < det.length; i++) {
							content += '<div class="userlist"><div>';
							content += '<div class="userlist_body"><a href="profile.jsp?id='
									+ det[i]._uid
									+ '"><b>'
									+ det[i]._firstname
									+ '&nbsp;'
									+ det[i]._lastname
									+ '</b></a></div></div></div>';
						}
					} else {
						content = "No Pending outgoing Friend requests";
					}
					document.getElementById("content").innerHTML = content;
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}

	function showAllIncomingRequest() {
		try {
			var request = new XMLHttpRequest();
			request
					.open(
							"GET",
							BASE_URL
									+ 'RESTQ/friendandfollower/GetAllPendingIncomingRequests?uid='
									+ userId, false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					var det = eval("(" + request.responseText + ")");
					var content = "";
					if (det.length > 0) {
						for (var i = 0; i < det.length; i++) {
							content += '<div class="userlist"><div>';
							content += '<div class="userlist_body"><a href="profile.jsp?id='
									+ det[i]._uid
									+ '"><b>'
									+ det[i]._firstname
									+ '&nbsp;'
									+ det[i]._lastname
									+ '</b></a><div style="float:right;"><div><a href="#" onclick="doAcceptFriend('
									+ det[i]._uid
									+ ')" class="follow"><span class="follow_btn"> Accept Friend Request </span></a></div></div></div></div></div>';
						}
					} else {
						content = "No Pending incoming Friend requests";
					}
					document.getElementById("content").innerHTML = content;
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
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
				<a href="home.jsp">Home</a>&nbsp;|&nbsp; <a href="#"
					onclick="showUsers();">Users</a>&nbsp;|&nbsp; <a href="#"
					onclick="showAllFriends();">Friends</a>&nbsp;|&nbsp; <a href="#"
					onclick="showAllFollowers();">Followers</a>&nbsp;|&nbsp; <a
					href="#" onclick="showAllIncomingRequest();">Incoming Requests</a>&nbsp;|&nbsp;
				<a href="#" onclick="showAllPendingOutgoingRequests();">Outgoing
					Requests</a>&nbsp;|&nbsp; <a class="lnkProfile" href="#">Profile</a>
			</div>
		</div>
		<div id="wall_container">
			<div id="updateboxarea">
				<form id="updateStatus" action="RESTQ/tweet/PostMessage"
					method="POST">
					<div style="margin-bottom: 5px; font-weight: bold;">
						<img src="icons/2.png">&nbsp;Update Status
					</div>
					<textarea name="update" id="update" maxlength="128"
						placeholder="What's on your mind ?" title="What's on your mind ?"
						required></textarea>
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