(function(e){var t={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper",center:!1,getWidthFrom:""},n=e(window),r=e(document),i=[],s=n.height(),o=function(){var t=n.scrollTop(),o=r.height(),u=o-s,a=t>u?u-t:0;for(var f=0;f<i.length;f++){var l=i[f],c=l.stickyWrapper.offset().top,h=c-l.topSpacing-a;if(t<=h)l.currentTop!==null&&(l.stickyElement.css("position","").css("top",""),l.stickyElement.parent().removeClass(l.className),l.currentTop=null);else{var p=o-l.stickyElement.outerHeight()-l.topSpacing-l.bottomSpacing-t-a;p<0?p+=l.topSpacing:p=l.topSpacing,l.currentTop!=p&&(l.stickyElement.css("position","fixed").css("top",p),typeof l.getWidthFrom!="undefined"&&l.stickyElement.css("width",e(l.getWidthFrom).width()),l.stickyElement.parent().addClass(l.className),l.currentTop=p)}}},u=function(){s=n.height()},a={init:function(n){var r=e.extend({},t,n);return this.each(function(){var n=e(this),s=n.attr("id"),o=s?s+"-"+t.wrapperClassName:t.wrapperClassName,u=e("<div></div>").attr("id",s+"-sticky-wrapper").addClass(r.wrapperClassName);n.wrapAll(u),r.center&&n.parent().css({width:n.outerWidth(),marginLeft:"auto",marginRight:"auto"}),n.css("float")=="right"&&n.css({"float":"none"}).parent().css({"float":"right"});var a=n.parent();a.css("height",n.outerHeight()),i.push({topSpacing:r.topSpacing,bottomSpacing:r.bottomSpacing,stickyElement:n,currentTop:null,stickyWrapper:a,className:r.className,getWidthFrom:r.getWidthFrom})})},update:o,unstick:function(t){return this.each(function(){var t=e(this),n=-1;for(var r=0;r<i.length;r++)i[r].stickyElement.get(0)==t.get(0)&&(n=r);n!=-1&&(i.splice(n,1),t.unwrap(),t.removeAttr("style"))})}};window.addEventListener?(window.addEventListener("scroll",o,!1),window.addEventListener("resize",u,!1)):window.attachEvent&&(window.attachEvent("onscroll",o),window.attachEvent("onresize",u)),e.fn.sticky=function(t){if(a[t])return a[t].apply(this,Array.prototype.slice.call(arguments,1));if(typeof t=="object"||!t)return a.init.apply(this,arguments);e.error("Method "+t+" does not exist on jQuery.sticky")},e.fn.unstick=function(t){if(a[t])return a[t].apply(this,Array.prototype.slice.call(arguments,1));if(typeof t=="object"||!t)return a.unstick.apply(this,arguments);e.error("Method "+t+" does not exist on jQuery.sticky")},e(function(){setTimeout(o,0)})})(jQuery)