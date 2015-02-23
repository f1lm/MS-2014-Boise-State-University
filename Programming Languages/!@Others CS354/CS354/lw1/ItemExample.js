var ItemModel = Backbone.Model.extend({
	defaults: {
		name : "Jon Doe",
		age : 29,
		hobby : "Baseball",
		description : "A normal dude."
	},

	initialize: function() {
		console.log("New item model initialized.");
	}
});

var ItemView = Backbone.View.extend({
	tagName: "li",
	colorFlag: false,

	events: {
		"click" : "clickEvent"
	},

	template: _.template("<%= name %> - <%= age %> - <%= hobby %> - <%= description %>"),

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	clickEvent: function() {
		if(this.colorFlag == false) {
			this.el.style.backgroundColor = "#00A6CF";
			this.colorFlag = true;
		}
		else {
			this.el.style.backgroundColor = "white";
			this.colorFlag = false;
		}
    }
});

var ItemCollectionView = Backbone.View.extend({
	tagName: "ul",
	id: "itemList",

	initialize: function() {
		this.render();
	},

	render: function () {
        var that = this;
        _.each(this.collection.models, function (item) {
            that.renderItemView(item);
        }, this);
	},

	renderItemView: function (item) {
        var itemView = new ItemView({
            model: item
        });
        $(this.el).append(itemView.el);
    },
});

var ItemCollection = Backbone.Collection.extend({
	model: ItemModel
});

function initItemExample1() {
	//init item models
	var im1 = new ItemModel();
	var im2 = new ItemModel({ name: "Chad Weigle", age: 21, hobby: "GAMING", description: "Sexy Beast!"});
	var im3 = new ItemModel({ name: "Thomas Green", age: 87, hobby: "Hermit", description: "Kinda old and tired." });
	var im4 = new ItemModel({ name: "William Unger", age: 20, hobby: "Ping Pong" });
	var im5 = new ItemModel({ name: "Melissa Clausen", age: 21, hobby: "Graphic Design, Painting, and Sketching", description: "A normal lady." });
	var im6 = new ItemModel({ name: "Kevin Philips", age: 87, hobby: "Hermit", description: "Kinda old and tired." });
	//init item collection
	var itemCollection = new ItemCollection();
	itemCollection.add(im1);
	itemCollection.add(im2);
	itemCollection.add(im3);
	itemCollection.add(im4);
	itemCollection.add(im5);
	itemCollection.add(im6);

	//Below is an easy way to declare a "global" variable within a function.
	//init item collection view
	window.itemCollectionView = new ItemCollectionView({collection: itemCollection});
}

function showItemExample1() {
	if ($("#itemListContainer").html().length == 0) {
		$("#itemListContainer").append(window.itemCollectionView.el);
		$("#complexExampleCode").toggle();
	}
	else {
		$("#itemListContainer").toggle();
		$("#complexExampleCode").toggle();
	}
}

function showExample2() {
		$(".list_box").toggle();
		$("#listBoxCode").toggle();
}


