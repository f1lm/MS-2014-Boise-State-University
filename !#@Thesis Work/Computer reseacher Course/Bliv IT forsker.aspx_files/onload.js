jQuery.noConflict();

jQuery(document).ready(function() {

    jQuery("#CalendarForm .PanelDanish .showDanish input").click(function() {
        if (jQuery(this).attr("checked") == true) {
            jQuery("#CalendarForm .PanelDanish #PanelDaInner").addClass("enabled");
            jQuery("#CalendarForm .PanelDanish #PanelDaInner .element input,#CalendarForm .PanelDanish #PanelDaInner .element textarea ").removeAttr("disabled");
            jQuery("#CalendarForm .requiredValidatorCheckboxes").css("display", "none");
            jQuery("#CalendarForm .PanelDanish #PanelDaInner .element span.da").each(function() {
                ValidatorEnable(jQuery(this)[0], true);
                jQuery(this).css("display", "none");
            });

        }
        else {
            jQuery("#CalendarForm .PanelDanish #PanelDaInner").removeClass("enabled");
            jQuery("#CalendarForm .PanelDanish #PanelDaInner .element input,#CalendarForm .PanelDanish #PanelDaInner .element textarea ").attr("disabled", "disabled");
            jQuery("#CalendarForm .PanelDanish #PanelDaInner .element span.da").each(function() {
                ValidatorEnable(jQuery(this)[0], false);

            });
        }
    });

    jQuery("#CalendarForm .PanelEnglish .showEnglish input").click(function() {
        if (jQuery(this).attr("checked") == true) {
            jQuery("#CalendarForm .PanelEnglish #PanelEnInner").addClass("enabled");
            jQuery("#CalendarForm .PanelEnglish #PanelEnInner .element input,#CalendarForm .PanelEnglish #PanelEnInner  .element textarea ").removeAttr("disabled");
            jQuery("#CalendarForm .requiredValidatorCheckboxes").css("display", "none");
            jQuery("#CalendarForm .PanelEnglish #PanelEnInner .element span.en").each(function() {
                ValidatorEnable(jQuery(this)[0], true);
                jQuery(this).css("display", "none");
            });
        }
        else {
            jQuery("#CalendarForm .PanelEnglish #PanelEnInner").removeClass("enabled");
            jQuery("#CalendarForm .PanelEnglish #PanelEnInner .element input,#CalendarForm .PanelEnglish #PanelEnInner  .element textarea ").attr("disabled", "disabled");
            jQuery("#CalendarForm .PanelEnglish #PanelEnInner .element span.en").each(function() {
                ValidatorEnable(jQuery(this)[0], false);
            });
        }
    });
    jQuery("#CalendarForm .PanelDanish .showDanish input").each(function() {
        if (jQuery(this).attr("checked") == true) {
            jQuery("#CalendarForm .PanelDanish #PanelDaInner").addClass("enabled");
        }
        else {
            jQuery("#CalendarForm .PanelDanish #PanelDaInner").removeClass("enabled");
            jQuery("#CalendarForm .PanelDanish #PanelDaInner .element input,#CalendarForm .PanelDanish #PanelDaInner .element textarea ").attr("disabled", "disabled");
            jQuery("#CalendarForm .PanelDanish #PanelDaInner .element span.da").each(function() {
                ValidatorEnable(jQuery(this)[0], false);

            });
        }
    });

    jQuery("#CalendarForm .PanelEnglish .showEnglish input").each(function() {
        if (jQuery(this).attr("checked") == true) {
            jQuery("#CalendarForm .PanelEnglish #PanelEnInner").addClass("enabled");
        }
        else {
            jQuery("#CalendarForm .PanelEnglish #PanelEnInner").removeClass("enabled");
            jQuery("#CalendarForm .PanelEnglish #PanelEnInner .element input,#CalendarForm .PanelEnglish #PanelEnInner  .element textarea ").attr("disabled", "disabled");
            jQuery("#CalendarForm .PanelEnglish #PanelEnInner .element span.en").each(function() {
                ValidatorEnable(jQuery(this)[0], false);
            });
        }
    });

    jQuery("#CalendarForm input[type='submit']").click(function() {
        if ((jQuery("#CalendarForm .PanelEnglish .showEnglish input").attr("checked") == false) && (jQuery("#CalendarForm .PanelDanish .showDanish input").attr("checked") == false)) {
            jQuery("#CalendarForm .requiredValidatorCheckboxes").css("display", "block");
            jQuery("#CalendarForm .requiredValidatorDelete").css("display", "none");
            return false;
        }
    });


    jQuery('#menubar li a').focus(function() {
        jQuery(this).addClass('focus');
    }, function() {
        jQuery(this).removeClass('focus');
    });


    // popup functionality for the items with the condition below =true:
    //                    href initial = the link
    //                    target = blank
    //                    if javascript is disabled - onlick is redirecting in a new tab/window
    //                    
    //                    if javascript is enabled, in onload.js we override href=# and remove target=_blank attribute, a new winow will pop up with the url

    jQuery('#menubar li a.popUp,.secondary-menu li a.popUp').each(function() {
        jQuery(this).attr("href", "#");
        jQuery(this).removeAttr("target");
    });


    //append list of link to content area. Function located in \scripts\ITU\footnoteLinks.js
    footnoteLinks('content', 'content');

    jQuery('#functionality').prepend("<a href=\"JavaScript:window.print();\" class=\"printpage\">" + jQuery('#printPageLabel').val() + "</a>");



    jQuery("#querySearch2").keypress(function (e) {  
         if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {  
             jQuery('#querySearch2Btn').click();
             return false;
         } else {
             return true;
         }  
     });
     
     
    /* autoheight for shortcut boxes */
	boxes = jQuery("#shortcutBoxes .section");
	var tallest = 0;
	boxes.each(function() {
		var thisHeight = jQuery(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	boxes.height(tallest);

	//for PDF
	var printLink=document.getElementById('printPDFLink');
	var printLang=document.getElementById('printPDFLang');
	 if (printLink != null)
	 {
	
	   hreflink= printLink.value;
	   langValue="";
	   if (printLink != null)
		 {	
		 		langValue=printLang.value;
		 }
		 //alert (langValue);
		var oldurl = location.href + "?";
		var stringHref = oldurl.split("?");
		var url;
		if (stringHref[1] != "")
			url = location.href + "&p=2"+langValue;
		else
			url = location.href + "?p=2"+langValue;	

		printLink.href = url;
	// }
	}

});