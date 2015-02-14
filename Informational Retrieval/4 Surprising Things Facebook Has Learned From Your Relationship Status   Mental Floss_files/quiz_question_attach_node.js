//Exclude on non quiz 'take' pages
if (window.location.pathname.split("/")[3] == 'take') {
	if(undefined == matches) var matches = [];
	jQuery(document).ready(function() {
		//Prepare the fields
		jQuery('tr.multichoice_row').each(function(i, obj) {
			jQuery(this).attr("id","question-row-"+i);
			jQuery(this).find('input').attr("id","question-radio-"+i);
			jQuery(this).unbind();
			jQuery(this).click( quizButtonFunction );
		});
		
		//#refactor this (previous with filter didn't work)
		jQuery('#quizTimeDisplay').prev().prev().hide();
		jQuery('<div id="remain-bar"><div id="remain-wrapper"><div id="remain-count">'+matches.length+'</div> REMAIN</div><div id="quiz-social"></div></div>').insertBefore('#quizTimeDisplay');
        jQuery('#quiz_progress_social').appendTo('#quiz-social');
		jQuery('#giveUpButton').insertBefore('#quiz-social');
		jQuery('#giveUpButton').wrap('<div id="quiz-give-up" />');
		jQuery('<div id="quiz-give-up-text" onClick="timeIsUp()">I GIVE UP</div><div id="quiz-give-up-arrow" onClick="timeIsUp()">></div>').insertBefore('#giveUpButton');
		jQuery('#quizAnswerField').insertBefore('#quizTimeDisplay');
	});
	
	var quizButtonFunction = function quizButtonClicked(event) {
		//jQuery('#edit-tries-answer .multichoice_row').attr("cursor", "wait");
		//document.body.style.cursor = "wait";
	    jQuery("#"+event.currentTarget.id.replace("row", "radio")).attr('checked', 'checked');
	    jQuery('form#quiz-question-answering-form #edit-submit').click();
	};

	//Disable enter key for quiz forms (namely name y in x)
	jQuery('#mf-quiz-container form.answering-form').keypress(function(e) {
		//Enter key
		if (e.which == 13) {
			return false;
		}
	});
}
	
function clickQuizSubmit() {
	jQuery('#giveUpButton').click();
}
