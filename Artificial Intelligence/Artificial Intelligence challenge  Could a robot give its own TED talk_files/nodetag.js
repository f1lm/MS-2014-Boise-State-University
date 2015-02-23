(function(){
var pfs={ "http://www.networkworld.com/topics/data-center.html":{"nid":23418,"tr":1},
"http://www.networkworld.com/topics/management.html":{"nid":23415,"tr":1},
"http://www.networkworld.com/topics/wireless.html":{"nid":23416,"tr":1},
"http://www.networkworld.com/topics/security.html":{"nid":23412,"tr":1},
"http://www.networkworld.com/topics/software.html":{"nid":23417,"tr":1},
"http://www.networkworld.com/topics/lan-wan.html":{"nid":23413,"tr":1},
"http://www.networkworld.com/community/toolshed":{"nid":23421,"tr":1},
"http://www.networkworld.com/topics/voip.html":{"nid":23414,"tr":1},
"http://www.networkworld.com/topics/smb.html":{"nid":23419,"tr":1},
"http://www.networkworld.com/careers/":{"nid":23420,"tr":1},
"http://www.networkworld.com/events/":{"nid":23411,"tr":1},
"http://www.networkworld.com/video/":{"nid":23410,"tr":1},
"http://www.networkworld.com/blogs/":{"nid":23409,"tr":1},
"http://www.networkworld.com/news/":{"nid":23408,"tr":1},
"http://www.networkworld.com/":{"nid":23407,"tr":1} },d=document,w=window,u=(w.gm_fake_href)?w.gm_fake_href:w.location.href;

function z(n){
var s,u;

if (Math.random()>=n['tr']) {
	return;
}



var ar_nodes = ":23418:23415:23416:23412:23417:23413:23421:23414:23419:23420:23411:23410:23409:23408:23407:";
if (ar_nodes.indexOf(":"+n['nid']+":") >= 0) {	// adradar only
	(new Image).src="//amch.questionmarket.com/adscgen/adrad.php?survey_num=0&aicode=0&site="+n['nid'];
	return;
}



s=d.createElement('SCRIPT');
u='//content.dl-rms.com/dt/s/'+n['nid']+'/s.js';
s.src=u;
s.type='text/javascript';
d.getElementsByTagName('head')[0].appendChild(s);
}


function r() {
	var n="",p,x;
	while (1) {
		try {
			for (p in pfs) {
			  if (u.substring(0,p.length)==p && p.length > n.length) {
				if (pfs[p].ex) {
					x=new RegExp(pfs[p].ex,"i");
					if (x.test(u)) {
						continue;
					}
				}
				n=p;
			  }
			}
			if (n.length > 0) {
				z(pfs[n]);
				return;
			}
		} catch (e) {}
	
		if (w==top) {
			break;
		}
	
		if (w==window&&u!=d.referrer) {
			u=d.referrer;
		} else {
			w=w.parent;
		}
	}
}

if (d.readyState=="complete"){
	r();
} else if (w.addEventListener){ 
	w.addEventListener("load", r, false);
} else if (w.attachEvent){ 
	w.attachEvent("onload", r);
}
})();
