define(["jquery","version!fly/managers/debug","managers/user","version!fly/components/base"],function(e,t,n){var r=t.init("newsletterSubscriptionButton");e.widget("fly.newsletterSubscriptionButton",e.fly.base,{_create:function(){this._setup(),this.$button=this.$element.find(".subscribe-button"),this._setupEvents(),this._initNewsletter()},_setupEvents:function(){var e={};e["click .subscribe-button"]="_handleClick",this._on(this.$element,e)},_initNewsletter:function(){var t=this;n.getUserData(function(n,i){if(t.options.urlGetNewsletter&&t.options.urlGetNewsletterLogin){var s=i.isLoggedIn?t.options.urlGetNewsletter:t.options.urlGetNewsletterLogin;r.log("newsletter url"+s),e.ajax({type:"GET",dataType:"json",url:s+t.options.topic}).success(function(e,n){r.log(e);if(!e.newsletters)return;if(e.newsletters.length>0){var i=t.$button,s=e.newsletters[0];i.find("span").text(s.description),i.data("newsletter-id",s.listId),i.removeClass("loading").prop("disabled",!1),i.show()}})}else t.options.id?(t.$button.data("newsletter-id",t.options.id),t.$button.show()):t.$button.hide()})},_handleClick:function(t){t.preventDefault();var i=this.$button,s=i.data("newsletter-id"),o=this.options.urlSubscribe+s,u=this.options.successCopy;n.hasAccess({position:"Newsletter Sub Button",nextAction:function(){return i.prop("disabled",!0),e.ajax({timeout:15e3,type:"GET",dataType:"json",url:o}).fail(function(e,t){t==="timeout"&&(r.log("Request timeout. Try again"),i.removeClass("loading").prop("disabled",!1))}).success(function(e,t){omnitureMgr.trackEvent("newsletterSubscribe",{newsletterId:s}),i.text(u)}),!1}})}})})