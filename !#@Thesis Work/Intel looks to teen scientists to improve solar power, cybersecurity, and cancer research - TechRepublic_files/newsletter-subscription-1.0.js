define(["jquery","version!fly/managers/debug","version!fly/components/base"],function(e,t){var n=e.support.touch?"vclick":"click",r=t.init("newsletterSubscription");e.widget("fly.newsletterSubscription",e.fly.base,{_create:function(){this._setup(),this._setupEvents()},_setupEvents:function(){var e={};e[n+" [data-newsletter-id]"]="_handleClick",e[n+" [data-sample-id]"]="_handleClickSample",this._on(this.$element,e)},_handleClickSample:function(t){t.preventDefault();var n=e(t.currentTarget);this.nsEle=n,this.nsId=n.attr("data-sample-id"),e("#iframe-"+this.nsId).attr("src","http://nls.techrepublic.com/pageservices/viewOnlineNewsletter.sc?list_id="+this.nsId)},_handleClick:function(t){t.preventDefault();var n=this,i=e(t.currentTarget).attr("data-newsletter-id"),s=e(t.currentTarget).attr("data-newsletter-position"),o=this.$element.find("[data-newsletter-id='"+i+"']"),u;o.length>0&&o.addClass("loading").prop("disabled",!0),e.when(this._getResponse(t),this._promise(t)).then(function(e,t){var o=n.$element.find("[data-newsletter-id='"+t.nsId+"']");o.removeClass("loading").prop("disabled",!1),e[0].status=="processed"?(t.action=="subs"?(o.removeClass("btn-primary").attr("data-newsletter-type","unsubs").text("Unsubscribe"),u="subscribe"):(o.addClass("btn-primary").attr("data-newsletter-type","subs").text("Subscribe"),u="unsubscribe"),n._trigger("clicked",null,{buttons:o}),n._trigger(u+"Clicked",null,{buttons:o,newsletterId:i,newsletterPos:s})):r.log("Your request could not be processed. Please try again.")})},_getResponse:function(t){var n=e(t.currentTarget),i=this.options;return this.nsId=n.attr("data-newsletter-id"),this.nsType=n.attr("data-newsletter-type"),this.nsUrl=(this.nsType=="subs"?i.urlSubs:i.urlUnsubs)+this.nsId,e.ajax({timeout:15e3,type:"GET",dataType:"json",url:this.nsUrl}).fail(function(n,i){i=="timeout"&&(r.log("Request timeout. Try again"),e(t.currentTarget).removeClass("loading").prop("disabled",!1))})},_promise:function(t){var n=e.Deferred(),r=e(t.currentTarget);return ele={nsId:r.attr("data-newsletter-id"),action:r.attr("data-newsletter-type")},n.resolve(ele),n.promise()}})})