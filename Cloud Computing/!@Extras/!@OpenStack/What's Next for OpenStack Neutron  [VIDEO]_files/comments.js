var xmlhttp;
var currentPage = 0;

if (window.XMLHttpRequest) // code for Mozilla, etc.
	xmlhttp=new XMLHttpRequest();
else if (window.ActiveXObject) //code for IE
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

function validate_comment() {
	var commentform = document.commentform;
	var errors = new Array();
	var reg1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/; // not valid
	var reg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/; // valid
	var email = commentform.email.value;
	var author = commentform.author.value;
	var commentdetails = commentform.commentdetails.value;
	var key = commentform.key.value;
	var comment_parent = commentform.comment_parent.value;
	var blurbTitle = commentform.blurbTitle.value;
	var recaptcha_challenge_field = commentform.recaptcha_challenge_field.value;
	var recaptcha_response_field = commentform.recaptcha_response_field.value;
		
	if (!author)
	{
	 commentform.author.value = 'anonymous';
	 author = 'anonymous';
	} 
	
	if (!email || reg1.test(email) || !reg2.test(email))
		errors.push('Email');
		
	if (!commentdetails)
		errors.push('Comment');
	
	if (!recaptcha_response_field)
		errors.push('Security code');

	if(errors.length != 0)
	{
		alert("Please fill out the following fields:\n" + errors.join("\n"));
		return false;
	}
	else
	{		
		document.getElementById('ajax_loading_img').style.visibility = 'visible';
		var params = "comment_parent="+comment_parent+"&author="+author+"&email="+email+"&commentdetails="+encodeURIComponent(commentdetails)+"&blurbKey="+key+"&recaptcha_challenge_field="+recaptcha_challenge_field+"&recaptcha_response_field="+recaptcha_response_field+"&title="+blurbTitle;
		xmlhttp.open("POST", '/comment/post', true);
//		//Send the proper header information along with the request
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Content-length", params.length);
		xmlhttp.setRequestHeader("Connection", "close");
		xmlhttp.timeout = 10000;
		xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById('ajax_loading_img').style.visibility = 'hidden';
				var response = eval('('+xmlhttp.responseText+')');
				Recaptcha.reload();
				if(response.status){
					commentform.reset();
					alert(response.Message);
				}else{
					alert(response.Message);
				}
			}
		}
		xmlhttp.ontimeout = timeoutRaised;
		xmlhttp.send(params);
		return false;
	}
}

function timeoutRaised(){
    alert("Check your Internet connection and try again later.");
}


function limitText(limitField, limitCount, limitNum) {
	if (limitField.value.length > limitNum) {
		limitField.value = limitField.value.substring(0, limitNum);
	} else {
		limitCount.value = limitNum - limitField.value.length;
	}
}

function showComments(response){
	var total = response.total;
	if(total){
		document.getElementById('commentCount').innerHTML = response.total;
		var commentStr = "";
		var klass = "even";
		for(var i=0; i<response.comments.length; i++){
			var comment = response.comments[i];
			if(i!=0){
				klass = (klass!="even")?"even":"";
			}
			commentStr += '<div class="comment '+klass+'"><div class="userinfo"><a>By<span class="username">&nbsp;'+comment.ownerName+'</span></a>&nbsp;&nbsp;&nbsp;'+comment.date+'</div>';
			commentStr += '<p>'+comment.comment+'</p><p></p>';
			commentStr += '<div style="width: 100%; margin: 0pt;"><div style="margin: 0pt; text-align: left; float: left;"><a onclick="setReply('+comment.key+');" href="#comment_form"><img border="0" src="http://assets.devx.com/devx/commentReply2.gif"></a><a style="font: bold 7pt arial;" onclick="setReply('+comment.key+');" href="#comment_form">Reply to this comment</a></div>';
			commentStr += '<div style="float: right; margin: 0pt;"><a href="mailto:commentsupport@quinstreet.com?subject=comment '+comment.key+' flagged&amp;body=Comment flagged on '+document.location.href+'" title="header=[Report Offensive Comment] cssheader=[alerttop] cssbody=[alertbot]"><img width="15" height="16" border="0" style="" src="http://assets.devx.com/RIARun/alert_big.gif"></a></div>';
			commentStr += '</div></div>';
			
			if(comment.hasChild){
				for(var j=0; j<comment.childs.length; j++){
					var childComment = comment.childs[j];
					klass = (klass!="even")?"even":"";
					commentStr += '<div class="comment commentChild '+klass+'"><div class="userinfo"><a>By<span class="username">&nbsp;'+childComment.ownerName+'</span></a>&nbsp;&nbsp;&nbsp;'+childComment.date+'</div>';
					commentStr += '<p>'+childComment.comment+'</p><p></p>';
					commentStr += '<div style="float: right; margin: 0pt;"><a href="mailto:commentsupport@quinstreet.com?subject=comment '+childComment.key+' flagged&amp;body=Comment flagged on '+document.location.href+'" title="header=[Report Offensive Comment] cssheader=[alerttop] cssbody=[alertbot]"><img width="15" height="16" border="0" style="" src="http://assets.devx.com/RIARun/alert_big.gif"></a></div>';
					commentStr += '</div></div>';
				}			
			}
						
		}
		document.getElementById('comment_page_container').innerHTML = commentStr;
		
		if(total > 10){
			
			var totalPages = parseInt((total/10) + ((total%10 != 0)?1:0));
			
			var topPagination = '<div style="margin-left: 0px;"><br><div style="float: left; padding-right: 5px; font-weight: bold;">Comment Page:&nbsp;</div>';
			var bottomPagination = '<div style="margin-left: 5px; margin-top: 10px; margin-bottom: 20px;"><div style="float: left; padding-right: 5px;"><strong>More comments ... Page:</strong>&nbsp;</div>';
			for(i=1; i <= totalPages; i++){
				var pageKlass = (currentPage == i)?'color: white; background-color: black;':'';
				topPagination += '<div class="pgnumber_holder"><a style="'+pageKlass+'" onclick="getComments('+i+'); return false;" href="#">'+i+'</a>&nbsp;</div>';
				bottomPagination += '<div class="pgnumber_holder"><a style="'+pageKlass+'" onclick="getComments('+i+'); return false;" href="#">'+i+'</a>&nbsp;</div>';
			}
			topPagination += '</div><div style="clear: both;"></div>';
			document.getElementById('comment_pagination_top').innerHTML = topPagination;
			
			bottomPagination += '</div><div style="clear: both;"></div>';
			document.getElementById('comment_pagination_bottom').innerHTML = bottomPagination;
			
			
			
		}
	}
}

function getComments(page){
	
	if(currentPage == page) return;
	
	currentPage = page;
	var params = "blurbKey="+document.commentform.key.value+"&page="+page;
	xmlhttp.open("POST", '/comment/', true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", params.length);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.timeout = 10000;		
	xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = eval('('+xmlhttp.responseText+')');
			
			showComments(response);
		}
	}
	xmlhttp.ontimeout = timeoutRaised;
	xmlhttp.send(params);
	return false;
}

function setReply(commentID){
	document.getElementById('comment_parent').value = commentID;
}

getComments(1);

