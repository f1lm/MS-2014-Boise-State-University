
try {
    (function(w){
    	
    	window.sealTooltipMng = [];
    	// Seal HTML Template
    	var getButtonTpl = function(containerID){
    		return ["<div class='gigya-seal-wrap'>",
		        	"<ul>",
					"<li id='"+containerID+"-gigya-seal-hover' >",
						"<a href='#' id='"+containerID+"-gigya-seal-image-link' class='gigya-seal-image'></a>",
					"</li>",
				"</ul>",
		"</div>"].join("");
    	};
    	
    	var getOverlayTpl = function(containerID,params){
    		return ["<div class='gigya-seal-tooltip-inner'>",
		        		"<div class='gigya-seal-tooltip-header'>",
						"<span class='gigya-seal-link-like'>"+params.domain+"</span>",
						"<span>&nbsp;adheres to the following with respect to your</br>social login data and permissions:</span>",
					"</div>",
					"<div class='gigya-seal-tooltip-spacer'></div>",
					"<div class='gigya-seal-tooltip-body'>",
						"<ul>",	
							"<li><span class='gigya-seal-tooltip-icon'></span><strong>We will not</strong> sell your data or your friends' data</li>",
							"<li><span class='gigya-seal-tooltip-icon'></span><strong>We will not</strong> post on your behalf without your permission</li>",
							"<li><span class='gigya-seal-tooltip-icon'></span><strong>We will not</strong> send private messages to your friends without your permission</li>",	
							"<li><span class='gigya-seal-tooltip-icon'></span><strong>We will not</strong> spam you with unsolicited emails</li>",											
						"</ul>",
					"</div>",
					"<div class='gigya-seal-tooltip-spacer'></div>",
					"<div class='gigya-seal-tooltip-footer'>",
						"<span id='"+containerID+"-validDate' class='gigya-seal-valid-as'></span>",
						"<a href='#' id='"+containerID+"-gigya-seal-powered-by' class='gigya-seal-powered-by'></a>",
						"<a href='#' id='"+containerID+"-gigya-seal-learn-more' class='gigya-seal-learn-more'></a>",	
					"</div>",
				"</div>",
			"</div>"].join("");
    	};
    	
    	var getOffset = function(containerID){
    		var elem = document.getElementById(containerID);
    		var x = elem.offsetLeft;
    		var y = elem.offsetTop;

    		while (elem = elem.offsetParent) {
    			x += elem.offsetLeft;
    			y += elem.offsetTop;
    		}
    		return { left: x, top: y };
    	};
    	
    	var getHeight = function(containerID){
    		var elem = document.getElementById(containerID);
    		return elem.offsetHeight;
    	};
    	
    	
    	
        var showSealUI = function(params) {
        	if(!params) params = {};
        	if(!params.containerID) {
                if(console && console.error) console.error("No container ID set -- cannot render seal UI.");
                return;
            };
            
            
            
    		var d = w.document;
        	var domain = "venturebeat.com";
        	if(domain == "" || domain == undefined || domain == null) return;
        	
        	if (domain==document.domain || document.domain.indexOf('.'+domain)==(document.domain.length)-(domain.length-1)) {
        		
        		var cID = params.containerID;
        		var r = d.getElementById(cID);
        		r.className = "gigya-seal";
        		if(!r) return; 
            	
        		!function(id){
        			var h,l;
        			if(!d.getElementById(d)) {
        				var isHttps = document.location.protocol == 'https:';
        				//var cssUrl = '//cdn.gigya.com/seal/seal.css';
        				        				var cssUrl = isHttps ? 'https://cdns.gigya.com/seal/' : 'http://cdn.gigya.com/seal/' ;
        				        				
						cssUrl+="seal.css";
						
        				var h = d.getElementsByTagName('head')[0];
        				l = d.createElement('link');
        				h.appendChild(l);
        				l.id  = id;
        				l.href = cssUrl;
        				l.rel = 'stylesheet';
        			}
        		}("gigya-seal-css");
        		
        		r.innerHTML = getButtonTpl(cID);
        		var overlay =  document.createElement("div");
        			overlay.id = cID + '-gigya-seal-tooltip';
        			overlay.className = 'gigya-seal-tooltip';
        			overlay.innerHTML = getOverlayTpl(cID,{domain:domain});
        		var body = document.getElementsByTagName("body")[0];
        		body.appendChild(overlay);
        		
        		window.sealTooltipMng.push(cID);
        		
            	var openLN = function(elem) {
            		elem.onclick = function(event) {
                		event = event || window.event;
                		window.open("http://seal.gigya.com/splp.php?apiKey=78D93F1E-FF03-D205-79A7-F0688FBE7FBB","gigyaseal","width=665,height=685,top=100,left=100");
                		if(event.stopPropagation) {
                			event.stopPropagation();
                		} else {
                			event.cancelBubble = true;
                		}	
                		return false;
                	}
            	};
            	
            	openLN(d.getElementById(cID+"-gigya-seal-image-link"));
            	openLN(d.getElementById(cID+"-gigya-seal-learn-more"));
            	openLN(d.getElementById(cID+"-gigya-seal-powered-by"));
            	
            	function hideAdditionalTooltips(activeID){
            		var items = window.sealTooltipMng;
            		document.getElementById(activeID+ "-gigya-seal-tooltip").style.zIndex = params.zIndex || 1;
            		for(var i=0 ; i < items.length ; i++ ) {
            			if(items[i]!=activeID) {
            				document.getElementById(items[i] + "-gigya-seal-tooltip").style.display = "none";
            				document.getElementById(items[i]+ "-gigya-seal-tooltip").style.zIndex = 0;
            			};
            		}
            	}
            	
            	var hover = function(mils) {
            		var h = d.getElementById(cID+"-gigya-seal-hover"),t = d.getElementById(cID+"-gigya-seal-tooltip");
            		var mils = mils, timerHover = 0, timerOut = 0, timerHide = 0,isOver = false,isOut = true;
                	
                	h.onmouseover = function(event){
                		isOver = true;
                		if(t.style.display != 'block') {
                			isOut = false;
    	            		timerHover = setTimeout(function(){
    	            			if(!isOut) {
    	            				hideAdditionalTooltips(cID);
    	            				t.style.display = 'block';
    	            				t.style.top = getOffset(cID).top + getHeight(cID) + "px";
    	            				t.style.left = getOffset(cID).left + "px";
    	            			}
    	            			clearTimeout(timerHover);
    	            		},mils);
                		}	
                	}
                	
                	t.onmouseover = function(event){
                		isOver = true;
                	}
                	
                	t.onmouseout = function(event){
                		isOut = true;
                		isOver = false;
                		timerOut = setTimeout(function(){
                			if(!isOver) {
                				timerHide = setTimeout(function(){
                					if(!isOver) {
                						t.style.display = 'none';
                					}
                					clearTimeout(timerHide);
                				},mils);
                			};
                			clearTimeout(timerOut);
                		},300)
                	}
                	
                	h.onmouseout = function(event){
                		isOut = true;
                		isOver = false;
                		timerOut = setTimeout(function(){
                			if(!isOver) {
                				timerHide = setTimeout(function(){
                					if(!isOver) {
                						t.style.display = 'none';
                					}
                					clearTimeout(timerHide);
                				},mils);
                			};
                			clearTimeout(timerOut);
                		},300)
                	}
    			 }(500);	
        	}            	
    			
    		//var currentTime = new Date()
    		//document.getElementById(cId + '-validDate').innerHTML = (currentTime.getMonth() + 1).toString() + "/" + currentTime.getDate() + "/" + currentTime.getFullYear() + " " + currentTime.getHours() + ":" + currentTime.getMinutes() ;
    	}

        if(typeof gigya == 'undefined') gigya = {};
        if(typeof gigya.socialize== 'undefined') gigya.socialize = {};
        gigya.socialize.showSealUI = showSealUI;
    }(window));
} catch (e) {} 