YUI({modules:{"userdestinations-css":{type:"css",fullpath:"/assets/styles/user-destinations.css"}}}).use("bepress.webservice","node","event","cookie","io-base","json-parse","userdestinations-css",function(b){var k=window.BPBootstrap.loggedIn,c="navf2b",m="#user-destinations",d="div.destination-toggle",h="display",i="opened",f="closed",l="height",n;function e(q){var p="/do/find_destinations/?p="+encodeURI(window.location.href);var o=b.io(p,{on:{success:function(u,t,r){var u=u;var s=t.responseText;window.BPBootstrap.nav_results=b.JSON.parse(s);q(window.BPBootstrap.nav_results);},failure:function(r){var s,t=[];for(s in r){if(r.hasOwnProperty(s)){t.push(s+"="+r[s]);}}}}});}function g(){var o=b.one(m),q=o.one("ul"),p=b.one(d);q.setStyle(h,null);o.setStyle(l,(n)+"px");o.removeClass(f);p.setY(n);p.one("a").set("innerHTML","Hide");}function a(){var o=b.one(m),q=o.one("ul"),p=b.one(d);q.setStyle(h,"none");o.setStyle(l,"0px");o.addClass(f);p.setY(0);p.one("a").set("innerHTML","Show");}function j(t){var s,z,r,o,w,p,q;if(t&&t.destinations&&t.destinations.length>0){p=b.Node.create('<div id="user-destinations">');var q="<ul>";for(s=0;s<t.destinations.length;s++){z=t.destinations[s][0];o=t.destinations[s][1];q+='<li><a href="'+o+'" style="white-space:nowrap">'+z+"</a></li>";}q+="</ul>";p.set("innerHTML",q);w=b.one("body");w.append(p);r=p.one("ul");var x=p.getY();var v=parseInt(r.get("offsetHeight"));n=x+v;var u=b.Node.create('<div class="destination-toggle"><a href="#" title="Switch the Menu">Hide</a></div>');w.append(u);if(b.Cookie.exists(c)&&b.Cookie.get(c)===f){a();}else{u.setY(x+v);}b.one(d+" a").on("click",function(y){var A={path:"/"};y.halt();if(p.hasClass(f)){b.Cookie.remove(c,A);g();}else{b.Cookie.set(c,f,A);a();}});}}if(k){if(window.BPBootstrap.nav_results){j(window.BPBootstrap.nav_results);}else{if(b.bepress.webservice.shouldDelayForTesting("__dnf2b")){setTimeout(function(){e(j);},5000);}else{e(j);}}}});