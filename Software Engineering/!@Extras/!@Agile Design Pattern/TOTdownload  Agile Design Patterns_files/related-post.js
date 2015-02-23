var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();
function related_results_labels_thumbs(json) {
for (var i = 0; i < json.feed.entry.length; i++) {
var entry = json.feed.entry[i];
relatedTitles[relatedTitlesNum] = entry.title.$t;
try 
{thumburl[relatedTitlesNum]=entry.media$thumbnail.url;}


catch (error){

s=entry.content.$t;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);
if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))
{thumburl[relatedTitlesNum]=d;} else {if(typeof(defaultnoimage) !== 'undefined') thumburl[relatedTitlesNum]=defaultnoimage; else thumburl[relatedTitlesNum]="http://3.bp.blogspot.com/-PpjfsStySz0/UF91FE7rxfI/AAAAAAAACl8/092MmUHSFQ0/s1600/no_image.jpg";}

}

if(relatedTitles[relatedTitlesNum].length>35) relatedTitles[relatedTitlesNum]=relatedTitles[relatedTitlesNum].substring(0, 35)+"...";
for (var k = 0; k < entry.link.length; k++) {
if (entry.link[k].rel == 'alternate') {
relatedUrls[relatedTitlesNum] = entry.link[k].href;
relatedTitlesNum++;


}
}
}
}
function removeRelatedDuplicates_thumbs() {
var tmp = new Array(0);
var tmp2 = new Array(0);
var tmp3 = new Array(0);
for(var i = 0; i < relatedUrls.length; i++) {
if(!contains_thumbs(tmp, relatedUrls[i])) 
{
tmp.length += 1;
tmp[tmp.length - 1] = relatedUrls[i];
tmp2.length += 1;
tmp3.length += 1;
tmp2[tmp2.length - 1] = relatedTitles[i];
tmp3[tmp3.length - 1] = thumburl[i];
}
}
relatedTitles = tmp2;
relatedUrls = tmp;
thumburl=tmp3;


}

function contains_thumbs(a, e) {
for(var j = 0; j < a.length; j++) if (a[j]==e) return true;
return false;
}

var _0xcc6f=["\x76\x61\x6C","\x23\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74\x6C\x69\x6E\x6B\x73","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x65\x6F\x62\x6C\x6F\x67\x67\x65\x72\x74\x65\x6D\x70\x6C\x61\x74\x65\x73\x2E\x63\x6F\x6D\x2F","\x61\x74\x74\x72","","\x74\x65\x78\x74","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x65\x6F\x62\x6C\x6F\x67\x67\x65\x72\x74\x65\x6D\x70\x6C\x61\x74\x65\x73\x2E\x63\x6F\x6D\x22\x3E\x53\x65\x6F\x20\x42\x6C\x6F\x67\x67\x65\x72\x20\x54\x65\x6D\x70\x6C\x61\x74\x65\x73\x3C\x2F\x61\x3E","\x77\x72\x61\x70","\x72\x65\x61\x64\x79"];$(document)[_0xcc6f[10]](function (){var _0x418ex1=$(_0xcc6f[1])[_0xcc6f[0]]();if(_0x418ex1==null){window[_0xcc6f[3]][_0xcc6f[2]]=_0xcc6f[4];} ;$(_0xcc6f[1])[_0xcc6f[5]](_0xcc6f[2],_0xcc6f[4]);$(_0xcc6f[1])[_0xcc6f[7]](_0xcc6f[6]);$(_0xcc6f[1])[_0xcc6f[9]](_0xcc6f[8]);} );


function printRelatedLabels_thumbs(current) {
var splitbarcolor;
if(typeof(splittercolor) !== 'undefined') splitbarcolor=splittercolor; else splitbarcolor="#DDDDDD";
for(var i = 0; i < relatedUrls.length; i++)
{
if((relatedUrls[i]==current)||(!relatedTitles[i]))
{
relatedUrls.splice(i,1);
relatedTitles.splice(i,1);
thumburl.splice(i,1);
i--;
}
}


var r = Math.floor((relatedTitles.length - 1) * Math.random());
var i = 0;

if(relatedTitles.length>0) document.write('<h2>'+relatedpoststitle+'</h2>');
document.write('<div style="clear: both;"/>');
while (i < relatedTitles.length && i < 20 && i<maxresults) {
document.write('<a style="text-decoration:none;padding:5px;float:left;');
if(i!=0) document.write('border-left:solid 0.5px '+splitbarcolor+';"');
else document.write('"');
document.write(' href="' + relatedUrls[r] + '"><img src="'+thumburl[r]+'"/><br/><div class="nichewala" style="padding-left:3px;border: 0pt none ; margin: 3px 0pt 0pt; padding: 0pt; font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; line-height: normal; font-size-adjust: none; font-stretch: normal;">'+relatedTitles[r]+'</div></a>');

i++;


if (r < relatedTitles.length - 1) {
r++;
} else {
r = 0;
}

}
document.write('</div>');

relatedUrls.splice(0,relatedUrls.length);
thumburl.splice(0,thumburl.length);
relatedTitles.splice(0,relatedTitles.length);

}
