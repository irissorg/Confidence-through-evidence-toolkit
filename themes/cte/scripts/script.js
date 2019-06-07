// $Id: script.js,v 1.1.8.1 2009/06/19 02:36:38 shannonlucas Exp $

/**
 * @file script.js
 * General JavaScript functions for the theme. A default file is required to
 * get Drupal to automatically load jQuery.
 */

$(document).ready(function() {
	setupQuestions();
	sniffAnchor();
	searchbox();
	glossaryDialog();
	
	// set title attributes for external links
	$('a[href^="http:"]').not('a[href^="http://toolkit.iriss.org.uk"], a.feed-icon').attr('title','External link');
	$('a[href^="http://eip.iriss.org.uk"]').attr('title','Go to the Evidence Informed Practice Portal');
	
	// tidy up glossary terms lists
	$('.field-field-activity-glossaryterms a:last').addClass('last');
});

/* set the question headings and content */
function setupQuestions() {
	// move questions list before glossary terms on page
	var questions = $('.view-cte-questions').parent();
	$('.field-field-activity-glossaryterms').before($(questions));
	
	// setup questions headings and hide answers
	$('.view-cte-questions li > .views-field-title').addClass('my-heading').each(function(){
		$(this).siblings().wrapAll('<div class="my-answer" />');
	});
	$('.my-answer').hide();
	
	// rewrite href values for anchors
	$('.view-cte-questions li > .views-field-title a').each(function(i){
		$(this).attr('href','#'+(i+1));
	});
	
	// heading bg swapping with show/hide toggling and setting hash value
	$('.my-heading').click(function(){
		$(this).toggleClass('open').next().slideToggle('slow');
		addhash($(this).find('a'));
		return false;
	}).next().hide();
	
	// set location hash on resource link click
	$('.my-answer a').click(function(){
		addhash($(this).parents('.my-answer').siblings('.my-heading').find('a'));
	});
	
	// set 'more info' links
	// linkQuestionNode();
}

/* move 'link' content node link from title to 'more info' */
function linkQuestionNode() {
	$('.views-field-field-links-nid .views-row').each(function() {
		var nodelink = $(this).find('.views-field-title a');
		var moreinfo = '&nbsp;<a href="' + $(nodelink).attr('href') + '" title="More info about this resource" class="moreinfolink">[more info]</a>';
		$(this).find('.views-field-field-link-note-value *:last').append(moreinfo);
		$(nodelink).replaceWith($(nodelink).text());
	});
}

/* clear/restore searchbox text on focus */
function searchbox() {
	// add/remove 'search' text to searchbox
	$('#search-top input.form-text').attr('value','search').focus(function(){
		$(this).attr('value','');
	}).blur(function() {
		if($(this).attr('value') != '') return;
		$(this).attr('value','search');
	});
}

/* add hash to location */
function addhash(anchor) {
	// add hash value to URL in address bar
	location.hash = $(anchor).attr('href');
}

/* open last question re location hash */
function sniffAnchor() {
	// open question re anchor value
	if(location.hash && '.my-heading') {
		$('.my-heading a[href=' + location.hash + ']').parents('.my-heading').addClass('open').next().toggle();
	}
}

/* set glossary terms modal dialog */
function glossaryDialog() {
	if($(".field-field-activity-glossaryterms")) {
		$(".field-field-activity-glossaryterms a").click(function(){
			var myurl = $(this).attr('href');
			$('<div></div>').css('background','url(/sites/toolkit.iriss.org.uk/files/ajax-loader.gif) no-repeat 50% 50%').load(myurl + ' #content-inner',function(){
				$(this).css('background','none');
			}).dialog({width: 520, height: 340, modal: true, title: 'Glossary Term'});
			return false;
		});
	} else {
		return;
	}
}

/*
 * survey modal dialog
 * short-term research survey 2010/11
 */

function surveyDialog() {
	
	// check cookie and bail if it's there
	var c = readCookie('surveyed');
	if(c == 'true') return;
	
	// setup html content
	var myhtml = '<h3>Win £25 to spend on Amazon</h3>';
	myhtml += '<p>Complete a three minute survey about the Confidence Through Evidence toolkit and get the chance to be entered into a prize draw to <strong>win £25 of Amazon vouchers</strong>.</p>';
	myhtml += '<p><a href="http://www.surveymonkey.com/s/ctetoolkitsurvey"><strong>Take the survey</strong></a></p>';
	myhtml += '<p>Your views are really important to us and help IRISS improve the tools that we offer to the workforce.</p>';
	myhtml += '<p>If you have not finished using the toolkit, you can take the survey later by clicking on the banner at the top of every page.</p>';
	
	// show modal dialog and set cookie
	$('<div class="survey-dialog">'+myhtml+'</div>').dialog({width: 728, height: 340, modal: true});
	createCookie('surveyed', 'true', 1);
	
}

/*
 * cookie functions 
 * courtesy of http://www.quirksmode.org/js/cookies.html
 */
function createCookie(name,value,days) {
	if (days) 	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) 	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}

















