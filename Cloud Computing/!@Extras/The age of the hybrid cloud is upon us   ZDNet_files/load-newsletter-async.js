define(["jquery","managers/user","version!fly/managers/debug","version!fly/components/base"],function(e,t,n){var r=n.get("loadNewsletterAsync");e.widget("zdnet.loadNewsletterAsync",e.fly.base,{options:{loginUrl:null,loggedUrl:null,url:null,data:{},replace:!0,relocate:!1,cache:!0},_create:function(){var e=this.options;this._setup(),this.id=this.$element.attr("id"),this.id||(this.id="uid-"+Math.floor(Math.random()*1e5),this.$element.attr("id",this.id)),r.log("_create: ","container",this.id),this._load()},_load:function(){var n=this.options,i=this;t.getUserData(function(t,s){n.url=s.isLoggedIn?n.loggedUrl:n.loginUrl,r.log("_load: ","loading",i.id,n.url,n.data),e.ajax({type:"GET",dataType:"json",url:n.url,data:n.data}).done(e.proxy(i._handleSuccess,i)).fail(e.proxy(i._handleFailure,i))})},_handleSuccess:function(t){var n=this.options,i=this;r.log("_handleSuccess: ","response success?",t.success,i.id),t.success&&t.html?(n.replace?i.$element.replaceWith(t.html):n.relocate&&e(n.relocate).length>0?e(t.html).prependTo(e(n.relocate)):i.$element.html(t.html),i._trigger("contentSet",null,{content:i.$element})):i._handleFailure(t)},_handleFailure:function(e){var t=this.options,n=this;r.log("_handleFailure: ","error message",e,n.id)}})})