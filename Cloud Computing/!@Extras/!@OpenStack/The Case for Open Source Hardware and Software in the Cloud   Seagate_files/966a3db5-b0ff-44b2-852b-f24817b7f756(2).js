			
// Copyright 2006-2014 ClickTale Ltd., US Patent Pending
// PID: 70
// Generated on: 11/14/2014 1:39:16 AM (UTC 11/14/2014 7:39:16 AM)

if (typeof isContentViewAdded == "undefined") {
    isContentViewAdded = false;

    function pageWidth() { return window.innerWidth != null ? window.innerWidth : document.body != null ? document.body.clientWidth : null; }
    function pageHeight() { try { return window.innerHeight != null ? window.innerHeight : document.body != null ? document.body.clientHeight : null; } catch (e) { } }


    function in_array(needle, arr) {
        var size = arr.length,
	    item, i;

        for (i = 0; i < size; i += 1) {
            item = arr[i];
            if (item === needle) {
                return i;
            }
        }
        return -1;
    }

    function getFilename() {
        var url = window.location.pathname.toLowerCase();
        var filename = url.substring(url.lastIndexOf('/') + 1);
        return filename;
    }

    function safeClickTaleExec(code) {
        if (typeof ClickTaleExec == "function" && code != "") {
            ClickTaleExec(code);
            
        }
    }

    function safeClickTaleEvent(eventString) {
        if (typeof ClickTaleEvent == "function" && eventString != "") {
            ClickTaleEvent(eventString);
        }
       
    }

    function safeClickTaleRegisterElementAction(e) {
        if (typeof ClickTaleRegisterElementAction == 'function') {
            ClickTaleRegisterElementAction('mouseover', e);
            ClickTaleRegisterElementAction('click', e);
        }
    }

    function safeClickTaleField(key, value) {
        if (typeof ClickTaleField == "function" && key != "" && typeof value != "undefined") {
            ClickTaleField(key, value);
        }
    }

    function ctHandleDownUP(el, func) {
        jQuery(document).one('mouseup', function (ev) {
            if (el === ev.target) {
                func();
            }
        });
    }

    function triggerClickTaleExec(elementSelector, eventName, withValChange) {
        var elm = jQuery(elementSelector);
        elm.bind(eventName, function () {
            if (withValChange) {
                safeClickTaleExec('jQuery("' + elementSelector + '").val("' + elm.val() + '");');
            }
            safeClickTaleExec('jQuery("' + elementSelector + '").' + eventName + '();');
        });
    }

    jQuery("UL#mainNav li a").each(function () {
        jQuery(this).click(function (e) {
            if (typeof ClickTaleRegisterElementAction === 'function') {
                ClickTaleRegisterElementAction('click', e);
            }
        });
    });


    /* START 9649 */
    // home banner event
    var banners = jQuery('#home-Seagate_banner .banner');
    banners.each(function () {
        jQuery(this).bind('click', function () {
            var index = banners.index(this);
            var str = 'Click on Home Page Banner: ' + (index + 1);
            safeClickTaleEvent(str);
        });
    });
    /* END   9649 */




    /* START 9565, 9653 */
    jQuery('.tabset li a, .tabFilter li a').click(function (e) {
        if (typeof ClickTaleRegisterElementAction === 'function') {
            ClickTaleRegisterElementAction('click', e);
        }
    });
    /* END   9565, 9653 */

    // activate ClickTale simulation code on document ready
    function triggerClickTaleEvent(elementSelector, eventName, ctEventName) {
        jQuery(elementSelector).one(eventName, function () {
            safeClickTaleEvent(ctEventName);
        });
    }

    function ct_displayConfig() {
        jQuery("#configuratorSelected a.btn-delete").one("click", function () {
            var ct_name = (jQuery(this).next().text().match(/^\s*\w+/));
            safeClickTaleExec('jQuery("#configuratorSelected div:contains(\'' + ct_name + '\')").prev().click();');
            ct_displayConfig();
        })
    }

    var prodctEvnts = function () {
        var prodBtns = jQuery('.rsBuy .rsBtn');
        if (prodBtns.length > 0) {
            jQuery('.rsBuy a').bind('click', function () {
                if (jQuery(this).parent().find('.stockStatus').length > 0) {
                    safeClickTaleEvent('Product: Add To Cart');
                } else {
                    safeClickTaleEvent('Product: Buy Now');
                }
            });
        }
    };
    var sentCapAndCol = function () {//send Capacity and Color options to PB
        if (document.location.href.indexOf('m360_force_id=21617') > -1 || document.location.href.indexOf('m360_force_id=21604') > -1) {
            var notLogin = jQuery('.nav-header-drop-opener:eq(0) a:eq(0) span').text();
            if (notLogin) {
                safeClickTaleEvent('User Not Logged In');
            }
            var cap = escape(jQuery('#itemOption_capacity_ts_master_feat .pdp-buy-filter-atom').html());
            safeClickTaleExec("jQuery('#itemOption_capacity_ts_master_feat .pdp-buy-filter-atom').append(unescape('" + cap + "'))");
            var col = escape(jQuery('#itemOption_colors_master_parent_feat .pdp-buy-filter-atom').html());
            safeClickTaleExec("jQuery('#itemOption_colors_master_parent_feat .pdp-buy-filter-atom').append(unescape('" + col + "'))");
        } else {
            var logBtn = jQuery('#openLogin');
            if (logBtn.length > 0) {
                safeClickTaleEvent('User Not Logged In');
            }
        }
    };

    /// SEAG - 54 - timings issues with ClickTale code & PCC ///
    var jq_Counter = 0;
    function ctCheckJq() {
        if (typeof ClickTaleIsRecording === 'function' && ClickTaleIsRecording()) {

            //SEAG-30	
            sentCapAndCol();
            
            
            ///////SEAG-75/////////
           	if(jQuery('.pageCategory').length>0 && jQuery('th.productTitle').length>0){
           		safeClickTaleEvent("Product Listing Page");
           	}
            ////  ---- SEAG-13 ----- ////
            jQuery("ul.accordion > li > strong").mousedown(function () {
                var index = jQuery("ul.accordion > li > strong").index(this);
                safeClickTaleExec("jQuery(\"ul.accordion > li > strong\").eq(" + index + ").click()");
            })

            jQuery(".tabset a").click(function () {
                var index = jQuery(".tabset a").index(this);
                safeClickTaleExec("jQuery(\".tabset a\").eq(" + index + ").click()");
            });

            if (jQuery('#home-Seagate_banner').length > 0) {
                setTimeout(function () {
                    var innerBanner = jQuery('#home-Seagate_banner').html();
                    var encodedBanner = escape(innerBanner);
                    safeClickTaleExec("jQuery('#home-Seagate_banner').html(unescape('" + encodedBanner + "'));");
                }, 1500);
            }

            setTimeout(function () {
                if (window.location.href == "http://www.onlineregister.com/seagate/" || window.location.href.indexOf("http://www.onlineregister.com/seagate/?") > -1) {
                    safeClickTaleEvent("Product Registration Form");

                    var timeInt = setInterval(function () {
                        if (jQuery(".pageHead").length > 0) {
                            clearInterval(timeInt);

                            if (jQuery(".pageHead").text() == "Invalid Serial Number")
                                safeClickTaleEvent("Invalid Serial Number");
                        }
                    }, 500);
                }
            }, 500);

            if (jQuery("#li-prodoverview").length) {
                safeClickTaleEvent("Product Page");
            }
            ////  ---- END SEAG-13 ----- ////

            setTimeout(function () {
                if (jQuery('.product-summary').length > 0) {
                    safeClickTaleEvent('Product page with Tabs');
                }
            }, 1000);
            if (typeof jQuery.fn.on === 'function') {
                jQuery('.nav-tabs.pdp-main-tab').on('mousedown', '.pdp-main-tab-dropdown-menu li[id*=tab]', function (e) {
                    if (jQuery(this).has('a[data-toggle="tab"]').length > 0) {
                        ctHandleDownUP(e.target, (function ($container) {
                            return function () {
                                var id = '#' + $container.attr('id');
                                if (id) {
                                    safeClickTaleExec("jQuery('" + id + "  > a:first-of-type[href^=#]').click();");
                                }
                            }
                        })(jQuery(this)));
                    }
                });
                var ct_SelectedTabId = '#' + jQuery('.nav-tabs.pdp-main-tab .pdp-main-tab-dropdown-menu li[id*=tab].active').attr('id');
                if (ct_SelectedTabId) {
                    safeClickTaleExec("jQuery('" + ct_SelectedTabId + "  > a:first-of-type[href^=#]').click();");

                }
            }

            //Bind Carousal Clicks

            safeClickTaleExec("jQuery('#carouselButtons > a').eq(0).click();");



            // Top Menu (case #8400):
            jQuery("UL#mainNav LI").hover(function () {
                var arr = jQuery("UL#mainNav LI"); var length = arr.length;
                for (i = 0; i < length; i++) {
                    if (this == arr[i]) {
                        var code = "jQuery(jQuery('UL#mainNav LI')[" + i + "]).find('>DIV.drop, >DIV.itemDetails').css('display', 'block')";
                        safeClickTaleExec(code);
                    }
                }
            }, function () {
                var arr = jQuery("UL#mainNav LI"); var length = arr.length;
                for (i = 0; i < length; i++) {
                    if (this == arr[i]) {
                        var code = "jQuery(jQuery('UL#mainNav LI')[" + i + "]).find('>DIV.drop, >DIV.itemDetails').css('display', 'none')";
                        safeClickTaleExec(code);
                    }
                }
            });
            // REPORTS:





            var checkBoxIdx, filterEventWasFired = false;

            var CtEeventsFired = [];


            // simulate click of links on paging section
            var pagingLinkIdx;


            // simulate loading of page content in Heatmap display

            //////////////////////////////
            // End (case #8558)
            //////////////////////////////


            jQuery("#fancybox-close").click();
            jQuery("#fancybox-overlay").click();

            ////////////////////////////////////////////////////////// FB 8427 code part I //////////////////////////////////////////////////////////            
            ///// Product Pages /////
            // display changes in selected menu tabs
            triggerClickTaleExec("#tab-prodoverview", "click");
            triggerClickTaleExec("#tab-prodfeatures", "click");
            triggerClickTaleExec("#tab-prodreview", "click");
            triggerClickTaleExec("#tab-prodspecification", "click");



            triggerClickTaleExec("a.ALGCloseBtn", "click");
            triggerClickTaleExec("li.ALGZoom", "click");

            // toggle display of Configure & Buy section
            triggerClickTaleExec("#btn-prodoverview-configure", "click");

            // toggle display of model item tooltips 
            // case 8871
            var modelNumber;
            var timeInt = setInterval(function () {

                modelNumber = jQuery('[id^="modelItem"]');

                if (modelNumber[0] !== undefined) {
                    clearInterval(timeInt);
                    modelNumber.bind('mouseenter mouseleave', function () {
                        safeClickTaleExec('jQuery("#' + this.id + '").children("div.tooltip").toggle();');
                    });
                }
            }, 200);




            ////////////////////////////////////////////////////////// FB 8886 part II //////////////////////////////////////////////////////////            

            var t1 = setInterval(function () {
                var buttons1 = jQuery("#configuratorStandardModel,#configuratorCustomize");
                if (buttons1.length > 0) {
                    ct_displayConfig();
                    clearInterval(t1);
                    buttons1.click(function () {
                        ct_displayConfig();
                        safeClickTaleExec('jQuery("#' + this.id + '").click();');
                    });
                }
            }, 500);
            ////////////////////////////////////////////////////////// end of FB 8886 part II //////////////////////////////////////////////////////////            



            //    jQuery("#configuratorStandardModel,#configuratorCustomize").live("click", function () {


            //        ct_displayConfig();
            //        safeClickTaleExec('jQuery("#' + this.id + '").click();');
            //    });

            // toggle display of country dropdown
            // jQuery(".lineForm3").live("click", function () {
            // safeClickTaleExec('jQuery("div.cusel-scroll-wrap").css("display","' + jQuery("div.cusel-scroll-wrap").css("display") + '");');
            // });

            // ClickTale Events
            triggerClickTaleEvent("#tab-prodfeatures", "click", "Product Page: Features");
            triggerClickTaleEvent("#tab-prodreview", "click", "Product Page: Read Reviews");
            triggerClickTaleEvent("#tab-prodspecification", "click", "Product Page: Specs");
            var t2 = setTimeout(function () { triggerClickTaleEvent("#comparePrices", "click", "Product Page: Compare Prices") }, 1000); //FB 8898


            //    if (typeof labels != "undefined" && typeof labels.buy_from_seagate_online != "undefined") {
            //       triggerClickTaleEvent("span:contains('" + labels.buy_from_seagate_online + "')", "Product Page: Add To Cart");
            //   }
            //jQuery("#configuratorAddtoCart").one("click", function () { safeClickTaleEvent("Product Page: Add To Cart"); });
            //var t3 = setTimeout(function () { triggerClickTaleEvent("#configuratorAddtoCart", "click", "Product Page: Add To Cart") }, 1000);

            triggerClickTaleEvent("#btn-prodoverview-configure", "click", "Product Page: Configure & Buy");
            //setTimeout(function () { triggerClickTaleEvent("#configuratorFind", "click", "Product Page: Find") }, 1000); // FB 8903
            var t5 = setInterval(function () { // FB 8903
                var ct_findButton = jQuery("#configuratorFind")
                if (ct_findButton.length > 0) {
                    clearInterval(t5);
                    triggerClickTaleEvent("#configuratorFind", "click", "Product Page: Find");
                };
            }, 200);


            // jQuery("span:contains('Add to Cart')").live("mousedown", function () {
            // safeClickTaleEvent("Product Page: Add To Cart");
            // });


            ////////////////////////////////////////////////////////// FB 8886 part I //////////////////////////////////////////////////////////            
            var t4 = setInterval(function () {
                if (jQuery("a.configurator_param").length > 0) {
                    clearInterval(t4);
                    jQuery("a.configurator_param").click(function () {
                        var ct_val = jQuery(this).attr("val");
                        if (ct_val && ct_val != "") {
                            if (jQuery("#configuratorSelected a.btn-delete").length > 0) {
                                ct_displayConfig();
                            }
                            safeClickTaleExec('jQuery("a.configurator_param[val=' + ct_val + ']").click();');
                        }
                    });
                }
            }, 200);
            ////////////////////////////////////////////////////////// end of FB 8886 part I //////////////////////////////////////////////////////////            


            ////////////////////////////////////////////////////////// end of FB 8427 code part I //////////////////////////////////////////////////////////            








            var Atags = jQuery('div.page-nav a, #btn-domore-search');

            // Atags.live('click', function (e) {
            // if (this.id === 'btn-domore-search') {
            // var form = document.getElementById('domore_form');
            // if (typeof window.ClickTaleRegisterFormSubmit === 'function') {
            // ClickTaleRegisterFormSubmit(form);
            // safeClickTaleEvent("form_submit_success");
            // }
            // }


            // var code = "jQuery('#" + this.id + "').click();";
            // safeClickTaleExec(code);
            // });	

            var Atabs = jQuery('ul.tabFilter a');
            Atabs.bind('click', function () {
                var code = "jQuery('#" + this.id + "').click();";
                safeClickTaleExec(code);
            });

            var buzzTabs = jQuery('ul.buzzTabs.tabList a');
            buzzTabs.bind('click', function (e) {
                // case 9663
                if (typeof ClickTaleRegisterElementAction === 'function') {
                    ClickTaleRegisterElementAction('click', e);
                }
                //----------

                var code = "jQuery('#" + this.id + "').click();";
                safeClickTaleExec(code);
            });

            /* START 9565 */
            $('#infoCorner, #supportCorner, #btn-prodoverview-configure, #configuratorAddtoCart, #configuratorFind').click(function (e) {
                if (typeof ClickTaleRegisterElementAction === 'function') {
                    ClickTaleRegisterElementAction('click', e);
                }
            });
            /* END   9565 */

            // internal >>> laptop (interactive table slider)
            jQuery('.slideArea').parent().mouseup('li', function (e) {
                var li = jQuery(e.target).parent().find('li');
                var index = li.index(e.target);
                var code = 'jQuery(".slideArea ul li").eq(' + index + ').trigger("click");';
                safeClickTaleExec(code);
            });

            prodctEvnts();

            /// SEAG-54 - code for Shopping cart ///
            //&& typeof window['ClickTaleIsRecording'] === 'function' && window['ClickTaleIsRecording']()
            if (window.location.href.indexOf("shop.seagate.com/store") > -1) {
                

                var productNum = jQuery('DIV.product-row').length;

                setTimeout(function () {

                }, 350);
                jQuery('DIV#progress-status DIV.progress-node').each(function () {
                    var validErrorLength = 0;
                    var index = jQuery('DIV#progress-status DIV.progress-node').index(this);
                    if (index == 0 && jQuery('DIV#progress-status DIV.progress-node').eq(index).hasClass('progress-current')) {
                        // Page 1
                        safeClickTaleEvent('My Items');

                        // Page event: num of items in cart
                        if (productNum === 0) {
                            safeClickTaleEvent('My Items: Empty Cart');
                        } else if (productNum === 1) {
                            safeClickTaleEvent('My Items: 1 item in shopping cart');
                        } else if (productNum === 2) {
                            safeClickTaleEvent('My Items: 2 items in shopping cart');
                        } else if (productNum === 3) {
                            safeClickTaleEvent('My Items: 3 items in shopping cart');
                        } else if (productNum === 4) {
                            safeClickTaleEvent('My Items: 4 items in shopping cart');
                        } else if (productNum === 5) {
                            safeClickTaleEvent('My Items: 5 items in shopping cart');
                        }

                        // Action event: click on checkout button
                        jQuery('DIV#dr_siteButtons DIV#dr_checkoutButton A.dr_button').mousedown(function () {
                            safeClickTaleEvent('My Items: Clicked on Checkout');
                        });
                        // Action event: click on remove item from cart
                        jQuery('DIV.product-row DIV.cart-item-right DIV.prod-remove A.dr_deleteItemLink').click(function () {
                            safeClickTaleEvent('My Items: Clicked on Remove');
                        });
                        // Action event: click on apply promo code
                        jQuery('DIV.promo-code-cell INPUT.dr_button').bind('mousedown',function () {
                            safeClickTaleEvent('My Items: Clicked on Apply Promo Code');
                        });
                        //////////code for fixing wrong precent on link analytics///////
                        jQuery('DIV.promo-code-cell INPUT.dr_button').bind('mousedown', function (e) {
					    	safeClickTaleRegisterElementAction(e);
					        
						});
                    } else if (index == 1 && jQuery('DIV#progress-status DIV.progress-node').eq(index).hasClass('progress-current')) {
                        // Pages 2, 3, 4 of the spec - need to identify each one

                        // Page 2 - has buttons Create Account
                        if (jQuery('INPUT#btnCreateAccount').length > 0) {
                            // Page event - with validation errors
                            safeClickTaleEvent('Billing (Step1)');
                            validErrorLength = jQuery('.dr_error').text().trim().length;
                            if (validErrorLength > 0) {
                                safeClickTaleEvent('Billing (Step1): Validation errors on page');
                            }

                            // Action event - buttons create account
                            jQuery('INPUT#btnCreateAccount').click(function () {
                                if (jQuery(this).attr('name') === 'checkout_as_guest') {
                                    safeClickTaleEvent('Billing (Step1): Clicked on Checkout As Guest');
                                } else {
                                    safeClickTaleEvent('Billing (Step1): Clicked on Create an Account');
                                }
                            });
                            // Action event - login
                            jQuery('INPUT#dr_cc_login').click(function () {
                                safeClickTaleEvent('Billing (Step1): Clicked on Login');
                            });
                        }

                        // Page 3, 4 - same form, but page 4 has 2 extra input fields for password
                        if (jQuery('DIV.billing-container').length > 0) {
                            if (jQuery("DIV.dr_formLine INPUT[type='password']").length > 0) {
                                // Page 4
                                // Page event - with validation errors
                                safeClickTaleEvent('Billing (Create Account)');
                                validErrorLength = jQuery('.dr_error').text().trim().length;
                                if (validErrorLength > 0) {
                                    safeClickTaleEvent('Billing (Create Account): Validation errors on page');
                                }
                            } else {
                                // Page 3
                                // Page event - with validation errors
                                safeClickTaleEvent('Billing(Guest)');
                                validErrorLength = jQuery('.dr_error').text().trim().length;
                                if (validErrorLength > 0) {
                                    safeClickTaleEvent('Billing(Guest): Validation errors on page');
                                }
                            }
                            // Action event for pages 3, 4 - button Continue
                            jQuery('INPUT#checkoutButton').click(function () {
                                if (jQuery("DIV.dr_formLine INPUT[type='password']").length > 0) {
                                    // Page 4
                                    safeClickTaleEvent('Billing (Create Account): Clicked on Continue');
                                } else {
                                    // Page 3
                                    safeClickTaleEvent('Billing(Guest): Clicked on Continue');
                                }

                                // Interval to wait for email input fields client-side validation tooltip
                                // not sure I can do this - this does not seem to be on the DOM as part of the site, but rather a plugin of some sort...
                            });
                            // Shipping address checkbox on pages 3, 4: opens another section of the form
                            jQuery('INPUT#shippingDifferentThanBilling').click(function () {
                                var code = "";
                                if (jQuery('INPUT#shippingDifferentThanBilling').attr('checked')) {
                                    code = "jQuery('INPUT#shippingDifferentThanBilling').attr('checked','checked');";
                                    code += "jQuery('DIV.shipping-container').show();";
                                } else {
                                    code = "jQuery('INPUT#shippingDifferentThanBilling').attr('checked','');";
                                    code += "jQuery('DIV.shipping-container').hide();";
                                }
                                safeClickTaleExec(code);
                            });
                        }
                    } else if ((index == 2 && jQuery('DIV#progress-status DIV.progress-node').eq(index).hasClass('progress-current'))) {
                        // Page 6 - page event
                        safeClickTaleEvent('Billing (Verify Order)');
                        validErrorLength = jQuery('.dr_error').text().trim().length;
                        if (validErrorLength > 0) {
                            safeClickTaleEvent('Billing (Verify Order): Validation errors on page');
                        }

                        // Action event - click on submit button
                        jQuery('DIV.verify-prod-details INPUT#submitBottom').click(function () {
                            safeClickTaleEvent('Billing (Verify Order): Clicked on Submit Order');

                            // Interval to wait for client-side validation on checkbox
                            var errCheckIntCounter = 0;
                            var errCheckInt = setInterval(function () {
                                if (jQuery('DIV#dr_TermsOfSaleAcceptance LABEL.dr_label').siblings('P.dr_error').length > 0) {
                                    // Error displayed
                                    clearInterval(errCheckInt);

                                    // Show error HTML
                                    var html = /** @type {!string} **/jQuery('DIV#dr_TermsOfSaleAcceptance LABEL.dr_label').siblings('P.dr_error')[0].outerHTML;
                                    var code = "if (jQuery('DIV#dr_TermsOfSaleAcceptance LABEL.dr_label').siblings('P.dr_error').length == 0) {jQuery('DIV#dr_TermsOfSaleAcceptance LABEL.dr_label').after(unescape('" + escape(html) + "'));}";
                                    safeClickTaleExec(code);
                                } else {
                                    if (errCheckIntCounter > 20) {
                                        clearInterval(errCheckInt);
                                    }
                                }
                                errCheckIntCounter++;
                            }, 250);
                        });
                    }
                });

                // Page 5 - Verify your address
                if (jQuery('DIV#dr_suggestionForm H1').text().indexOf('Verify Your Address') > -1) {
                    // Page event
                    safeClickTaleEvent('Billing (Verify Your Address)');

                    // Action event
                    jQuery('INPUT#selectionButton').click(function () {
                        safeClickTaleEvent('Billing (Verify Your Address): Clicked on Use This Address');
                    });

                    // Click on radios chooses them
                    // Suggest radio
                    jQuery('INPUT#billingAddressOptionRow1').click(function () {
                        var code = "";
                        code += "if (jQuery('INPUT#billingAddressOptionRow1').length > 0) jQuery('INPUT#billingAddressOptionRow1')[0].checked = true;";
                        code += "jQuery('INPUT#billingAddressOptionRow2')[0].checked = false;";
                        code += "jQuery('SPAN#billingAddressSuggestEdit').hide();";
                        code += "jQuery('SPAN#billingAddressEnteredEdit').hide();";
                        safeClickTaleExec(code);
                    });
                    // Entered radio
                    jQuery('INPUT#billingAddressOptionRow2').click(function () {
                        var code = "";
                        code += "jQuery('INPUT#billingAddressOptionRow2')[0].checked = true;";
                        code += "if (jQuery('INPUT#billingAddressOptionRow1').length > 0) jQuery('INPUT#billingAddressOptionRow1')[0].checked = false;";
                        code += "jQuery('SPAN#billingAddressSuggestEdit').hide();";
                        code += "jQuery('SPAN#billingAddressEnteredEdit').hide();";
                        safeClickTaleExec(code);
                    });

                    // Click on "Edit" opens another section
                    // Suggest edit
                    jQuery('INPUT#editBillingButton').click(function () {
                        var code = "";
                        if (jQuery('SPAN#billingAddressSuggestEdit').is(':visible')) {
                            code += "jQuery('SPAN#billingAddressSuggestEdit').show();";
                        } else {
                            code += "jQuery('SPAN#billingAddressSuggestEdit').hide();";
                        }
                        if (jQuery('SPAN#billingAddressEnteredEdit').is(':visible')) {
                            code += "jQuery('SPAN#billingAddressEnteredEdit').show();";
                        } else {
                            code += "jQuery('SPAN#billingAddressEnteredEdit').hide();";
                        }
                        code += "if (jQuery('INPUT#billingAddressOptionRow1').length > 0) jQuery('INPUT#billingAddressOptionRow1')[0].checked = true;";
                        code += "jQuery('INPUT#billingAddressOptionRow2')[0].checked = false;";
                        safeClickTaleExec(code);
                    });
                    // Entered edit
                    jQuery('INPUT#editBillingButton2').click(function () {
                        var code = "";
                        if (jQuery('SPAN#billingAddressSuggestEdit').is(':visible')) {
                            code += "jQuery('SPAN#billingAddressSuggestEdit').show();";
                        } else {
                            code += "jQuery('SPAN#billingAddressSuggestEdit').hide();";
                        }
                        if (jQuery('SPAN#billingAddressEnteredEdit').is(':visible')) {
                            code += "jQuery('SPAN#billingAddressEnteredEdit').show();";
                        } else {
                            code += "jQuery('SPAN#billingAddressEnteredEdit').hide();";
                        }
                        code += "jQuery('INPUT#billingAddressOptionRow2')[0].checked = true;";
                        code += "if (jQuery('INPUT#billingAddressOptionRow1').length > 0) jQuery('INPUT#billingAddressOptionRow1')[0].checked = false;";
                        safeClickTaleExec(code);
                    });
                }

            }
        } //end if (typeof ClickTaleIsRecording === 'function' && ClickTaleIsRecording()) {
        else {
            jq_Counter++;
            if (jq_Counter < 40) {
                setTimeout(ctCheckJq, 250);
            }
            else {
                return;
            }
        }
    }

    /// End of SEAG-54 ///
    jQuery(document).ready(function () {
        ctCheckJq();
    }); // end of document ready
}

