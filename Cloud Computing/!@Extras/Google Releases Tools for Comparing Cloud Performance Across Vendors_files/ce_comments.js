/**
 * JavaScript to dynamically load comments.
 * Copyright 2010 QuinStreet
 *
 */

// namespace
var cec = {};
cec.parentKey = undefined;
cec.recaptcha_key = '6LeI_LkSAAAAAKKj8A30rX0r1Hi4DEfqve2GYRgA';
//cec.recaptcha_key = '6LfmQr4SAAAAAKsyXc-KU421tRgjVdRfbQaIyD-_';

var fName = decodeURIComponent($.cookie('fn'));
var lName  = decodeURIComponent($.cookie('ln'));
//var eAddress  = $.cookie('EMAIL_ADDRESS');
var userId  = $.cookie('USERID_COOKIE');

fName = fName.replace("+"," ");
lName  = lName.replace("+"," ");

/**
 * AJAX Call to fetch the comments for a blurb
 */
cec.commentRequest = function(key) {
    //$.get('/comments/get/'+key, cec.commentRequestCallback);
    $.ajax({
        type: "GET",
        url: "/comments/get/"+key,
        success: cec.commentRequestCallback,
        error: function() {
            html_data = '<div class="comment no-comments">There are no comments for this article yet.</div>';
            cec.hideLoading();
            $("#ce-comments").append(html_data);
        }
    });
};

/**
 * Callback function after an AJAX call to fetch comments.
 */
cec.commentRequestCallback = function(data) {
    var html_data = '';
    var comments;
    // ideally we'd use a js templating library for this, but for the sake
    // of convenience and keeping things as slim as possible, we'll just
    // use html here.

    // check if there are any comments
    if (data == null || data === false) {
        html_data = '<div class="comment no-comments">There are no comments for this article yet.</div>';
    } else {
        comments = data["comments"];
        html_data = cec.createCommentList(comments);
    }

    cec.hideLoading();
    $("#ce-comments").append(html_data);
};

/**
 * This method will loop through the return data and call
 * a method to create the html for comments.
 */
cec.createCommentList = function(comments, child) {
    var html_data = '';

	document.getElementById('totalComments').innerHTML = '<h3>'+comments.length+' Comments for "'+articleTitle+'"</h3>';

    html_data += '<ul'+(child===true?' class="child"':'')+'>';
    for (i in comments) {
        html_data += '<li>';
        html_data += cec.addComment(comments[i], i%2);
        if (!jQuery.isEmptyObject(comments[i].childComments)) {
            html_data += cec.createCommentList(comments[i].childComments, true);
        }
        html_data += '</li>';
    }
    html_data += '</ul>';

    return html_data;
};

cec.addComment = function(comment, alt) {
    var html_data = '';

    html_data += '<div class="comment'+(alt===1?' altrow':'')+'">';
    html_data += '<h3><span class="byline">'+comment.ownerUserName+'</span><span class="datetime">said on '+comment.parsedDate+'</span></h3>';
    html_data += '<p class="comment-body">'+comment.commentBody+'</p>';
    html_data += '<p class="comment-actions"><a href="#comment-formbox" id="comment-'+comment.key+'" class="comment-reply">REPLY</a></p>';
    html_data += '</div>';

    return html_data;
};

cec.displayCommentForm = function() {
    var html = '';
	var makeReadonly = '';

	html += '<div id="comment-formbox">';
		html += '<form class="comment-form">';
			html += '<label for="comment_author">Your Name?</label>';
			
			if(fName!='null' && lName!='null' && userId!='null'){
				makeReadonly = 'readonly';
				html += '<div class="input-container"><input type="text" name="author" value="'+fName+' '+lName+'" class="comment-textinput"></div>';
				html += '<label for="comment_email">Your Email?</label><span class="info-text">(Don\'t worry, this won\'t be shown.)</span>';
				//html += '<div class="input-container"><input type="text" name="author_email" value="'+eAddress+'" class="comment-textinput" '+makeReadonly+'></div>';
				html += '<div class="input-container"><input type="text" name="author_email" class="comment-textinput"></div>';
			}
			else
			{
				html += '<div class="input-container"><input type="text" name="author" class="comment-textinput"></div>';
				html += '<label for="comment_email">Your Email?</label><span class="info-text">(Don\'t worry, this won\'t be shown.)</span>';
				html += '<div class="input-container"><input type="text" name="author_email" class="comment-textinput"></div>';

			}

			html += '<label for="comment_body">What Would You Like To Say?</label>';
			html += '<div class="input-container"><textarea name="comment_content" class="comment-textinput" rows="6"></textarea></div>';
			html += '<input type="hidden" name="blurbKey" value="'+blurbKey+'">';
			html += '<div id="recaptcha_div"></div>';			
			
            html += '<div><button name="comment_submit" class="comment-button"><span>Add Your Comment</span></button></div>';
        html += '</form>';
    html += '</div>';

    return html;
};


/**
 * Displays the loading animation
 */
cec.hideLoading = function() {
    $('#comment-loading').hide();
};


/**
 * A delegate function to add handlers for the Reply links for each comment.
 * Displays a lightbox'd comment form.
 *
 */
cec.replyDelegate = function() {
    $('#ce-comments').delegate('.comment-reply', 'click', cec.displayNewCommentForm);
    $('.toolbox').delegate('.comment-reply', 'click', cec.displayNewCommentForm);
};

/**
 * Creates a brand new comment form
 */
cec.displayNewCommentForm = function() {
    var form_html = cec.displayCommentForm();

    // get the parent key
    try {
        cec.parentKey = cec.parentKey || $(this).attr('id').substr(8);
    } catch (e) {
        cec.parentKey = '';
    }


    // show the comment form in a facebox
    $.facebox(function() {jQuery.facebox(form_html)});

	// show the captcha
	cec.showRecaptcha();

    if ($.browser.msie && $.browser.version.substr(0,1)<8) {
    }
    else {
        // add delegate for the form to handle any kinds of visualizations
        cec.formVisualizationDelegate();
    }

    // give focus to the first input element
    $('.comment-form input')[0].focus();

    // delegate to handle when the submit button is clicked for
    // the comment form
    cec.submitDelegate();
    return false;
};


/**
 * Make a delegate for submitting comments.
 */
cec.submitDelegate = function() {
    var submitActivate = true;
    var formValues;

    $('.comment-form').delegate('.comment-button', 'click', function() {
        // when the "Add Your Comment" button is clicked then
        // submit the contents of the form to the server.
        // Also, display a temporary comment box for the user while
        // it is under moderation.
        if (submitActivate) {
            // Disable the submit button and load a waiting gif
            $('.comment-button').attr('disabled', 'disabled');
            $('.comment-button').parent().addClass('submitting');

            // validate the form to make sure all fields are filled out


            // form values serialized using jquery
            var formValues = $('.comment-form').serialize();
            formValues += '&parentKey='+cec.parentKey;
            formValues += '&recaptcha_challenge='+Recaptcha.get_challenge();
            formValues += '&recaptcha_response='+Recaptcha.get_response();

            // ajax call to post the comment
            $.ajax({
                type: 'POST',
                url: '/comments/post',
                data: formValues,
                success: function(data) {//{{{
                    var error_msg;

                    //jQuery(document).trigger('close.facebox')
                    Recaptcha.destroy();

                    if (data.status) {
                        // do something on success
                        $.facebox(function() {jQuery.facebox('<div id="comment-success-box"><h2>Thank you for submitting your comment!</h2><p>Your message has been placed in the moderation queue and will be displayed shortly.</p></div>')});
                    } else {
                        // error occurred, show a new form with error message.
                        cec.displayNewCommentForm();

                        // find the correct error msg to use.
                        if (data.error_type === 'captcha') {
                            error_msg = 'Your captcha was not right, please try again.';
                        } else {
                            alert(data);
                            error_msg = 'There were problems with your submission, please try again.';
                        }

                        // display an error message.
                        $('#comment-formbox').prepend('<div class="error-box"><h2>Sorry!</h2><p>'+error_msg+'</p></div>');

                        return false;
                    }

                    // after the ajax post is completed, return form to normal status
                    submitActive = true;
                    //$('.comment-button').removeAttr('disabled');
                    //$('.comment-button').parent().removeClass('submitting');
                    return false;
                },//}}}
                dataType: 'json', 
                error: function() {
                    error_msg = 'There were problems with your submission, please try again.';
                    // display an error message.
                    $('#comment-formbox').prepend('<div class="error-box"><h2>Sorry!</h2><p>'+error_msg+'</p></div>');
                    submitActive = true;
                }
            })


            submitActivate = false;
        }
        return false;
    });
};

/**
 * Delegate to handle all sorts of events for the form focus/blurs
 *
 */
cec.formVisualizationDelegate = function() {
    $('.comment-form').delegate('.comment-textinput', 'focus', function() {
        $(this).addClass('highlight');
    });

    $('.comment-form').delegate('.comment-textinput', 'blur', function() {
        $(this).removeClass('highlight');
        if ($(this).attr('name') == 'author_email') {
            if (!cec.validateEmail($(this).val())) {
                $(this).parent().addClass('error');
                $(this).removeClass('valid');
            } else {
                $(this).removeClass('error');
                $(this).parent().addClass('valid');
            }
        } else {
            if (!cec.validateText($(this).val())) {
                $(this).parent().addClass('error');
                $(this).removeClass('valid');
            } else {
                $(this).removeClass('error');
                $(this).parent().addClass('valid');
            }
        }
    });
};

/**
 * Shows the recaptcha box
 *
 */
cec.showRecaptcha = function() {
    // display recaptcha
    Recaptcha.create(cec.recaptcha_key,
                     "recaptcha_div",
                     {theme: "blue"}
                    );
};

/**
 * Validates default text.
 *
 */
cec.validateText = function(data) {
    return data.length > 0;
};

cec.validateEmail = function(data) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(data);
};

// make sure blurbKey is defined, leave it in the global ns
if (blurbKey) {
    if (typeof $ !== 'function') {
        // shouldn't happen
    }

    $(document).ready(function() {
        // load
        cec.commentRequest(blurbKey);
        cec.replyDelegate();
    });
}
