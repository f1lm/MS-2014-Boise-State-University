
if(!cf_scripts)
{var cf_scripts=function(){var callbacks=[];var duringCallbacks=[];var that={};that.loaded=false;that.duringload=function(callback){duringCallbacks.push(callback);};that.afterload=function(callback){if(!that.loaded){callbacks.push(callback);}
else{callback();}}
that.gz=function(){var u=navigator.userAgent.toLowerCase();if(u.indexOf("msie 6.0")!=-1&&u.indexOf("sv1")==-1){return".nogz";}
return"";};var loadem=function(scripts,css,loadedFx)
{var loc=function(){return document.getElementsByTagName("script")[0];}
var ele=function(type,attrs,content)
{var e=document.createElement(type);for(var a in attrs){e[a]=attrs[a];}
if(content)
e.innerHTML=content;return e;}
var loadscript=function(url,afterFx){var h=loc();var s=ele("script",{src:url,type:"text/javascript",charset:"utf-8"});if(afterFx){if(s.addEventListener){s.addEventListener("load",afterFx,false);}else if(s.readyState){s.onreadystatechange=function(){if(s.readyState=='loaded'||s.readyState=='complete')
afterFx();};}}
h.parentNode.insertBefore(s,h);};var loadstyle=function(url)
{h=loc();h.parentNode.insertBefore(ele("link",{"type":"text/css","rel":"stylesheet","href":url}),h);};var chain=function(scripts,i){var afterFx=loadedFx;if(i<scripts.length-1)
afterFx=chain(scripts,i+1);return function(){loadscript(scripts[i],afterFx);}}
chain(scripts,0)();for(var i=0;i<css.length;i++)
{loadstyle(css[i]);}}
var gz=that.gz();var scripts=[];var proto=window.location.protocol+"//";scripts.push(proto+"d2yeu2mwujl2s5.cloudfront.net/3.32-9/js/CF_insight.min"+gz+".js");var js=scripts.concat([]);var css=[proto+"d2yeu2mwujl2s5.cloudfront.net/3.32-9/styles/widgets"+gz+".css"].concat([]);loadem(js,css,function(){if(!window.cf_jq)
throw"Error loading cf_jq jquery";if(!window.CF)
throw"Error loading CF libraries";if(!that.loaded){setTimeout(function(){CF.config.set({b2cHost:proto+"b2c-msm.marketo.com",b2cPath:"/rest/",rpxUrl:"https://social.mrk.to",scriptHost:proto+"d2yeu2mwujl2s5.cloudfront.net/3.32-9",useBackplane:false,cfKeys:{subscriber:"insight",product:"53364604-ccb4-468a-b0cf-8c6d0bb70bea",topcommunity:3927},urlShortener:"http://mrk.to/",hidePoweredBy:true,allowDiagMode:false,messagingEnable:false,messagingText:""});var afterConfig=function(){cf_jq.each(duringCallbacks,function(i,fx){fx(cf_jq,CF);});CF.config.complete();CF.widget.startSpec([{"campaign":"16a9627d431d42e5b4e37f2a8f8f5518","campaignApp":"16a9627d431d42e5b4e37f2a8f8f5518","name":"16a9627d431d42e5b4e37f2a8f8f5518_SocialSignOn","options":{"widgetName":"16a9627d431d42e5b4e37f2a8f8f5518_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"16a9627d431d42e5b4e37f2a8f8f5518","campaignApp":"16a9627d431d42e5b4e37f2a8f8f5518","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"71a81aa929994ecdb2300bc939b554a6","campaignApp":"71a81aa929994ecdb2300bc939b554a6","name":"71a81aa929994ecdb2300bc939b554a6_SocialSignOn","options":{"widgetName":"71a81aa929994ecdb2300bc939b554a6_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"71a81aa929994ecdb2300bc939b554a6","campaignApp":"71a81aa929994ecdb2300bc939b554a6","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"f2c62be3abb54329a7bbf599d826faa4","campaignApp":"f2c62be3abb54329a7bbf599d826faa4","name":"f2c62be3abb54329a7bbf599d826faa4_SocialSignOn","options":{"widgetName":"f2c62be3abb54329a7bbf599d826faa4_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"f2c62be3abb54329a7bbf599d826faa4","campaignApp":"f2c62be3abb54329a7bbf599d826faa4","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"7baea4790da347f1a3fb4c4484747604","campaignApp":"7baea4790da347f1a3fb4c4484747604","name":"7baea4790da347f1a3fb4c4484747604_SocialSignOn","options":{"widgetName":"7baea4790da347f1a3fb4c4484747604_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"7baea4790da347f1a3fb4c4484747604","campaignApp":"7baea4790da347f1a3fb4c4484747604","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"c03b9549636146ed84a062871b11b7a3","campaignApp":"c03b9549636146ed84a062871b11b7a3","name":"c03b9549636146ed84a062871b11b7a3_SocialSignOn","options":{"widgetName":"c03b9549636146ed84a062871b11b7a3_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"c03b9549636146ed84a062871b11b7a3","campaignApp":"c03b9549636146ed84a062871b11b7a3","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"9ef9abab81884dd6ab9554ea5ba56376","campaignApp":"9ef9abab81884dd6ab9554ea5ba56376","name":"9ef9abab81884dd6ab9554ea5ba56376_SocialSignOn","options":{"widgetName":"9ef9abab81884dd6ab9554ea5ba56376_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"9ef9abab81884dd6ab9554ea5ba56376","campaignApp":"9ef9abab81884dd6ab9554ea5ba56376","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"e0e5b1b7056e4d7e8a663c1db77aa8d0","campaignApp":"e0e5b1b7056e4d7e8a663c1db77aa8d0","name":"e0e5b1b7056e4d7e8a663c1db77aa8d0_SocialSignOn","options":{"widgetName":"e0e5b1b7056e4d7e8a663c1db77aa8d0_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"e0e5b1b7056e4d7e8a663c1db77aa8d0","campaignApp":"e0e5b1b7056e4d7e8a663c1db77aa8d0","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"f4f8e1f8e9864709b4fe77a2bceb214f","campaignApp":"f4f8e1f8e9864709b4fe77a2bceb214f","name":"f4f8e1f8e9864709b4fe77a2bceb214f_SocialSignOn","options":{"widgetName":"f4f8e1f8e9864709b4fe77a2bceb214f_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"f4f8e1f8e9864709b4fe77a2bceb214f","campaignApp":"f4f8e1f8e9864709b4fe77a2bceb214f","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"613c92de86564f3bbc33a796bf9f2baa","campaignApp":"613c92de86564f3bbc33a796bf9f2baa","name":"613c92de86564f3bbc33a796bf9f2baa_SocialSignOn","options":{"widgetName":"613c92de86564f3bbc33a796bf9f2baa_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"613c92de86564f3bbc33a796bf9f2baa","campaignApp":"613c92de86564f3bbc33a796bf9f2baa","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"1b8ddc30340945458a5e7c2971097f6e","campaignApp":"1b8ddc30340945458a5e7c2971097f6e","name":"1b8ddc30340945458a5e7c2971097f6e_SocialSignOn","options":{"widgetName":"1b8ddc30340945458a5e7c2971097f6e_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"1b8ddc30340945458a5e7c2971097f6e","campaignApp":"1b8ddc30340945458a5e7c2971097f6e","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"01d1b5d917684d869652849960ae136b","campaignApp":"01d1b5d917684d869652849960ae136b","name":"01d1b5d917684d869652849960ae136b_SocialSignOn","options":{"widgetName":"01d1b5d917684d869652849960ae136b_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"01d1b5d917684d869652849960ae136b","campaignApp":"01d1b5d917684d869652849960ae136b","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"c598ea9a22534ee68a2b51b36ddbbcea","campaignApp":"c598ea9a22534ee68a2b51b36ddbbcea","name":"c598ea9a22534ee68a2b51b36ddbbcea_SocialSignOn","options":{"widgetName":"c598ea9a22534ee68a2b51b36ddbbcea_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"c598ea9a22534ee68a2b51b36ddbbcea","campaignApp":"c598ea9a22534ee68a2b51b36ddbbcea","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"673d0638cc584606bdeea07c3d8e1a00","campaignApp":"673d0638cc584606bdeea07c3d8e1a00","name":"673d0638cc584606bdeea07c3d8e1a00_Comment","options":{"linkedinRichPostType":"pageContent","showInLM":"false","offerShareTxt":"Tell your friends:","offerShareVoteMaxTxt":"You've reached the vote maximum.  Tell your friends:","deleteComments":"false","optInMsgChecked":"true","widgetHeadlineText":"Sign in to comment and share:","widgetStyle":"default","order":"LineageLeastRecentFirst","avatars":"true","richPostType":"pageContent","campaign":"673d0638cc584606bdeea07c3d8e1a00","useHBBody":"true","privacyEnabled":"false","widgetName":"673d0638cc584606bdeea07c3d8e1a00_Comment","optInMsgEnabled":"true","adminAutoClose":"true","offerEmailTxt":"Enter your info:","postConfirmMessage":"You have shared successfully!","campaignApp":"673d0638cc584606bdeea07c3d8e1a00","profileCaptureEnabled":"false","signUpRequiredFields":"[]","depth":"2","socialIcons":"[\"facebook\",\"twitter\",\"linkedin\"]","socialNetworks":"[\"facebook\",\"twitter\",\"linkedin\"]","language":"en_US","signUpSelectedFields":"[\"email\"]"},"type":"CF.widget.InsightComments"},{"campaign":"7dc56b2e0f5b43c8a4a40ccc7bf46382","campaignApp":"7dc56b2e0f5b43c8a4a40ccc7bf46382","name":"7dc56b2e0f5b43c8a4a40ccc7bf46382_SocialSignOn","options":{"widgetName":"7dc56b2e0f5b43c8a4a40ccc7bf46382_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"7dc56b2e0f5b43c8a4a40ccc7bf46382","campaignApp":"7dc56b2e0f5b43c8a4a40ccc7bf46382","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"673d0638cc584606bdeea07c3d8e1a00","campaignApp":"673d0638cc584606bdeea07c3d8e1a00","name":"673d0638cc584606bdeea07c3d8e1a00_Video","options":{"videoHeight":"315","linkedinRichPostType":"pageContent","showInLM":"true","offerShareTxt":"Share this video with friends:","optInMsgChecked":"true","youtubeId":"3mwA2qaH5PQ","videoShareTriggerPoint":"end","widgetHeadlineText":"Sign in to share this video:","widgetStyle":"default","modern":"true","richPostType":"pageContent","campaign":"673d0638cc584606bdeea07c3d8e1a00","optInMsgText":"Send me future promotions!","showReferralShare":"true","useHBBody":"true","privacyEnabled":"false","videoUrl":"http://www.youtube.com/watch?v=3mwA2qaH5PQ","widgetName":"673d0638cc584606bdeea07c3d8e1a00_Video","optInMsgEnabled":"true","forceUseFlash":"false","adminAutoClose":"true","videoWidth":"420","offerEmailTxt":"Enter your info:","postConfirmMessage":"You have shared successfully!","campaignApp":"673d0638cc584606bdeea07c3d8e1a00","profileCaptureEnabled":"false","signUpRequiredFields":"[]","popupLocation":"center","privacyText":"Privacy","socialNetworks":"[\"facebook\",\"twitter\",\"linkedin\"]","language":"en_US","signUpSelectedFields":"[\"email\"]"},"type":"CF.widget.VideoShare"},{"campaign":"857f7d3da99c42a4ada7c248db28f5d6","campaignApp":"857f7d3da99c42a4ada7c248db28f5d6","name":"857f7d3da99c42a4ada7c248db28f5d6_SocialSignOn","options":{"widgetName":"857f7d3da99c42a4ada7c248db28f5d6_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"857f7d3da99c42a4ada7c248db28f5d6","campaignApp":"857f7d3da99c42a4ada7c248db28f5d6","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"5b3c87233f8e4341b1800353f16d7a06","campaignApp":"5b3c87233f8e4341b1800353f16d7a06","name":"5b3c87233f8e4341b1800353f16d7a06_SocialSignOn","options":{"widgetName":"5b3c87233f8e4341b1800353f16d7a06_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"5b3c87233f8e4341b1800353f16d7a06","campaignApp":"5b3c87233f8e4341b1800353f16d7a06","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"a144f0a2d5cf475f82a876d6e701d132","campaignApp":"a144f0a2d5cf475f82a876d6e701d132","name":"a144f0a2d5cf475f82a876d6e701d132_SocialSignOn","options":{"widgetName":"a144f0a2d5cf475f82a876d6e701d132_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"a144f0a2d5cf475f82a876d6e701d132","campaignApp":"a144f0a2d5cf475f82a876d6e701d132","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"c3796eac20c94312bc30ee004ed6725a","campaignApp":"c3796eac20c94312bc30ee004ed6725a","name":"c3796eac20c94312bc30ee004ed6725a_SocialSignOn","options":{"widgetName":"c3796eac20c94312bc30ee004ed6725a_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"c3796eac20c94312bc30ee004ed6725a","campaignApp":"c3796eac20c94312bc30ee004ed6725a","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"a279aea3a6964c218af3425a1ae7e9a7","campaignApp":"a279aea3a6964c218af3425a1ae7e9a7","name":"a279aea3a6964c218af3425a1ae7e9a7_SocialSignOn","options":{"widgetName":"a279aea3a6964c218af3425a1ae7e9a7_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":"en_US","campaign":"a279aea3a6964c218af3425a1ae7e9a7","campaignApp":"a279aea3a6964c218af3425a1ae7e9a7","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"673d0638cc584606bdeea07c3d8e1a00","campaignApp":"673d0638cc584606bdeea07c3d8e1a00","name":"673d0638cc584606bdeea07c3d8e1a00_Share","options":{"linkedinRichPostType":"pageContent","showInLM":"false","offerShareTxt":"Tell your friends:","optInMsgChecked":"true","widgetHeadlineText":"Sign in to share:","widgetStyle":"default","dual":"false","midtext":"true","richPostType":"pageContent","campaign":"673d0638cc584606bdeea07c3d8e1a00","optInMsgText":"Send me future promotions!","useHBBody":"true","text":"Share: ","privacyEnabled":"false","widgetName":"673d0638cc584606bdeea07c3d8e1a00_Share","optInMsgEnabled":"true","adminAutoClose":"true","offerEmailTxt":"Enter your info:","postConfirmMessage":"You have shared successfully!","isReferralShare":"true","campaignApp":"673d0638cc584606bdeea07c3d8e1a00","profileCaptureEnabled":"false","signUpRequiredFields":"[]","privacyText":"Privacy","socialIcons":"[\"facebook\",\"twitter\",\"linkedin\"]","socialNetworks":"[\"facebook\",\"twitter\",\"linkedin\"]","language":"en_US","rating":"Widget002","signUpSelectedFields":"[\"email\"]"},"type":"CF.widget.InsightPushButton"},{"campaign":"09103dfcacb9463bbccd1380a4c8a55d","campaignApp":"09103dfcacb9463bbccd1380a4c8a55d","name":"09103dfcacb9463bbccd1380a4c8a55d_SocialSignOn","options":{"widgetName":"09103dfcacb9463bbccd1380a4c8a55d_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"09103dfcacb9463bbccd1380a4c8a55d","campaignApp":"09103dfcacb9463bbccd1380a4c8a55d","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"f3aef43688d44149a7e39d91b91fdf82","campaignApp":"f3aef43688d44149a7e39d91b91fdf82","name":"f3aef43688d44149a7e39d91b91fdf82_SocialSignOn","options":{"widgetName":"f3aef43688d44149a7e39d91b91fdf82_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"f3aef43688d44149a7e39d91b91fdf82","campaignApp":"f3aef43688d44149a7e39d91b91fdf82","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"8631bf4b33624b3caf1b240176427e0c","campaignApp":"8631bf4b33624b3caf1b240176427e0c","name":"8631bf4b33624b3caf1b240176427e0c_SocialSignOn","options":{"widgetName":"8631bf4b33624b3caf1b240176427e0c_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"8631bf4b33624b3caf1b240176427e0c","campaignApp":"8631bf4b33624b3caf1b240176427e0c","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"75fc1718d20d49ea8b6e72da859fdd7f","campaignApp":"75fc1718d20d49ea8b6e72da859fdd7f","name":"75fc1718d20d49ea8b6e72da859fdd7f_SocialSignOn","options":{"widgetName":"75fc1718d20d49ea8b6e72da859fdd7f_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"75fc1718d20d49ea8b6e72da859fdd7f","campaignApp":"75fc1718d20d49ea8b6e72da859fdd7f","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"1dd74966d7d44ac9888ef4e015fd52a7","campaignApp":"1dd74966d7d44ac9888ef4e015fd52a7","name":"1dd74966d7d44ac9888ef4e015fd52a7_SocialSignOn","options":{"widgetName":"1dd74966d7d44ac9888ef4e015fd52a7_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"1dd74966d7d44ac9888ef4e015fd52a7","campaignApp":"1dd74966d7d44ac9888ef4e015fd52a7","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"7201da91f9b04a3090ccb8a9ad77fe32","campaignApp":"7201da91f9b04a3090ccb8a9ad77fe32","name":"7201da91f9b04a3090ccb8a9ad77fe32_SocialSignOn","options":{"widgetName":"7201da91f9b04a3090ccb8a9ad77fe32_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"7201da91f9b04a3090ccb8a9ad77fe32","campaignApp":"7201da91f9b04a3090ccb8a9ad77fe32","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"da748196919047e2a3d69dcefa219f19","campaignApp":"da748196919047e2a3d69dcefa219f19","name":"da748196919047e2a3d69dcefa219f19_SocialSignOn","options":{"widgetName":"da748196919047e2a3d69dcefa219f19_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"da748196919047e2a3d69dcefa219f19","campaignApp":"da748196919047e2a3d69dcefa219f19","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"8876ccf3452a4073b4d73a380b082825","campaignApp":"8876ccf3452a4073b4d73a380b082825","name":"8876ccf3452a4073b4d73a380b082825_SocialSignOn","options":{"widgetName":"8876ccf3452a4073b4d73a380b082825_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"8876ccf3452a4073b4d73a380b082825","campaignApp":"8876ccf3452a4073b4d73a380b082825","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"027716d8e7694051824dac27b0b77b6a","campaignApp":"027716d8e7694051824dac27b0b77b6a","name":"027716d8e7694051824dac27b0b77b6a_SocialSignOn","options":{"widgetName":"027716d8e7694051824dac27b0b77b6a_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"027716d8e7694051824dac27b0b77b6a","campaignApp":"027716d8e7694051824dac27b0b77b6a","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"4c3672a1560e4f14b61d4c2434ff4c73","campaignApp":"4c3672a1560e4f14b61d4c2434ff4c73","name":"4c3672a1560e4f14b61d4c2434ff4c73_SocialSignOn","options":{"widgetName":"4c3672a1560e4f14b61d4c2434ff4c73_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"4c3672a1560e4f14b61d4c2434ff4c73","campaignApp":"4c3672a1560e4f14b61d4c2434ff4c73","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"ad3641acead74d2196c4f10cf53d9d4d","campaignApp":"ad3641acead74d2196c4f10cf53d9d4d","name":"ad3641acead74d2196c4f10cf53d9d4d_SocialSignOn","options":{"widgetName":"ad3641acead74d2196c4f10cf53d9d4d_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":"en_US","campaign":"ad3641acead74d2196c4f10cf53d9d4d","campaignApp":"ad3641acead74d2196c4f10cf53d9d4d","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"6b046cded4cc40a98c46c1e983694a7b","campaignApp":"6b046cded4cc40a98c46c1e983694a7b","name":"6b046cded4cc40a98c46c1e983694a7b_SocialSignOn","options":{"widgetName":"6b046cded4cc40a98c46c1e983694a7b_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"6b046cded4cc40a98c46c1e983694a7b","campaignApp":"6b046cded4cc40a98c46c1e983694a7b","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"e26c683758e14ec282139414fd20c09e","campaignApp":"e26c683758e14ec282139414fd20c09e","name":"e26c683758e14ec282139414fd20c09e_SocialSignOn","options":{"widgetName":"e26c683758e14ec282139414fd20c09e_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"e26c683758e14ec282139414fd20c09e","campaignApp":"e26c683758e14ec282139414fd20c09e","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"ae2904d6bfb74a50a31713392904ce2b","campaignApp":"ae2904d6bfb74a50a31713392904ce2b","name":"ae2904d6bfb74a50a31713392904ce2b_SocialSignOn","options":{"widgetName":"ae2904d6bfb74a50a31713392904ce2b_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"ae2904d6bfb74a50a31713392904ce2b","campaignApp":"ae2904d6bfb74a50a31713392904ce2b","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"e9c7d1b16c4a4dfa8f3865fc196dd576","campaignApp":"e9c7d1b16c4a4dfa8f3865fc196dd576","name":"e9c7d1b16c4a4dfa8f3865fc196dd576_SocialSignOn","options":{"widgetName":"e9c7d1b16c4a4dfa8f3865fc196dd576_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"e9c7d1b16c4a4dfa8f3865fc196dd576","campaignApp":"e9c7d1b16c4a4dfa8f3865fc196dd576","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"2374439d208641b4b7a3614a82dee4aa","campaignApp":"2374439d208641b4b7a3614a82dee4aa","name":"2374439d208641b4b7a3614a82dee4aa_SocialSignOn","options":{"widgetName":"2374439d208641b4b7a3614a82dee4aa_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"2374439d208641b4b7a3614a82dee4aa","campaignApp":"2374439d208641b4b7a3614a82dee4aa","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"202e0223422c43d4a2af97dce1244bfe","campaignApp":"202e0223422c43d4a2af97dce1244bfe","name":"202e0223422c43d4a2af97dce1244bfe_SocialSignOn","options":{"widgetName":"202e0223422c43d4a2af97dce1244bfe_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"202e0223422c43d4a2af97dce1244bfe","campaignApp":"202e0223422c43d4a2af97dce1244bfe","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"2310e6772072400c9b8cf366942aeb64","campaignApp":"2310e6772072400c9b8cf366942aeb64","name":"2310e6772072400c9b8cf366942aeb64_SocialSignOn","options":{"widgetName":"2310e6772072400c9b8cf366942aeb64_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"2310e6772072400c9b8cf366942aeb64","campaignApp":"2310e6772072400c9b8cf366942aeb64","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"ff0b0c3c662a407a9017f4ec8d9af8e9","campaignApp":"ff0b0c3c662a407a9017f4ec8d9af8e9","name":"ff0b0c3c662a407a9017f4ec8d9af8e9_SocialSignOn","options":{"widgetName":"ff0b0c3c662a407a9017f4ec8d9af8e9_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"ff0b0c3c662a407a9017f4ec8d9af8e9","campaignApp":"ff0b0c3c662a407a9017f4ec8d9af8e9","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"63b01286a2b14ad1b1ca1e296d94ac86","campaignApp":"63b01286a2b14ad1b1ca1e296d94ac86","name":"63b01286a2b14ad1b1ca1e296d94ac86_SocialSignOn","options":{"widgetName":"63b01286a2b14ad1b1ca1e296d94ac86_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"63b01286a2b14ad1b1ca1e296d94ac86","campaignApp":"63b01286a2b14ad1b1ca1e296d94ac86","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"0a9d04afcddf4005a1bb84f6c5f2758d","campaignApp":"0a9d04afcddf4005a1bb84f6c5f2758d","name":"0a9d04afcddf4005a1bb84f6c5f2758d_SocialSignOn","options":{"widgetName":"0a9d04afcddf4005a1bb84f6c5f2758d_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"0a9d04afcddf4005a1bb84f6c5f2758d","campaignApp":"0a9d04afcddf4005a1bb84f6c5f2758d","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"1dccf9378356410ea8afd3487aad5ba0","campaignApp":"1dccf9378356410ea8afd3487aad5ba0","name":"1dccf9378356410ea8afd3487aad5ba0_SocialSignOn","options":{"widgetName":"1dccf9378356410ea8afd3487aad5ba0_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"1dccf9378356410ea8afd3487aad5ba0","campaignApp":"1dccf9378356410ea8afd3487aad5ba0","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"2d755b7310fc4f86ba51672c787f8368","campaignApp":"2d755b7310fc4f86ba51672c787f8368","name":"2d755b7310fc4f86ba51672c787f8368_SocialSignOn","options":{"widgetName":"2d755b7310fc4f86ba51672c787f8368_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"2d755b7310fc4f86ba51672c787f8368","campaignApp":"2d755b7310fc4f86ba51672c787f8368","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"eae56c379fa844278abd99e478544128","campaignApp":"eae56c379fa844278abd99e478544128","name":"eae56c379fa844278abd99e478544128_SocialSignOn","options":{"widgetName":"eae56c379fa844278abd99e478544128_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"eae56c379fa844278abd99e478544128","campaignApp":"eae56c379fa844278abd99e478544128","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"e9db2d9e72de43f39e221242cc17f3e3","campaignApp":"e9db2d9e72de43f39e221242cc17f3e3","name":"e9db2d9e72de43f39e221242cc17f3e3_SocialSignOn","options":{"widgetName":"e9db2d9e72de43f39e221242cc17f3e3_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"e9db2d9e72de43f39e221242cc17f3e3","campaignApp":"e9db2d9e72de43f39e221242cc17f3e3","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"},{"campaign":"987ce92f4b4d4f64a4bde1c563e3eeef","campaignApp":"987ce92f4b4d4f64a4bde1c563e3eeef","name":"987ce92f4b4d4f64a4bde1c563e3eeef_SocialSignOn","options":{"widgetName":"987ce92f4b4d4f64a4bde1c563e3eeef_SocialSignOn","socialIcons":"[\"linkedin\"]","socialNetworks":null,"language":null,"campaign":"987ce92f4b4d4f64a4bde1c563e3eeef","campaignApp":"987ce92f4b4d4f64a4bde1c563e3eeef","widgetStyle":"default"},"type":"CF.widget.SocialSignOn"}]);that.loaded=true;cf_jq.each(callbacks,function(i,fx){fx(cf_jq,CF);});}
afterConfig();},0);};});return that;}();}