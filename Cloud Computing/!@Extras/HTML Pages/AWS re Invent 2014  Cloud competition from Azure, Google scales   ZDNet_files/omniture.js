var Omniture = new function()
{

	this.newPageView = function(pagename)
	{
		s.pageName = pagename;
		s.t();
	};

	this.clearEvents = function()
	{
		s.linkTrackVars = 'None';
		s.linkTrackEvents = 'None';
	};

	this.trackSubmitComment = function(obj, channel, product, story_id, content_title, story_title, article_type)
	{
		s.linkTrackEvents = 'event2';
		s.linkTrackVars = 'events,channel,prop10,eVar10,prop20,eVar20,prop21,eVar21,prop22,eVar22,prop26,eVar26,prop30,eVar30,list1,list2,list3';
		s.events  = s.linkTrackEvents;
		s.channel = channel;
		s.prop20  = 'D=v20';
		s.eVar20  = content_title;
		s.prop21  = 'D=v21';
		s.eVar21  = story_title;
		s.prop22  = 'D=v22';
		s.eVar22  = article_type;
		s.prop30  = 'D=v30';;
		s.eVar30  = story_id;

		s.tl(true, 'o', 'trackSubmitComment');
		this.clearEvents();
	}

	this.trackSubmitUserReview = function(obj, channel, product, story_id, content_title, story_title, article_type)
	{
		s.linkTrackEvents = 'event3';
		s.linkTrackVars = 'events,channel,prop10,eVar10,prop20,eVar20,prop21,eVar21,prop22,eVar22,prop26,eVar26,prop30,eVar30,list1,list2,list3';
		s.events  = s.linkTrackEvents;
		s.channel = channel;
		s.product = product;
		s.prop20  = 'D=v20';
		s.eVar20  = content_title;
		s.prop21  = 'D=v21';
		s.eVar21  = story_title;
		s.prop22  = 'D=v22';
		s.eVar22  = article_type;
		s.prop30  = 'D=v30';;
		s.eVar30  = story_id;

		s.tl(true, 'o', 'trackSubmitUserReview');
		this.clearEvents();
	}

	// TODO is this required? blog posting will be done in CMS now
	this.trackSubmitBlogPost = function(obj, channel, product, story_id, content_title, story_title, article_type)
	{
		s.linkTrackEvents = 'event4';
		s.linkTrackVars = 'prop30,eVar30,prop20,prop21,prop22,eVar22';

		s.events  = s.linkTrackEvents;
		s.channel = channel;
		s.product = product;
		s.prop30  = story_id;
		s.eVar30  = story_id;
		s.prop20  = content_title;
		s.prop21  = story_title;
		s.prop22  = article_type;
		s.eVar22  = article_type;

		s.tl(obj, 'o', 'trackSubmitBlogPost');
		this.clearEvents();
	}

	this.trackNewRegistration = function(obj, channel, registered_status, demographic_ids, registration_driver, reg_form_type)
	{
		s.linkTrackEvents = 'event5';
		s.linkTrackVars = 'eVar15,eVar16,eVar18,eVar19';

		s.events  = s.linkTrackEvents;
		s.channel = channel
		s.eVar15  = registered_status;
		s.eVar16  = demographic_ids;
		s.eVar18  = registration_driver;
		s.eVar19  = reg_form_type;

		s.tl(obj, 'o', 'trackNewRegistration');
		this.clearEvents();
	}

	this.trackNewsLetterSubscribe = function(obj, newsletterId, location)
    {
            s.linkTrackEvents = 'event9';
            s.linkTrackVars = 'channel,eVar2,eVar3,eVar5,eVar10,eVar69,eVar17,eVar46';
            s.events = s.linkTrackEvents;
            s.eVar17 = newsletterId;
            s.eVar46 = location;

            s.tl(obj, 'o', '.trackNewsLetterSubscribe');
            this.clearEvents();
    }

	this.trackNewsLetterUnSubscribe = function(obj, newsletterId, location)
    {
            s.linkTrackEvents = 'event9';
            s.linkTrackVars = 'channel,eVar2,eVar3,eVar5,eVar10,eVar69,eVar17,eVar46';
            s.events = s.linkTrackEvents;
            s.eVar17 = newsletterId;
            s.eVar46 = location;

            s.tl(obj, 'o', 'trackNewsLetterUnSubscribe');
            this.clearEvents();
    }

	this.trackOptInEvent = function(obj)
	{
		s.linkTrackEvents = 'event7';
		s.events = s.linkTrackEvents;


		s.tl(obj, 'o', 'trackOptInEvent');
		this.clearEvents();
	}

	this.trackOpenRegistrationForm = function(obj, channel, reg_form_type, registration_driver)
	{
		s.linkTrackEvents = 'event8';
		s.linkTrackVars = 'eVar19,eVar18';

		s.events  = s.linkTrackEvents;
		s.channel = channel;
		s.eVar19  = reg_form_type;
		s.eVar18  = registration_driver

		s.tl(obj, 'o', 'trackOpenRegistrationForm');
		this.clearEvents();
	}

	this.trackSocialShareClick = function(obj, social_share_id)
	{
		s.linkTrackEvents = 'event10'
		s.linkTrackVars = 'channel,eVar7,prop7,eVar8,prop8,eVar10,prop10,eVar11,prop11,eVar40,prop20,eVar20,prop21,eVar21,prop22,eVar22,prop23,eVar23,prop24,eVar24,prop26,eVar26,prop30,eVar30,list1,list2,list3';

		s.events  = 'event10'
		s.eVar40  = social_share_id

		s.tl(true, 'o', 'trackSocialShareClick');
		this.clearEvents();
  	}

	this.trackPriceByClick = function(obj, product)
	{
		s.linkTrackEvents = 'event11';
		s.linkTrackVars = 'product';

		s.events  = s.linkTrackEvents;
		s.product = product;

		s.tl(obj, 'o', 'trackPriceByClick');
		this.clearEvents();
	}

	this.trackMobileDealsClick = function(obj)
	{
		s.linkTrackEvents = 'event12';
		s.events = s.linkTrackEvents;

		s.tl(obj, 'o', 'trackMobileDealsClick');
		this.clearEvents();
	}

	this.trackBroadbandSpeedTestClick = function(obj)
	{
		s.linkTrackEvents = 'event13';
		s.events = s.linkTrackEvents;

		s.tl(obj, 'o', 'trackBroadbandSpeedTestClick');
		this.clearEvents();
	}

	this.trackJobAppClick = function(obj)
	{
		s.linkTrackEvents = 'event14';
		s.events = s.linkTrackEvents;

		s.tl(obj, 'o', 'trackJobAppClick');
		this.clearEvents();
	}

	this.trackFollowBrand = function(obj)
	{
		s.linkTrackEvents = 'event15';
		s.events = s.linkTrackEvents;

		s.tl(obj, 'o', 'trackFollowBrand');
		this.clearEvents();
	}

	this.trackFollowAuthor = function(obj)
	{
		s.linkTrackEvents = 'event16';
		s.events = s.linkTrackEvents;

		s.tl(obj, 'o', 'trackFollowAuthor');
		this.clearEvents();
	}

	this.trackFollowDiscussion = function(obj)
	{
		s.linkTrackEvents = 'event17';
		s.events = s.linkTrackEvents;

		s.tl(obj, 'o', 'trackFollowDiscussion');
		this.clearEvents();
	}

	this.trackFollowProduct = function(obj)
	{
		s.linkTrackEvents = 'event18';
		s.events = s.linkTrackEvents;


		// TODO can we centerlize the '0' value?
		s.tl(obj, 'o', 'trackFollowProduct');
		this.clearEvents();
	}

	this.trackAddIOwnIt = function(obj, product, article_type)
	{
		s.linkTrackEvents = 'event20';
		s.linkTrackVars = 'product,prop22';

		s.events  = s.linkTrackEvents;
		s.product = product;
		s.prop22  = article_type;

		s.tl(obj, 'o', 'trackAddIOwnIt');
		this.clearEvents();
	}

	this.trackRemoveIOwnIt = function(obj, product, article_type)
	{
		s.linkTrackEvents = 'event21';
		s.linkTrackVars = 'product,prop22';

		s.events  = s.linkTrackEvents;
		s.product = product;
		s.prop22  = article_type;

		s.tl(obj, 'o', 'trackRemoveIOwnIt');
		this.clearEvents();
	}

	this.trackAddIWantIt = function(obj, product, article_type)
	{
		s.linkTrackEvents = 'event22';
		s.linkTrackVars = 'product,prop22';

		s.events  = s.linkTrackEvents;
		s.product = product;
		s.prop22  = article_type;

		s.tl(obj, 'o', 'trackAddIWantIt');
		this.clearEvents();
	}

	this.trackRemoveIWantIt = function(obj, product, article_type)
	{
		s.linkTrackEvents = 'event23';
		s.linkTrackVars = 'product,prop22';

		s.events  = s.linkTrackEvents;
		s.product = product;
		s.prop22  = article_type;

		s.tl(obj, 'o', 'trackRemoveIWantIt');
		this.clearEvents();
	}

	this.trackAddNotForMe = function(obj, product, article_type)
	{
		s.linkTrackEvents = 'event24';
		s.linkTrackVars = 'product,prop22';

		s.events  = s.linkTrackEvents;
		s.product = product;
		s.prop22  = article_type;

		s.tl(obj, 'o', 'trackAddNotForMe');
		this.clearEvents();
	}

	this.trackRemoveNotForMe = function(obj, product, article_type)
	{
		s.linkTrackEvents = 'event25';
		s.linkTrackVars = 'product,prop22';

		s.events  = s.linkTrackEvents;
		s.product = product;
		s.prop22  = article_type;

		// TODO can we centerlize the '0' value?
		s.tl(obj, 'o', 'trackRemoveNotForMe');
		this.clearEvents();
	}

	this.trackSearchSubmit = function(obj, search_term)
	{
		s.linkTrackEvents = 'event48';
		s.linkTrackVars = 'eVar41';

                s.events = s.linkTrackEvents;
		s.eVar41 = search_term;
		s.tl(obj, 'o', 'trackSearchSubmit');
		this.clearEvents();
	}

	this.trackSearchLinkClick = function(obj, page_number, story_position, search_term)
	{
		if (page_number == 1)
		{
			if (story_position <= 5)
			{
				event_number = 40 + (story_position - 1);
				s.linkTrackEvents = 'event' + event_number;
			}
			else
			{
				s.linkTrackEvents = 'event45';
			}
		}
		else if (page_number == 2)
		{
			s.linkTrackEvents = 'event46';
		}
		else
		{
			s.linkTrackEvents = 'event47';
		}

		s.linkTrackVars = 'eVar41';

		s.events = s.linkTrackEvents;
		s.eVar41 = search_term;
		s.tl(obj, 'o', 'trackSearchLinkClick');
		this.clearEvents();
	}

	this.trackClick = function(p)
	{
		if (typeof(p)!='undefined') {
			//console.log(p);
			s.linkTrackVars="events,channel,eVar2,eVar3,eVar5,eVar6,eVar12,eVar13,eVar20,eVar21,eVar22,eVar23,eVar26,eVar30,eVar37,eVar46,eVar64,eVar65,eVar66,eVar69,list3,prop1,prop2,prop3,prop5,prop20,prop21,prop30";
			s.linkTrackEvents="event19";
			s.events='event19';
			s.eVar46=(p.item)?p.item:'NULL';
			s.tl(this, 'o', 'trackClick');
			this.clearEvents();
		}
	}

	this.trackSubmitFavorite = function()
	{
	  s.linkTrackEvents = 'event6';
	  s.linkTrackVars = 'events,channel,prop10,eVar10,prop20,eVar20,prop21,eVar21,prop22,eVar22,prop26,eVar26,prop30,eVar30,list1,list2,list3';
	  s.events  = s.linkTrackEvents;

	  s.tl(true, 'o', 'trackSubmitFavorite');
	  this.clearEvents();
	}

	this.getSocialCode = function(socialKey)
	{
		socialKey = socialKey.toLowerCase();
		var socialCodes = {
					'facebook': 1,
					'facebooksend': 2,
					'googleplus': 3,
					'linkedin': 4,
					'pinterest': 5,
					'reddit': 6,
					'stumbleupon': 7,
					'twitter': 8,
					'twitterfollow': 9,
					'email': 10,
					'digg': 11,
					'delicious': 12,
					'tumblr': 14,
					'print': 15,
					'favourites': 16,
					'copy': 17,
					'slashdot': 18,
					'technorati': 19
				};
			if (socialCodes[socialKey]) {
				return socialCodes[socialKey];
			}

		return false;
	}

	this.trackPhotoView = function(obj, pagename, view_guid)
	{

		s.linkTrackEvents = 'event32';
		s.linkTrackVars = 'events,eVar20,prop20,eVar22,prop22,eVar24,prop24,eVar30,prop30';
		s.pageName = pagename;
		s.events  = s.linkTrackEvents;
		s.prop24  = 'D=v24';
		s.eVar24  = view_guid;
		s.t();
	}

	this.linkedIn = function()
	{
		Omniture.trackSocialShareClick(self, Omniture.getSocialCode('linkedin'));
	}
}
