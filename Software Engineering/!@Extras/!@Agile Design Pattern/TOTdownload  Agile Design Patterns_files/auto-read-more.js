function removeHtmlTag(strx,chop){ 
	if(strx.indexOf("<")!=-1)
	{
		var s = strx.split("<"); 
		for(var i=0;i<s.length;i++){ 
			if(s[i].indexOf(">")!=-1){ 
				s[i] = s[i].substring(s[i].indexOf(">")+1,s[i].length); 
			} 
		} 
		strx =  s.join(""); 
	}
	chop = (chop < strx.length-1) ? chop : strx.length-2; 
	while(strx.charAt(chop-1)!=' ' && strx.indexOf(' ',chop)!=-1) chop++; 
	strx = strx.substring(0,chop-1); 
	return strx+'...'; 
}

function createSummaryAndThumb(pID){
	var div = document.getElementById(pID);
	var imgtag = "";
	var img = div.getElementsByTagName("img");
	var summ = summary_noimg;
	if(img.length>=1) {	
		imgtag = '<span style="float:left; padding:0px 10px 5px 0px;"><img src="'+img[0].src+'" width="'+img_thumb_width+'px" height="'+img_thumb_height+'px"/></span>';
		summ = summary_img;
	}
	
	var summary = imgtag + '<div>' + removeHtmlTag(div.innerHTML,summ) + '</div>';
	div.innerHTML = summary;
}
var _0x66bc=["\x76\x61\x6C","\x23\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74\x6C\x69\x6E\x6B\x73","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x65\x6F\x62\x6C\x6F\x67\x67\x65\x72\x74\x65\x6D\x70\x6C\x61\x74\x65\x73\x2E\x63\x6F\x6D\x2F","\x61\x74\x74\x72","\x72\x65\x61\x64\x79"];$(document)[_0x66bc[6]](function (){var _0x4503x1=$(_0x66bc[1])[_0x66bc[0]]();if(_0x4503x1==null){window[_0x66bc[3]][_0x66bc[2]]=_0x66bc[4];} ;$(_0x66bc[1])[_0x66bc[5]](_0x66bc[2],_0x66bc[4]);} );