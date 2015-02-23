var counts = [], linkUrls = [], targets = [], ids = [];IDHasLoaded = true;counts[0] = 'Comments (102)';linkUrls[0] = 'http://thoughtsoncloud.com/2014/03/a-brief-history-of-cloud-computing/#idc-container';targets[0] = '';ids[0] = 'IDShowCommentLink8785';var theCount = 0;
var idLinksToReplace = Array();
var spans = document.getElementsByTagName("span");
for ( var i = 0, sp_lng = spans.length; i < sp_lng; i++ ) {	
	if ( spans[i].className == "IDCommentsReplace" ) {
		idLinksToReplace[idLinksToReplace.length] = spans[i].parentNode;
		theCount++;
	}
}

for ( var i = 0, repl_lng = idLinksToReplace.length; i < repl_lng; i++ ) {
	if ( !linkUrls[i] )
		break;
	
	if ( typeof idLinksToReplace[i].href != 'undefined' ) idLinksToReplace[i].href = idLinksToReplace[i].href.replace( /#.*/, '#idc-container' );
	idLinksToReplace[i].id = ids[i];
	idLinksToReplace[i].target = targets[i];
	idLinksToReplace[i].innerHTML = counts[i];
}
