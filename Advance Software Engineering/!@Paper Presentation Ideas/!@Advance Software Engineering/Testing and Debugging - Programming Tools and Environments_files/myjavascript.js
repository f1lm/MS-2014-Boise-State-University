
// !!!!!!! RATING PROCESS 

	function changepassword(uid,currentpass,pass1,pass2)
	{
	
		if(currentpass == '')
		{
		alert("please type current password");
		return;
		}
		
		if(pass1 == '')
		{
		alert("please type New Password");
		return;
		}
		if(pass2 == '')
		{
		alert("please type Confirm Password");
		return;
		}
		if(pass1 != pass2)
		{
		alert("Password mismatch");
		return;
		}
				
		cp.call(baseurl+'ajax/myajaxphp.php','changepassword',return_changepassword,currentpass,pass1,uid);
		
	}

function return_changepassword(result)
{
var msg=result.getElementsByTagName('a').item(0).firstChild.data;
if(msg == 0)
{
document.getElementById('change-succ').style.display = "none";
document.getElementById('change-fail').style.display = "block";
}
else
{
document.getElementById('change-succ').style.display = "block";
document.getElementById('change-fail').style.display = "none";
}

}
function showMore(id)
{
if(id == 1)
{
	showMe('statistics');
	if(document.getElementById('showstat').innerHTML != "Less Info...")
	document.getElementById('showstat').innerHTML = "Less Info...";
	else
	{
	document.getElementById('showstat').innerHTML = "More Info...";
	hideMe('statistics');
	}
	//showMe('lessStat');
}
 
}
function scrollToWindow(id)
  {
   var xpos= document.getElementById(id);    
   window.scrollTo(0,xpos.offsetTop);
   
      document.getElementById('otherre').style.display = "none";
   document.getElementById('download').style.display = "inline";
   
      document.getElementById('relatedpres').style.height = '250px';
   document.getElementById('ppt-link').style.display = "inline";
   mixpanel.track('SS Download Button');
   
  }
function Sliderv(id)
{
	if(id == 'hide')
	{
	showMe('showslider');
	hideMe('topslider');
	
	}
	else
	{
		showMe('topslider');
		hideMe('showslider');
	}
}
function ShowswfDownload(scrollid)
{
   var xpos= document.getElementById(scrollid);    
   window.scrollTo(0,xpos.offsetTop);
   document.getElementById('download-swf').style.display = "inline";
   document.getElementById('download').style.display = "none";
      document.getElementById('swf-link').style.display = "inline";
   document.getElementById('ppt-link').style.display = "none";
}
 
function DeleteAccount(uid)
{
	/*if(pass == '')
	{
	alert("please type current password");
	return;
	}*/
	
	var conf = confirm("Are you sure you want to delete this account?");
	if(conf == true)
	cp.call(baseurl+'ajax/myajaxphp.php','delete_useraccount',return_delete_useraccount,uid);
	else
	return;
}

function return_delete_useraccount(result)
{
var msg=result.getElementsByTagName('a').item(0).firstChild.data;
if(msg == 0)
{
document.getElementById('pass-incorrect').style.visibility = "visible";
}
else
{
window.location = 'logout.php';
}

}

	function fxRate(vkey,rate,idToHide,idToShow,vid){

		cp.call(baseurl+'ajax/myajaxphp.php','process_data',return_data,rate,vid);

		hideMe(idToHide);		
		showMe(idToShow);

	}



			function return_data(restul){

				

				// Collect the number of BLUE star

			var cnt=restul.getElementsByTagName('trate').item(0).firstChild.data;				

					hideMe('idViewVoteResult');

			if(cnt!='exist')

			{

				// # Show the vote 

				var x=document.getElementById('idVoteView').rows[0].cells;

					x[1].innerHTML=restul.getElementsByTagName('tvote').item(0).firstChild.data;



				

					

					if(cnt>6)

					{

						cnt=6;

					}	

					else if (cnt<0)

					{

						cnt=0;

					}

					

					blank_star=6-cnt;



					var x=document.getElementById('tblViewResult').rows[0].cells;

					

					for (i=0;i<cnt;i++ )

					{

							x[i].innerHTML='<img src='+imgurl+'/star.gif>';

					}

					

					for (j=cnt;j<5;j++ )

					{

							x[j].innerHTML='<img src=' + imgurl+'/blank_star.gif>';

					}

			}

			else

			{

				var x=document.getElementById('voteProcessthank').innerHTML="<FONT COLOR=#FF0000 >You already vote this video</FONT>";

			}

				

				return false;

			}

// RATING PROCESS END  





// !!!!!!! My voting process 



		function fxVote(voteId)

		{

				voteAnswer=document.getElementById('opAns').value;

		

				if(voteAnswer=='')

				{

					alert('Select any one');

				}

				else

				{

						cp.call(baseurl+'/ajax/myajaxphp.php','process_Vote',return_vote_result,voteId,voteAnswer);

				}

		}

					function return_vote_result(result)

					{

					var xx=result.getElementsByTagName('result').item(0).firstChild.data;

					if (xx=='1'){

							count=result.getElementsByTagName('count').item(0).firstChild.data;

							for (var  ii=0; ii<count  ; ii++ ){



								 var vv='A1'+ii;

								 var pp='P1'+ii;	

								

								vv=result.getElementsByTagName(vv).item(0).firstChild.data;

								pp=result.getElementsByTagName(pp).item(0).firstChild.data;

								

								// # Generate Voring table

								var tt=document.getElementById('tblVoteResult').insertRow(0);

								var y=tt.insertCell(0);

								var z=tt.insertCell(1);

								y.innerHTML=vv;

								z.innerHTML=pp +'%';

							

								if(vv==""){

									break;

								}

							}

							insertInToTable('tblPResult', 0,0,'Vote result');

							// # Hide the previous tale

							hideMe('divviewvresult');

							hideMe('tblVote');



					}

					else if(xx>1)

					{

						insertInToTable('tblPResult', 0,0,'<font color=#FF0000><B>Sorry you already voted..</B></FONT>');

						viewVote(xx);

							// # Hide the previous table

							//showMe('divviewvresult');

							hideMe('tblVote');

					}

				}





 // END



 // VIEW VOTE

function viewVote(pollId)

{

		cp.call(baseurl+'/ajax/myajaxphp.php','view_vote',return_view_vote,pollId);

}

		function return_view_vote(result){

			var xx;

			if (1){

					count=result.getElementsByTagName('count').item(0).firstChild.data;

					for (var  ii=0; ii<count  ; ii++ ){



						 var vv='A1'+ii;

						 var pp='P1'+ii;	

						

						vv=result.getElementsByTagName(vv).item(0).firstChild.data;

						pp=result.getElementsByTagName(pp).item(0).firstChild.data;

						

						// # Generate Voring table

						var tt=document.getElementById('tblViewVoteResult').insertRow(0);

						var y=tt.insertCell(0);

						var z=tt.insertCell(1);

						y.innerHTML=vv;

						z.innerHTML=pp +'%';

					

				if(vv==""){

					break;

				}

			}

			insertInToTable('tblViewVote', 0,0,'Current vote status');

		}

		

	}
/*********************************************************************************************/
//document.write('');
function getpopupobj()
{
	if (document.getElementById) 
		return document.getElementById("userdetail").style; 
	else if (document.all) 
		return document.all.trailimagid.style;
		}
function getpopupobjnostyle()
{
	if (document.getElementById) 
		return document.getElementById("userdetail"); 
	else if (document.all) 
		return document.all.trailimagid;
}
function popup(idToHide,commentId,uid,vid)
{

var scrolledX, scrolledY; 
if( self.pageYoffset ) { 
scrolledX = self.pageXoffset; 
scrolledY = self.pageYoffset; 
} else if( document.documentElement && document.documentElement.scrollTop ) { 
scrolledX = document.documentElement.scrollLeft; 
scrolledY = document.documentElement.scrollTop; 
} else if( document.body ) { 
scrolledX = document.body.scrollLeft; 
scrolledY = document.body.scrollTop; 
} 

// Next, determine the coordinates of the center of browser's window 

var centerX, centerY; 
if( self.innerHeight ) { 
centerX = self.innerWidth; 
centerY = self.innerHeight; 
} else if( document.documentElement && document.documentElement.clientHeight ) { 
centerX = document.documentElement.clientWidth; 
centerY = document.documentElement.clientHeight; 
} else if( document.body ) { 
centerX = document.body.clientWidth; 
centerY = document.body.clientHeight; 
} 

// Xwidth is the width of the div, Yheight is the height of the 
// div passed as arguments to the function: 
var leftoffset = scrolledX + (centerX - 475) / 2; 

myPos = findPos(document.getElementById('login_pos'));
var topoffset = myPos[1];//scrolledY + (centerY - 200) / 2; 

// The initial width and height of the div can be set in the 
// style sheet with display:none; divid is passed as an argument to // the function 
	getpopupobj().left=leftoffset+"px";
	getpopupobj().top=topoffset+"px";//document.getElementById("comment-login").innerHTML;
	newHTML = '<table width="100%" height="100%" border="1"><tr><td align="center" valign="middle" width="100%" height="100%"><div class="blue_box_popup">          <div class="blue_box_title"><strong>Login</strong> <a style="float:right;" href="javascript:void(0);" onClick="login_close()"> Close</a>        </div>          <input type="hidden" name="vid" value="+vid+">          <input type="hidden" name="idToHide" value="+idToHide+">   <div id="error_msg" style="color: #D8000C;background-color: #FFBABA;visible="none""></div>       <input type="hidden" name="comment_value" value="+comment_value+">          <table style="padding-top:10px;" width="100%" border="0" cellpadding="3">            <tr>               <td width="33%"><div align="center"><strong>Username :</strong></div></td>              <td width="67%" colspan="2"><input name="username" type="text" id="name" size="25" /></td>            </tr>            <tr>               <td><div align="center"><strong>Password :</strong></div></td>              <td colspan="2"><input name="password" type="password" id="password" size="25" /></td>            </tr>            <tr>               <td>&nbsp;</td>              <td colspan="2"> <input type="hidden" name="action_login"  value="Log In" />                 <input type="image" src="http://www.slideserve.com/images_new/login_btn.jpg" tabindex="5"  value="login" onClick="login()"/>                &nbsp;&nbsp; <a href="/signup" target="_blank"><img src="http://www.slideserve.com/images_new/signup_btn.jpg" width="65" height="24" border="0" /></a></td>            </tr>          </table>        </div></td></tr></table>				</div>';
	getpopupobjnostyle().innerHTML = newHTML; 
	getpopupobj().visibility = "visible"; 
	getpopupobj().display="block";
		
}

function findPos(obj) {

var curleft = curtop = 0;
if (obj.offsetParent) {
        curleft = obj.offsetLeft
        curtop = obj.offsetTop
        while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft
                curtop += obj.offsetTop
        }
}

return [curleft,curtop];
}

function login_close()
{
	getpopupobj().visibility = "false"; 
	getpopupobj().display="none";
	document.getElementById('displaybox').style.display = "none";
}

/*************************************************************************************************/

function login()
{
if (typeof gvid != 'undefined') 
vid = gvid;
else
vid = ggid;

username = document.getElementById('name').value;
password = document.getElementById('password').value;
cp.call(baseurl+'/ajax/myajaxphp.php','process_login',return_login_response,username,password,vid);

}

function return_login_response(result)
{
msg = result.getElementsByTagName('a').item(0).firstChild.data;
if(msg != 0)
{
document.getElementById("error_msg").innerHTML = msg;
}

if(msg == 0)
{

getpopupobj().visibility = "false"; 
getpopupobj().display="none";
document.getElementById('displaybox').style.display = "none";
vid = result.getElementsByTagName('vid').item(0).firstChild.data;
uid = result.getElementsByTagName('uid').item(0).firstChild.data;
if (typeof gvid != 'undefined') 
fxSendComments('divComments','txtComments',uid,vid)
else
fxSendGroupComments('divComments','txtComments',uid,vid)
}
}

//////  !!!!!!! DELETE COMMENT
							
							function deleteComment(vid,comid,uid,ifg)
							{							
								gvid = vid;
								guid = uid;
								if(ifg != '')
								ggid = vid;
								cp.call(baseurl+'/ajax/myajaxphp.php','delete_comments',return_comment_response,comid,vid,ifg);								
							}
		
//ENG
//////// Send group comments

function fxSendGroupComments(idToHide,commentId,uid,gid){		
		if(commentId == "txtComments")
		comment_value=document.getElementById(commentId).value;
		else
		comment_value = commentId;
		//alert("asdasd");
		//window.close();
		ggid = gid;
		guid = uid;
		 if(comment_value==''){

			alert(' Comment box is empty !!');

		}		
		
		else if(uid == '')
		{
			document.getElementById('displaybox').style.display = "block";
		     popup(idToHide,commentId,uid,gid);
			//window.open("http://www.slideserve.com/login_popup.php?idToHide="+idToHide+"&comment_value="+comment_value+"&vid="+vid,"null","menubar=no,width=360,height=170,toolbar=no,location=no,resizable =no");
			//cp.call(baseurl+'/login_popup.php','process_comments',return_comment_response,comment_value,uid,vid);
		}

		else{

			//hideMe(idToHide);
			document.getElementById(commentId).value = '';
			cp.call(baseurl+'/ajax/myajaxphp.php','process_comments_group',return_comment_response,comment_value,uid,gid);

		}	

	}

// !!!!!!!! SEND COMMENT PROCESS
	
	function fxSendComments(idToHide,commentId,uid,vid){		
		if(commentId == "txtComments")
		comment_value=document.getElementById(commentId).value;
		else
		comment_value = commentId;
		//alert("asdasd");
		//window.close();
		gvid = vid;
		guid = uid;
		 if(comment_value==''){

			alert(' Comment box is empty !!');

		}		
		
		else if(uid == '')
		{
		document.getElementById('displaybox').style.display = "block";
		     popup(idToHide,commentId,uid,vid);
			//window.open("http://www.slideserve.com/login_popup.php?idToHide="+idToHide+"&comment_value="+comment_value+"&vid="+vid,"null","menubar=no,width=360,height=170,toolbar=no,location=no,resizable =no");
			//cp.call(baseurl+'/login_popup.php','process_comments',return_comment_response,comment_value,uid,vid);
		}

		else{

			//hideMe(idToHide);
			cp.call(baseurl+'/ajax/myajaxphp.php','process_comments',return_comment_response,comment_value,uid,vid);

		}	

	}
	
	var globalGetValue = this.fxSendComments;
	
			function return_comment_response(restul){

				msg_number = restul.getElementsByTagName('a').item(0).firstChild.data;
				hideMe('divComResult4');
				if(msg_number==0){

					showMe('divComResult2');
					hideMe('divComResult1');

				} else if ( msg_number==1) {

					showMe('divComResult1');
					hideMe('divComResult2');
					 x=new XMLHttpRequest();
					 x2=new XMLHttpRequest();
					 if(typeof ggid != undefined)
					 	gvid = '';

					 x.open("POST","http://www.slideserve.com/comment_latest.php?gid="+ggid+"&vid="+gvid+"&uid="+guid,true);
					 x2.open("POST","http://www.slideserve.com/head_user_area.php?uid="+guid,true);
					x.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
					x2.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
					x.onreadystatechange=function()
					{
					  if (x.readyState===4 && x.status===200)
					  {
						document.getElementById("vido-newcomments").innerHTML=x.responseText; //changing content of the div
						
						//document.getElementsByTagName("title")[0].innerHTML="Now playing: "+x.responseText; //changing the title
						if(typeof ggid != undefined)
						document.getElementById("add_comment_button").innerHTML="<input class=\"formbutton\" type=\"button\" name=\"commentpost\" value=\"Post Comment\" onClick=\"fxSendGroupComments('divComments','txtComments',"+uid+","+ggid+") />";					
					  }
					};
					x.send(null);
					x2.onreadystatechange=function()
					{
					  if (x2.readyState===4 && x2.status===200)
					  {
					  document.getElementById("head_user_area").innerHTML=x2.responseText; 
					  }
					 };
					x2.send(null);
					
					if(typeof ggid != undefined)
					{
						x3=new XMLHttpRequest();
						x3.open("POST","http://www.slideserve.com/group_user_rights.php?gid="+ggid+"&uid="+guid,true);
						x3.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
						
						x3.onreadystatechange=function()
						{
					  		if (x3.readyState===4 && x3.status===200)
					  		{
								document.getElementById("group_user_rights").innerHTML=x3.responseText; //changing content of the div
							}
						};
						x3.send(null);
					
					}


				} 
				else if( msg_number==3) {
					showMe('divComResult4');
					hideMe('divComResult1');
					hideMe('divComResult2');
					 x=new XMLHttpRequest();
					 
					 if(typeof ggid != undefined)
					 	gvid = '';

					 x.open("POST","http://www.slideserve.com/comment_latest.php?vid="+gvid+"&gid="+ggid+"&uid="+guid,true);
					x.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
					x.onreadystatechange=function()
					{
					  if (x.readyState===4 && x.status===200)
					  {
						document.getElementById("vido-newcomments").innerHTML=x.responseText; //changing content of the div
						//document.getElementsByTagName("title")[0].innerHTML="Now playing: "+x.responseText; //changing the title
					  }
					};
					x.send(null);
				}
				else{

					showMe('divComResult3');

				}

			}

// END

// RECENT VIEW PROCESS

	var current_position=4;

	function recentview(amount,flag){

		

		gflag="viewrecent";

		if(flag=='next')

		{		

				var start=current_position

					current_position=current_position+amount;

				var end=current_position;

				if(dbreport!='1'){



				}



			sql="SELECT VID, title, viewtime, vkey from video where viewtime<>'0000-00-00 00:00:00' order by viewtime desc limit "+start + " , " +end;  

			executeDB(sql);	

			//alert(sql);

 			if(dbreport<0)

			{

					end=current_position;

					current_position=current_position-amount;

					start=current_position;

					alert("End");



			}

		}



		if(flag=='prev')

		{

			var end=current_position;

				current_position=current_position-amount;

			var start=current_position;



			if(start<0){

				start=amount;

				end=start+amount;

				alert("End");

			}



			sql="SELECT VID, title, viewtime, vkey from video where viewtime<>'0000-00-00 00:00:00' order by viewtime desc limit "+start + " , " +end;  

			executeDB(sql);

		}

	}

//END





function pollAnsBox(myID){

	Me=document.getElementById(myID);

	if(Me.value==""){

		  Me.style.background="#3366FF";

		

	}

	else{

		

		Me.style.background="#FFFFFF";

			xy=Me.value;

		for (i=0;i<Me.value;i++ ){		

			var x=document.getElementById('tblViweAnsBox').insertRow(0);

			var y=x.insertCell(0);

			var z=x.insertCell(1);

			y.innerHTML='Answer ' + (xy-i);			

			z.innerHTML='<INPUT TYPE=text SIZE=40 NAME=voteAnsBox'+i+' ID=voteAnsBox'+i+' onBlur=txtBoxValidation(voteAnsBox'+i+', #EAEAEA,#FF0033) >';

		}

	}

	

}



// ## Delete row of a Tabile

	function delteRow(){

		var x=document.getElementById('tblViweAnsBox').rows.length-1;



		for (var i=x;i>=0;i--){

					document.getElementById('tblViweAnsBox').deleteRow(i);

			}

	}





	function fxvalidation(){

		var flag=true;

		var x=document.getElementById('tblViweAnsBox').rows.length-1;



		// ## Question text

		flag=txtBoxValidation('txtQtn','#EAEAEA','#FF0033');



		// ## Questin qty

		flag=txtBoxValidation('txtPollAnsQty','#EAEAEA','#FF0033');

		

		

		for ( i=x; i>=0; i-- )

		{

			targetID='voteAnsBox'+i;

			if (document.getElementById(targetID).value==""){

				txtBoxValidation(targetID,'#EAEAEA','#FF0033');

				flag=false;

				break;

			}

				

							

		}



		return flag;

	}

  



function fxShowAccInfo(a,b){

	showMe(a);

	hideMe(b);	

}



function fxReportVideo(hidediv, uid, vid ) {
alert("asdasd");
		alert(document.getElementById('reportc').value);
}



function fxFeature( uid, vid ) {

	if ( uid == '0' ) {

		hideMe('featureSuccess');

		hideMe('featureFailed');

		showMe('featureLogin');

	} else {

		cp.call(baseurl+'/ajax/myajaxphp.php','featureVideo', featureVideoResponse, uid, vid);

	}

}




function featureVideoResponse( feature_result ) {

	var feature_response_id=feature_result.getElementsByTagName('featureVideoMessage').item(0).firstChild.data;

	if ( feature_response_id == '0' ) {

		hideMe('featureFailed');

		hideMe('featureLogin');

		showMe('featureSuccess');

	} else {

		hideMe('featureSuccess');

		hideMe('featureLogin');

		showMe('featureFailed');

	}

}

function ValidateEmail(mail)   
{  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
  {  
    return (true)  
  }  
  return (false)  
}

function fxReport( uid, vid ) {

        /*reportc = document.querySelector('input[name = "type"]:checked').value;		
		message = document.getElementById('reportmsg').value;
		email   = document.getElementById('report_email').value;
		document.getElementById('report-error').innerHTML ='';
		if(message == "")
		document.getElementById('report-error').innerHTML = " Fill all fields";
		
		else if(email == "")
		document.getElementById('report-error').innerHTML = " Fill all fields";
		else if(!ValidateEmail(email) )
		document.getElementById('report-error').innerHTML = " Type correct email id";
		else*/
    if ( uid == '0' ) {

		//hideMe('addToFavLink');

		hideMe('addToFavSuccess');

		hideMe('addToFavFailed');

		hideMe('addToFavAlready');

		hideMe('addToFavOwner');

		showMe('addToFavLogin');	

	} else
                {
		cp.call(baseurl+'/ajax/myajaxphp.php','reportVideo', reportVideoResponse, uid,vid);
		}

}



function reportVideoResponse( report_result ) {

	var report_response_id=report_result.getElementsByTagName('reportVideoMessage').item(0).firstChild.data;

	if ( report_response_id == '0' ) {

		hideMe('reportFailed');

		hideMe('reportLogin');

		showMe('reportSuccess');

	} else {

		hideMe('reportSuccess');

		hideMe('reportLogin');

		showMe('reportFailed');

	}

}

GUID = '';
GVID = '';
GVUID = '';


function fxAddFavorite( hidediv, uid, vid, vuid ) {	

	//hideMe(hidediv);
	GUID = uid;
	GVID = vid;
	GVUID = vuid;
	if ( uid == '0' ) {

		//hideMe('addToFavLink');

		hideMe('addToFavSuccess');

		hideMe('addToFavFailed');

		hideMe('addToFavAlready');

		hideMe('addToFavOwner');

		showMe('addToFavLogin');	

	} else if ( uid == vuid ) {	

		//hideMe('addToFavLink');

		hideMe('addToFavSuccess');

		hideMe('addToFavFailed');

		hideMe('addToFavAlready');

		hideMe('addToFavLogin');

		showMe('addToFavOwner');

	} else {

		cp.call(baseurl+'/ajax/myajaxphp.php','addToFavorites', addToFavoritesResponse, uid, vid, vuid);

	}

}



function addToFavoritesResponse( fav_result ) {

	var fav_response_id=fav_result.getElementsByTagName('addFavMessage').item(0).firstChild.data;

	if( fav_response_id == '2' ) {

		//hideMe('addToFavLink');

		hideMe('addToFavSuccess');

		hideMe('addToFavFailed');

		hideMe('addToFavLogin');

		hideMe('addToFavOwner');

		showMe('addToFavAlready');

	} else if( fav_response_id == '0' ) {

		//hideMe('addToFavLink');

		hideMe('addToFavFailed');

		hideMe('addToFavAlready');

		hideMe('addToFavLogin');

		hideMe('addToFavOwner');

		showMe('addToFavSuccess');

	} else {

		//hideMe('addToFavLink');

		hideMe('addToFavSuccess');

		hideMe('addToFavAlready');

		hideMe('addToFavLogin');

		hideMe('addToFavOwner');

		showMe('addToFavFailed');

	}

}

function fxFollowUser(uid, vid, vuid ) {	

	//hideMe(hidediv);

	if ( uid == '0' ) {
		
		showMe('addToFollowLogin');	

	} else if ( uid == vuid ) {	
		showMe('addToFollowOwner');

	} else {

		cp.call(baseurl+'/ajax/myajaxphp.php','FollowUser', FollowUserResponse, uid, vid, vuid);

	}

}

function FollowUserResponse( follow_result ) {
showMe('FollowedUser');
}

function pollAnsBox($num){

	alert($num);

}



function showRelatedVideos()

{

    var tabRelatedVideos = document.getElementById('tabRelatedVideos');

    var tabUservideos = document.getElementById('tabUserVideos');

    tabUservideos.className = "";

    tabRelatedVideos.className = "tabactive";

    hideMe('userVideos');

    showMe('relatedVideos');

}



function showUserVideos()

{

    var tabRelatedVideos = document.getElementById('tabRelatedVideos');

    var tabUservideos = document.getElementById('tabUserVideos');

    tabRelatedVideos.className = "";

    tabUservideos.className = "tabactive";

    hideMe('relatedVideos');

    showMe('userVideos');

}

function HideAds()
{
hideMe('theGoogleAds_Download');
showMe('DownloadBanner');
}


function HideTranscript()

{

	var Transcript = document.getElementById('Transcript');

	if(document.getElementById('transcript-content').style.display=="none")

	{

	showMe('transcript-content');

	showMe('transcript-title2');

	hideMe('transcript-title1');

	}

	else

	{

    	hideMe('transcript-content'); 

	hideMe('transcript-title2');

	showMe('transcript-title1');

	}

}


function HideAdsence()

{
	hideMe('AdSense');
	
	
	//alert(document.getElementById('/YouTube_video/youtube'));
 	document.getElementById('svPlayerId').style.height = 500+'px';
	document.getElementById('PlayerFrame').style.height = 500+'px';
	//document.getElementById('videoplayer').style.height = 446+'px';
	document.getElementsByName('flashPlayer').height = 500;
	//alert(navigator.appName);
	//var productElement = document.getElementById("/YouTube_video/youtube");
	if(document.embeds['flashPlayer'] != undefined){
	
	document.embeds['flashPlayer'].height =500;	
	/*var Transcript = document.getElementById('Adsense');
	document.YouTube_video.SetVariable("IfClosedAds", "Close");*/
	}
	
	
	if(window.flashPlayer) window.document["flashPlayer"].SetVariable("IfClosedAds", "Close");
	if(document.flashPlayer) document.flashPlayer.SetVariable("IfClosedAds", "Close");
}




function ShowTranscript()

{

	var Transcript1 = document.getElementById('transcript-title1');	

    var Transcript2 = document.getElementById('transcript-title2');  

	Transcript2.className = "";

    Transcript1.className = "Transactive";

    showMe('transcript-content');   

}

function moreinfo()
{

	if(document.getElementById('right-desc').style.display=="none")
	{
	showMe('right-desc');

	showMe('less-info');

	hideMe('more-info');

	}

	else

	{

    	hideMe('right-desc'); 

	hideMe('less-info');

	showMe('more-info');

	}

}

function BrowseFile()
{
  window.open("http://74.53.177.124/~ss7962/Upload_OtherServer.html", "windowname", 'width=788,height=542,scrollbars=No');
}

function setMovie(id)
{

document.getElementById('Embed_0').style.display = "none";
document.getElementById('Embed_1').style.display = "none";
document.getElementById('Embed_2').style.display = "none";
document.getElementById(id).style.display = "inline";


}
function sethMovie(id,vid)
{

document.getElementById('empl_0').style.display = "none";
document.getElementById('empl_1').style.display = "none";
document.getElementById('empl_2').style.display = "none";
document.getElementById(id).style.display = "inline";

$('#homefr').attr('src', "http://www.slideserve.com/embed-htmlplayer.php?vid="+vid);

}

function showEditorsPick(page)
{

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	var str = xmlhttp.responseText;
	thespstr = str.split("<seperation for two divs>");
	 
    document.getElementById("editorspick").innerHTML=thespstr[0]; 
	document.getElementById("channel").innerHTML=thespstr[1]; 
    //document.getElementById("retags").innerHTML=thespstr[2];
    }
  }
   url = (document.URL);
   method = url.substr(0,url.indexOf(".com")+4);
   
xmlhttp.open("GET",method+"/editorspick.php?page="+page,true);
xmlhttp.send();
}

function showhomevido()
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	var str = xmlhttp.responseText;
	thespstr = str.split("<seperation for two divs>");
	 
    document.getElementById("featuredvido").innerHTML=thespstr[0]; 
	document.getElementById("topratedvido").innerHTML=thespstr[1]; 
    document.getElementById("mostviewedvido").innerHTML=thespstr[2];
	document.getElementById("retags").innerHTML=thespstr[3];
    }
  }
   url = (document.URL);
   method = url.substr(0,url.indexOf(".com")+4);
   
xmlhttp.open("GET",method+"/homevido.php",true);
xmlhttp.send();
}

$(document).ready(function()
{
	if('' != $("img.moduleFeaturedThumb"))
        {
            try
            {
            $("img.moduleFeaturedThumb").lazyload();
             $("img.transThumb").lazyload();
            }
            catch(err) {
                
            }
	 }
	$("#tab5").click(function() { 
	
	$("#user").html("<div align=\"center\"><img class=\"moduleFeaturedThumb\" src=\"http://www.slideserve.com/images/content-load.GIF\" /></div>");
	$("#user").show();
	
	var uid = $("#video_uid").val(); 
	var vid = $("#video_vid").val(); 
		
	$.ajax({
	type: "get",
	url: '../video_user.php?uid='+uid,	
	target:"#divResult",
	success: function(html){	
		$("#user").html(html);
	}
	});
	return false;
});
 
$("#showCont").click(function() { 
$("#showCont").hide();
$("#preload").show();
$.ajax({
type: "get",
url:'http://www.slideserve.com/loadContent.php?vid='+$("#email_vid").val(),
target:"#divResult",
success: function(html){
 $("#player_embed").show();
$("#player_embed").html(html);

setTimeout(function(){
  $(".closeThis").show();
  $("#htmlplayer").hide();
  $("#preload").hide();
}, 4000);

}
});
return false;				
});

});