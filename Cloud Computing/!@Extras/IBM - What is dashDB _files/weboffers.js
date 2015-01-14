//var previewPathMM = '/software/products/en/business-intelligence/';


function imgMMFx(strObj,strDef){
 var objMMSrc = strObj.src;strObj.style.display = 'none'
 if(objMMSrc.indexOf(strDef+'.jpg')==-1){strObj.src = '//www.ibm.com/software/info/direct/imgs/'+strDef+'.jpg';strObj.style.display = 'block'}
 
}
function redOffMM(strUrl,strTrack,strElement){
 var trCookie = '';
 if(strUrl.indexOf('dynform')>0 || strUrl.indexOf('ww14.software')>0){trCookie = 'trfix=1&'}
 img1 = new Image();
 img1.src = '//www-01.ibm.com/software/info/direct/stchk.jsp?'+trCookie+'stat='+strTrack;
}
function youTubeMM(strUrl){
 var widgetMM = new ext.media.overlaywidget()
 widgetMM.startup([{'type':'youtube','url':{'youtube': strUrl},'width':640,'height':360,'isVideo':true}],true);
 return false;
}

dojo.require('ext.media._base')
dojo.require('ibmweb.jquery');
var listOfPrevDivIdClass = 'div[id^="unica-interact"]';
var tmpMMStyles = '<style>';
tmpMMStyles += listOfPrevDivIdClass+', #CV17_RHT_Full, #CV17_Mid_Front, #CV17_Download_Full, #com_feed, #swg-opp-offers-bottom, #swg-opp-offers-rcol, div[id^="momcnt_"]{display:none !important}';
tmpMMStyles += '#momcnt_4{padding:10px 0px 10px 0px}';
tmpMMStyles += '#momcnt_1, #momcnt_2{padding-top:20px;border-top:1px dotted #cccccc;margin-top:10px}';
tmpMMStyles += '#momcnt_2{margin-top:0px;padding-top:15px}';
tmpMMStyles += '</style>';
var ibmColArr = ',5-1,5-2,5-3,5-4,5-5,6-1,6-2,6-3,6-4,6-5,6-6';ibmColArr = ibmColArr.split(',');
var curPageLayUse = 1;
var templateHTMLMM = new Array();
templateHTMLMM[0] = '';
templateHTMLMM[1] = '<div {REF}style="font-size:12px;color:#33719d;"><a  href="{URL}" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)" rel="mmExtLk" style=";text-decoration:none">{TITLE}</a></div><div style="margin:0px 0px 10px 0px;font-size:12px">{DESCRIPTION}</div>';
templateHTMLMM[2] = '<div {REF}style="min-height:60px;position:relative;margin-bottom:10px"><div style="position:absolute"><img src="{IMAGE}" style="width:60px;height:60px" onError="imgMMFx(this,\'{DEFIMG}\')"/></div><div style="margin-left:70px"><a style="font-size:12px;color:#33719d;font-weight:bold;text-decoration:none" href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)">{TITLE}</a><div style="margin-top:2px;font-size:12px">{DESCRIPTION}</div></div></div>';
templateHTMLMM[3] = '<div {REF}style="min-height:60px;position:relative;margin-bottom:10px"><div style="position:absolute"><img src="{IMAGE}"  onError="imgMMFx(this,\'{DEFIMG}\')" style="width:60px"/></div><div style="margin-left:70px"><a style="font-size:12px;color:#33719d;font-weight:bold;text-decoration:none" href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)">{TITLE}</a></div></div>';
templateHTMLMM[4] = '<div {REF} style="margin-bottom:15px"><div style="font-size:14px;font-weight:bold;margin-bottom:3px">{TITLE}</div><div><a  href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)"><img src="{IMAGE}" border="0"/></a></div></div>';
templateHTMLMM[5] = '<div {REF}style="margin-bottom:10px"><div style="font-size:14px;font-weight:bold;margin-bottom:3px">{TITLE}</div><div><a  href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)"><img src="{IMAGE}" border="0"/></a></div><div style="margin-top:2px;font-size:12px" >{DESCRIPTION}</div></div>';
templateHTMLMM[6] = '<div {REF}style="min-height:86px;position:relative"><div style="position:absolute"><img src="{IMAGE}"/></div><div style="margin-left:80px"><div><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)" style="font-size:12px;color:#33719d;text-decoration:none">{TITLE}</a></div><div style="margin-top:2px;font-size:12px">{DESCRIPTION}</div></div></div>';
templateHTMLMM[7] = '<div {REF}style="margin:10px 0px 10px 0px"><a style="color:#33719d;padding-left:16px;text-decoration:none" class="ibm-forward-link" href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)">{TITLE}</a></div>';
templateHTMLMM[8] = '<div {REF}style="min-height:120px;position:relative;margin-bottom:10px"><div style="position:absolute"><img src="{IMAGE}" style="width:98px"/></div><div style="margin-left:108px"><div><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)" style="font-size:12px;color:#33719d;text-decoration:none;font-weight:bold">{TITLE}</a></div><div style="margin-top:2px;font-size:12px">{DESCRIPTION}</div></div></div>';
templateHTMLMM[9] = '<div {REF}class="ibm-col-6-2"><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)"><img src="{IMAGE}" border="0"/></a></div>';
templateHTMLMM[10] = '<div {REF}style="min-height:86px;position:relative;margin-bottom:20px" ><div style="position:absolute"><img src="{IMAGE}" style="width:70px"/></div><div style="margin-left:80px"><p style="font-size:14px;font-weight:bold;color:#000000;margin:0px !important;padding:0px !important">{TITLE}</p><p style="font-size:12px;margin:0px !important;padding:5px 0px 5px 0px !important">{DESCRIPTION}</p><p class="ibm-button-link-alternate" style="font-size:14px;font-weight:bold !important"><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)">{BUTTONTEXT}</a></p></div></div>';
templateHTMLMM[21] = '<div {REF}style="min-height:55px;position:relative"><div style="position:absolute"><img src="{IMAGE}"/ onError="imgMMFx(this,\'{DEFIMG}\')" style="width:60px"></div><div style="margin-left:70px"><div><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)" style="font-size:12px;color:#33719d;font-weight:bold;text-decoration:none">{TITLE}</a></div><div style="margin-top:2px;font-size:12px">{DESCRIPTION}</div></div></div>';
templateHTMLMM[41] = '<div {REF}style="min-height:86px;position:relative;margin-bottom:20px" ><div style="position:absolute"><img src="{IMAGE}" style="width:70px"/></div><div style="margin-left:80px"><p style="font-size:14px;font-weight:bold;color:#000000;margin:0px !important;padding:0px !important">{TITLE}</p><p class="ibm-button-link-alternate" style="font-size:14px;font-weight:bold !important"><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)">{BUTTONTEXT}</a></p></div></div>';
templateHTMLMM[61] = '<div {REF}style="padding:5px 5px 0px 5px;background-color:#f4f4f4;margin-bottom:10px"><p style="font-size:14px;font-weight:bold;color:#000000;margin:0px !important;padding:0px !important" class="custom_title_webad">{TITLE}</p><p style="font-size:12px;margin:0px !important;padding:5px 0px 5px 0px !important" class="custom_desc_webad">{DESCRIPTION}</p><p><a style="font-size:12px;color:#33719d;padding-left:16px;text-decoration:none" class="ibm-forward-link" href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)">{BUTTONTEXT}</a></p></div>';
templateHTMLMM[81] = '<div {REF}style="min-height:66px;position:relative;margin-bottom:20px" ><div style="position:absolute"><img src="{IMAGE}" style="width:60px"/></div><div style="margin-left:70px"><p style="font-size:14px;font-weight:bold;color:#000000;margin:0px !important;padding:0px !important">{TITLE}</p><p style="font-size:12px;margin:0px !important;padding:5px 0px 5px 0px !important">{DESCRIPTION}</p><p><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)" class="ibm-forward-link">{BUTTONTEXT}</a></p></div></div>';
templateHTMLMM[101] = '<div {REF}><p style="font-size:14px;font-weight:bold;color:#000000;margin:0px !important;padding:0px !important">{TITLE}</p><p style="font-size:12px;margin:0px !important;padding:5px 0px 5px 0px !important">{DESCRIPTION}</p><p><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)" class="ibm-forward-link">{BUTTONTEXT}</a></p></div>';
templateHTMLMM[121] = '<div style="padding:0px 0px 15px 0px; border-top:1px dotted #333333 !important; margin:20px 0px 0px 0px"></div><div {REF}style="min-height:66px;position:relative;margin-bottom:20px" ><div style="position:absolute"><img src="{IMAGE}" style="width:60px"/></div><div style="margin-left:70px"><p style="font-size:14px;font-weight:bold;color:#000000;margin:0px !important;padding:0px !important">{TITLE}</p><p style="font-size:12px;margin:0px !important;padding:5px 0px 5px 0px !important">{DESCRIPTION}</p><p><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)" class="ibm-forward-link">{BUTTONTEXT}</a></p></div></div>';
templateHTMLMM[141] = '<div {REF} style="font-size:12px !important;margin-bottom:15px"><div style="text-align:center;min-height:120px;" valign="bottom"><img src="{IMAGE}"></div><p><strong>{TITLE}</strong></p><p>{DESCRIPTION}</p><p class="ibm-ind-link"><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)" class="ibm-forward-link ibm-no-proxy">{BUTTONTEXT}</a></p></div>';
var curMetaCountryMM = 0; var curMetaLangMM = 0; var curMetaValueMM = ''; var curURlStringMM = ''; var curPageDataIdMMOver = 0; var curPageDataIdMM = 0; var curButtonDataMM; var curButtonDataMMBkup; var curPageIWMMM = '';var curUseDomainMM = '//www-01.ibm.com';
setTimeout(function(){
try{
 //jQuery('#CV_RHT_Full').attr('id','CV17_Mid_Front');
 //jQuery('#CV_Mid_Front').attr('id','CV17_Mid_Front');
 var rhtFullFix = document.getElementById('CV_RHT_Full');
 if(rhtFullFix != null){
  rhtFullFix.id = 'CV17_Mid_Front';
 }
 var rhtMidFix = document.getElementById('CV_Mid_Front');
 if(rhtMidFix != null){
  rhtMidFix.id = 'CV17_Mid_Front';
 }
 dojo.query(listOfPrevDivIdClass).forEach(function(node){dojo.destroy(node)});
 curMetaValueMM = ibmweb.meta.dc_language;
 if(curMetaValueMM==''){
  if(typeof tmpLangOverMM === 'undefined' || tmpLangOverMM === ''){
   var metaTagMM = document.getElementsByTagName('meta');
   for(var i in metaTagMM){
    if(metaTagMM[i].name == 'DC.Language'){
     curMetaValueMM = metaTagMM[i].content;
    }
   };
  }else{
   curMetaValueMM = tmpLangOverMM
  }
 };
 if(curMetaValueMM==''){curMetaValueMM='en-US'}
 curURlStringMM = window.location.pathname;if(typeof previewPathMM !== 'undefined'){curURlStringMM = previewPathMM}
 var fndAStringToUse = 0;
 var regTrysMM = new Array();var expDateTimeMM = Math.round((new Date()).getTime() / 1000);var footWedMMChk = 1;
  regTrysMM[0] =  '/software/products/[a-z]{2}/(?!os)[a-z]{2}/category/|||5';
  regTrysMM[1] =  '/software/products/(?!os)[a-z]{2}/category/|||1';
  regTrysMM[2] =  '/software/products/[a-z]{2}/(?!os)[a-z]{2}/|||6';
  regTrysMM[3] =  '/software/products/(?!os)[a-z]{2}/|||2';
  regTrysMM[4] =  '/software/analytics/(?!os)(?!aq)[a-z]{2}/|||4';
  regTrysMM[5] =  '/software/analytics/|||3';
  regTrysMM[6] =  '/software/commerce/[a-z]{2}/(?!os)[a-z]{2}/|||42';
  regTrysMM[7] =  '/software/commerce/(?!os)[a-z]{2}/|||41';
  regTrysMM[8] =  '/software/commerce/|||21';
  regTrysMM[9] =  '/software/data/(?!os)[a-z]{2}/|||43';
  regTrysMM[10] =  '/software/data/[a-z]{2}/(?!os)[a-z]{2}/|||44';
  regTrysMM[11] =  '/software/data/|||45';
  regTrysMM[12] =  '/software/city-operations/|||61';
  regTrysMM[13] =  '/software/info/|||62';
  regTrysMM[14] =  '/software/marketing-solutions/|||81';
  regTrysMM[15] =  '/software/procurement-solutions/|||101';
  regTrysMM[16] =  '/software/ecm/|||121';
 for(var i = 0; i < regTrysMM.length; i++){
  var sptRegtrMM = regTrysMM[i].split('|||');
  if(curURlStringMM.indexOf('/subcategory/messaging/')==-1){
   curURlStringMM = curURlStringMM.replace('/subcategory/','/category/')
  }
  if(curURlStringMM!=curURlStringMM.replace(new RegExp(sptRegtrMM[0]),'')){
   fndAStringToUse = 1
   var curPathSplitMM = curURlStringMM.replace(new RegExp(sptRegtrMM[0]),'').split('/');
   var curPathLookupMM = '';
   if(sptRegtrMM[0].indexOf('[a-z]')>-1){
    curPageLayUse = 0;
   } 
   for(var ii = 0; ii < curPathSplitMM.length; ii++){
    if(curPathSplitMM[ii]!='' && curPathSplitMM[ii].toLowerCase()!='index.html'){
     if(curPathLookupMM!=''){curPathLookupMM += '/'};curPathLookupMM += curPathSplitMM[ii];
    }
   }
   if(curPathLookupMM!=''){
    var adTacNew = '';
    if(getQSMomParam('S_TACT')!=''){adTacNew = '&tactic='+getQSMomParam('S_TACT')}
    if(getQSMomParam('S_CMP')!=''){adTacNew = adTacNew + '&scmp='+getQSMomParam('S_CMP')}

    var extJSPloadMM = '//www-01.ibm.com/software/info/direct/weboffers.jsp?location='+curPathLookupMM+'&pattern='+sptRegtrMM[1]+'&language='+curMetaValueMM+adTacNew+'&dmn='+window.location.host;
    var headMM = document.getElementsByTagName("head")[0];
    var jsMM = document.createElement("script");
    jsMM.type = "text/javascript";
    jsMM.async = true;
    jsMM.src = extJSPloadMM;
    headMM.appendChild(jsMM);
   }
   break;
  }
 }
 if(fndAStringToUse==0){fallBackCom()}
}catch(e){
 console.log('Error', e.stack);
 console.log('Error', e.name);
 console.log('Error', e.message);
 if(typeof fallBackCom == 'function'){fallBackCom()};
}
},100);

var resPopRan = 0;
function resPopMM(){
 if(resPopRan==0){
  resPopRan = 1;
  tmpMMStyles = jQuery(tmpMMStyles);
  jQuery('html > head').append(tmpMMStyles);
  //jQuery('#swg-opp-offers-bottom, #swg-opp-offers-rcol').remove();
  jQuery('#swg-opp-offers-bottom, #swg-opp-offers-rcol').hide();
  jQuery('#CV17_Mid_Front').attr('id', 'momcnt_1');
  jQuery('#CV17_Download_Full').attr('id', 'momcnt_3');
 
  if(jQuery('#com_feed').length){
   jQuery('#com_feed').attr('id','momcnt_3').show();
  }else if(jQuery('div[class="CV17_Mid_Front_Small"]').length){
   jQuery('div[class="CV17_Mid_Front_Small"]').not(':first').remove()
   jQuery('div[class="CV17_Mid_Front_Small"]').append('<div id="momcnt_3"></div>');
  }
  if(jQuery('#CV17_RHT_Full').length){
   jQuery('#CV17_RHT_Full').before('<div id="momcnt_2"></div>');
  }else if(jQuery('#swg-opp-support-form').length){
   jQuery('#swg-opp-support-form').after('<div id="momcnt_2"></div>');
  }else if(jQuery('#ibm-merchandising-module').length && jQuery('#ibm-merchandising-module').parent().attr('id') != 'ibm-related-content'){
   jQuery('<div id="momcnt_2"></div>').insertBefore(jQuery('#ibm-merchandising-module'));
  }else if(curPageLayUse==0){
   if(jQuery('.ibm-col-6-2').length > 1){jQuery('#ibm-contact-module').after('<div id="momcnt_2"></div>')}else{jQuery('.ibm-col-6-2:first').append('<div id="momcnt_2"></div>')}
  }
  var botOffHold = '';var rgtOffHold = '';
  if(jQuery('#swg-opp-offers-rcol').length){rgtOffHold = jQuery('#swg-opp-offers-rcol').html()}
  if(jQuery('#swg-opp-offers-bottom').length){botOffHold = jQuery('#swg-opp-offers-bottom').html()}
  if(jQuery('div[class="CV17_Mid_Front_Mid"]').length){
   var tmpParMidFrontMM = jQuery('div[class="CV17_Mid_Front_Mid"]:first').parent();
   tmpParMidFrontMM.html('');
   tmpParMidFrontMM.append('<div id="momcnt_1"></div>');
  }else if(jQuery('#swg-htb-header').length){
   jQuery('#swg-htb-header').before('<div id="momcnt_1"></div>');
  }else if(jQuery('#swg-htb-bottom-con').length){
   jQuery('#swg-htb-bottom-con').before('<div id="momcnt_1"></div>');
  }else if(jQuery('#swg-opp-offers-bottom').length){
   jQuery('#swg-opp-offers-bottom').before('<div id="momcnt_1"></div>');
  }else if(curPageLayUse==0){
   jQuery('.ibm-col-6-4:first div:first').append('<div id="momcnt_1"></div>');
  }
  jQuery('#momcnt_1, #momcnt_2, #momcnt_3, #momcnt_4').attr('style', 'display: block !important');
 
  var tmpCurMMTlId = 0;
  var curtempTwks = 0;
  var curtempTwksText = jQuery('meta[name="Source"]').attr('content') + '';
  if(curtempTwksText.indexOf('Template Generator')>0){curtempTwks = 1}
  var clmReminder = '';var clmParNum = -1;var clmParNumRunnig = 0;
  for(var i = 0; i < adMM.length; i++) {
   if(jQuery('#'+adMM[i][6]).length>0){
 
   }else{
    var adIndMM = adMM[i];
    var tmpTempTypeMM = adMM[i][5].split('-');
    var tmpImgFixMM = adMM[i][3];if(tmpImgFixMM==''){tmpImgFixMM = '//www.ibm.com/software/info/direct/imgs/'+tmpTempTypeMM[1]+'.jpg'}
    var tmpTitleAlt = adMM[i][1].replace(/"/g, '');
    var xmlAdNodesWorkerMM = '';
    if(tmpTempTypeMM[0]==9 && adMM[i][0]!='4'){
     //xmlAdNodesWorkerMM = templateHTMLMM[tmpTempTypeMM[0]].replace('{TITLE}',adMM[i][1]).replace('{DESCRIPTION}',adMM[i][2]).replace('{IMAGE}',tmpImgFixMM).replace('{DEFIMG}',tmpTempTypeMM[1]).replace(/{URL}/g,adMM[i][4]).replace('{BUTTONTEXT}',tmpTempTypeMM[2]).replace('{STATS}',adMM[i][6]).replace('{REF}','id="'+adMM[i][6]+'" ref="'+adMM[i][7]+'#'+adMM[i][6]+'" ').replace('<img ','<img alt="'+tmpTitleAlt+'"').replace('class="ibm-col-6-2"','style="margin-bottom:15px"');
     xmlAdNodesWorkerMM = templateHTMLMM[tmpTempTypeMM[0]].replace('{TITLE}',adMM[i][1]).replace('{DESCRIPTION}',adMM[i][2]).replace('{IMAGE}',tmpImgFixMM).replace('{DEFIMG}',tmpTempTypeMM[1]).replace(/{URL}/g,adMM[i][4]).replace('{BUTTONTEXT}',tmpTempTypeMM[2]).replace('{STATS}',adMM[i][6]).replace('{REF}','id="'+adMM[i][6]+'" ref="'+adMM[i][7]+'#'+adMM[i][6]+'" ').replace('class="ibm-col-6-2"','style="margin-bottom:15px"');
    }else{
     //xmlAdNodesWorkerMM = templateHTMLMM[tmpTempTypeMM[0]].replace('{TITLE}',adMM[i][1]).replace('{DESCRIPTION}',adMM[i][2]).replace('{IMAGE}',tmpImgFixMM).replace('{DEFIMG}',tmpTempTypeMM[1]).replace(/{URL}/g,adMM[i][4]).replace('{BUTTONTEXT}',tmpTempTypeMM[2]).replace('{STATS}',adMM[i][6]).replace('{REF}','id="'+adMM[i][6]+'" ref="'+adMM[i][7]+'#'+adMM[i][6]+'" ').replace('<img ','<img alt="'+tmpTitleAlt+'"');
     xmlAdNodesWorkerMM = templateHTMLMM[tmpTempTypeMM[0]].replace('{TITLE}',adMM[i][1]).replace('{DESCRIPTION}',adMM[i][2]).replace('{IMAGE}',tmpImgFixMM).replace('{DEFIMG}',tmpTempTypeMM[1]).replace(/{URL}/g,adMM[i][4]).replace('{BUTTONTEXT}',tmpTempTypeMM[2]).replace('{STATS}',adMM[i][6]).replace('{REF}','id="'+adMM[i][6]+'" ref="'+adMM[i][7]+'#'+adMM[i][6]+'" ');
    }
    if(curtempTwks==1){
     xmlAdNodesWorkerMM = xmlAdNodesWorkerMM.replace(/font-size:12px/g,'').replace(/font-size:14px/g,'')
    }
    if(adMM[i][0]=='4' && ranmmdvgour==0){mmdvfour()}
    if(tmpTempTypeMM[3] > 0){
     if(clmReminder==''){
      var clmParFind = jQuery('#momcnt_'+adMM[i][0]).closest('div[class^="ibm-col-"]');
      if(jQuery(clmParFind).length>0){
       var tmpclmParFind = jQuery(clmParFind).attr('class');
       console.log(tmpclmParFind);
       tmpclmParFind = tmpclmParFind.split('-');
       if(tmpclmParFind.length==4){
        clmParNum = parseInt(tmpclmParFind[3]);
       }
      }
      clmReminder = '<div class="ibm-columns">'
     }
     clmReminder = clmReminder + '<div class="ibm-col-'+ibmColArr[parseInt(tmpTempTypeMM[3])]+'">'+xmlAdNodesWorkerMM+'</div>';
     var tmpCurclassSpt = ibmColArr[parseInt(tmpTempTypeMM[3])]
     tmpCurclassSpt = tmpCurclassSpt.split('-')
     clmParNumRunnig = clmParNumRunnig + parseInt(tmpCurclassSpt[1]);
     xmlAdNodesWorkerMM = '';
     if(i==(adMM.length-1)){
      xmlAdNodesWorkerMM = clmReminder + '</div>';clmParNum = -1;clmReminder = '';clmParNumRunnig = 0;
     }else{
      if(adMM[i+1][0]!=adMM[i][0]){
       xmlAdNodesWorkerMM = clmReminder + '</div>';clmParNum = -1;clmReminder = '';clmParNumRunnig = 0;
      }else if(clmParNum>-1 && clmParNumRunnig>=clmParNum){
       xmlAdNodesWorkerMM = clmReminder + '</div>';clmParNum = -1;clmReminder = '';clmParNumRunnig = 0;
      }else if(i<(adMM.length-1)){
       var tmpSptAlg = adMM[i+1][5].split('-');
       if(parseInt(tmpSptAlg[3])!=tmpTempTypeMM[3]){
        xmlAdNodesWorkerMM = clmReminder + '</div>';clmParNum = -1;clmReminder = '';clmParNumRunnig = 0;
       }
      }
     }
    }else if(tmpTempTypeMM[0]=='5' && jQuery('#momcnt_'+adMM[i][0]).width() > 400){
     var tmpFixWidthLgImg = jQuery('#momcnt_'+adMM[i][0]).width() - 310;
     var templateHTMLMMTmp = '<div {REF}style="margin-bottom:20px"><div style="float:left;width:300px"><a  href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)"><img src="{IMAGE}" border="0"/></a></div><div style="float:left;margin-left:10px;width:'+tmpFixWidthLgImg+'px"><div style="font-size:14px;font-weight:bold;margin-bottom:3px">{TITLE}</div><div style="margin-top:10px;font-size:12px" >{DESCRIPTION}</div><div style="margin-top:15px"><p class="ibm-ind-link"><a href="{URL}" rel="mmExtLk" onmousedown="redOffMM(\'{URL}\',\'{STATS}\',this)" class="ibm-forward-link ibm-no-proxy">{BUTTONTEXT}</a></p></div></div><div style="clear:both"></div></div>';
     //xmlAdNodesWorkerMM = templateHTMLMMTmp.replace('{TITLE}',adMM[i][1]).replace('{DESCRIPTION}',adMM[i][2]).replace('{IMAGE}',tmpImgFixMM).replace('{DEFIMG}',tmpTempTypeMM[1]).replace(/{URL}/g,adMM[i][4]).replace('{BUTTONTEXT}',tmpTempTypeMM[2]).replace('{STATS}',adMM[i][6]).replace('{REF}','id="'+adMM[i][6]+'" ref="'+adMM[i][7]+'#'+adMM[i][6]+'" ').replace('<img ','<img alt="'+tmpTitleAlt+'"');
     xmlAdNodesWorkerMM = templateHTMLMMTmp.replace('{TITLE}',adMM[i][1]).replace('{DESCRIPTION}',adMM[i][2]).replace('{IMAGE}',tmpImgFixMM).replace('{DEFIMG}',tmpTempTypeMM[1]).replace(/{URL}/g,adMM[i][4]).replace('{BUTTONTEXT}',tmpTempTypeMM[2]).replace('{STATS}',adMM[i][6]).replace('{REF}','id="'+adMM[i][6]+'" ref="'+adMM[i][7]+'#'+adMM[i][6]+'" ');
    }

    if(xmlAdNodesWorkerMM!=''){
     xmlAdNodesWorkerMM = xmlAdNodesWorkerMM.replace(/\(R\)/g,'&reg;').replace(/\(C\)/g,'&copy;').replace(/\(TM\)/g,'&trade;');
     jQuery('#momcnt_'+adMM[i][0]).append(xmlAdNodesWorkerMM)
     jQuery('#momcnt_'+adMM[i][0]).attr('style', 'display: block !important');
    }
 
   }
   if(adMM[i][0]!=tmpCurMMTlId){
    tmpCurMMTlId = adMM[i][0];
    if (typeof ttMM !== 'undefined' && ttMM.length > 0) {
     for(var iv = 0; iv < ttMM.length; iv++) {
      if(ttMM[iv][0]==adMM[i][0] && ttMM[iv][2]!='-'){
       jQuery('#momcnt_'+adMM[i][0]).prepend('<div style="font-size:'+ttMM[iv][1]+'px;font-weight:bold;margin-bottom:12px">'+ttMM[iv][2]+'</div>');
      }
     }
    }
   }
  }
  jQuery('#swg-opp-offers-bottom, #swg-opp-offers-rcol').remove();
  if(botOffHold !='' && jQuery('#momcnt_1').html()==''){jQuery('#momcnt_1').css('border-top','0px').html(botOffHold)}
  if(rgtOffHold !='' && jQuery('#momcnt_2').html()==''){jQuery('#momcnt_2').css('border-top','0px').html(rgtOffHold)}
  momPromos();
  var winMMLeftExt = jQuery(window).width();
  var winMMTopsExt = jQuery(window).height();
  jQuery('a[rel*=mmExtLk]').click(function(){
   if(jQuery(this).attr('href').indexOf('youtube.com')>0 || jQuery(this).attr('href').indexOf('youtu.be')>0){
    youTubeMM(jQuery(this).attr('href'))
   }else{
    window.open(jQuery(this).attr('href'),'mmOffExtLink','height='+winMMTopsExt+',scrollbars=yes,resizable=yes,width='+winMMLeftExt+'')
   };
   return false;
  });
 }
}
function getQSMomParam(name) {
 name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
 var regex = new RegExp("[\\?&]" + name + "=([^&#]*)","i"), results = regex.exec(location.search);
 return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var interSlideRun = '';
function prepIndImgSlide(strId,strWidth,strHeight){
 var dfImgCnt = 0;
 jQuery('#'+strId+' a').each(function(index){
  jQuery(this).attr('id',strId+'_'+dfImgCnt);
  if(dfImgCnt==0){
   jQuery(this).attr('class','actslide');
   jQuery(this).css({'position':'absolute','z-index':'2'});
  }else{
   jQuery(this).attr('class','actslidenon');
   jQuery(this).css({'position':'absolute','z-index':'1','left':strWidth+'px'});
   jQuery(this).children(':first').css({'width':strWidth+'px','height':strHeight+'px'});
  }
  dfImgCnt = dfImgCnt + 1;
 });
 prepImgChc(strId);
 jQuery('#'+strId).show();
 if(interSlideRun==''){
  interSlideRun = setInterval(function(){changeSliders()}, 7000);
 }
}
var contClkInt = 0;
function slImgSld(strEle){
 if(contClkInt==0){
  contClkInt = 1;
  clearInterval(interSlideRun)
  var curSelImgChx = jQuery(strEle).parent().parent().attr('id');
  jQuery('#'+curSelImgChx).children('a').each(function(index){
   if(jQuery(this).css('z-index')==1){
    var workWidthTmpsTwo = jQuery(this).width();
    jQuery(this).css({'left':workWidthTmpsTwo})
   }
  });
  jQuery('#'+curSelImgChx).children('a').each(function(index){
   if(jQuery(this).css('z-index')==2){
    jQuery(this).css({'z-index':'1'})
   }
  });
  jQuery('#'+curSelImgChx).children('a').each(function(index){
   if(jQuery(strEle).index()==index){
    jQuery(this).attr('class','actslide')
    jQuery(this).css({'z-index':'2'}).animate({'left':'0px'},'slow');   
   }
  });
  prepImgChc(curSelImgChx);
  interSlideRun = setInterval(function(){changeSliders()}, 7000);
  contClkInt = 0;
 }
}
var chgSlidersSArry = '';
function changeSliders(){
 var tmpchgSlidersSArry = chgSlidersSArry.split(',');
 for (i = 0; i < tmpchgSlidersSArry.length; i++) {
  var workWidthTmps = jQuery('#'+tmpchgSlidersSArry[i]+' a.actslide').children(':first').width();

  jQuery('#'+tmpchgSlidersSArry[i]+' a.actslidenon').css({'left':workWidthTmps})
  var tmpTempIdSlide = jQuery('#'+tmpchgSlidersSArry[i]+' a.actslide');
  jQuery(tmpTempIdSlide).attr('class','actslidenon');
  var tmpNewidChk = jQuery(tmpTempIdSlide).attr('id');
  tmpNewidChk = tmpNewidChk.split('_');
  var tmpNewidAct = parseInt(tmpNewidChk[3]) + 1;
  if(jQuery('#'+tmpNewidChk[0]+'_'+tmpNewidChk[1]+'_'+tmpNewidChk[2]+'_'+tmpNewidAct).length==1){
   jQuery('#'+tmpNewidChk[0]+'_'+tmpNewidChk[1]+'_'+tmpNewidChk[2]+'_'+tmpNewidAct).attr('class','actslide');
  }else{
   jQuery('#'+tmpNewidChk[0]+'_'+tmpNewidChk[1]+'_'+tmpNewidChk[2]+'_0').attr('class','actslide');
  }
  jQuery('#'+tmpchgSlidersSArry[i]+' a').css({'z-index':'1'})
  jQuery('#'+tmpchgSlidersSArry[i]+' a.actslide').css({'z-index':'2'}).animate({'left':'0px'},'slow');
  prepImgChc(tmpchgSlidersSArry[i]);
 
 }
}
function prepImgChc(strId){
 var tmpPrepImgs = ''
 jQuery('#'+strId).children('a').each(function(index){
  if(jQuery(this).css('z-index')==2){
   tmpPrepImgs += '<img src="//www-01.ibm.com/software/info/direct/imgs/1.png" style="margin:0px 2px 0px 2px">';
  }else{
   tmpPrepImgs += '<img src="//www-01.ibm.com/software/info/direct/imgs/0.png" style="margin:0px 2px 0px 2px;cursor:pointer" onClick="slImgSld(this)">';
  }
 });
 jQuery('#'+strId+' div:first').html(tmpPrepImgs);
}
function prepImgSlide(strId){
 var dfImgPrWd = 0;
 var dfImgPrHt = 0;
 var imgToResWth = jQuery('#'+strId+' a img:first').attr('src');
 if(imgToResWth!=''){
  if(chgSlidersSArry==''){
   chgSlidersSArry = strId;
  }else{
   chgSlidersSArry = chgSlidersSArry +','+strId;
  }
  var chkdefImgRt = new Image();
  chkdefImgRt.onload = function(){
   dfImgPrWd = chkdefImgRt.width;
   if(chkdefImgRt.width>jQuery('#'+strId).parent().width()){
    dfImgPrWd = jQuery('#'+strId).parent().width();
   }
   dfImgPrHt = chkdefImgRt.height;
   jQuery('#'+strId).css({'margin-bottom':'10px'});
   var sptProIdSpot = strId.split('_');
   if(jQuery('#'+strId).parent().attr('id')=='momcnt_1' && sptProIdSpot[2]=='0'){
    jQuery('#'+strId).css({'position':'relative','height':(dfImgPrHt+16)+'px','width':dfImgPrWd+'px','overflow':'hidden','margin-top':'-31px'});
   }else if(jQuery('#'+strId).parent().attr('id')=='momcnt_2' && sptProIdSpot[2]=='0'){
    jQuery('#'+strId).css({'position':'relative','height':(dfImgPrHt+16)+'px','width':dfImgPrWd+'px','overflow':'hidden','margin-top':'-16px'});
   }else{
    jQuery('#'+strId).css({'position':'relative','height':(dfImgPrHt+16)+'px','width':dfImgPrWd+'px','overflow':'hidden'});
   }
   jQuery('#'+strId).prepend('<div style="position:absolute;top:'+dfImgPrHt+'px;width:'+dfImgPrWd+'px;height:14px;overflow:hidden;text-align:right"></div>');
   prepIndImgSlide(strId,dfImgPrWd,dfImgPrHt);
  }
  chkdefImgRt.src = imgToResWth;
 }
}
var ranmmdvgour = 0;
function mmdvfour(){
 if(ranmmdvgour==0){
  ranmmdvgour = 1;
  if(curPageLayUse==0){
   if(jQuery('#ibm-related-content:first-child').attr('id') == 'ibm-former-merchandising'){
    jQuery('#ibm-related-content').html('').append('<div id="momcnt_4" class="ibm-col-1-1"></div>');dojo.query('#momcnt_4').style({display:'block !important'});
   }else if(jQuery('#ibm-related-content > div').length==0 || !jQuery('#ibm-related-content').length){
    jQuery('#ibm-related-content').html('<div class="ibm-columns"><div id="momcnt_4" class="ibm-col-1-1"></div></div>');dojo.query('#momcnt_4').style({display:'block !important'});
   }else{
    jQuery('#ibm-related-content div[class="ibm-columns"]:first').html('').prepend('<div id="momcnt_4" class="ibm-col-1-1"></div>');dojo.query('#momcnt_4').style({display:'block !important'});
   }
  }else{
   if(jQuery('#ibm-related-content > div').length==0){
    jQuery('#ibm-related-content').html('<div class="ibm-columns"><div id="momcnt_4" style="padding:0px !important"></div></div>');
   }
  }
 }
}
