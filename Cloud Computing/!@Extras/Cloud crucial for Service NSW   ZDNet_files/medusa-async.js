define(["jquery","managers/page-vars","version!fly/managers/debug","version!fly/utils/url-helper","components/load-async"],function(e,t,n,r){var i=n.get("medusaAsync");e.widget("zdnet.medusaAsync",e.zdnet.loadAsync,{options:{url:null,data:{}},_setup:function(){var t=this.options,n={siteId:_utag_obj.siteId,rsid:_utag_obj.rsid,sl:"en",sc:_utag_obj.siteEdition,pagetype:_utag_obj.pageType,topicguid:_utag_obj.topicId?_utag_obj.topicId[0]:"",topicbrcrm:_utag_obj.siteSection,assetguid:_utag_obj.articleId,assettitle:_utag_obj.articleTitle,assettype:_utag_obj.articleType,ftag_cd:_utag_obj["qp.ftag"],devicetype:_utag_obj.deviceType,viewguid:_utag_obj.pageViewGuid,ursuserid:_utag_obj.userId};e.extend(t.data,n),this._super(),t.data.upId&&(e.cookie("upid_"+t.data.upId)?t.delay=1e3:e.cookie("upid_"+t.data.upId,1,{expires:1})),r.getParam("medusaDebug")&&(t.data.medusaDebug=r.getParam("medusaDebug"))},_handleSuccess:function(e){var t=this.options,n=this;i.log("_handleSuccess: ","response success?",n.id,": ",e.success),i.log("_handleSuccess: ","response data - ",n.id,": ",e),e.success&&e.html?(this.$element.replaceWith(e.html),i.log("fire impression"),dwMgr.trackEvent({mapp:"medusa_app",comptyp:"spot",comp:"ucwc",riaevent:"impression",objtyp:"medusa",objnm:"",s7:""})):this._handleFailure(e)}})})