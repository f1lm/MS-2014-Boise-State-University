/*global $ */

//Create our main namespace
var RegPage = {};
var LobbyPage = {};

/*
 * Starts the app, by first retrieving the view templates, and 
 * then starting the main controller
 */
RegPage.start = function() {
	'use strict';
	var regPageController;
	//Get the view templates
	$.get("/view/eventregistration/templates.html", function(templates) {
		RegPage.Templates = $(templates);
		//After getting the templates, start the controller
		regPageController = new RegPage.RegPageController();
	});
};

/*
 * Starts the app, by first retrieving the view templates, and 
 * then starting the main controller
 
LobbyPage.start = function() {
	'use strict';
	var lobbyPageController;
	//Get the view templates
	$.get("/view/eventregistration/templates.html", function(templates) {
		RegPage.Templates = $(templates);
		//After getting the templates, start the controller
		lobbyPageController = new LobbyPage.LobbyPageController();
	});
};
*/

