




/*
     FILE ARCHIVED ON 9:19:31 Aug 7, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 6:15:34 Oct 22, 2013.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
// JavaScript Document
/*	................................................
	/////////www.Slideserve.com//////////////
	................................................
	Filename:		Style.css
	Date:			01--Oct--2011
	Company:        DigitalofficePro.
	................................................*/
function changeTabCss(b,c,e,f){if(f=="USER"){document.getElementById("related").style.display="none";document.getElementById("user").style.display="block";}else if(f=="RELATED"){document.getElementById("user").style.display="none";document.getElementById("related").style.display="block";} document.getElementById(b).className="active";document.getElementById(c).className="";if(e != '') document.getElementById(e).className="";document.getElementById("txtEmbed").style.display="none";document.getElementById("txtThumbnail").style.display="none";document.getElementById("txtUrl").style.display="none";if(f=="Embed")document.getElementById("txtEmbed").style.display="inline";else if(f=="URL")document.getElementById("txtUrl").style.display="inline";else if(f=="Thumbnail")document.getElementById("txtThumbnail").style.display=
"inline"}function ShowHideTranscript(b){b==!0?(document.getElementById("imgMinusTrans").style.display="inline",document.getElementById("imgPlusTrans").style.display="none",document.getElementById("divPresentationTrans").style.display="inline"):(document.getElementById("imgMinusTrans").style.display="none",document.getElementById("imgPlusTrans").style.display="inline",document.getElementById("divPresentationTrans").style.display="none")}
function SelectData(b){b.select()}

function showResults(title,vid,uid,uname,views,vkey)
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
	 
    //document.getElementById("channels").innerHTML=thespstr[0]; 
	//document.getElementById("userinfo").innerHTML=thespstr[0]; 
    //document.getElementById("tabs_b").innerHTML=thespstr[2];
	//document.getElementById("transcript-content").innerHTML=thespstr[3];
    }
  }
     url = (document.URL);
   method = url.substr(0,url.indexOf(".com")+4);
   
   
   
xmlhttp.open("GET",method+"/relatedvido.php?title="+title+"&vid="+vid+"&uid="+uid+"&views="+views+"&vkey="+vkey+"&uname="+uname,true);
xmlhttp.send();
}

function showTranscript(node,pfp,tid)
{

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp2=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp2.onreadystatechange=function()
  {
  if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
    {
	var str = xmlhttp2.responseText;
	thespstr = str.split("<seperation for two divs>");
	 
	document.getElementById("transcript-content").innerHTML=thespstr[0];
    }
  }
     url = (document.URL);
   method = url.substr(0,url.indexOf(".com")+4);
   
   
   
xmlhttp2.open("GET",method+"/showTranscript.php?node="+node+",&pfp="+pfp+",&tid="+tid,true);
xmlhttp2.send();
}