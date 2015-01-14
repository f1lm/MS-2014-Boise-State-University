/* EMAIL PROTECTOR v1.2.3 */
jQuery.fn.defuscate = function(){
    return this.each(function(){
        var peptitle= jQuery(this).attr('title');
        var pepemail = jQuery(this).html().replace(/\s*\(.+\)\s*/, "@");
        if (peptitle === ''){
            peptitle= pepemail;
        }
        jQuery(this).before('<a class="pep-email" href="mailto:' + pepemail + '">' + peptitle + "</a>").remove();
    });
};
jQuery(document).ready(function($) {
    jQuery('span.pep-email').defuscate();
});