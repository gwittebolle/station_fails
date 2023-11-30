// load bootsy after a page change, not just after loading a new page
//= require bootsy
$(document).on('pjax:end', Bootsy.init);
