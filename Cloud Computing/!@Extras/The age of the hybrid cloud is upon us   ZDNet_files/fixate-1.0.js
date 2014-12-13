define(["jquery","version!fly/components/base"],function(e){e.widget("fly.fixate",e.fly.base,{options:{classFixed:"fixed",classUnfixed:"unfixed",primaryEdge:"top",offset:{top:20,bottom:20},stickToLeft:!1,stickToRight:!1,guideTop:null,guideBottom:null,guideLeft:null,guideRight:null},hasEvents:!1,isFixed:!1,boundary:{top:-1,bottom:-1,left:-1,right:-1},$element:null,$window:e(window),$document:e(document),_create:function(){this._super("_create"),this._setBoundaries(),this._addEvents(),this.checkPosition()},_addEvents:function(){var t=this.options;if(this.hasEvents||this.disabled)return;this.hasEvents=!0,this.$window.on("scroll.fixate",e.proxy(this.checkPosition,this)),this.$window.on("resize.fixate",e.proxy(this.checkPosition,this))},_removeEvents:function(){this.hasEvents=!1},_setBoundaries:function(){var t=this.options,n=null,r=null,i=null,s=null,o=null;this.boundary={top:-1,bottom:-1,left:-1,right:-1},t.guideTop&&(r=e(t.guideTop),n=r.offset(),this.boundary.top=n.top+r.outerHeight()),t.guideBottom&&(i=e(t.guideBottom),n=i.offset(),this.boundary.bottom=n.top);if(t.guideLeft){s=e(t.guideLeft),n=s.offset();if(t.stickToLeft){if(this.boundary.top<0||n.top>this.boundary.top)this.boundary.top=n.top;if(this.boundary.bottom<0||n.top+s.outerHeight()<this.boundary.bottom)this.boundary.bottom=n.top+s.outerHeight()}}if(t.guideRight){o=e(t.guideRight),n=o.offset();if(t.stickToRight){if(this.boundary.top<0||n.top>this.boundary.top)this.boundary.top=n.top;if(this.boundary.bottom<0||n.top+o.outerHeight()<this.boundary.bottom)this.boundary.bottom=n.top+o.outerHeight()}}},_fix:function(){var e=this.options;this.isFixed=!0,this.$element.addClass(e.classFixed).removeClass(e.classUnfixed),e.primaryEdge==="top"?this.$element.css("top",e.offset.top):this.$element.css("top",this.$window.height()-e.offset.bottom-this.$element.height()),this._placeHorizontally()},_unfix:function(e){var t=this.options;this.isFixed=!1,this.$element.addClass(t.classUnfixed).removeClass(t.classFixed),e==="top"?this.$element.css("top",this.boundary.top+t.offset.top-this.$window.scrollTop()):this.$element.css("top",this.boundary.bottom-t.offset.bottom-this.$element.height()-this.$window.scrollTop()),this._placeHorizontally()},_placeHorizontally:function(){var t=this.options,n=this.$window.scrollLeft(),r=null,i=null;t.guideLeft?(r=e(t.guideLeft),this.$element.css("left",r.offset().left+r.outerWidth()-n)):t.guideRight&&(i=e(t.guideRight),this.$element.css("left",i.offset().left-this.$element.width()-n))},checkPosition:function(){var e=this.options,t=this.$window.scrollTop(),n=t+this.$window.height(),r=this.$element.height();this._setBoundaries(),e.primaryEdge==="top"?t<this.boundary.top?this._unfix("top"):this.boundary.bottom>=0&&t+e.offset.top+r+e.offset.bottom>this.boundary.bottom?this._unfix("bottom"):this._fix():n>this.boundary.bottom?this._unfix("bottom"):n-e.offset.bottom-r-e.offset.top<this.boundary.top?this._unfix("top"):this._fix()},destroy:function(){this._removeEvents(),this._super("destroy")}})})