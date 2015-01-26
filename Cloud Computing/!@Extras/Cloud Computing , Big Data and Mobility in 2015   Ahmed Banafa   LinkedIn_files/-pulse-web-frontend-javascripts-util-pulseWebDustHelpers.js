(function(dust){var CHANNELS_VIEW_PAGE_PATH="/channels/*",SCDS_CONCAT_URL="concat/common",SCDS_CONCAT_JS_URL=combineUrlParts(SCDS_CONCAT_URL,"js"),hasOwnProperty=bind(function(){}.call,{}.hasOwnProperty);function pad(number){return number<10?"0"+number:number}if(!Date.prototype.toISOString)(function(){Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+pad(this.getUTCMonth()+1)+"-"+pad(this.getUTCDate())+"T"+pad(this.getUTCHours())+":"+pad(this.getUTCMinutes())+":"+pad(this.getUTCSeconds())+
"."+(this.getUTCMilliseconds()/1E3).toFixed(3).slice(2,5)+"Z"}})();function bind(fn,ctx){return function(){return fn.apply(ctx,arguments)}}function extend(dest,src){var prop;if(src)for(prop in src)if(hasOwnProperty(src,prop))dest[prop]=src[prop];return dest}function assert(condition,message){if(!condition)throw new Error(message);}function trim(str){if(str&&typeof str.replace==="function")return str.replace(/^\s+|\s+$/g,"");return str}function match(value,candidates,arg){var candidateName="*",candidate;
arg=arg||value;if(candidates[value])candidateName=value;candidate=candidates[candidateName];if(typeof candidate==="function")return candidate(arg);return candidate}function boolStringToBool(boolString){return match(String(boolString).toLowerCase(),{"true":true,"*":false})}function coerce(value,type,context){return match(type,{"number":Number,"string":String,"boolean":boolStringToBool,"date":function(val){return new Date(val)},"context":function(val){return context.get(val)}},value)}function combineUrlParts(leftPart,
rightPart){return leftPart.replace(/\/$/,"")+"/"+rightPart.replace(/^\//,"")}function buildJsScdsConcatUrl(paths){return play.scdsDirectUrl(play.buildUrl(SCDS_CONCAT_JS_URL,{"f":paths}))}function parseIntFromFormatted(value){var withoutAlpha;if(typeof value==="number")return value;withoutAlpha=String(value).replace(/\D/g,"");return parseInt(withoutAlpha,10)}function numberFormat(value){if(LI&&typeof LI.numberFormat==="function")return LI.numberFormat(value);return value}function largeNumberFormat(value){var num=
parseIntFromFormatted(value);if(num<1E3)return String(num);else if(num<1E5)return Math.round(num/100)/10+"K";else if(num<1E6)return Math.round(num/1E3)+"K";else return Math.round(num/1E5)/10+"M"}function dateToIso(date){if(typeof date==="string")date=parseInt(date,10);return(new Date(date)).toISOString()}extend(dust.filters,{numberFormat:numberFormat,largeNumberFormat:largeNumberFormat,isoDate:dateToIso});function channelsViewPageUrl(chunk,context,bodies,params){if(params&&params.vanityName)return chunk.write(dust.escapeHtml(CHANNELS_VIEW_PAGE_PATH.replace("*",
params.vanityName)));return chunk}function varHelper(chunk,context,bodies,params){var name,type;assert(params,"@var called with no params");assert(params.name,"@var called without a name attribute");name=params.name;type=params.type;return chunk.capture(bodies.block,context,function(data,chunk){context.stack.head[name]=type?coerce(trim(data),type,context):data;chunk.end()})}function adUrl(chunk,context,bodies,params){var urlParams;assert(params,"@adUrl called without any parameters");assert(params.width,
"@adUrl called without width parameter");assert(params.height,"@adUrl called without height paramater");urlParams={"sz":params.width+"x"+params.height,"ti":params.tile,"p":params.publisherId,"z":params.zone,"_x":params._x};return chunk.write(play.buildUrlSimple("/csp/dtag",urlParams))}function scdsJsConcatUrl(chunk,context,bodies,params){var paths;assert(params,"@scdsJsConcatUrl called without params");assert(params.paths,"@scdsJsConcatUrl called without paths param");paths=play.getPathList(params);
return chunk.write(buildJsScdsConcatUrl(paths))}function scdsJsConcat(chunk,context,bodies,params){var paths,versionDate="\x26_v\x3d12092014";assert(params,"@scdsJsConcatUrl called without params");assert(params.paths,"@scdsJsConcatUrl called without paths param");paths=play.getPathList(params);return chunk.write(play.createScriptTag({src:buildJsScdsConcatUrl(paths)+versionDate},params))}function mprCdnImg(chunk,context,bodies,params){var mediaId=params.mediaId,path=play.combineUrlPieces(play.getPageContextValue("baseMprUrl",
true),"jc"+mediaId),attrs;attrs=_.extend({src:path},_.omit(params,["mediaId","urn","size","width","height","src"]));return chunk.write(LI.HtmlUtils.createHtmlTag("img",attrs,null))}function attrPair(name,value){return'{0}\x3d"{1}"'.replace("{0}",name).replace("{1}",value)}function seoTag(chunk,context,bodies,params){var metatagChunk="",prefix=params.prefix;metatagChunk+=_.reduce(params,function(metatagChunk,value,key){var prefixValue=prefix?prefix+":"+value:value;return metatagChunk+" "+match(key,
{"name":attrPair("name",prefixValue),"property":attrPair("property",prefixValue),"content":attrPair("content",value.replace(/\"/g,"\x26quot;")),"*":""})},"");return chunk.write("\x3cmeta "+metatagChunk+"/\x3e")}extend(dust.helpers,{adUrl:adUrl,"var":varHelper,channelsViewPageUrl:channelsViewPageUrl,scdsJsConcatUrl:scdsJsConcatUrl,scdsJsConcat:scdsJsConcat,seoTag:seoTag,mprCdnImg:mprCdnImg})})(dust);