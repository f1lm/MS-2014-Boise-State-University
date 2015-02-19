(function ($) {

    String.prototype.format = function () {
        var fmt = this;
        for (var i = 0, l = arguments.length; i < l; i++) {
            fmt = fmt.replace(new RegExp('\\{' + i + '\\}', "mg"), arguments[i]);
        }
        return fmt;
    };
    String.prototype.template = function (map) {
        if (!map) return this;
        var fmt = this;
        for (var key in map) {
            fmt = fmt.replace(new RegExp('\\{' + key + '\\}', "mg"), map[key]);
        }
        return fmt;
    };

    if (typeof $.telligent === 'undefined') { $.telligent = {}; }
    if (typeof $.telligent.evolution === 'undefined') { $.telligent.evolution = {}; }
    if (typeof $.telligent.evolution.widgets === 'undefined') { $.telligent.evolution.widgets = {}; }

    var errorHtml = '<div class="message error">{ErrorText}</div>',
		loadingHtml = '<div class="message loading">{LoadingText}</div>',
        load = function (context, rebasePager) {
            var data = { w_baseUrl: context.baseUrl };
            if (rebasePager) {
                data[context.pageIndexQueryStringKey] = 1;

                var hashData = $.telligent.evolution.url.hashData();
                hashData[context.pageIndexQueryStringKey] = 1;
                $.telligent.evolution.url.hashData(hashData);
            }
            setContent(context, loadingHtml.replace(/\{LoadingText\}/g, context.loadingText));
            $.telligent.evolution.get({
                url: context.loadCommentsUrl,
                data: data,
                success: function (response) {
                    if (response) {
                        setContent(context, response);
                    }
                },
                defaultErrorMessage: context.errorText,
                error: function (xhr, desc, ex) {
                    setContent(context, errorHtml.replace(/\{ErrorText\}/g, desc));
                }
            });
        },
        setContent = function (context, html) {
            var commentsContentFragment = $(context.widget).find('.content-fragment-content:first');
            var bflBlogPostId = $('#bflBlogPostId', commentsContentFragment);
            $(commentsContentFragment).empty().append(bflBlogPostId).append(html);
        },
		deletePostComment = function (deleteVerificationText, blogId, blogPostId, event) {
		    if (confirm(deleteVerificationText)) {
		        var commentId = $(event).data('commentid');
		        $.telligent.evolution.del({
		            url: $.telligent.evolution.site.getBaseUrl() + 'api.ashx/v2/blogs/{BlogId}/posts/{BlogPostId}/comments/{CommentId}.json',
		            data: {
		                BlogId: blogId,
		                BlogPostId: blogPostId,
		                CommentId: commentId
		            },
		            success: function (response) {
		                $(event).parents('li#commentItem' + commentId + ':first').hide();
		            }
		        });
		    }
		};

    $.telligent.evolution.widgets.blogFeedbackList = {
        register: function (context) {
            $(document).bind('telligent_blogs_commentposted', function (e, message) {
                load(context);
            });
        },
        loadContent: function (context) {
            load(context);
        },
        executeDeletePostComment: function (link, deleteVerificationText, blogId) {
            var blogPostId = $('#bflBlogPostId').val();
            deletePostComment(deleteVerificationText, blogId, blogPostId, $(link));
            return false;
        }
    };

})(jQuery);