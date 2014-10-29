new TWTR.Widget({
	version: 2,
	type: 'search',
	search: 'from:@ITMigrationZone',
	interval: 3000,
	subject: '<h3 class="heading" style="font-size:15px !important">IT Migration Zone</h3>',
	width: 326,
	height: 200,
	theme: {
		shell: {
			background: '#ffffff',
			color: '#000000'
		},
		tweets: {
			background: '#ffffff',
			color: '#666666',
			links: '#333333'
		}
	},
	features: {
		scrollbar: false,
		loop: true,
		live: true,
		hashtags: true,
		timestamp: true,
		avatars: true,
		toptweets: false,
		behavior: 'default'
	}
}).render().start();