ExpenseView = Backbone.View.extend
({
	initialize: function()
	{
		//Put the template into the page
		this.render();
	},
	render: function()
	{
        var template = _.template( 
        	$("#ExpenseTemplate").html(), 
        		{
        			name:this.model.get("name"),
        			cost:this.model.get("cost")
        		}
        	);
        this.$el.html( template );
	},
	events: 
	{
		//Put new cost into model when textbox is edited
    	"keyup": "doUpdate",
    	"click .ExpenseTemplateButton" : "deleteMe",
    	"click [type='checkbox']":"doChecked"
	},
	doUpdate: function(event)
	{
		var cost = Number(this.$el.find(".inp_cost").val());
		//Set cost to 0 if we couldn't parse out a number.
		if( isNaN(cost) )
		{
			this.model.set("cost", 0);
		}
		else
		{
			this.model.set("cost", cost );
		}
	},
	doChecked: function(e)
	{
		this.model.set("checked", e.target.checked);
	},
	deleteMe: function(e)
	{
		e.preventDefault();
	    //Element clicked on
	    var target =  $(e.target).closest('tr');
	    this.model.destroy();
	    target.remove();
	}
});

ExpenseCalculatorView = Backbone.View.extend
({
	initialize: function()
	{
		this.collection = new Backbone.Collection;
		//These call doUpdate( event ) when a model is changed
		this.collection.bind('add', this.doUpdate, this);
		this.collection.bind('change', this.doUpdate, this);
		this.collection.bind('destroy', this.doUpdate, this);
		
		//Put the template into the page
		this.render(); 

		//Add some default items
		this.createExpenseItem("Rent",300);
		this.createExpenseItem("Gas",40);
		this.createExpenseItem("Phone",80);
		this.createExpenseItem("Food",100);
	},
	render: function()
	{
        var template = _.template( $("#ExpenseCalculatorTemplate").html(), {} );
        this.$el.html( template );
	},
	createExpenseItem: function(expenseName, expenseCost)
	{
		var expenseCost = Number(expenseCost);
		//Set cost to 0 if we couldn't parse out a number.
		if( isNaN(expenseCost) )
		{
			expenseCost = 0;
		}
		
		var expenseModel = new Backbone.Model(
			{
				name:expenseName,
				cost:expenseCost,
				checked:true
			});
		
		var toAdd = $('<tr></tr>');
		//Put before table row containing total expenses
		this.$el.find(".expenseTable tr:last").before( toAdd );

		new ExpenseView({el:toAdd,model:expenseModel});
		this.collection.add(expenseModel);
	},
	updateRowColors: function()
	{
		var table = this.$el.find(".expenseTable");

		var even = true;

	},
	updateBalance: function(balance)
	{
		var afterElement = this.$el.find(".after");
		afterElement.html(balance);
		if(balance < 0)
			afterElement.addClass("warning");
		else
			afterElement.removeClass("warning");
	},
	events: 
	{
		//Create an expense if user clicks create button
    	"click .btn_create": "doCreate",
    	"keyup .inp_budget": "doUpdate"
	},
	doCreate: function(e)
	{
		var expenseNameTextBox = this.$el.find(".inp_name");
		var expenseName = expenseNameTextBox.val();
		var expenseCostTextBoxTop = this.$el.find(".inp_cost_top");
		var expenseCostTop = expenseCostTextBoxTop.val();
		//Clear the name from the textbox
		expenseNameTextBox.val("");

		expenseCostTextBoxTop.val("0");
		this.createExpenseItem(expenseName,expenseCostTop);
	},
	doUpdate: function()
	{
		//Sum the costs from each model and set the expense
		var sum = 0;
		for(var i = 0; i < this.collection.models.length; i++)
			if(this.collection.models[i].get("checked"))
				sum += this.collection.models[i].get("cost");
		this.$el.find(".total").html(sum);

		var budget = Number(this.$el.find(".inp_budget").val());
		//Set cost to 0 if we couldn't parse out a number.
		if( isNaN(budget) )
		{
			budget = 0;
		}

		this.updateBalance(budget-sum);
	},
});
