var Hello = Backbone.View.extend({
	tagName:'li',

	initialize:function(){
		$("#helloWorldExample").html("Hello World!\n");
	}
});

function showHelloWorldExample() {
	if ($("#helloWorldExample").html().length == 0) {
		var hello = new Hello();
		$("#helloWorldExampleCode").toggle();
	}
	else {
		$("#helloWorldExample").toggle();
		$("#helloWorldExampleCode").toggle();
	}
}