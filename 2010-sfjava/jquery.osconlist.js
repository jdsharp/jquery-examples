/*
 * OSCON List plugin
 */
(function($) {
	$.fn.osconList = function(options) {
		function triggerCount(options, list) {
			var count = $(list).children().length;
			options.count.call(list, count);
			
			if ( options.updateCount !== null ) {
				$( options.updateCount ).html( count );
			}
			
			$(list).trigger('itemcount', [ count ]);
		}
		
		function triggerHistory(evt, list, item) {
			var action = ( evt.type == 'itemremoved' ) ? 'removed' : 'added';
			$(list).trigger('listchanged', [ item, action ]);
		}
		
		options = $.extend({
							target: null,
							added: 	function() {},
							removed:function() {},
							count:	function() {},
							updateCount: null
							},
							options);
		
		return this.each(function() {
			// Listen for double click events and remove 
			// the list item clicked
			$('li', this).live('dblclick', function() {
				var $parent = $(this).parent();
				$(this).remove();
				options.removed.call($parent[0], this);
				
				$parent.trigger('itemremoved', [ this ]);
			});
			
			$(this).bind('itemremoved', function(evt, li) {
				triggerCount(options, this);
				triggerHistory(evt, this, li);
				
				if ( options.target !== null ) {
					$(options.target).append( li ).trigger('itemadded', [ li ]);
				}
			});
			
			// Setup our added callback
			$(this).bind('itemadded', function(evt, li) {
				triggerCount(options, this);
				triggerHistory(evt, this, li);
				
				options.added(li);
			});
			
			triggerCount(options, this);
		});
	};
})(jQuery);

/*

	$(document).bind('itemremoved itemadded', function(evt, li) {
		var action = evt.type == 'itemremoved' ? 'Removed: ' : 'Added: ';
		action += '"' + $(li).text() + '" to ';
		action += $(evt.target).attr('id');
		$('#history').append('<li>' + action + '</li>');
	});
	
	// Generic list item removal code
	$('ul.removable li').live('dblclick', function() {
		var $parent = $(this).parent();
		$(this).remove();
		$parent.trigger('itemremoved', [ this ]);
	});
	
	
	// Generic list code to move an item to a new list
	$('ul.removable').live('itemremoved', function(evt, li) {
		var target = $(this).attr('data-target');
		if ( target ) { 
			$('#' + target).append( li ).trigger('itemadded', [ li ]);
		}
	});
	
	
	// Handle list item counts
	$('ul.removable').live('itemremoved itemadded refreshcount', function() {
		var id 		= $(this).attr('id');
		var count 	= $(this).find('li').length;
		$('.data-' + id + '-count').html( count );
	});
	
	
	// On init
	$('ul.removable').trigger('refreshcount');
	
	
	// List specific code
	$('#list1').bind('itemadded', function(evt, li) {
		$(li).css('color', 'green');
	});
	
	$('#list2').bind('itemadded', function(evt, li) {
		$(li).css('color', 'blue');
	});
	
	$('#list3').bind('itemadded', function(evt, li) {
		$(li).css('color', '#656565');
	});
	
	//$(document).bind('itemremoved', function(evt, li) {
	//	alert('Item removed: ' + $(li).text() );
	//});
*/