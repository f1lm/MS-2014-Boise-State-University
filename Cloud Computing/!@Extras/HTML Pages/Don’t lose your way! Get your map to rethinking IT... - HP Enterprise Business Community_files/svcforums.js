<!--

var expDays = 90;
var guid = genguid();

/**********Begin popratio********.2***/
var popratio = 0.2;
/**********end popratio*************/
var hp_ebus_cookiename="HP_EBUS_FORUM";
var ie4 = document.all;
var ns4 = document.layers;
var ns6 = document.getElementById && !document.all;
var reg = new RegExp("(google.com)", "i");
var hp_ebus_date = new Date();
var hp_ebus_yr = hp_ebus_date.getFullYear();
var l="en-US";
if(!SP_DOC_TYPE)var SP_DOC_TYPE="";
/**********Cookie domain declaration*************/
var hp_ebus_domain = ".hp.com";
/**********End cookie domain declaration*********/
hp_ebus_scrapeMeta();
//this if statement allows the cookie to be set when testing from webmetrics1
if (location.host.indexOf("webmetrics1")!=-1){
	hp_ebus_domain = ".hpqcorp.net";
}
//End if statement
var LNG=window.hp_ebus_country;
if(!LNG)
{
	LNG="";
}

if (LNG.length>0){
	if(LNG=="us")l="en-US";
//	if(LNG=="ch")l="sv-SE";
	if(LNG=="cn")l="zh-CN";
	if(LNG=="tw")l="zh-TW";
	if(LNG=="hk")l="zh-HK";
//	if(LNG=="fr")l="fr-FR";
//	if(LNG=="de")l="de-DE";
//	if(LNG=="it")l="it-IT";
//	if(LNG=="pl")l="pl-PL";
//	if(LNG=="tr")l="tr-TR";
	if(LNG=="jp")l="ja-JP";
	if(LNG=="kr")l="out";//out meeans dont even launch in english as a default
//	if(LNG=="pt-pt")l="pt-BR";
//	if(LNG=="pt")l="pt-BR";
//	if(LNG=="es-es")l="es-ES";
//	if(LNG=="es")l="es-MX";
}else{
	l = "en-US";
}

if ((document.cookie.indexOf(hp_ebus_cookiename+"=true")==-1) && (Math.random()<popratio) && (l != "out") && (reg.test(document.referrer) == false) || (location.search.indexOf("hp_ebus_launch_survey")>-1) )
{
    var hp_ebus_expires = new Date();
    hp_ebus_expires.setTime(hp_ebus_expires.getTime()+(expDays*24*60*60*1000));
    var ref = self.location.href
    var title = document.title
    var pg_title = document.title

/**************Enter URL below this line**************************/
	//rameshc added
	var requestUrl = window.location + "";
	var url2 = "";
	// end rameshc
	//added by rameshc for JAGaf60533
	//http survey script is invoked for http request and https survey script is invoked for https

	 if(requestUrl.indexOf("http://") == 0) {
		url2="http://g1w2399g.austin.hp.com/Community/se.ashx?s=3BC1E4C167F9F8F9&c="+l+"&LNG="+escape(LNG)+"&ref="+ref;
	 } else if (requestUrl.indexOf("https://") == 0){
		 url2="https://g1w2399g.austin.hp.com/Community/se.ashx?s=3BC1E4C167F9F8F9&c="+l+"&LNG="+escape(LNG)+"&ref="+ref;
	 }
/**************Enter URL above this line**************************/


     document.cookie = hp_ebus_cookiename+"=true;path=/;Expires="+hp_ebus_expires.toGMTString()+";domain="+hp_ebus_domain;
     showOverlay()

//     if(l!="undef"){
//          launchSurvey(1)
//      }

}

/******************************FUNCTIONS******************************/

function findObj(theObj, theDoc)
{
  var p, i, foundObj;

  if(!theDoc) theDoc = document;
  if( (p = theObj.indexOf("?")) > 0 && parent.frames.length)
  {
    theDoc = parent.frames[theObj.substring(p+1)].document;
    theObj = theObj.substring(0,p);
  }
  if(!(foundObj = theDoc[theObj]) && theDoc.all) foundObj = theDoc.all[theObj];
  for (i=0; !foundObj && i < theDoc.forms.length; i++)
    foundObj = theDoc.forms[i][theObj];
  for(i=0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++)
    foundObj = findObj(theObj,theDoc.layers[i].document);
  if(!foundObj && document.getElementById) foundObj = document.getElementById(theObj);

  return foundObj;
}

function showHideLayers()
{
  var i, visStr, obj, args = showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3)
  {
    if ((obj = findObj(args[i])) != null)
    {
      visStr = args[i+2];
      if (obj.style)
      {
        obj = obj.style;
        if(visStr == 'show') visStr = 'visible';
        else if(visStr == 'hide') visStr = 'hidden';
      }
      obj.visibility = visStr;
    }
  }
}

function genguid()
{
	//generate global unique identifier
	TempDate = new Date();
	var guid = (TempDate.getMonth()+1) + "-" + TempDate.getDate() + "-" + TempDate.getYear() + "_" + TempDate.getHours() + "-" + TempDate.getMinutes() + "-" + TempDate.getSeconds() + "-" + TempDate.getMilliseconds() + "_" + TempDate.getTimezoneOffset() + "_";
	for (var i = 1; i <= 32; i++)
	{
		var n = Math.floor(Math.random() *16.0).toString(16);
		guid += n;
		if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "-";
	}
	return guid;
}

function showOverlay(){
if ((ns6) || (ie4)) {
var invitationtext, hp_ebus_answertext_yes, hp_ebus_answertext_no, hp_ebus_buttontext;
/****************************Enter overlay text here****************************************/
//Chinese(PRC)
if(l=="zh-CN"){
invitationtext =  "&#24800;&#26222;&#27426;&#36814;&#24744;&#21442;&#19982;&#8220;&#24800;&#26222;&#31508;&#35760;&#26412;&#21450;&#21830;&#29992;&#20135;&#21697;&#25216;&#26415;&#35770;&#22363;&#8221;&#38382;&#21367;&#35843;&#26597;&#65292;&#24110;&#21161;&#25105;&#20204;&#25913;&#21892;&#24800;&#26222;&#35770;&#22363;&#65281; &#35831;&#24744;&#36873;&#25321;&#8220;&#26159;&#8221;&#65292;&#24182;&#36755;&#20837;&#24744;&#30340;&#37038;&#31665;&#22320;&#22336;&#65292;&#28982;&#21518;&#25353;&#8220;&#25552;&#20132;&#8221;&#38190;&#65292;&#25105;&#20204;&#23558;&#20250;&#21457;&#36865;&#38382;&#21367;&#21040;&#24744;&#30340;&#37038;&#31665;&#12290;&#24744;&#30340;&#37038;&#31665;&#22320;&#22336;&#21482;&#29992;&#20316;&#21457;&#36865;&#35843;&#26597;&#38382;&#21367;&#30340;&#38142;&#25509;&#12290;&#22914;&#26524;&#24744;&#19981;&#24819;&#21442;&#19982;&#65292;&#35831;&#24744;&#36873;&#25321; &#8220;&#21542;&#8221;&#65292;&#28982;&#21518;&#25353;&#8220;&#25552;&#20132;&#8221;&#38190;&#20851;&#38381;&#31383;&#21475;&#12290;Cookie&#23558;&#36733;&#20837;&#24744;&#30340;&#30005;&#33041;&#31995;&#32479;&#65292;&#20250;&#22312;&#20845;&#20010;&#26376;&#20869;&#38450;&#27490;&#27492;&#35843;&#26597;&#38382;&#21367;&#20877;&#27425;&#20986;&#29616;&#22312;&#29305;&#23450;&#30005;&#33041;&#31995;&#32479;&#20013;&#12290;&#20294;&#26159;&#65292;&#25105;&#20204;&#19981;&#33021;&#20445;&#35777;&#24744;&#27704;&#36828;&#19981;&#30475;&#35265;&#36825;&#20010;&#31383;&#21475;&#12290;";

	hp_ebus_answertext_yes = "&#26159;&#65292;&#35831;&#23558;&#38382;&#21367;&#21457;&#21040;&#27492;&#37038;&#31665;&#65306;";
	hp_ebus_answertext_no = "&#21542;&#65292;&#25105;&#19981;&#24819;&#21442;&#19982;&#27492;&#39033;&#35843;&#26597;&#12290; ";
	hp_ebus_buttontext = "&#25552;&#20132;";
}
//Chinese(Taiwan)
if(l=="zh-TW"){
	invitationtext = "&#24800;&#26222;&#24076;&#26395;&#24744;&#33021;&#24171;&#21161;&#25105;&#20497;&#25913;&#21892; HP&#35342;&#35542;&#22290;&#22320; &#30340;&#26381;&#21209;&#65281;&#35531;&#40670;&#25802;&#8220;&#26159;&#8221;&#65292;&#28982;&#24460;&#36664;&#20837;&#24744;&#30340;&#38651;&#37109;&#22320;&#22336;&#65292;&#20006;&#25353;&#19968;&#19979;&#8220;&#20659;&#36865;&#8221;&#65292;&#25105;&#20497;&#23559;&#26371;&#30332;&#36865;&#21839;&#21367;&#36992;&#35531;&#33267;&#24744;&#30340;&#38651;&#37109;&#22320;&#22336;&#12290;&#24744;&#30340;&#38651;&#37109;&#22320;&#22336;&#21482;&#29992;&#20316;&#23492;&#36865;&#27492;&#21839;&#21367;&#35519;&#26597;&#30340;&#36899;&#32080;&#12290;&#33509;&#24744;&#19981;&#24076;&#26395;&#21443;&#33287;&#27492;&#21839;&#21367;&#35519;&#26597;,&#35531;&#40670;&#36984;&#8220;&#21542;&#8221;,&#20006;&#25353;&#19979;&#8220;&#20659;&#36865;&#8221;&#20197;&#38364;&#38281;&#35222;&#31383;,Cookie&#23559;&#36617;&#20837;&#24744;&#30340;&#38651;&#33126;&#20316;&#26989;&#31995;&#32113;,&#38450;&#27490;&#33267;&#23569;&#20845;&#20491;&#26376;&#20839;&#27492;&#35519;&#26597;&#37325;&#29694;&#26044;&#27492;&#38651;&#33126;&#20316;&#26989;&#31995;&#32113;&#12290;";
	hp_ebus_answertext_yes = "&#26159;&#65292;&#35531;&#23559;&#21839;&#21367;&#30332;&#36865;&#21040;&#27492;&#37109;&#31665;&#65306; ";
	hp_ebus_answertext_no = "&#21542;&#65292;&#25105;&#19981;&#24819;&#21443;&#33287;&#27492;&#38917;&#35519;&#26597;&#12290;";
	hp_ebus_buttontext = "&#20659;&#36865;";
}

//Chinese(Hong Kong)
if(l=="zh-HK"){
	invitationtext = "&#35531;&#24171;&#21161;&#25105;&#20497;&#25913;&#21892; HP&#21830;&#21209;&#25903;&#25588;&#26381;&#21209;&#32178;&#22336;&#65281;&#35531;&#40670;&#36984;&#12300;&#26159;&#12301; &#65292;&#28982;&#24460;&#36664;&#20837;&#24744;&#30340;&#38651;&#37109;&#22320;&#22336;&#65292;&#20006;&#25353;&#19968;&#19979;&#12300;&#20659;&#36865;&#12301;&#20197;&#36899;&#32080; HP &#25903;&#25588;&#26381;&#21209;&#35519;&#26597;&#12290; &#24744;&#30340;&#38651;&#37109;&#22320;&#22336;&#21482;&#29992;&#20316;&#23492;&#36865;&#27492;&#21839;&#21367;&#35519;&#26597;&#30340;&#36899;&#32080;&#12290;&#33509;&#24744;&#19981;&#24076;&#26395;&#21443;&#33287;&#27492;&#21839;&#21367;&#35519;&#26597;&#65292;&#35531;&#40670;&#36984;&#12300;&#21542;&#12301;&#65292;&#20006;&#25353;&#19968;&#19979;&#12300;&#20659;&#36865;&#12301;&#20197;&#38364;&#38281;&#35222;&#31383;&#12290;Cookie &#23559;&#36617;&#20837;&#24744;&#30340;&#38651;&#33126;&#31995;&#32113;&#65292;&#38450;&#27490;&#33267;&#23569;&#20845;&#20491;&#26376;&#20869;&#65292;&#27492;&#35519;&#26597;&#37325;&#29694;&#20110;&#27492;&#38651;&#33126;&#20316;&#26989;&#31995;&#32113;&#12290;&#19981;&#36942;&#65292;&#25105;&#20497;&#19981;&#33021;&#20445;&#35657;&#24744;&#27704;&#19981;&#20877;&#35211;&#36889;&#38917;&#35222;&#31383;&#12290;";
	hp_ebus_answertext_yes = "&#26159;&#65292;&#35531;&#23559;&#21839;&#21367;&#30332;&#36865;&#21040;&#27492;&#37109;&#31665;&#65306; ";
	hp_ebus_answertext_no = "&#21542;&#65292;&#25105;&#19981;&#24819;&#21443;&#33287;&#27492;&#38917;&#35519;&#26597;&#12290;";
	hp_ebus_buttontext = "&#19979;&#19968;&#27493;";
}
//French
if(l=="fr-FR"){
	invitationtext = "Vous pouvez nous aider &#224; am&#233;liorer le site Web HP en r&#233;pondant &#224; quelques questions sur l'exp&#233;rience que vous en avez.";
	hp_ebus_answertext_yes = "Oui, envoyez-moi le questionnaire &#224; cette adresse e-mail :";
	hp_ebus_answertext_no = "Non, je ne souhaite pas participer au questionnaire.";
	hp_ebus_buttontext = "Envoyer les r&#233;ponses";
}
//German
if(l=="de-DE"){
	invitationtext = "Helfen Sie uns dabei, die Website von HP zu verbessern.";
	hp_ebus_answertext_yes = "Ja, senden Sie mir das Umfragematerial an folgende E-Mail-Adresse:";
	hp_ebus_answertext_no = "Nein, ich m&#246;chte nicht an dieser Umfrage teilnehmen.";
	hp_ebus_buttontext = "Umfrage abschicken";
}
//Italian
if(l=="it-IT"){
	invitationtext = "La preghiamo di aiutarci a migliorare il sito HP rispondendo ad alcune domande relativamente alla sua esperienza odierna.";
	hp_ebus_answertext_yes = "Confermo di voler ricevere il questionario a questo indirizzo e-mail:";
	hp_ebus_answertext_no = "No, non desidero partecipare al questionario.";
	hp_ebus_buttontext = "Invia";
}
//Japanese
if(l=="ja-JP"){
	invitationtext = "HP&#12391;&#12399;&#12289;&#12469;&#12509;&#12540;&#12488;Web&#12469;&#12452;&#12488;&#12395;&#12388;&#12356;&#12390;&#12469;&#12540;&#12505;&#12452;&#12434;&#34892;&#12387;&#12390;&#12362;&#12426;&#12414;&#12377;&#12290;&#20197;&#19979;&#12395;&#12362;&#23458;&#27096;&#12398;E-mail&#12450;&#12489;&#12524;&#12473;&#12434;&#20837;&#21147;&#12375;&#12390;[&#27425;&#12408;]&#12508;&#12479;&#12531;&#12434;&#12463;&#12522;&#12483;&#12463;&#12375;&#12390;&#12367;&#12384;&#12373;&#12356;&#12290;HP&#12398;&#12469;&#12509;&#12540;&#12488; &#12469;&#12540;&#12505;&#12452;&#12408;&#12398;&#12522;&#12531;&#12463;&#12434;&#12362;&#36865;&#12426;&#12375;&#12414;&#12377;&#12290;&#12362;&#23458;&#27096;&#12398;E-mail&#12450;&#12489;&#12524;&#12473;&#12399;&#12289;&#12469;&#12540;&#12505;&#12452;&#12398;&#12522;&#12531;&#12463;&#12434;&#12362;&#36865;&#12426;&#12377;&#12427;&#12383;&#12417;&#12395;&#20351;&#12431;&#12373;&#12379;&#12390;&#12356;&#12383;&#12384;&#12367;&#12384;&#12369;&#12391;&#12377;&#12398;&#12391;&#12289;&#20182;&#12398;&#30446;&#30340;&#12395;&#12399;&#19968;&#20999;&#20351;&#29992;&#12356;&#12383;&#12375;&#12414;&#12379;&#12435;&#12290; &#12469;&#12540;&#12505;&#12452;&#12408;&#12398;&#21442;&#21152;&#12434;&#26395;&#12414;&#12428;&#12394;&#12356;&#22580;&#21512;&#12395;&#12399;&#12289;[&#12356;&#12356;&#12360;]&#12434;&#36984;&#25246;&#12375;&#12383;&#24460;&#12395; [&#27425;&#12408;]&#12434;&#12463;&#12522;&#12483;&#12463;&#12375;&#12289;&#12371;&#12398;&#12454;&#12451;&#12531;&#12489;&#12454;&#12434;&#38281;&#12376;&#12390;&#12367;&#12384;&#12373;&#12356;&#12290;&#12372;&#20351;&#29992;&#12398;&#12467;&#12531;&#12500;&#12517;&#12540;&#12479;&#12391;&#12371;&#12398;&#12469;&#12540;&#12505;&#12452;&#12364;&#32368;&#12426;&#36820;&#12375;&#34920;&#31034;&#12373;&#12428;&#12414;&#12379;&#12435;&#12424;&#12358;&#12395;&#12289;&#12362;&#23458;&#27096;&#12398;&#12467;&#12531;&#12500;&#12517;&#12540;&#12479;&#12395;&#12399;cookie&#12398;&#35352;&#37682;&#12364;&#26368;&#20302;3&#12534;&#26376;&#38291;&#20445;&#23384;&#12373;&#12428;&#12414;&#12377;&#12290;&#12383;&#12384;&#12375;&#12289;&#12371;&#12398;&#12509;&#12483;&#12503;&#12450;&#12483;&#12503; &#12454;&#12451;&#12531;&#12489;&#12454;&#12364;&#32118;&#23550;&#12395;&#34920;&#31034;&#12373;&#12428;&#12394;&#12356;&#12392;&#12356;&#12358;&#12371;&#12392;&#12399;&#20445;&#35388;&#12356;&#12383;&#12375;&#12363;&#12397;&#12414;&#12377;&#12398;&#12391;&#12289;&#12372;&#20102;&#25215;&#12367;&#12384;&#12373;&#12356;&#12290;";
	hp_ebus_answertext_yes = "&#12399;&#12356;&#12290;&#12371;&#12398;&#38651;&#23376;&#12513;&#12540;&#12523;&#12450;&#12489;&#12524;&#12473;&#12408;&#12469;&#12540;&#12505;&#12452;&#12434;&#36865;&#12387;&#12390;&#12367;&#12384;&#12373;&#12356;&#12290; ";
	hp_ebus_answertext_no = "&#12356;&#12356;&#12360;&#12289;&#12469;&#12540;&#12505;&#12452;&#12395;&#12399;&#21442;&#21152;&#12375;&#12414;&#12379;&#12435;&#12290;";
	hp_ebus_buttontext = "&#27425;&#12408;";
}
//Korean
if(l=="ko-KR"){
	invitationtext = "HP &#44256;&#44061; &#51648;&#50896; &#54252;&#47100; &#49444;&#47928;&#51312;&#49324;&#50640; &#52280;&#50668;&#54644; &#51452;&#49492;&#49436; &#45824;&#45800;&#55176; &#44048;&#49324;&#54633;&#45768;&#45796;. &#50500;&#47000;&#50640; &#44256;&#44061;&#45784;&#51032; e-mail &#51452;&#49548;&#47484; &#51077;&#47141;&#54616;&#49888; &#54980;&#50640; &#8220;&#51228;&#52636;&#8220; &#48260;&#53948;&#51012; &#45580;&#47084; &#51452;&#49901;&#49884;&#50724;. &#51228;&#44277;&#54644;&#51452;&#49888; e-mail&#47196; &#49444;&#47928;&#50640; &#52280;&#50668;&#54616;&#49892; &#49688; &#51080;&#45716; &#47553;&#53356; &#51221;&#48372;&#44032; &#45812;&#44200;&#51652; &#47700;&#49464;&#51648;&#44032; &#48372;&#45236;&#51648;&#44172; &#46104;&#47728;, &#47553;&#53356;&#47484; &#53364;&#47533;&#54616;&#49884;&#47732; &#49444;&#47928;&#51312;&#49324;&#50640; &#52280;&#50668;&#54616;&#49892; &#49688; &#51080;&#49845;&#45768;&#45796;. &#47564;&#50557; &#49444;&#47928; &#51312;&#49324; &#52280;&#50668; &#51032;&#49324;&#44032; &#50630;&#51004;&#49884;&#47732; &#8220;&#50500;&#45768;&#50724;&#8220;&#47484; &#49440;&#53469;&#54616;&#44256; &#8220;&#51228;&#52636;&#8220; &#48260;&#53948;&#51012; &#45580;&#47084;&#51452;&#49901;&#49884;&#50724;. &#44256;&#44061;&#45784;&#51032; &#52980;&#54504;&#53552;&#50640; &#49444;&#47928;&#51312;&#49324; &#51221;&#48372; &#44592;&#47197;&#51060; &#45224;&#50500;&#51080;&#44592; &#46412;&#47928;&#50640; 3&#44060;&#50900;&#44036; &#54644;&#45817; &#54168;&#51060;&#51648;&#45716; &#45208;&#53440;&#45208;&#51648; &#50506;&#49845;&#45768;&#45796;. &#44536;&#47084;&#45208; &#54644;&#45817; &#54045;&#50629; &#52285;&#51008; &#49884;&#49828;&#53596;&#50640; &#46384;&#46972;&#49436; &#45796;&#49884; &#45208;&#53440;&#45216; &#49688;&#46020; &#51080;&#49845;&#45768;&#45796;.";
	hp_ebus_answertext_yes = "&#50696;. &#45796;&#51020; e-mail &#51452;&#49548;&#47196; &#49444;&#47928; &#51312;&#49324;&#47484; &#48372;&#45236;&#51452;&#49901;&#49884;&#50724;.";
	hp_ebus_answertext_no = "&#50500;&#45768;&#50724;, &#49444;&#47928; &#51312;&#49324; &#52280;&#50668;&#47484; &#50896;&#54616;&#51648; &#50506;&#49845;&#45768;&#45796;.";
	hp_ebus_buttontext = "&#51228;&#52636;";
}
//Portuguese
if(l=="pt-PT"){
	invitationtext = "Ajude-nos a melhorar o Web site da HP respondendo hoje mesmo a algumas perguntas sobre a sua experi&#234;ncia de navega&#231;&#227;o.";
	hp_ebus_answertext_yes = "Sim, envie-me a pesquisa neste endere&#231;o de e-mail:";
	hp_ebus_answertext_no = "N&#227;o, n&#227;o desejo participar na pesquisa.";
	hp_ebus_buttontext = "Enviar pesquisa";
}
//Spanish
if(l=="es-ES"){
	invitationtext = "Ay&#250;denos a mejorar el sitio Web de HP respondiendo a unas preguntas acerca de su experiencia de hoy.";
	hp_ebus_answertext_yes = "S&#237;, env&#237;en la encuesta a esta direci&#243;n <br>de correo electr&#243;nico:";
	hp_ebus_answertext_no = "No, no quiero participar en la encuesta";
	hp_ebus_buttontext = "Siguiente";
}
//English
if(l=="en-US"){
invitationtext = "Please help us improve the HP Support Center! Enter your e-mail address below and click on &#8220;submit&#8221; to receive a link to the HP support survey. Your e-mail address will be used only to send a link to this specific survey. If you do not wish to participate, please check &#8220;no&#8221; and click on &#8220;submit&#8221; to close this window. A cookie will be dropped on your computer system to prevent this survey from re-appearing on this particular computer system for at least 3 months. However, we cannot guarantee that you will never see this pop-up window again.";
hp_ebus_answertext_yes = "Yes, send me the survey at this email address:";
hp_ebus_answertext_no = "No, I do not want to participate in the survey.";
hp_ebus_buttontext = "Submit";
}
/****************************Enter overlay text above this line******************************/

/*****************************Begin overlay HTML code****************************************/
var hp_ebus_surveydivtext = "<div ID='hp_ebus_surveydiv' style='font-family:arial,helvetica,sans-serif;font-weight:bold;font-size:14px;color:#000000; background-color:#ffffff; layer-background-color:#ffffff; position:absolute; top:20px; left:30px; width:550px; z-index:200;  visibility:hidden; border-color:#000000; border-width:thick; border-style:solid;'>";
hp_ebus_surveydivtext += "<table cellpadding=0 cellspacing=0>";
hp_ebus_surveydivtext += "<tr><td valign=top align=right bgcolor='#000000'><a href=\"javascript:toggleBox('hp_ebus_surveydiv',0)\"><font color=white>X</font></a></td></tr><tr>";
hp_ebus_surveydivtext += "<td valign=top align=left>";
hp_ebus_surveydivtext += "<table width=100";
hp_ebus_surveydivtext += "<tr>";
hp_ebus_surveydivtext += "<td width='120' align='left' valign='middle'><img src='https://www.hp.com/hpcentral/survey/source/s.gif' width='10' alt=''><img src='http://www.hp.com/cma/metrics/survey/img/circle_hp_logo.gif' width='63' height='53' border='0' alt='Hewlett-Packard - Invent'></td>";
hp_ebus_surveydivtext += "<td><img src='https://www.hp.com/hpcentral/survey/source/s.gif' width='9' height='93' alt=''></td>";
hp_ebus_surveydivtext += "</tr>";
hp_ebus_surveydivtext += "</table>";
hp_ebus_surveydivtext += "<center>  ";
hp_ebus_surveydivtext += "<table cellpadding=10 cellspacing=10>";
hp_ebus_surveydivtext += "<tr><td valign=top align=left>";
hp_ebus_surveydivtext += invitationtext + "<p>";
hp_ebus_surveydivtext += "<form name='hp_ebus_form'><input type='radio' name='hp_ebus_invitation' value='yes'>"+hp_ebus_answertext_yes;
hp_ebus_surveydivtext += " <input type='text' name='hp_ebus_email' onChange=\"document.hp_ebus_form.hp_ebus_invitation[0].checked\">";
hp_ebus_surveydivtext += "<br><input type='radio' name='hp_ebus_invitation' value='no'>"+ hp_ebus_answertext_no + "<p>";
hp_ebus_surveydivtext += "<input type='button' onClick='hp_ebus_verify();' value='"+hp_ebus_buttontext+"'></form>";
hp_ebus_surveydivtext += "</td>";
hp_ebus_surveydivtext += "</tr>";
hp_ebus_surveydivtext += "</table>";
hp_ebus_surveydivtext += "<table width=100% border=0 cellspacing=0 cellpadding=0>";
hp_ebus_surveydivtext += "<tr>";
hp_ebus_surveydivtext += "   <td bgcolor=black><img src='https://www.hp.com/hpcentral/survey/source/s.gif' height=4 alt=''></td>";
hp_ebus_surveydivtext += "</tr>";
hp_ebus_surveydivtext += "<tr>";
hp_ebus_surveydivtext += "  <td align=right>";
hp_ebus_surveydivtext += "  </td>";
hp_ebus_surveydivtext += "</tr>";
hp_ebus_surveydivtext += "</table>";
hp_ebus_surveydivtext += "</center>";
hp_ebus_surveydivtext += "<table border='0' cellpadding='0' cellspacing='0' width='545' summary=\"This table contains information on Hewlett-Packard's privacy statement\">";
hp_ebus_surveydivtext += "<tr>";
hp_ebus_surveydivtext += "<td colspan='2'></td>";
hp_ebus_surveydivtext += "</tr>";
hp_ebus_surveydivtext += "<tr>";
hp_ebus_surveydivtext += "<td align='left' valign='middle' class='footer'><font size='-1'>";
hp_ebus_surveydivtext += "</td>";
hp_ebus_surveydivtext += "</tr>";
hp_ebus_surveydivtext += "<tr>";
hp_ebus_surveydivtext += "<td align='right' valign='middle' class='footer'><font face=arial size='-1'>&copy; "+hp_ebus_yr+" Hewlett-Packard Development Company, L.P.</td>";
hp_ebus_surveydivtext += "</tr>";
hp_ebus_surveydivtext += "</table>";
hp_ebus_surveydivtext += "</td></tr>";
hp_ebus_surveydivtext += "</table>";
hp_ebus_surveydivtext += "</div>";
/*********************************End overlay HTML code******************************************/

document.write(hp_ebus_surveydivtext);
    toggleBox('hp_ebus_surveydiv',1)
}}

function hp_ebus_verify(){
	if (document.hp_ebus_form.hp_ebus_invitation[1].checked == true){
		var hp_ebus_expires = new Date();
		//var invitation = 2;
		//launchSurvey(1)
    	hp_ebus_expires.setTime(hp_ebus_expires.getTime()+(expDays*24*60*60*1000));
		document.cookie = document.cookie = hp_ebus_cookiename+"=true;path=/;Expires="+hp_ebus_expires.toGMTString()+";domain="+hp_ebus_domain;
		toggleBox('hp_ebus_surveydiv',0)
	}
	else {
		//var invitation = 1;
		var email = document.hp_ebus_form.hp_ebus_email.value;
			if (email.length < 4){
				if (l == "es-ES"){
