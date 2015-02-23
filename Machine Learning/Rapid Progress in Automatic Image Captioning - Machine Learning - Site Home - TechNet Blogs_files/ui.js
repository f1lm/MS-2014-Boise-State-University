(function ($, global) {

    if (typeof $.telligent === 'undefined') { $.telligent = {}; }
    if (typeof $.telligent.evolution === 'undefined') { $.telligent.evolution = {}; }
    if (typeof $.telligent.evolution.widgets === 'undefined') { $.telligent.evolution.widgets = {}; }

    var _save = function (context) {
        context.successMessage.hide();
        context.moderateMessage.hide();
        context.errorMessage.hide();
        var w = $('#' + context.wrapperId);

        context.save
			.html('<span></span>' + context.publishingText)
			.addClass('disabled');

        var commentBody = removeXssAttributes($(context.bodySelector).evolutionComposer('val'));
        var authorTextBox = $('#commentAuthorName');
        var authorName = '';
        if (authorTextBox.length > 0)
            authorName = $(authorTextBox).val();

        if (commentBody && commentBody.length && commentBody.length > 3072) {
            $('.processing', w).css("visibility", "hidden");
            context.save.html('<span></span>' + context.publishText).removeClass('disabled');
            context.errorMessage.html(context.publishErrorText + ' (' + context.commentTooLongText + ')').slideDown();
            return;
        }

        $.telligent.evolution.post({
            url: $.telligent.evolution.site.getBaseUrl() + 'api.ashx/v2/blogs/{BlogId}/posts/{PostId}/msdntechnetcomments.json?IncludeFields=Comment.Id,Comment.IsApproved',
            data: {
                Body: commentBody,
                BlogId: context.blogId,
                PostId: context.postId,
                AuthorName: authorName
            },
            success: function (response) {
                $('.processing', w).css('visibility', 'hidden'); 
                if ($(authorTextBox).length > 0) $(authorTextBox).val('');

                if (response.Comment.IsApproved) {
                    context.successMessage.slideDown();
                    global.setTimeout(function () { context.successMessage.fadeOut().slideUp(); }, 9999);
                    $(document).trigger('telligent_blogs_commentposted', '');
                } else {
                    context.moderateMessage.slideDown();
                    global.setTimeout(function () { context.moderateMessage.fadeOut().slideUp(); }, 9999);
                }

                $(context.bodySelector).evolutionComposer('val', '');
                $(context.bodySelector).change();
                context.save.evolutionValidation('reset');
                context.save.html('<span></span>' + context.publishText).removeClass('disabled');
            },
            error: function (xhr, desc, ex) {
                $('.processing', w).css("visibility", "hidden");
                context.save.html('<span></span>' + context.publishText).removeClass('disabled');
                context.errorMessage.html(context.publishErrorText + ' (' + desc + ')').slideDown();
            }
        });
    };
    
    var removeXssAttributes = function (content) {
        var maliciousRegex = /=(\s*['"]\s*(prompt|alert)\s*\(\s*.*\s*\)\s*['"])/gim;
        var match = maliciousRegex.exec(content);
        if (match != null) {
            var cleanEventHandlerJs = match[0].replace(match[2], '');
            content = content.replace(match[0], cleanEventHandlerJs);
        }
        return content;
    };

    $.telligent.evolution.widgets.blogPostCommentForm = {
        register: function (context) {
            if (document.URL.indexOf('#addcomment') >= 0) {
                $(context.bodySelector).focus();
            }

            $('.internal-link.close-message', $('#' + context.wrapperId)).click(function () {
                $(this).blur();
                context.successMessage.fadeOut().slideUp();
                return false;
            });

            var body = $(context.bodySelector);
            body.one('focus', function () {
                body.evolutionComposer({
                    plugins: ['mentions', 'hashtags']
                });
            });

            context.save
				.evolutionValidation({
				    onValidated: function (isValid, buttonClicked, c) {
				        if (isValid) {
				            context.save.removeClass('disabled');
				        } else {
				            context.save.addClass('disabled');
				        }
				    },
				    onSuccessfulClick: function (e) {
				        e.preventDefault();
				        $('.processing', context.save.parent()).css("visibility", "visible");
				        context.save.addClass('disabled');
				        _save(context);
				    }
				})
				.evolutionValidation('addField', context.bodySelector, {
				    required: true,
				    maxlength: 1000000,
				    messages:
					{
					    required: context.bodyRequiredText
					}
				}, '#' + context.wrapperId + ' .field-item.post-body .field-item-validation', null);


            if ($('#commentAuthorName').length > 0) {
                context.save.evolutionValidation('addField', '#commentAuthorName', {
                    required: true,
                    maxlength: 50,
                    messages:
                    {
                        required: context.nameRequiredText
                    }
                }, '#' + context.wrapperId + ' .field-item.post-authorname .field-item-validation', null);
            }

        }
    };

})(jQuery, window);
