define(["jquery","version!fly/managers/debug","version!fly/components/base"],function(e,t){e.widget("zdnet.footerSites",e.fly.base,{_create:function(){this._setup(),this._setupEvents()},_setupEvents:function(){var e={};e["change#siteTarget"]="_handleFooterSites",this._on(this.$document,e)},_handleFooterSites:function(t){t.preventDefault(),omnitureMgr.trackEvent("moduleClick",{moduleInfo:"Footer-Sites"}),window.location=e("#siteTarget option:selected").val()}})})