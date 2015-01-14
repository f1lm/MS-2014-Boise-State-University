define(["jquery","version!fly/utils/object-helper","version!fly/components/modal","version!fly/components/loading","version!fly/utils/data-prefix"],function(e,t){var n=e.support.touch?"vclick":"click";e.widget("fly.modalAsync",e.fly.modal,{options:{url:null,requestData:{},responseKey:"modal",loader:{disabled:!1}},isContentLoaded:!1,_create:function(){this._super(),this._setupLoader()},open:function(){if(this.isOpen)return;this.isContentLoaded||this.loadContent(),this._super()},_setupLoader:function(){this.loader=e.fly.loading(this.options.loader),this.loader.$element.appendTo(this.$element)},loadContent:function(){var n=this.options,r=this;this.loader.add(),e.ajax({dataType:"json",url:n.url,data:n.requestData}).done(function(i){var s=t.deepFind(i,n.responseKey)||{},u=s.html;if(!u){r.destroy();return}r._trigger("contentLoaded",null,e.extend({},this.eventData,{content:u})),r.isContentLoaded=!0,r.setContent(u),r.$backdrop.css({height:r.$document.height()})}).fail(function(e,t){r.destroy()}).always(function(){r.loader.remove()})},_destroy:function(){this._trigger("destroy"),this._super(),this.$modal.remove()}}),e(document).on(n+".modalAsync-api.data-api",'[data-open="modalAsync"]',function(t){var n=e(this),r=n.data(),i=r.$modal,s;n.data("modalOptions").checkIE?$checkIE=n.data("modalOptions").checkIE:$checkIE=!1,!$checkIE||navigator.appVersion.indexOf("MSIE 8.")==-1&&navigator.appVersion.indexOf("MSIE 7.")==-1?(t.preventDefault(),t.stopImmediatePropagation(),i?i.open():(s=n.data("modalAsyncOptions")||n.dataPrefix("modalAsync"),i=e.fly.modalAsync(e.extend(!0,{},{openOnInit:!0,destroy:function(){n.removeData("$modal")}},s)),n.data("$modal",i))):($url="//"+location.host+n.attr("href"),window.open($url))})})