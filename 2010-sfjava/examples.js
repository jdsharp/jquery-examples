$('.demoScript').each(function() {
	var script = $(this).text();
	script = script.replace(/</g, '&lt;');
	script = script.replace(/>/g, '&gt;');
	script = script.replace(/\n/g, "<br/>\n");
	script = script.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
	$('body').append('<br/><br/><br/><strong>Source code:</strong><code>' + script + '</code>');
});