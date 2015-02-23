/**
 * @author Juan Bernardez
 * 
 * Little Event Aggregator based on Backbone Events, to provide
 * decoupled communication between Views/Controllers
 */

/*global _ */

RegPage.Vent = _.extend({}, Backbone.Events);
