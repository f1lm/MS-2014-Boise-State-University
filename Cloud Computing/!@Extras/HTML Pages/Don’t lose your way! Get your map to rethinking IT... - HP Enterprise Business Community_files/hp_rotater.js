// JavaScript Document
// BANNER OBJECT
function Banner(objName){
	this.obj = objName;
	this.aNodes = [];
	this.currentBanner = 0;
	
};

// ADD NEW BANNER
Banner.prototype.add = function(bannerType, bannerPath, bannerDuration, height, width, hyperlink) {
	this.aNodes[this.aNodes.length] = new Node(this.obj +"_"+ this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, hyperlink);
};

// Node object
function Node(name, bannerType, bannerPath, bannerDuration, height, width, hyperlink) {
	this.name = name;
	this.bannerType = bannerType;
	this.bannerPath = bannerPath;
	this.bannerDuration = bannerDuration;
	this.height = height
	this.width = width;
	this.hyperlink= hyperlink;
//	alert (name +"|" + bannerType +"|" + bannerPath +"|" + bannerDuration +"|" + height +"|" + width + "|" + hyperlink);
};

// Outputs the banner to the page
Banner.prototype.toString = function() {
	var str = ""
	for (var iCtr=0; iCtr < this.aNodes.length; iCtr++){
		str = str + '<span name="'+this.aNodes[iCtr].name+'" '
		str = str + 'id="'+this.aNodes[iCtr].name+'" ';
		str = str + 'class="m_banner_hide" ';
		str = str + 'bgcolor="#FFFCDA" ';	// CHANGE BANNER COLOR HERE
		str = str + 'align="center" ';
		str = str + 'valign="top" >\n';
		if (this.aNodes[iCtr].hyperlink != ""){
			str = str + '<a href="'+this.aNodes[iCtr].hyperlink+'">';
		}
			
		if ( this.aNodes[iCtr].bannerType == "FLASH" ){
			str = str + '<OBJECT '
			str = str + 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
			str = str + 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" '
			str = str + 'WIDTH="'+this.aNodes[iCtr].width+'" '
			str = str + 'HEIGHT="'+this.aNodes[iCtr].height+'" '
			str = str + 'id="bnr_'+this.aNodes[iCtr].name+'" '
			str = str + 'ALIGN="" '
			str = str + 'VIEWASTEXT>'
			str = str + '<PARAM NAME=movie VALUE="'+ this.aNodes[iCtr].bannerPath + '">'
			str = str + '<PARAM NAME=quality VALUE=high>'
			str = str + '<PARAM NAME=bgcolor VALUE=#FFFCDA>'
			str = str + '<EMBED ';
			str = str + 'src="'+this.aNodes[iCtr].bannerPath+'" '
			str = str + 'quality=high '
//			str = str + 'bgcolor=#FFFCDA '
			str = str + 'WIDTH="'+this.aNodes[iCtr].width+'" '
			str = str + 'HEIGHT="'+this.aNodes[iCtr].height+'" '
			str = str + 'NAME="bnr_'+this.aNodes[iCtr].name+'" '
			str = str + 'ALIGN="center" '
			str = str + 'TYPE="application/x-shockwave-flash" '
			str = str + 'PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">'
			str = str + '</EMBED>'
			str = str + '</OBJECT>'
		}else if ( this.aNodes[iCtr].bannerType == "IMAGE" ){
			str = str + '<img src="'+this.aNodes[iCtr].bannerPath+'" ';
			str = str + 'border="0" ';
			str = str + 'height="'+this.aNodes[iCtr].height+'" ';
			str = str + 'width="'+this.aNodes[iCtr].width+'">';
		}

		if (this.aNodes[iCtr].hyperlink != ""){
			str = str + '</a>';
		}

		str += '</span>';
	}
	return str;
};

// START THE BANNER ROTATION
Banner.prototype.start = function(){
	this.changeBanner();
	var thisBannerObj = this.obj;
	// CURRENT BANNER IS ALREADY INCREMENTED IN cahngeBanner() FUNCTION
	setTimeout(thisBannerObj+".start()", this.aNodes[this.currentBanner].bannerDuration * 1000);
}

// CHANGE BANNER
Banner.prototype.changeBanner = function(){
	var thisBanner;
	var prevBanner = -1;
	if (this.currentBanner < this.aNodes.length ){
		thisBanner = this.currentBanner;
		if (this.aNodes.length > 1){
			if ( thisBanner > 0 ){
				prevBanner = thisBanner - 1;
			}else{
				prevBanner = this.aNodes.length-1;
			}
		}
		if (this.currentBanner < this.aNodes.length - 1){
			this.currentBanner = this.currentBanner + 1;
		}else{
			this.currentBanner = 0;
		}
	}
	

	if (prevBanner >= 0){
		document.getElementById(this.aNodes[prevBanner].name).className = "m_banner_hide";
	}
	document.getElementById(this.aNodes[thisBanner].name).className = "m_banner_show";
}