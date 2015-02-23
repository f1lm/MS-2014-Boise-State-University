//Create some constants to be accessed around the app
RegPage.Cons = {
	//Section names
	BANNER_SECTION: 'banner_section',
	OVERVIEW_SECTION: 'overview_section',
	REGISTRATION_SECTION: 'registration_section',
	SUMMARY_SECTION: 'summary_section',
	SPEAKERS_SECTION: 'speakers_section',
	ATTEND_SECTION: 'attend_section',
	//Section Layout alignment
	LEFT_ALIGN: 'left_align',
	RIGHT_ALIGN: 'right_align',
	//UI related values
	MAX_COL_IMG_WIDTH: 344,
	
	//Field value codes
	COUNTRY_VC: 'country',

	HIDDEN_FIELDS_LIST: [
		'eventid', 'key', 'sessionid', 'target', 'sourcepage', 'partnerref', 'username',
		'password', 'errorurl', 'contenttype', 'exteventid', 'format', 'userreg', 'playerurl',
		'lobby', 'eventuserid', 'client_user_id', 'autoreg', 'debug'
	],
	
	COUNTRIES_LISTBOX: [
		{key:'1', displayOptionValue:'Afghanistan', displayOptionLabel:'Afghanistan'},
		{key:'2', displayOptionValue:'Albania', displayOptionLabel:'Albania'},
		{key:'3', displayOptionValue:'Algeria', displayOptionLabel:'Algeria'},
		{key:'4', displayOptionValue:'American Samoa', displayOptionLabel:'American Samoa'},
		{key:'5', displayOptionValue:'Andorra', displayOptionLabel:'Andorra'},
		{key:'6', displayOptionValue:'Angola', displayOptionLabel:'Angola'},
		{key:'7', displayOptionValue:'Anguilla', displayOptionLabel:'Anguilla'},
		{key:'8', displayOptionValue:'Antarctica', displayOptionLabel:'Antarctica'},
		{key:'9', displayOptionValue:'Antigua and Barbuda', displayOptionLabel:'Antigua and Barbuda'},
		{key:'10', displayOptionValue:'Argentina', displayOptionLabel:'Argentina'},
		{key:'11', displayOptionValue:'Armenia', displayOptionLabel:'Armenia'},
		{key:'12', displayOptionValue:'Aruba', displayOptionLabel:'Aruba'},
		{key:'13', displayOptionValue:'Ashmore and Cartier Islands', displayOptionLabel:'Ashmore and Cartier Islands'},
		{key:'14', displayOptionValue:'Australia', displayOptionLabel:'Australia'},
		{key:'15', displayOptionValue:'Austria', displayOptionLabel:'Austria'},
		{key:'16', displayOptionValue:'Azerbaijan', displayOptionLabel:'Azerbaijan'},
		{key:'17', displayOptionValue:'Bahamas, The', displayOptionLabel:'Bahamas, The'},
		{key:'18', displayOptionValue:'Bahrain', displayOptionLabel:'Bahrain'},
		{key:'19', displayOptionValue:'Baker Island', displayOptionLabel:'Baker Island'},
		{key:'20', displayOptionValue:'Bangladesh', displayOptionLabel:'Bangladesh'},
		{key:'21', displayOptionValue:'Barbados', displayOptionLabel:'Barbados'},
		{key:'22', displayOptionValue:'Bassas da India', displayOptionLabel:'Bassas da India'},
		{key:'23', displayOptionValue:'Belarus', displayOptionLabel:'Belarus'},
		{key:'24', displayOptionValue:'Belgium', displayOptionLabel:'Belgium'},
		{key:'25', displayOptionValue:'Belize', displayOptionLabel:'Belize'},
		{key:'26', displayOptionValue:'Benin', displayOptionLabel:'Benin'},
		{key:'27', displayOptionValue:'Bermuda', displayOptionLabel:'Bermuda'},
		{key:'28', displayOptionValue:'Bhutan', displayOptionLabel:'Bhutan'},
		{key:'29', displayOptionValue:'Bolivia', displayOptionLabel:'Bolivia'},
		{key:'30', displayOptionValue:'Bosnia and Herzegovina', displayOptionLabel:'Bosnia and Herzegovina'},
		{key:'31', displayOptionValue:'Botswana', displayOptionLabel:'Botswana'},
		{key:'32', displayOptionValue:'Bouvet Island', displayOptionLabel:'Bouvet Island'},
		{key:'33', displayOptionValue:'Brazil', displayOptionLabel:'Brazil'},
		{key:'34', displayOptionValue:'British Indian Ocean Territory', displayOptionLabel:'British Indian Ocean Territory'},
		{key:'35', displayOptionValue:'British Virgin Islands', displayOptionLabel:'British Virgin Islands'},
		{key:'36', displayOptionValue:'Brunei', displayOptionLabel:'Brunei'},
		{key:'37', displayOptionValue:'Bulgaria', displayOptionLabel:'Bulgaria'},
		{key:'38', displayOptionValue:'Burkina Faso', displayOptionLabel:'Burkina Faso'},
		{key:'39', displayOptionValue:'Burma', displayOptionLabel:'Burma'},
		{key:'40', displayOptionValue:'Burundi', displayOptionLabel:'Burundi'},
		{key:'41', displayOptionValue:'Cambodia', displayOptionLabel:'Cambodia'},
		{key:'42', displayOptionValue:'Cameroon', displayOptionLabel:'Cameroon'},
		{key:'43', displayOptionValue:'Canada', displayOptionLabel:'Canada'},
		{key:'44', displayOptionValue:'Cape Verde', displayOptionLabel:'Cape Verde'},
		{key:'45', displayOptionValue:'Cayman Islands', displayOptionLabel:'Cayman Islands'},
		{key:'46', displayOptionValue:'Central African Republic', displayOptionLabel:'Central African Republic'},
		{key:'47', displayOptionValue:'Chad', displayOptionLabel:'Chad'},
		{key:'48', displayOptionValue:'Chile', displayOptionLabel:'Chile'},
		{key:'49', displayOptionValue:'China', displayOptionLabel:'China'},
		{key:'50', displayOptionValue:'Christmas Island', displayOptionLabel:'Christmas Island'},
		{key:'51', displayOptionValue:'Clipperton Island', displayOptionLabel:'Clipperton Island'},
		{key:'52', displayOptionValue:'Cocos (Keeling) Islands', displayOptionLabel:'Cocos (Keeling) Islands'},
		{key:'53', displayOptionValue:'Colombia', displayOptionLabel:'Colombia'},
		{key:'54', displayOptionValue:'Comoros', displayOptionLabel:'Comoros'},
		{key:'55', displayOptionValue:'Congo, Democratic Republic of', displayOptionLabel:'Congo, Democratic Republic of'},
		{key:'56', displayOptionValue:'Cook Islands', displayOptionLabel:'Cook Islands'},
		{key:'57', displayOptionValue:'Costa Rica', displayOptionLabel:'Costa Rica'},
		{key:'58', displayOptionValue:'Cote d\'Ivoire', displayOptionLabel:'Cote d\'Ivoire'},
		{key:'59', displayOptionValue:'Croatia', displayOptionLabel:'Croatia'},
		{key:'60', displayOptionValue:'Cuba', displayOptionLabel:'Cuba'},
		{key:'61', displayOptionValue:'Cyprus', displayOptionLabel:'Cyprus'},
		{key:'62', displayOptionValue:'Czech Republic', displayOptionLabel:'Czech Republic'},
		{key:'63', displayOptionValue:'Denmark', displayOptionLabel:'Denmark'},
		{key:'64', displayOptionValue:'Djibouti', displayOptionLabel:'Djibouti'},
		{key:'65', displayOptionValue:'Dominica', displayOptionLabel:'Dominica'},
		{key:'66', displayOptionValue:'Dominican Republic', displayOptionLabel:'Dominican Republic'},
		{key:'67', displayOptionValue:'Ecuador', displayOptionLabel:'Ecuador'},
		{key:'68', displayOptionValue:'Egypt', displayOptionLabel:'Egypt'},
		{key:'69', displayOptionValue:'El Salvador', displayOptionLabel:'El Salvador'},
		{key:'70', displayOptionValue:'Equatorial Guinea', displayOptionLabel:'Equatorial Guinea'},
		{key:'71', displayOptionValue:'Eritrea', displayOptionLabel:'Eritrea'},
		{key:'72', displayOptionValue:'Estonia', displayOptionLabel:'Estonia'},
		{key:'73', displayOptionValue:'Ethiopia', displayOptionLabel:'Ethiopia'},
		{key:'74', displayOptionValue:'Europa Island', displayOptionLabel:'Europa Island'},
		{key:'75', displayOptionValue:'Falkland Islands', displayOptionLabel:'Falkland Islands'},
		{key:'76', displayOptionValue:'Faroe Islands', displayOptionLabel:'Faroe Islands'},
		{key:'77', displayOptionValue:'Fiji', displayOptionLabel:'Fiji'},
		{key:'78', displayOptionValue:'Finland', displayOptionLabel:'Finland'},
		{key:'79', displayOptionValue:'France', displayOptionLabel:'France'},
		{key:'80', displayOptionValue:'French Guiana', displayOptionLabel:'French Guiana'},
		{key:'81', displayOptionValue:'French Polynesia', displayOptionLabel:'French Polynesia'},
		{key:'82', displayOptionValue:'French Southern and Antarctic', displayOptionLabel:'French Southern and Antarctic'},
		{key:'83', displayOptionValue:'Gabon', displayOptionLabel:'Gabon'},
		{key:'84', displayOptionValue:'Gambia, The', displayOptionLabel:'Gambia, The'},
		{key:'85', displayOptionValue:'Gaza Strip', displayOptionLabel:'Gaza Strip'},
		{key:'86', displayOptionValue:'Georgia', displayOptionLabel:'Georgia'},
		{key:'87', displayOptionValue:'Germany', displayOptionLabel:'Germany'},
		{key:'88', displayOptionValue:'Ghana', displayOptionLabel:'Ghana'},
		{key:'89', displayOptionValue:'Gibraltar', displayOptionLabel:'Gibraltar'},
		{key:'90', displayOptionValue:'Glorioso Islands', displayOptionLabel:'Glorioso Islands'},
		{key:'91', displayOptionValue:'Greece', displayOptionLabel:'Greece'},
		{key:'92', displayOptionValue:'Greenland', displayOptionLabel:'Greenland'},
		{key:'93', displayOptionValue:'Grenada', displayOptionLabel:'Grenada'},
		{key:'94', displayOptionValue:'Guadeloupe', displayOptionLabel:'Guadeloupe'},
		{key:'95', displayOptionValue:'Guam', displayOptionLabel:'Guam'},
		{key:'96', displayOptionValue:'Guatemala', displayOptionLabel:'Guatemala'},
		{key:'97', displayOptionValue:'Guernsey', displayOptionLabel:'Guernsey'},
		{key:'98', displayOptionValue:'Guinea', displayOptionLabel:'Guinea'},
		{key:'99', displayOptionValue:'Guinea-Bissau', displayOptionLabel:'Guinea-Bissau'},
		{key:'100', displayOptionValue:'Guyana', displayOptionLabel:'Guyana'},
		{key:'101', displayOptionValue:'Haiti', displayOptionLabel:'Haiti'},
		{key:'102', displayOptionValue:'Heard and McDonald Islands', displayOptionLabel:'Heard and McDonald Islands'},
		{key:'103', displayOptionValue:'Holy See (Vatican City)', displayOptionLabel:'Holy See (Vatican City)'},
		{key:'104', displayOptionValue:'Honduras', displayOptionLabel:'Honduras'},
		{key:'105', displayOptionValue:'Hong Kong', displayOptionLabel:'Hong Kong'},
		{key:'106', displayOptionValue:'Howland Island', displayOptionLabel:'Howland Island'},
		{key:'107', displayOptionValue:'Hungary', displayOptionLabel:'Hungary'},
		{key:'108', displayOptionValue:'Iceland', displayOptionLabel:'Iceland'},
		{key:'109', displayOptionValue:'India', displayOptionLabel:'India'},
		{key:'110', displayOptionValue:'Indonesia', displayOptionLabel:'Indonesia'},
		{key:'111', displayOptionValue:'Iran', displayOptionLabel:'Iran'},
		{key:'112', displayOptionValue:'Iraq', displayOptionLabel:'Iraq'},
		{key:'113', displayOptionValue:'Ireland', displayOptionLabel:'Ireland'},
		{key:'114', displayOptionValue:'Israel', displayOptionLabel:'Israel'},
		{key:'115', displayOptionValue:'Italy', displayOptionLabel:'Italy'},
		{key:'116', displayOptionValue:'Jamaica', displayOptionLabel:'Jamaica'},
		{key:'117', displayOptionValue:'Jan Mayen', displayOptionLabel:'Jan Mayen'},
		{key:'118', displayOptionValue:'Japan', displayOptionLabel:'Japan'},
		{key:'119', displayOptionValue:'Jarvis Island', displayOptionLabel:'Jarvis Island'},
		{key:'120', displayOptionValue:'Jersey', displayOptionLabel:'Jersey'},
		{key:'121', displayOptionValue:'Johnston Atoll', displayOptionLabel:'Johnston Atoll'},
		{key:'122', displayOptionValue:'Jordan', displayOptionLabel:'Jordan'},
		{key:'123', displayOptionValue:'Juan de Nova Island', displayOptionLabel:'Juan de Nova Island'},
		{key:'124', displayOptionValue:'Kazakhstan', displayOptionLabel:'Kazakhstan'},
		{key:'125', displayOptionValue:'Kenya', displayOptionLabel:'Kenya'},
		{key:'126', displayOptionValue:'Kingman Reef', displayOptionLabel:'Kingman Reef'},
		{key:'127', displayOptionValue:'Kiribati', displayOptionLabel:'Kiribati'},
		{key:'128', displayOptionValue:'Korea, North', displayOptionLabel:'Korea, North'},
		{key:'129', displayOptionValue:'Korea, South', displayOptionLabel:'Korea, South'},
		{key:'130', displayOptionValue:'Kuwait', displayOptionLabel:'Kuwait'},
		{key:'131', displayOptionValue:'Kyrgyzstan', displayOptionLabel:'Kyrgyzstan'},
		{key:'132', displayOptionValue:'Laos', displayOptionLabel:'Laos'},
		{key:'133', displayOptionValue:'Latvia', displayOptionLabel:'Latvia'},
		{key:'134', displayOptionValue:'Lebanon', displayOptionLabel:'Lebanon'},
		{key:'135', displayOptionValue:'Lesotho', displayOptionLabel:'Lesotho'},
		{key:'136', displayOptionValue:'Liberia', displayOptionLabel:'Liberia'},
		{key:'137', displayOptionValue:'Libya', displayOptionLabel:'Libya'},
		{key:'138', displayOptionValue:'Liechtenstein', displayOptionLabel:'Liechtenstein'},
		{key:'139', displayOptionValue:'Lithuania', displayOptionLabel:'Lithuania'},
		{key:'140', displayOptionValue:'Luxembourg', displayOptionLabel:'Luxembourg'},
		{key:'141', displayOptionValue:'Macau', displayOptionLabel:'Macau'},
		{key:'142', displayOptionValue:'Macedonia', displayOptionLabel:'Macedonia'},
		{key:'143', displayOptionValue:'Madagascar', displayOptionLabel:'Madagascar'},
		{key:'144', displayOptionValue:'Malawi', displayOptionLabel:'Malawi'},
		{key:'145', displayOptionValue:'Malaysia', displayOptionLabel:'Malaysia'},
		{key:'146', displayOptionValue:'Maldives', displayOptionLabel:'Maldives'},
		{key:'147', displayOptionValue:'Mali', displayOptionLabel:'Mali'},
		{key:'148', displayOptionValue:'Malta', displayOptionLabel:'Malta'},
		{key:'149', displayOptionValue:'Man, Isle of', displayOptionLabel:'Man, Isle of'},
		{key:'150', displayOptionValue:'Marshall Islands', displayOptionLabel:'Marshall Islands'},
		{key:'151', displayOptionValue:'Martinique', displayOptionLabel:'Martinique'},
		{key:'152', displayOptionValue:'Mauritania', displayOptionLabel:'Mauritania'},
		{key:'153', displayOptionValue:'Mauritius', displayOptionLabel:'Mauritius'},
		{key:'154', displayOptionValue:'Mayotte', displayOptionLabel:'Mayotte'},
		{key:'155', displayOptionValue:'Mexico', displayOptionLabel:'Mexico'},
		{key:'156', displayOptionValue:'Micronesia, Federated States', displayOptionLabel:'Micronesia, Federated States'},
		{key:'157', displayOptionValue:'Midway Islands', displayOptionLabel:'Midway Islands'},
		{key:'158', displayOptionValue:'Moldova', displayOptionLabel:'Moldova'},
		{key:'159', displayOptionValue:'Monaco', displayOptionLabel:'Monaco'},
		{key:'160', displayOptionValue:'Mongolia', displayOptionLabel:'Mongolia'},
		{key:'161', displayOptionValue:'Montserrat', displayOptionLabel:'Montserrat'},
		{key:'162', displayOptionValue:'Morocco', displayOptionLabel:'Morocco'},
		{key:'163', displayOptionValue:'Mozambique', displayOptionLabel:'Mozambique'},
		{key:'164', displayOptionValue:'Namibia', displayOptionLabel:'Namibia'},
		{key:'165', displayOptionValue:'Nauru', displayOptionLabel:'Nauru'},
		{key:'166', displayOptionValue:'Navassa Island', displayOptionLabel:'Navassa Island'},
		{key:'167', displayOptionValue:'Nepal', displayOptionLabel:'Nepal'},
		{key:'168', displayOptionValue:'Netherlands', displayOptionLabel:'Netherlands'},
		{key:'169', displayOptionValue:'Netherlands Antilles', displayOptionLabel:'Netherlands Antilles'},
		{key:'170', displayOptionValue:'New Caledonia', displayOptionLabel:'New Caledonia'},
		{key:'171', displayOptionValue:'New Zealand', displayOptionLabel:'New Zealand'},
		{key:'172', displayOptionValue:'Nicaragua', displayOptionLabel:'Nicaragua'},
		{key:'173', displayOptionValue:'Niger', displayOptionLabel:'Niger'},
		{key:'174', displayOptionValue:'Nigeria', displayOptionLabel:'Nigeria'},
		{key:'175', displayOptionValue:'Niue', displayOptionLabel:'Niue'},
		{key:'176', displayOptionValue:'Norfolk Island', displayOptionLabel:'Norfolk Island'},
		{key:'177', displayOptionValue:'Northern Mariana Islands', displayOptionLabel:'Northern Mariana Islands'},
		{key:'178', displayOptionValue:'Norway', displayOptionLabel:'Norway'},
		{key:'179', displayOptionValue:'Oman', displayOptionLabel:'Oman'},
		{key:'180', displayOptionValue:'Pakistan', displayOptionLabel:'Pakistan'},
		{key:'181', displayOptionValue:'Palau', displayOptionLabel:'Palau'},
		{key:'182', displayOptionValue:'Palmyra Atoll', displayOptionLabel:'Palmyra Atoll'},
		{key:'183', displayOptionValue:'Panama', displayOptionLabel:'Panama'},
		{key:'184', displayOptionValue:'Papua New Guinea', displayOptionLabel:'Papua New Guinea'},
		{key:'185', displayOptionValue:'Paracel Islands', displayOptionLabel:'Paracel Islands'},
		{key:'186', displayOptionValue:'Paraguay', displayOptionLabel:'Paraguay'},
		{key:'187', displayOptionValue:'Peru', displayOptionLabel:'Peru'},
		{key:'188', displayOptionValue:'Philippines', displayOptionLabel:'Philippines'},
		{key:'189', displayOptionValue:'Pitcairn Islands', displayOptionLabel:'Pitcairn Islands'},
		{key:'190', displayOptionValue:'Poland', displayOptionLabel:'Poland'},
		{key:'191', displayOptionValue:'Portugal', displayOptionLabel:'Portugal'},
		{key:'192', displayOptionValue:'Puerto Rico', displayOptionLabel:'Puerto Rico'},
		{key:'193', displayOptionValue:'Qatar', displayOptionLabel:'Qatar'},
		{key:'194', displayOptionValue:'Reunion', displayOptionLabel:'Reunion'},
		{key:'195', displayOptionValue:'Romania', displayOptionLabel:'Romania'},
		{key:'196', displayOptionValue:'Russia', displayOptionLabel:'Russia'},
		{key:'197', displayOptionValue:'Rwanda', displayOptionLabel:'Rwanda'},
		{key:'198', displayOptionValue:'Saint Helena', displayOptionLabel:'Saint Helena'},
		{key:'199', displayOptionValue:'Saint Kitts and Nevis', displayOptionLabel:'Saint Kitts and Nevis'},
		{key:'200', displayOptionValue:'Saint Lucia', displayOptionLabel:'Saint Lucia'},
		{key:'201', displayOptionValue:'Saint Pierre and Miquelon', displayOptionLabel:'Saint Pierre and Miquelon'},
		{key:'202', displayOptionValue:'Saint Vincent and Grenadines', displayOptionLabel:'Saint Vincent and Grenadines'},
		{key:'203', displayOptionValue:'Samoa', displayOptionLabel:'Samoa'},
		{key:'204', displayOptionValue:'San Marino', displayOptionLabel:'San Marino'},
		{key:'205', displayOptionValue:'Sao Tome and Principe', displayOptionLabel:'Sao Tome and Principe'},
		{key:'206', displayOptionValue:'Saudi Arabia', displayOptionLabel:'Saudi Arabia'},
		{key:'207', displayOptionValue:'Senegal', displayOptionLabel:'Senegal'},
		{key:'208', displayOptionValue:'Serbia and Montenegro', displayOptionLabel:'Serbia and Montenegro'},
		{key:'209', displayOptionValue:'Seychelles', displayOptionLabel:'Seychelles'},
		{key:'210', displayOptionValue:'Sierra Leone', displayOptionLabel:'Sierra Leone'},
		{key:'211', displayOptionValue:'Singapore', displayOptionLabel:'Singapore'},
		{key:'212', displayOptionValue:'Slovakia', displayOptionLabel:'Slovakia'},
		{key:'213', displayOptionValue:'Slovenia', displayOptionLabel:'Slovenia'},
		{key:'214', displayOptionValue:'Solomon Islands', displayOptionLabel:'Solomon Islands'},
		{key:'215', displayOptionValue:'Somalia', displayOptionLabel:'Somalia'},
		{key:'216', displayOptionValue:'South Africa', displayOptionLabel:'South Africa'},
		{key:'217', displayOptionValue:'South Georgia', displayOptionLabel:'South Georgia'},
		{key:'218', displayOptionValue:'Spain', displayOptionLabel:'Spain'},
		{key:'219', displayOptionValue:'Spratly Islands', displayOptionLabel:'Spratly Islands'},
		{key:'220', displayOptionValue:'Sri Lanka', displayOptionLabel:'Sri Lanka'},
		{key:'221', displayOptionValue:'Sudan', displayOptionLabel:'Sudan'},
		{key:'222', displayOptionValue:'Suriname', displayOptionLabel:'Suriname'},
		{key:'223', displayOptionValue:'Svalbard', displayOptionLabel:'Svalbard'},
		{key:'224', displayOptionValue:'Swaziland', displayOptionLabel:'Swaziland'},
		{key:'225', displayOptionValue:'Sweden', displayOptionLabel:'Sweden'},
		{key:'226', displayOptionValue:'Switzerland', displayOptionLabel:'Switzerland'},
		{key:'227', displayOptionValue:'Syria', displayOptionLabel:'Syria'},
		{key:'228', displayOptionValue:'Taiwan', displayOptionLabel:'Taiwan'},
		{key:'229', displayOptionValue:'Tajikistan', displayOptionLabel:'Tajikistan'},
		{key:'230', displayOptionValue:'Tanzania', displayOptionLabel:'Tanzania'},
		{key:'231', displayOptionValue:'Thailand', displayOptionLabel:'Thailand'},
		{key:'232', displayOptionValue:'Togo', displayOptionLabel:'Togo'},
		{key:'233', displayOptionValue:'Tokelau', displayOptionLabel:'Tokelau'},
		{key:'234', displayOptionValue:'Tonga', displayOptionLabel:'Tonga'},
		{key:'235', displayOptionValue:'Trinidad and Tobago', displayOptionLabel:'Trinidad and Tobago'},
		{key:'236', displayOptionValue:'Tromelin Island', displayOptionLabel:'Tromelin Island'},
		{key:'237', displayOptionValue:'Tunisia', displayOptionLabel:'Tunisia'},
		{key:'238', displayOptionValue:'Turkey', displayOptionLabel:'Turkey'},
		{key:'239', displayOptionValue:'Turkmenistan', displayOptionLabel:'Turkmenistan'},
		{key:'240', displayOptionValue:'Turks and Caicos Islands', displayOptionLabel:'Turks and Caicos Islands'},
		{key:'241', displayOptionValue:'Tuvalu', displayOptionLabel:'Tuvalu'},
		{key:'242', displayOptionValue:'Uganda', displayOptionLabel:'Uganda'},
		{key:'243', displayOptionValue:'Ukraine', displayOptionLabel:'Ukraine'},
		{key:'244', displayOptionValue:'United Arab Emirates', displayOptionLabel:'United Arab Emirates'},
		{key:'245', displayOptionValue:'United Kingdom', displayOptionLabel:'United Kingdom'},
		{key:'246', displayOptionValue:'United States', displayOptionLabel:'United States', selected: 'selected'},
		{key:'247', displayOptionValue:'Uruguay', displayOptionLabel:'Uruguay'},
		{key:'248', displayOptionValue:'Uzbekistan', displayOptionLabel:'Uzbekistan'},
		{key:'249', displayOptionValue:'Vanuatu', displayOptionLabel:'Vanuatu'},
		{key:'250', displayOptionValue:'Venezuela', displayOptionLabel:'Venezuela'},
		{key:'251', displayOptionValue:'Vietnam', displayOptionLabel:'Vietnam'},
		{key:'252', displayOptionValue:'Virgin Islands', displayOptionLabel:'Virgin Islands'},
		{key:'253', displayOptionValue:'Wake Atoll', displayOptionLabel:'Wake Atoll'},
		{key:'254', displayOptionValue:'Wallis and Futuna', displayOptionLabel:'Wallis and Futuna'},
		{key:'255', displayOptionValue:'West Bank', displayOptionLabel:'West Bank'},
		{key:'256', displayOptionValue:'Western Sahara', displayOptionLabel:'Western Sahara'},
		{key:'257', displayOptionValue:'Yemen', displayOptionLabel:'Yemen'},
		{key:'258', displayOptionValue:'Zambia', displayOptionLabel:'Zambia'},
		{key:'259',	displayOptionValue:'Zimbabwe', displayOptionLabel:'Zimbabwe'}
	]
	
};

