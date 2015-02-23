if(typeof TNW_ROOT_URL == 'undefined') { var TNW_ROOT_URL = SITE_URL;} else {}
var TNW_SECURE_ROOT_URL = TNW_ROOT_URL.replace(/http:\/\//, '//');

var TNWPlus = function (w, d, g) { // window, document, config
	 var tnw = w[g.k] = { // TNW
	 	window: w, // window
		document: d, // document
		global: g, // settings
		
		cookie: function() {
			return {
				parse: function(s) {
					if (s.indexOf('"') === 0) {
						// This is a quoted cookie as according to RFC2068, unescape
						s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
					}
					try {
						return tnw.global.cookie.json ? JSON.parse(s) : s;
					} catch(er) {}
				},
				get: function(key) {
					var options = tnw.global.cookie;
					var cookies = document.cookie.split('; ');
					var result = key ? undefined : {};
					for (var i = 0, l = cookies.length; i < l; i++) {
						var parts = cookies[i].split('=');
						var name = decodeURIComponent(parts.shift().replace(/\+/g, ' '));
						var cookie = decodeURIComponent(parts.join('=').replace(/\+/g, ' '));
						if (key && key === name) {
							result = tnw.cookie.parse(cookie);
							break;
						}
						if (!key) {
							result[name] = tnw.cookie.parse(cookie);
						}
					}
					return result;
				},
				set: function(key, value) {
					var options = tnw.global.cookie;
					if (value===null) {
						options.expires = -1;
					}
					if (typeof options.expires === 'number') {
						var days = options.expires, t = options.expires = new Date();
						t.setDate(t.getDate() + days);
					}
					value = tnw.global.cookie.json ? JSON.stringify(value) : String(value);
					return (document.cookie = [
					tnw.global.cookie.raw ? key : encodeURIComponent(key),
						'=',
						tnw.global.cookie.raw ? value : encodeURIComponent(value),
						options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
						options.path	? '; path=' + options.path : '',
						options.domain  ? '; domain=' + options.domain : '',
						options.secure  ? '; secure' : ''
					].join(''));
				},
			}		
		}(),
		
		hoverload: {
		
			init: function() {
				var that = this;
				var delay;
				$(".c-TNWgh-followBar").on("mouseenter", "li[data-hoverload=true]", function() {
					var selector = this;
					var $selector = $(selector);
					var service = $selector.data('for');
					delay = setTimeout(function(){
						var data = that.items[service];
						
						$selector.attr('data-hoverload',false);
						
						if(data.before && typeof data.before === 'function') {
							data.before(selector);
						}
						ga('send', 'event', 'General', 'Social Buttons', service);
						$.ajax({
							url: data.script,
							dataType: "script",
							cache: true
						}).done(function(script) {
							if(data.callback && typeof data.callback === 'function') {
								data.callback(script,selector);
							}
						});
					},50);
				});
				$(".c-TNWgh-followBar").on("mouseleave", "li[data-hoverload=true]", function(){
					clearTimeout(delay);
				});
			},
		
			items: {
				'facebook': {
					script: 'https://connect.facebook.net/en_US/sdk.js',
					before: function(){
						$('body').append('<div id="fb-root"></div>');
					},
					callback: function(data,target){
						$(target).html('<div class="fb-like" data-href="http://facebook.com/thenextweb/" data-width="49" data-layout="button" data-action="like" data-show-faces="true" data-share="false"></div>');
						window.fbAsyncInit = function() {
							FB.init({
								appId      : '378011798897423',
								version    : 'v2.0',
								xfbml      : true
							});
						};
					}
				},
				'twitter': {
					script: 'https://platform.twitter.com/widgets.js',
					callback: function(data,target) {
						$(target).html('<a class="twitter-follow-button" data-show-count="false" data-show-screen-name="false" href="https://twitter.com/thenextweb"></a>');
						twttr.widgets.load();
					}
				},
				'pinterest': {
					script: '//assets.pinterest.com/js/pinit.js',
					before: function(target) {
						$(target).html('<a data-pin-do="buttonFollow" href="http://www.pinterest.com/thenextweb/">Pinterest</a>');
					}
				},
				'google-plus': {
					script: 'https://apis.google.com/js/plusone.js',
					callback: function() {
						gapi.follow.render("google-plus", { "height": "20", "annotation": "none", "rel": "publisher", "href": "https://plus.google.com/115081025762845243709" });
					}
				},
				'youtube': {
					script: 'https://apis.google.com/js/plusone.js',
					callback: function() {
						gapi.ytsubscribe.render(
							document.getElementById('youtube'),
							{
								channel: 'thenextweb'
							}
						)
					}
				}
			}
				
		},
		
		bus: function() {
			return { 
				trigger: function(button) {
					if(button = tnw.document.getElementById(button)) {
						tnw.buttons.action["follow"](button);
					}
				}
			}
		}(),
		
		user: function() {
			return {
				insert: function( content ) {
					var account = document.getElementById("user-account");
					if(account) {
						account.innerHTML = content;
					}
				},
				
				header: function() {
					var account = document.getElementById("user-account");
					if(account){
						tnw.user.insert('<i class="ss-pika ss-user"></i>');
						if(tnw.auth.isPro()) {
							account.className = account.className +' pro-account';
						} else if(tnw.auth.isFree()) {
							account.className = account.className +' free-account';
						}	
					}
				}
			}
		}(),
		
		auth: function() {
			return {
				isPro: function() {
					return tnw.settings.user != false && tnw.settings.user.pro == 'pro_personal';
				},
				
				isFree: function() {
					return tnw.settings.user != false && !tnw.settings.user.pro;
				}
			}
		}(),
		
		notifications: function() {
			
			var read = [];
			
			var timeFormat = function(time){
				time = time*1000;
				
				var date = new Date(time);
				var seconds = (Date.now() - time);
				if(seconds < 60*1000) {
					return 'just now';
				}
				else if(seconds < 3600*1000) {
					return Math.floor(seconds/(60*1000))+'m ago';
				}
				else if(seconds < 86400*1000) {
					return Math.floor(seconds/(3600*1000))+'h ago';
				}
				else {
					var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
					return date.getDate()+' '+monthNames[date.getMonth()]+' '+date.getFullYear();
				}
			};
			
			var notification = function(notificationData, etc){
				
				var $notification;
				var $imageWrap = $('<div></div>').attr({class:'img'});
				var subheader = $('<h5></h5>');

				if(notificationData.url) {
					$notification = $('<a class="notification" target="_blank"></a>').attr({href:notificationData.url});
				} else {
					$notification = $('<div class="notification"></div>');
				}
				$notification.html('<div class="close ss-pika ss-delete"></div><div class="text"></div>');
				
				if(notificationData.sticky !== 1 && notificationData.clicked && notificationData.clicked < Date.now()/1000) {
					$notification.addClass('is-read');
				}
				if(notificationData.seen && notificationData.seen < Date.now()/1000) {
					$notification.addClass('is-seen');
				}
				if(notificationData.sticky === 1) {
					$notification.addClass('is-sticky');
				}
				
				if(notificationData.icon) {
					$imageWrap.addClass('ss-pika ss-'+notificationData.icon).css({'color':notificationData.color});
				}
				if(notificationData.image) {
					$notification.addClass('is-tall');
					$imageWrap.addClass('is-photo').css({'background-image':'url('+notificationData.image+')'});
				}
				if(notificationData.icon && notificationData.largeIcon === 1) {
					$notification.addClass('is-tall');
					$imageWrap.addClass('is-photo').css({'background-color':notificationData.color,'color':'inherit'});
				}
				$notification.prepend($imageWrap);
				
				if(notificationData.time) {
					subheader.html(timeFormat(notificationData.time))
				}
				if(notificationData.subtitle && notificationData.time){
					subheader.html(subheader.html()+' · ');
				}
				if(notificationData.subtitle){
					subheader.html(subheader.html()+notificationData.subtitle)
				}
				if(notificationData.subtitle || notificationData.time){
					$notification.find('.text').prepend(subheader);
				}
							
				if(notificationData.content){
					$notification.find('.text').prepend($('<h4 class="content"></h4>').html(notificationData.content));
				}
				if(notificationData.title){
					var $title = $('<h3></h3>').html(notificationData.title);
					if(notificationData.sticky) {
						$title.addClass('ss-pika ss-star');
					}
					$notification.find('.text').prepend($title);
				}					
				
				$notification.on('click',function(){
					$(this).data('click')();
				});			
				$notification.on('click','.close',function(ev){
					ev.stopPropagation();
					ev.preventDefault();
					$(this).parent().data('close')();
				});			

				$notification.data('click',function(){
					$.ajax({
						type: "POST",
						url: "/index/notifications/markAsClicked",
						processData: false,
						contentType: 'application/json',
						data: JSON.stringify([notificationData.id])
					});
					$notification.addClass('is-read');
					$(window).trigger('tnwSharedNotificationOut');
				});

				$notification.data('close',function(){
					$.ajax({
						type: "POST",
						url: "/index/notifications/markAsDeleted",
						processData: false,
						contentType: 'application/json',
						data: JSON.stringify([notificationData.id])
					});
					$notification.addClass('is-out');
					$(window).trigger('tnwSharedNotificationOut');
				})

				
				return $notification;
				
			};
			
			return {
				init: function(){

					if($('.c-TNWgh-notificationsMenu').length < 1){
						return;
					}
					
					$(window).on('tnwSharedNotificationIn tnwSharedNotificationOut',function(){
						var count = $('.c-TNWgh-notificationsMenu').find('.notification:not(.is-seen):not(.is-out)').length;
						var totalCount = $('.c-TNWgh-notificationsMenu').find('.notification:not(.is-out)').length
						var countStr = count;
						if(countStr > 99) {
							countStr = ':O';
						}
						$('.c-TNWgh-notificationsMenu').attr('data-count',count);
						$('.c-TNWgh-headerButton.is-notifications').attr('data-count',countStr);
						if(count > 0) {
							$('.c-TNWgh-headerButton.is-notifications').addClass('is-unread');
						}
						else {
							$('.c-TNWgh-headerButton.is-notifications').removeClass('is-unread');							
						}
						
						if(totalCount > 0) {
							 $('.c-TNWgh-notificationsMenu').removeClass('is-empty');
						}
						else {
							 $('.c-TNWgh-notificationsMenu').addClass('is-empty');							
						}
					})
					
					var rq = $.ajax({
						dataType: "json",
						url: '/index/notifications'
					});
					rq.done(function(notifications){
						for(var i in notifications) {
							$('.c-TNWgh-notificationsMenu').find('.notificationsWrapper').append((new notification(notifications[i])));
							$(window).trigger('tnwSharedNotificationIn');
						}
					});
					
					$('body').one('open', '.b-TNWgh-toggler.is-notifications', function(){
						$.ajax({
							type: "POST",
							url: "/index/notifications/markAsSeen",
							processData: false,
							contentType: 'application/json'
						});
					});
					
				}
			}
			
		}(),
		
		topbar: function() {
									
			return {
			
				init: function() {
					
					$('.TNW_global_header').on('click', '.c-TNWgh-headerButton.is-hamburger', function(){
						$(window).trigger('tnwSharedMenuClick');
					});
					$('.TNW_global_header').on('click', '.toggle-search', '.search', tnw.topbar.onClickToggle);
					$('.TNW_global_header').on('click', '.toggle-info', '.more', tnw.topbar.onClickToggle);
					$('.TNW_global_header').on('click', '.toggle-follow', '.follow', tnw.topbar.onClickToggle);
					
					$('.TNW_global_header').on('mouseover', '.b-TNWgh-toggler', tnw.topbar.getAuthPopup);
					$('body').on('click', '.b-TNWgh-toggler > a', '.b-TNWgh-toggler', tnw.topbar.onClickToggle);
					
					this.setSwitcherText();					
				},
				
				getAuthPopup: function() {
					$('#top').off('mouseover', '.toggle-account', tnw.topbar.getAuthPopup);
					var $this = $(this);
					if($this.find('.b-TNWgh-menu-surface').is(':empty')) {
						var target = $this.data('submenuTarget');
						var endpoint = target;
						if(target == 'account') {
							endpoint = tnw.global.endpoint.login;
						}
						if(endpoint) {
					  		$.get(endpoint, function(data) { 
								$this.find('.b-TNWgh-menu-surface').html(data);
							});	
						}
					}	
				},
				
				setSwitcherText: function() {
					if($('.TNW_global_header .mobile-switcher').length > 0) {
						var channel = $('body').data('for');
						var text = $('.TNW_global_header .platforms li[data-for="'+channel+'"] a').text();
						if(text) {
							$('.TNW_global_header .mobile-switcher span').text(text);
						}
					}
				},
				
				onClickToggleSwitcher: function(e) {
					$('#top').toggleClass('has_switcher');
				},
				
				onClickToggleInfo: function(e) {
					e.preventDefault();
					var $parent = $(this).parent();
					
					// Close follow menu
					$('.follow').removeClass('active');
					
					// Close all active except self
					$('#top .toggle, .b-TNWgh-menu-surface').each(function() {			   
						if ($(this).parent().get(0) !== $parent.get(0)) {
							$(this).parent().removeClass('active');
						}
					});
			
					if (!$parent.hasClass('active')) {
						$parent.addClass('active');
						e.stopPropagation();
						
						if ($parent.hasClass('search')) {
							$('#s').focus();
						}
						
						// Close on click outside
						$(document).one('click', function(e) {
							if ($(e.target).find($parent).length) {
								$parent.removeClass('active');
							}
						});
					} else {
						$parent.removeClass('active');
					}				
				},
				
				onClickToggle: function(e) {
					e.preventDefault();
					$('#top').removeClass('has_switcher');
					var $parent = $(this).closest(e.data);
					if($parent.length < 1) {
						$parent = $(this);
					}
					if (!$parent.hasClass('active')) {
						$(this).trigger('open');
						$('body').find('.b-TNWgh-toggler.active:not(.search)').removeClass('active');
						$parent.addClass('active');
						e.stopPropagation();
						
						if ($parent.hasClass('search')) {
							$('#s').focus();
						} 
						// Close on click outside
						$(document).one('click', function(e) {
							if ($parent.has(e.target).length < 1) {
								$parent.removeClass('active preactive');
							}
						});
					} else {
						$(this).trigger('close');
						$parent.removeClass('active preactive');
					}						
				}
			}
		
		}(),
		
		buttons: function() {
			return {
				init: function() {
					//this.build();
					//this.presentation();
					//this.behavior();
				},
				
				build: function() {
					if (typeof b !== "object" || b === null || !b.parentNode) b = tnw.document;
					var links = b.getElementsByTagName("A"),
						action, c, e, f, h = [];
					c = 0;
					for (var i = links.length; c < i; c += 1) h.push(links[c]);
					c = 0;
					for (var i = h.length; c < i; c += 1)
						if (h[c].href && h[c].href.match(tnw.global.myDomain)) {
							if (h[c].href.match(/(company|industry|profile|location)\/.*?\/(?:un)?follow/)) {
								action = "buttonFollow";
								if (typeof this.render[action] === "function") {
									h[c].id = tnw.global.k + "_" + tnw.app.callback.length;
									this.render[action](h[c])
								}
							}
						}
				},
				
				presentation: function() {
					var b, d, c;
					if(tnw.document.getElementById("tnw-market-style")) return;
					b = tnw.app.make({
						STYLE: {
							id: "tnw-market-style",
							type: "text/css"
						}
					});
					d = tnw.global.cdn;
					c = tnw.global.rules.join("\n");
					c = c.replace(/\._/g, "." + g.k + "_");
					c = c.replace(/;/g, "!important;");
					c = c.replace(/_cdn/g, d);
					if (b.styleSheet) b.styleSheet.cssText = c;
					else b.appendChild(tnw.document.createTextNode(c));
					tnw.document.head ? tnw.document.head.appendChild(b) : tnw.document.body.appendChild(b)
				},
				
				behavior: function () {
					var i, e;
					for (i = 0; i < tnw.settings.buttons.length; i += 1) {
						e = tnw.document.getElementById(tnw.settings.buttons[i]);
						if(e) tnw.app.listen(e, "click", this.onclick);
					}
				},
				
				action: {
					follow: function(button) {
						if (button.href && button.href.match(/^http/i)) {
							if( tnw.settings.user ) {
								$.post(button.href, { "_nonce": tnw.settings.guid, "object": tnw.app.getData(button, "object"), "search": "slug" }, function(data) {}, "json");
								tnw.buttons.swap(button);								
								return false;
							} else {
								tnw.window.open(tnw.global.endpoint.login+"?next=refresh_parent&button="+button.id, "Login on TNW", tnw.global.pop);
							}
						} else {
							tnw.app.log("&type=config_error&error_msg=invalid_url&href=" + encodeURIComponent(tnw.document.URL));
						}					
					}
				},
				
				onclick: function () {
					tnw.window.event.preventDefault();
					var button = tnw.window.event;
					if(button = tnw.app.getEl(button)) {
						tnw.buttons.action["follow"](button);
					}
					return false;
				},
				
				render: {
					buttonFollow: function (b) {
						tnw.app.debug("build follow button");
						var button = "_follow_me_button",
							c = tnw.app.getData(b, "render"),
							object = tnw.app.getData(b, "object").split("|")[1];
						
						if (c) button = button + "_" + c;
						button = tnw.app.make({
							A: {
								target: "_blank",
								href: b.href,
								id: tnw.global.k + "_" + object,
								innerHTML: "Follow",
								className: tnw.global.k + button + " ss-pika ss-emptyheart"
							}
						});
						tnw.app.set(button, tnw.global.dataAttributePrefix + "object", tnw.app.getData(b, "object"));
						tnw.app.replace(b, button);
						
						tnw.settings.buttons.push(tnw.global.k + "_" + object);
					}					
				},
				
				swap: function(button) {
					if( button.href.match(/\unfollow/) ) {
						tnw.buttons.setStatus(button, "follow");
					} else {
						tnw.buttons.setStatus(button, "unfollow");
					}
				},
				
				setStatus: function(button, action) {
					if(action == "unfollow") {
						button.className = tnw.global.k + "_follow_me_button " + tnw.global.k +"_following_button ss-pika ss-heart";
						button.innerHTML = "Following";
						button.href = button.href.replace(/\/follow/, "/unfollow");
					} else if(action == "follow") {
						button.className = tnw.global.k + "_follow_me_button ss-pika ss-emptyheart";
						button.innerHTML = "Follow";
						button.href = button.href.replace(/\/unfollow/, "/follow");
					}
				},
				
				ping: {
					connections: function(response) {
						var i, b, e, c = tnw.settings.buttons.length;
						tnw.settings.user.connections = response;
						if(c > 0) {
							for(var object in tnw.settings.user.connections) {
								for(i = 0; i < c; i += 1) {
									b = tnw.settings.buttons[i].replace(tnw.global.k + "_", "");
									if(tnw.settings.user.connections[object].indexOf(b) !== -1) {
										// Mark button as following
										e = tnw.document.getElementById(tnw.settings.buttons[i]);
										tnw.buttons.setStatus(e, "unfollow");
									}
								}								
							}
						}
					}
				}
			}
		}(),
		
		app: function () { // app
			return {
				callback: [],
				get: function (e, attr) {
					var c = null;
					return c = typeof e[attr] === "string" ? e[attr] : e.getAttribute(attr)
				},
				getData: function (e, name) {
					name = tnw.global.dataAttributePrefix + name;
					return tnw.app.get(e, name)
				},
				set: function (e, name, value) {
					if (typeof e[name] === "string") e[name] = value;
					else e.setAttribute(name, value)
				},
				make: function (b) {
					var d = false,
						c, e;
					for (c in b)
						if (b[c].hasOwnProperty) {
							d = tnw.document.createElement(c);
							for (e in b[c]) b[c][e].hasOwnProperty && typeof b[c][e] === "string" && tnw.app.set(d, e, b[c][e]);
							break
						}
					return d
				},
				kill: function (e) {
					if (typeof e === "string") e = tnw.document.getElementById(e);
					e && e.parentNode && e.parentNode.removeChild(e)
				},
				replace: function (e, e2) {
					e.parentNode.insertBefore(e2, e);
					tnw.app.kill(e)
				},
				getEl: function (e) {
					var d = null;
					return d = e.target ? e.target.nodeType === 3 ? e.target.parentNode : e.target : e.srcElement
				},
				listen: function (e, event, callback) {
					if (typeof tnw.window.addEventListener !== "undefined") e.addEventListener(event, callback, false);
					else typeof tnw.window.attachEvent !== "undefined" && e.attachEvent("on" + event, callback)
				},
				call: function (url, f) {
					var c, e, q;
					c = tnw.app.callback.length;
					e = tnw.global.k + ".app.callback[" + c + "]";
					tnw.app.callback[c] = function (g) {
						f(g, c);
						tnw.app.kill(e)
					};
					q = (url.match(/\?/)) ? "&" : "?";
					tnw.document.body.appendChild(tnw.app.make({
						SCRIPT: {
							id: e,
							type: "text/javascript",
							charset: "utf-8",
							src: url + q + "callback=" + e
						}
					}))
				},				
				debug: function (msg) {
					tnw.settings.config.debug && tnw.window.console && tnw.window.console.log && tnw.window.console.log(msg)
				},			
				log: function (b) {
					return false;
					/* //Logging doesn't work yet 
					var args = "?via=" + encodeURIComponent(tnw.settings.here) + "&guid=" + tnw.settings.guid;
					if (b) args += b;
					tnw.app.call(tnw.global.endpoint.log + args, tnw.app.ping.log)
					*/
				},
				user: function() {
					tnw.settings.user = tnw.cookie.get('tnw_user_attr') || false;
					if(tnw.settings.user && typeof tnw.settings.user.id !== "undefined") {
						$.get(tnw.global.endpoint.authCheck, function(data) {
							if(data.id && tnw.settings.user.id == data.id) {
								tnw.user.header();
							} else {
								tnw.settings.user = false;
								tnw.cookie.set('tnw_user_attr', null);
							}
						});
			
						var b = "?user_id=" + tnw.settings.user.id;
						//tnw.app.call(tnw.global.endpoint.connections + b, tnw.buttons.ping.connections);
					}
				},
				
				init: function() {
					
					tnw.settings = {
						here: tnw.document.URL.split("#")[0],
						config: {},
						guid: "",
						user: false,
						buttons: [],
					};
					for (var i = 0; i < 12; i += 1) {
						tnw.settings.guid += "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz".substr(Math.floor(Math.random() * 60), 1);
					}
					tnw.buttons.init();
					tnw.app.user();
					tnw.topbar.init();
					tnw.notifications.init();
					tnw.hoverload.init();
				}
			}	
		}()
	};
	tnw.app.init();
	
	return { 
		init: function() { tnw.app.init(); },
		settings: tnw.settings, 
		buttons: tnw.buttons,
		bus: tnw.bus
	};
	
}(window, document, {
	k: "TNW_" + (new Date).getTime(),
	myDomain: /thenextweb\.com/,
	endpoint: {
		//connections: TNW_SECURE_ROOT_URL+"plus/connections/get.json",
		login: TNW_SECURE_ROOT_URL+"auth/login/ajax",
		authCheck: TNW_SECURE_ROOT_URL+"auth/check"	
	},
	cookie: {
		json: true
	},
	pop: "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=640,height=490,left=0,top=0",
	popLarge: "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=800,height=500,left=0,top=0",
	dataAttributePrefix: "data-tnw-",
	cdn: "//cdn0.tnwcdn.com",
	rules: [
		'a._follow_me_button { font-size: 0.813em; border: 1px solid rgba(0,0,0,0.1); -webkit-box-shadow: 0px -1px 0px 0 rgba(0,0,0,0.2) inset; -moz-box-shadow: 0px -1px 0px 0 rgba(0,0,0,0.2) inset; -ms-box-shadow: 0px -1px 0px 0 rgba(0,0,0,0.2) inset; -o-box-shadow: 0px -1px 0px 0 rgba(0,0,0,0.2) inset; box-shadow: 0px -1px 0px 0 rgba(0,0,0,0.2) inset; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; padding: 3px 8px; background: -webkit-linear-gradient(top,#fff 0%,#f0f0f0 100%); background: -moz-linear-gradient(top,#fff 0%,#f0f0f0 100%); background: -ms-linear-gradient(top,#fff 0%,#f0f0f0 100%); background: -o-linear-gradient(top,#fff 0%,#f0f0f0 100%); background: linear-gradient(top,#fff 0%,#f0f0f0 100%); color: #303030; display: inline-block; font-weight: 300; margin-left: 10px; vertical-align: 6px; -webkit-font-smoothing: auto; }', 
		"a._follow_me_button:hover { background: -webkit-linear-gradient(top,#fff 0%,#f5f5f5 100%); background: -moz-linear-gradient(top,#fff 0%,#f5f5f5 100%); background: -ms-linear-gradient(top,#fff 0%,#f5f5f5 100%); background: -o-linear-gradient(top,#fff 0%,#f5f5f5 100%); background: linear-gradient(top,#fff 0%,#f5f5f5 100%); color: #303030; }", 
		"a._follow_me_button:active  { -webkit-box-shadow: 0px 1px 0px 0 rgba(0,0,0,0.2) inset; -moz-box-shadow: 0px 1px 0px 0 rgba(0,0,0,0.2) inset; -ms-box-shadow: 0px 1px 0px 0 rgba(0,0,0,0.2) inset; -o-box-shadow: 0px 1px 0px 0 rgba(0,0,0,0.2) inset; box-shadow: 0px 1px 0px 0 rgba(0,0,0,0.2) inset; }",
 
		"a._following_button { color: #FFF; background: -webkit-linear-gradient(top,#FD5C03 0%, #F24610 100%); background: -moz-linear-gradient(top,#FD5C03 0%,#F24610 100%); background: -ms-linear-gradient(top,#FD5C03 0%,#F24610 100%); background: -o-linear-gradient(top,#FD5C03 0%,#F24610 100%); background: linear-gradient(top,#FD5C03 0%,#F24610 100%); -webkit-font-smoothing: auto; }",
		"a._following_button:hover { color: #FFF; background: -webkit-linear-gradient(top,#FD5C03 0%, #F24610 100%); background: -moz-linear-gradient(top,#FD5C03 0%,#F24610 100%); background: -ms-linear-gradient(top,#FD5C03 0%,#F24610 100%); background: -o-linear-gradient(top,#FD5C03 0%,#F24610 100%); background: linear-gradient(top,#FD5C03 0%,#F24610 100%); }",
		"a._following_button:active { color: #FFF; background: -webkit-linear-gradient(top,#FD5C03 0%, #F24610 100%); background: -moz-linear-gradient(top,#FD5C03 0%,#F24610 100%); background: -ms-linear-gradient(top,#FD5C03 0%,#F24610 100%); background: -o-linear-gradient(top,#FD5C03 0%,#F24610 100%); background: linear-gradient(top,#FD5C03 0%,#F24610 100%); }",
		"._hidden { display:none; }"
	]
});

