var Matt={};Matt.popupIE=function(){if($.browser.msie){var IE=confirm("I'm sorry, Dave. I'm afraid I cannot in good conscience let you use an inferior web browser.");if(IE){window.location.href='http://tools.google.com/dlpage/chromesxs';}
else{window.location.href='http://www.google.com';}}};Matt.mailobfuscator=function(account,domain,tld,linktext,icon){if(!icon&&!linktext)document.write('<a href="mailto:'+account+'@'+domain+'.'+tld+'">'+account+'@'+domain+','+tld+'</a>');if(!icon)document.write('<a href="mailto:'+account+'@'+domain+'.'+tld+'">'
+linktext+'</a>');else
document.write('<img src="/assets/icons/email.png"'+' style="height:16px;width:16px;" alt="mail"/>&nbsp; '+'<a href="mailto:'+account+'@'+domain+'.'+tld+'">'+linktext+'</a>');};Matt.publicemail=function(linktext,icon){if(!linktext)linktext='ma'+'tt'+'@'+'th'+'ema'+'ttch'+'an'+'.'+'co'+'m';if(!icon)document.write('<a href="mailto:'+'ma'+'tt'+'@'+'th'+'ema'+'ttch'+'an'+'.'+'co'+'m">'+linktext+'</a>');else
document.write('<img src="/assets/icons/email.png"'+' style="height:16px;width:16px;" alt="mail"/>&nbsp;'+' <a href="mailto:'+'ma'+'tt'+'@'+'th'+'ema'+'ttch'+'an'+'.'+'co'+'m">'+linktext+'</a>');};Matt.tweetme=function(){document.write('<img src="/assets/icons/twitter.png"'+' style="width:16px;height:16px;"'+' alt="send me a message @themattchan"/>'+'&nbsp;<a href="https://twitter.com/intent/tweet?screen_name=themattchan" target="_blank">@themattchan</a>');};Matt.socialmedia=function(size){var social_sites=[{"name":"twitter","link":"http://www.twitter.com/themattchan"},{"name":"delicious","link":"http://www.delicious.com/themattchan"},{"name":"linkedin","link":"http://www.linkedin.com/in/themattchan"},{"name":"github","link":"https://github.com/themattchan"}];for(var i=0;i<social_sites.length;i++){document.writeln('&nbsp;<a href="');document.writeln(social_sites[i].link);document.writeln('"><img src="/assets/icons/'+social_sites[i].name+'.png"');if(size==='large')document.writeln(' style="width:36px;height:36px;" alt="');else if(size==='medium')document.writeln(' style="width:20px;height:20px;" alt="');else document.writeln(' style="width:16px;height:16px;" alt="');document.writeln(social_sites[i].name[0].toUpperCase()+social_sites[i].name.substring(1));document.writeln('"/></a>');}}