  var currentPage = 1;

  function clickLoadMore(tab) {
		jQuery('div#load-more-'+currentPage).show();
		currentPage++
		preloadNextView();
  }
  
//First page
  function preloadFirstView() {
		var pageName = getPageName();
        var url = '/load_more/get_page/'+pageName+'?page=1';
		if(pageName == 'search') {
			url += '&term=' + encodeURIComponent(getUrlVars()['term']);
		}
		jQuery.ajax({
				url: url,
				jsonp: false,
			}).success(firstPageCallback);		  
  }

  var firstPageCallback = function(data) {
  	if ((data['data'] != null) && (data['data'].length < 200)) {
		jQuery('#block-load_more-load_more').hide();
  	} else {
    	jQuery('div#load-more').before("<div id='load-more-"+currentPage+"' class='load-more-box' style='display:none;'>"+data['data']+"</div>");
	}
  }

//All subsequent pages
  function preloadNextView(tab) {
		var pageName = getPageName();
        var url = '/load_more/get_page/'+pageName+'?page=' + currentPage;
		if(pageName == 'search') {
			url += '&term=' + encodeURIComponent(getUrlVars()['term']);
		}
	  jQuery.ajax({
		url: url,
		jsonp: false,
	  }).success(nextPageCallback);
  }

  var nextPageCallback = function(data) {
	jQuery('div#load-more').before("<div id='load-more-"+currentPage+"' class='load-more-box' style='display:none;'>"+data['data']+"</div>");
  }

  function getPageName() {
      var pageArray = window.location.pathname.split("/");
      if (pageArray.length > 2) {
     	return (pageArray[1].replace("-", "_")+"/"+pageArray[2]);
      } else {
      	if (pageArray[1]) { 
      		return (pageArray[1]).replace("-", "_");
      	} else { //home page
      		return ("home");
      	}
      }
  }
  
  function getViewName() {
	var pageArray = window.location.pathname.split("/");
	viewName = pageArray[1];
	if (viewName == "section") {
		viewName = "category-pages";
	}
	if (viewName == "quizzes") {
		viewName = "mentalfloss-quizzes";
	}
	if (viewName == "authors") {
		viewName = "author-articles";
	}
	if(viewName == "search") {
		viewName = "mental-floss-search-results";
	}
	if (viewName == "") { //home page
		viewName = "knowledge-feed";
	}
	
  	return viewName;
  }

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

jQuery(document).ready( setTimeout( 'preloadFirstView()',3000 ));

