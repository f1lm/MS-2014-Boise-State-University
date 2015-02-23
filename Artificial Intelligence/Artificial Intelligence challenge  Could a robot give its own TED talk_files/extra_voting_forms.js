///////////////////////////////////////////////////////////////////////////////
// NOTE 1: The radiobutton-based forms are handled a bit oddly. The handling
// of these forms is based on the assumption that the radiobuttons are not
// displayed. All click events are handled through the radiobutton's label.
//
// Classes are assigned to the labels based on their state-- clickable,
// not clickable, or already-clicked. The CSS associated with these classes
// change the appearance of these labels based on which classes are assigned.
// Therefore, the Javascript herein concerns itself with changing the classes
// assigned to labels, and leaves the display to CSS.
//
// The "select"-based dropdown boxes are not handled in any unorthodox manner.
// They're pretty straightforward.
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// NOTE 2: Thanks to the brain-dead nature of Internet Explorer CSS selectors,
// all classes must be aggragated into a single class.
//
// An element in Internet Explorer can have multiple classes, but you can't build
// CSS selectors with multiple classes. For instance, assume an element E1 with
// class="green blue red", and an element E2 with class="red". The CSS selector
// S1 ".green .red" will select *BOTH* E1 and E2 in Internet Explorer. This is
// a fairly disasterous bug, in that it screws up our combinational logic.
//
// To get around that, aggregate the classes into a single "super-class."
// This super-class is built from the other assigned classes. So, there are three
// types of classes:
//
//    Direction: "karma_up" | "karma_down"
//    Clicked:   "karma_clicked"
//    Clickable: "karma_clickable" | "karma_not_clickable"
//
// Three distinct bits = eight possible combinations:
//
//       karma_up_clicked_clickable
//       karma_up_not_clicked_clickable
//       karma_up_clicked_not_clickable
//       karma_up_not_clicked_not_clickable
//       karma_down_clicked_clickable
//       karma_down_not_clicked_clickable
//       karma_down_clicked_not_clickable
//       karma_down_not_clicked_not_clickable
//
// SEE karma_aggregate_classes for combinational logic
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// This is called when a form is submitted.
var KarmaSendForm = function() {
  var form = $(this);
  var args = {};
  var destination = form.find("input[@name=js_destination]").val();
  var karma_url=Drupal.settings.extra_voting_forms.base_path + 'extra_voting_forms/handle';
  var karma_timeout=Drupal.settings.extra_voting_forms.jquery_timeout;

  // If 'destination' is defined, we need to load the destination page 
  // rather than submit the vote.
  // This is used to redirect to a login page, for example.
  if (  destination ) {
    // top.location = Drupal.settings.extra_voting_forms.base_path + Drupal.settings.extra_voting_forms.login_page + '?destination=' + destination;
    top.location = '/' + Drupal.settings.extra_voting_forms.login_page + '?destination=' + destination;
    return false;
  }

  // The class "tmpClicked" is a simple state variable. It is added as soon 
  // as a label is clicked, and removed only once the vote has succeeded or 
  // failed. In this way, pending votes are tracked.

  // If an element exists with both the "karma_clicked" and the "tmpClicked", 
  // then the user has cast the same vote again. Ignore it. 
  else if ( form.find('.tmpClicked').length > 0 ) {
    var tmpclicked = $(form.find('.tmpClicked')[0] );
    tmpclicked.removeClass('tmpClicked');
    if ( karma_clicked_indicator( tmpclicked ) == 'clicked' ) {
      return false;
    }
    else {
      tmpclicked.addClass('tmpClicked');
    }
  }
  // Process the vote.
  // Marshall all AJAX arguments

  args.karma_vote   = form.find(":selected").val() || form.find(":checked").val();
  args.oid     = form.find("input[@name=oid]").val();
  args.otype     = form.find("input[@name=otype]").val();
  args.form_type     = 'ajax';

  form.addClass("karma_sending");
  if (Drupal.settings.extra_voting_forms.hide_karma_form) {
    if (form.hasClass("karma_form_promoted")) {
      form.removeClass("karma_form_promoted");
      var karma_form_promoted_REMOVED=1;
    }
    if (form.hasClass("karma_form")) {
      form.removeClass("karma_form");
      var karma_form_REMOVED=1;
    }
  }

  // Send the request  
  $.ajax({

    data    : args,
    url     : karma_url,
    type    : 'POST',
    dataType: 'json',
    timeout : karma_timeout,
    success : function(json){
      var ts;
      for(var x in json) {args[x] = json[x];}

      if (karma_form_promoted_REMOVED==1) {
        form.addClass("karma_form_promoted");
      }
      if (karma_form_REMOVED==1) {
        form.addClass("karma_form");
      }

      form.removeClass("karma_sending");

      // If there's an error, remove "tmpClicked", as the request is no 
      // longer pending. 
      if (json.error) {
        form.find(".tmpClicked").removeClass("tmpClicked");
        alert(json.error);
      } else {

        // On success, disable the appropriate forms (SEE KarmaStripForm 
        // for more details).
        // Also, ensure only the currently-clicked button has the state 
        // "karma_clicked". Remove "tmpClicked", as the request is 
        // no longer pending.
        var tmpclicked = form.find(".tmpClicked");
        form.addClass("karma_success");
        form.find("label").each( function() { karma_clicked( $(this), "not_clicked"); } )
        tmpclicked.each( function() { { karma_clicked( $(this), "clicked")  } } );
        KarmaStripForm(form,args);
      }
    },
    error : function(xhr,msg){
      // If there's an error, remove "tmpClicked", as the request is no longer pending. 

      form.find(".tmpClicked").removeClass("tmpClicked");
      if (xhr.status==404||!msg) {
        alert("Karma Error: Communication (0)");
      } else {
        alert("Karma Error: "+msg);
      }
    },
    complete: function(xhr,stat) {
      (function(form,args){
        window.setTimeout(function(){
          form.removeClass("karma_sending");

          if (karma_form_promoted_REMOVED==1) {
            form.addClass("karma_form_promoted");
          }
          if (karma_form_REMOVED==1) {
            form.addClass("karma_form");
          }
        },karma_timeout);

      })(form,args);
    }
  });
  return false;
}


///////////////////////////////////////////////////////////////////////////////
// Given a form, disable the appropriate related forms.
var KarmaStripForm  = function(form,args) {

  // If the site is set to allow only a single vote, disable the target form.

  if (Drupal.settings.extra_voting_forms.only_one_vote) {
    // Disable the drop-down select elements by setting their "disabled" attribute
    form.find("select").attr("disabled","disabled");

    // For our radio-button based forms, the label is the clickable element. Select all labels in the target form.
    form.find("label")
      .each(function() { karma_clickable( $(this), 'not_clickable' ); } )

      // Finally, remove the 'click' event, so the label no longer responds to user input.
      .unbind('click');
  }

  // Find all forms associated with this node. Disable all other forms. This has the effect of
  // disabling *all* forms in an only_one_vote environment, or disabling all forms but the target
  // form in other environments.

  var fid = form.attr("id");

  // Modify the forms *only* if there is a valid karma score (in args.karma_aggregate)
  if ( args.karma_aggregate != "Undefined") {
    for ( var prefix in ( { 'w': 1, 'x': 1, 'y': 1, 'z': 1} ) ) {
      var did = prefix + args.otype + args.oid;

      // Update all the karma scores for this node
      $("#" + did + " span.karma_score").text(args.karma_aggregate);
      var did = prefix + args.oid;
      if ( did != fid ) {

        // Disable all drop-down select elements
        $("#" + did + " *").attr("disabled", "true");

        // Disable all radiobutton-based forms, via their clickable labels.
        $("#" + did + " label")
           .each(function() { karma_clickable( $(this), 'not_clickable' ); } )
          // Finally, remove the 'click' event, so the label no longer responds to user input.
          .unbind('click');
      }
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
// Add click events to the appropriate form elements. This occurs at document load time.
var KarmaRenderForm = function() {
  var form   = $(this);
  var submit = form.find("input[@type=submit]");

  // Skip this form if it's disabled.
  if (! submit.attr("disabled")) {

    // Remove checks on radiobuttons.
    form.find(":checked").attr("checked", false );

    // Add a simple "submit" event when a drop-down is selected.
    form.find("select").change(function(){form.submit();});

    // For radiobutton-based forms, add a slightly more complex click event
    // to the *label* of the radiobutton. The radiobuttons themselves are
    // not visible, so the *label* becomes the active element.

    form.find("label").click(function(){

      // If this radiobutton is not checked, do nothing. Basically, there are *two* click
      // events on each label. The first is generated when the label is clicked, but before
      // the radiobutton has been checked. The second is when the radiobutton is checked, which
      // occurs immediately after the first click event propogates.
      //
      // NOTE: "checked" here means "received the checkmark," and does not refer to validiation.

      form.find("#"+$(this).attr("for")).attr("checked", true );
      if($('.karma_sending').length > 0) {
  
        return;
      }
      // Add the "tmpClicked" class, to provide a state variable indicating a vote
      // submission is in progress for this label.

      $(this).addClass("tmpClicked");

      // Submit the form. This calls "KarmaSendForm".
      form.submit();
    });
  }
}

///////////////////////////////////////////////////////////////////////////////
function karma_up_down_indicator( element ) {
  if ( element.attr('class').substring(0,8) == "karma_up" ) {
    return "karma_up";
  }
  else {
    return "karma_down";
  }
}

///////////////////////////////////////////////////////////////////////////////
function karma_clickable_indicator( element ) {
  if ( element.attr('class').substr(-13) == "not_clickable" ) {
    return "not_clickable";
  }
  else {
    return "clickable";
  }
}

///////////////////////////////////////////////////////////////////////////////
function karma_clicked_indicator( element ) {
  if ( element.attr('class').substring(0,16) == "karma_up_clicked" ||
       element.attr('class').substring(0,18) == "karma_down_clicked" ) {

    return "clicked";
  }
  else {
    return "not_clicked";
  }
}

///////////////////////////////////////////////////////////////////////////////
function karma_clicked( element, clicked ) {
  var up_down = karma_up_down_indicator( element );
  var clickable = karma_clickable_indicator( element );
  element.removeAttr('class').attr( 'class', up_down + '_' + clicked + '_' + clickable );
  
}

///////////////////////////////////////////////////////////////////////////////
function karma_clickable( element, clickable ) {
  var up_down = karma_up_down_indicator( element );
  var clicked = karma_clicked_indicator( element );
  element.removeAttr('class').addClass( up_down + '_' + clicked + '_' + clickable );
}
///////////////////////////////////////////////////////////////////////////////
/*
var karma_comment_show = function() {
  var button = $(this);
  var parent = button.parent();

  if ( $(".karma_comment_show" ).find(this).length > 0 ) {
    button.removeClass("karma_comment_show");
    button.addClass("karma_comment_hide");
    parent.find("div").each( karma_restore_display );
  }
  else if ( $(".karma_comment_hide" ).find(this).length > 0 ) {
    button.removeClass("karma_comment_hide");
    button.addClass("karma_comment_show");
    parent.find("div").css('display', 'none');
  }
}

var karma_save_display = function() {
  var item = $(this);
  item.attr( "karma-save-display", item.css( 'display' ));
}

var karma_restore_display = function() {
  var item = $(this);
  var disp = item.attr( "karma-save-display" );
  if ( disp ) {
    item.css( "display", disp );
  }
}

var karma_hide_comment = function( val ) {
  var clicked = $(this);
  if ( val && typeof val != 'number' )
  {
    clicked = $(val);
  }
  var comment = clicked.parents( ".comment" );
  if ( comment.find(".karma_down.karma_clicked").length > 0 )
  {
    if ( !( comment.find(".karma_comment_show").length > 0) && !( comment.find(".karma_comment_hide" ).length > 0 )) {
      comment.find('div').each(karma_save_display);
      comment.find('.title').after("<span class='karma_comment_show'>&nbsp;&nbsp;</span>")
      comment.find('.karma_comment_show').click(karma_comment_show);
    }
    comment.find('div').css('display','none');
  }
}
*/

///////////////////////////////////////////////////////////////////////////////
// This is activated when the document is loaded.
$(function(){

  // Modify all karma_forms (even the promoted ones).
  $("form.karma_form,form.karma_form_promoted")

    // Call "KarmaSendForm" when the form is submitted. KarmaSendForm handles
    // all the AJAX magic.
    .submit(KarmaSendForm)

    // Send every form to "KarmaRenderForm" (which attaches click events to the form elements)
    .each(KarmaRenderForm);

  //$(".karma_clicked.karma_down").each(karma_hide_comment);
});
