function star(){
	var u = document.location.href;

	document.write('<iframe' + ' src="http://www.computingportal.org/starfish/comments.php?url=' + u + '"' + ' id="comments_frame"' + ' name="comments"' + ' width=100% height=100%' + ' frameborder=0' + ' background-color=#000000' + ' scrolling="yes"');
	
	document.write('</iframe>');
}
