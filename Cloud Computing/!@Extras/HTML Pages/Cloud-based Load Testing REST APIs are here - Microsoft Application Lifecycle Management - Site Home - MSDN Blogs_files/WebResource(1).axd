
function DelayedContent(varName,containerId,loadContentScript,isLoaded,loadImmediately,onReloadFunction)
{this._variableName=varName;this._container=document.getElementById(containerId);this._loadContentFunction=new Function('argument','callback',loadContentScript);this._xmlHttpRequest=null;this._isLoaded=isLoaded;this._onReloadFunction=onReloadFunction;this.IsLoaded=function()
{return this._isLoaded;}
this.Load=function(argument)
{if(!this.IsLoaded())
this.Reload(argument);}
this.Reload=function(argument)
{this._container.style.cursor='progress';this._loadContentFunction(argument,new Function('result',this._variableName+'._setContent(result);'));}
this._setContent=function(result)
{if(result!=null)
{Telligent_Common.DisposeContent(this._container);this._container.innerHTML=result;this._isLoaded=true;if(this._onReloadFunction)
this._onReloadFunction(this);window.setTimeout(function()
{try
{__theFormPostData='';__theFormPostCollection=new Array();WebForm_InitCallback();}
catch(e){}},99);}
this._container.style.cursor='default';}
if(loadImmediately)
{window.setTimeout(new Function(this._variableName+'.Load();'),249);}}