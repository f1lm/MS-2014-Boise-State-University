jQuery(document).ready(function($) {

	// Ensure .indexOf is a supported JS method
	if ( ! Array.prototype.indexOf ) {
		Array.prototype.indexOf = function(obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
				if (this[i] === obj) { return i; }
			}
			return -1;
		};
	}

	// Establish semi-global filter vars
	var filters         = [];
	var pending_filters = [];
	filters.products     = wds_ms_get_active_filters( 'products' );
	filters.category        = wds_ms_get_active_filters( 'category' );

	// Listen for clicks to filter links
	$('.main-navigation').on( 'click', 'a.term-filter', function(e){
		e.preventDefault();
		var new_filters = wds_ms_toggle_filter( $(this) );
	});

	// Listen for clicks to filter cancel links
	$('.main-navigation').on( 'click', 'a.term-filters-cancel', function(e){
		e.preventDefault();
		$('.main-navigation-top-level > .open, .header-mobile-dropdown').removeClass('open');
		$('.applied-filters').css( 'top', 0 ).removeClass('down');
		wds_ms_reset_pending_filters();
	});

	$('.main-navigation').on( 'click', '.main-navigation-top-level > li > a', function(e){
		e.preventDefault();
		var $li = $(this).closest('li');
		$('.main-navigation-top-level > .open').not($li).removeClass('open');
		$li.toggleClass('open');

		if ( $li.hasClass('open') ){
			$('.applied-filters').css( 'top', $li.children('.term-filters').outerHeight() + 0 ).addClass('down');
		} else {
			$('.applied-filters').css( 'top', 0 ).removeClass('down');
		}
	});

	/**
	 * Get filters for a given taxonomy.
	 *
	 * @since  1.0.0
	 *
	 * @param  string taxonomy Taxonomy slug.
	 * @return array           Taxonomy term IDs.
	 */
	function wds_ms_get_active_filters( taxonomy ) {
		return $('.main-navigation a.active.term-filter[data-taxonomy=' + taxonomy + ']').map(function () {  return $(this).attr('data-term-slug'); }).get();
	}

	/**
	 * Toggle a filter link between 'active' and not.
	 *
	 * @since 1.0.0
	 *
	 * @param  jQuery Object link Link element.
	 * @return array              Updated filters array.
	 */
	function wds_ms_toggle_filter( link, update_pending ) {

		var term_slug       = link.attr( 'data-term-slug' );
		var term_tax_id     = link.attr( 'data-term-taxonomy-id' );
		var taxonomy        = link.attr( 'data-taxonomy' );
		var updated_filters = [];

		// Remove filter if already active, otherwise add filter
		if ( link.hasClass('active') ) {
			updated_filters = wds_ms_remove_filter( term_slug, term_tax_id, taxonomy, update_pending );
		} else {
			updated_filters = wds_ms_add_filter( term_slug, term_tax_id, taxonomy, update_pending );
		}

		link.toggleClass( 'active' );

		return updated_filters;
	}

	/**
	 * Add term to the current filter array.
	 *
	 * @since  1.0.0
	 *
	 * @param  string  term_slug   Term slug.
	 * @param  integer term_tax_id Term taxonomy ID.
	 * @param  string  taxonomy    Taxonomy slug.
	 * @return array               Updated filters array.
	 */
	function wds_ms_add_filter( term_slug, term_tax_id, taxonomy, update_pending ) {
		// Only add the filter if it doesn't already exist
		var index = filters[ taxonomy ].indexOf( term_slug );
		if ( -1 == index ) {
			// Add filter and update apply and reset links
			filters[ taxonomy ].push( term_slug );
			wds_ms_update_filter_apply_link();

			if ( false !== update_pending ) {
				wds_ms_update_pending_filters( term_tax_id );
			}
		}
		return filters;
	}

	/**
	 * Remove term from the current filter array.
	 *
	 * @since  1.0.0
	 *
	 * @param  string  term_slug   Term slug.
	 * @param  integer term_tax_id Term taxonomy ID.
	 * @param  string  taxonomy    Taxonomy slug.
	 * @return array               Updated filters array.
	 */
	function wds_ms_remove_filter( term_slug, term_tax_id, taxonomy, update_pending ) {
		// Only remove the filter if it actually exists
		var index = filters[ taxonomy ].indexOf( term_slug );
		if ( -1 != index ) {
			// Remove filter and update apply and reset links
			filters[ taxonomy ].splice( index, 1 );
			wds_ms_update_filter_apply_link();

			if ( false !== update_pending ) {
				wds_ms_update_pending_filters( term_tax_id );
			}
		}
		return filters;
	}

	/**
	 * Update "Apply Filters" link to include all active filters.
	 *
	 * @since 1.0.0
	 */
	function wds_ms_update_filter_apply_link() {

		// Setup filter string
		var filter_string = 'http://blogs.microsoft.com/firehose/?filter=true';

		// Convert filters to URL string
		for ( var taxonomy in filters ) {
			// If filter is not empty, add it to query-string
			if ( filters[ taxonomy ].length > 0 ) {
				filter_string += '&filter-' + taxonomy + '=' + filters[ taxonomy ].toString();
			}
		}

		// Update link href
		$('a.term-filters-apply').attr( 'href', filter_string );
	}

	/**
	 * Update pending filters array with new term.
	 *
	 * @since  1.0.0
	 *
	 * @param  integer term_tax_id Term taxonomy ID.
	 * @return array               Pending filters.
	 */
	function wds_ms_update_pending_filters( term_tax_id ) {

		// Remove the filter if it already exists
		var index = pending_filters.indexOf( term_tax_id );
		if ( -1 != index ) {
			pending_filters.splice( index, 1 );
		// Otherwise, add it
		} else {
			pending_filters.push( term_tax_id );
		}

		return pending_filters;
	}

	/**
	 * Toggle all pending filters back to their original state.
	 *
	 * @since 1.0.0
	 */
	function wds_ms_reset_pending_filters() {
		// Toggle each pending filter to original state
		$.each( pending_filters, function(){
			wds_ms_toggle_filter( $('a.term-filter[data-term-taxonomy-id=' + this + ']'), false );
		});

		// Set pending filters back to empty array
		pending_filters = [];
	}

});
