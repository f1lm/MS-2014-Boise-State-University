//clear search
function clear_search(s) {
  if (s.defaultValue==s.value || s.value=='SEARCH') s.value = ""
}


//text resize
function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}




////////Set Nav State ////////////////////////

function setHLState(){

	var browser=navigator.appName
	var b_version=navigator.appVersion
	var version=parseFloat(b_version)
	
	
	for(i=0;i<navArray.length;i++){
		//alert(navArray[i]);
		
		//document.getElementById(navArray[i] + '_link').onmouseover = "document.toptab_01.src = 'images/home_toptab_prbsolving_on.gif';"
		//document.getElementById(navArray[i] + '_link').onmouseout = "document.toptab_01.src = 'images/home_toptab_prbsolving.gif';"
	
	}
	
	//alert(browser + " :: " + version);

	for(x=0;x<arguments.length;x++){
		
		var currSrc = document.getElementById(arguments[x]).src;
		var tempSrc = currSrc.substring(currSrc.lastIndexOf('/')+1);
		
		var newSrc = tempSrc.substring(0,tempSrc.lastIndexOf('.gif')) + "_on.gif[/system-asset:file]";
		
		document.getElementById(arguments[x]).src = "images/" + newSrc;
			
			//alert(document.getElementById(arguments[x]))
			if(browser != "Netscape"){
				document.getElementById(arguments[x] + '_link').onmouseout = null;
				document.getElementById(arguments[x] + '_link').onmouseover = null;
			} else {
				delete document.getElementById(arguments[x] + '_link').onmouseout;
				delete document.getElementById(arguments[x] + '_link').onmouseover;
			}
			
	}
}



function lvlImage(){
	var imgArray = new Array();
	imgArray[0] = '<img src="images/level_photo_01.jpg" width="748" height="205" alt="" />';
	imgArray[1] = '<img src="images/level_photo_02.jpg" width="748" height="205" alt="" />';
	imgArray[2] = '<img src="images/level_photo_03.jpg" width="748" height="205" alt="" />';
	imgArray[3] = '<img src="images/level_photo_04.jpg" width="748" height="205" alt="" />';
	imgArray[4] = '<img src="images/level_photo_05.jpg" width="748" height="205" alt="" />';
	
	var imgNum = Math.floor(Math.random()*imgArray.length);
	
	document.write(imgArray[imgNum]);
	}
	
	
	
	
	
// Third Column Callout Articles Array //
var articleCounted = 0;
var totalArticles = 0;
var articles=new Array(0);

function displayArticle()
{
  if (totalArticles==0) {
     return;
  }
  if (articleCounted>=totalArticles) {
    articleCOunted=0;
  }
  document.getElementById('lvl_3rdCol_Article').innerHTML = '<div>' + articles[articleCounted] + '</div>';	
  
}
 
function processArticles(type, data, evt)
{
           var themes=data.getElementsByTagName("theme");
           var i;
           totalArticles=themes.length;
           articles=new Array(totalArticles);
           for (i=0;i<themes.length;i++) {
              var themename=themes[i].getElementsByTagName("box-title")[0].firstChild.nodeValue;
              var heads=themes[i].getElementsByTagName("headline");
              var project=themes[i].getElementsByTagName("project")[0];
              var headline=project.getElementsByTagName("title")[0].firstChild.nodeValue;
              var article=project.getElementsByTagName("article")[0];
              var articleText=article.firstChild.nodeValue;
              var articleLink=article.getAttribute("linkID");
              var teaser=project.getElementsByTagName("teaser")[0].firstChild.nodeValue;
              var photo=project.getElementsByTagName("photo")[0];
              var photoLink=photo.getAttribute("thirdColID");

              articles[i]='<p><img src=\"/'+photoLink+'\" width="201" height="117" border="0" alt=""/></p><h2>'+headline+'</h2><p>'+teaser+'</p><p><a href="/'+articleLink+'"><img src="/cmufront/homeimages/btn_readarticle.gif" width="102" height="15" border="0" alt="Read Article" title="Read Article" /></a></p><h1>'+themename+'</h1>';

           }
           displayArticle();
}

function loadArticles()
{
  dojo.io.bind({
                url:"/themes.xml",
                useCache:true,
                preventCache:true,
                mimetype:"text/xml",
                load:dojo.lang.hitch(this,this.processArticles)
               });
}

function setArticleNum(num)
{
  articleCounted=num;
  if (articles.length==0) {
    loadArticles();
    return;
  }
  displayArticle();
}

function getArticle(step){
                if (articles.length==0) {
                  loadArticles();
                  return;
                }
			
		articleCounted += step;
		
		if(articleCounted < 0){
			articleCounted = totalArticles-1;
		}
		if(articleCounted >= totalArticles){
			articleCounted = 0;
		}
		displayArticle();
	
	}
	
	


// Third Column Callout Fast Facts Array //
var fastfactCounted = 0;
var totalFastFact = 0;
var fastfacts=new Array(0);

function loadFastFacts()
{
  dojo.io.bind({
                url:"/about/fastfacts.xml",
                useCache:true,
                preventCache:true,
                mimetype:"text/xml",
                handler:function(type,data,e) {
                    if (type=="load") {
                      var fastFactNodes=data.getElementsByTagName("fact");
                      var i;
                      totalFastFact=fastFactNodes.length;
                      fastfacts=new Array(totalFastFact);
                      for (i=0;i<totalFastFact;i++) {
                        fastfacts[i]='<p>'+fastFactNodes[i].firstChild.nodeValue+'</p><h1>fast facts</h1>';
                      }
              var factNum = Math.floor(Math.random()*fastfacts.length);
              document.getElementById('lvl_3rdCol_FastFacts').innerHTML = '<div>' + fastfacts[factNum] + '</div>';
                    }
                }
               });
}

function getFastFact(step){
		if (fastfacts.length==0) {
                   loadFastFacts();
                   return;
                }
		fastfactCounted += step;
		
		if(fastfactCounted < 0){
			fastfactCounted = totalFastFact-1;
		}
		if(fastfactCounted >= totalFastFact){
			fastfactCounted = 0;
		}
		
		document.getElementById('lvl_3rdCol_FastFacts').innerHTML = '<div>' + fastfacts[fastfactCounted] + '</div>';	
		//tipCounted++;
	
	}
	//getFastFact(0);

function selectQuickLink(select)
{
 var selectedNode=select.options[select.selectedIndex];
 var url=selectedNode.value;
 var text=selectedNode.text;
 if (url) {
   location=url;
 }
}

//Show or hide a region within the HTML
function showhide(targetID) {
	//change target element mode
	var elementmode = document.getElementById(targetID).style;
	elementmode.display = (!elementmode.display) ? 'none' : '';
}

//Populate a form field with the current URL
function populateURL(targetID) {
var url = window.location;
document.getElementById(targetID).value = url;
}