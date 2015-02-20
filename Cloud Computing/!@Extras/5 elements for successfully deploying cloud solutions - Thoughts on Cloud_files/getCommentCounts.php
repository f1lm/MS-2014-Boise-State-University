var counts = [], linkUrls = [], targets = [], ids = [];IDHasLoaded = true;counts[0] = 'Comments (2)';linkUrls[0] = 'http://thoughtsoncloud.com/2015/02/5-elements-successfully-deploying-cloud-solutions/#idc-container';targets[0] = '';ids[0] = 'IDShowCommentLink11846';var theCount = 0;
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
