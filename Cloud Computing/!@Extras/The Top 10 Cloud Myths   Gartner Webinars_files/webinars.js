// Webinars.js


 function gotoRegUrl(reg_url) {
  location.replace(reg_url);
 }

 function attendWebinar(resId, commId, channelId, srcId){
  //if(srcId==="null") var srcId ="";
  //alert("resId= " + resId + ', commId= ' +commId+ ', channelId= ' +channelId+  ', srcId = ' +srcId );

    $.ajaxSetup({ cache: false });
    $.ajax( {
      type : 'GET',
      url: '/webinar/' + resId + '/attend',
      data : {commId: commId, channelId: channelId, aeId: null, srcId:srcId, campaignId:null},
      success : function(htmlVal) {
        //alert("htmlVal= " + htmlVal);
        if(htmlVal!=null) window.location.href=htmlVal;
      }
 });
 }

function populateWebinarShare(resId){
  $.ajaxSetup({ cache: false });
  $.ajax( {
    type : 'GET',
    //url: app+'/document/' + documentId + '/prepareShare',
    url: '/webinar/' + resId + '/prepareShare',
    data : {},
    success : function(htmlVal) {
      $('div[id^="webinar-share-modal"]').html(htmlVal);
      $('.flat-design').parent().addClass('widerBox');
      $('#document-share-emails').on('focus', function(e) {
        var inputVal = $('#document-share-emails').val();
        if (inputVal == 'Separate multiple addresses with semicolon') {
          $('#document-share-emails').val('');
          $('#document-share-emails').removeClass('default-input-value');
          e.stopPropagation();
          e.preventDefault();
        };
      });
      $('#document-share-emails').on('blur', function(e) {
        var inputVal = $('#document-share-emails').val();
        if (inputVal == '') {
          $('#document-share-emails').val('Separate multiple addresses with semicolon');
          $('#document-share-emails').addClass('default-input-value');
          e.stopPropagation();
          e.preventDefault();
        };
      });
      $('#message-box-link').on('click', function(e) {
        $('#message-box').toggleClass('hide');
        e.stopPropagation();
        e.preventDefault();
      });
    $("#shareForm").validationEngine();
    }
  });
}


function shareWebinar(resId, emails, message){
 // alert("Id = " + resId + "::emails=" + emails + "::message = " + message);
  $.ajaxSetup({ cache: false });
  $.ajax( {
    type : 'POST',
    url:'/webinar/' + resId + '/share',
    data : {emails: emails, message: message},
    done : function(htmlVal) {
    }
  });
  $('#webinar-share-modal').modal('toggle');
  return false;
}

$(function() {
  if ($("#shareForm").validationEngine('validate')) {
    $('a.webinar-share-btn').off("click").on("click", function(){
    //alert("in webinar share");
      populateWebinarShare($(this).attr('data-resid'));
      $('#webinar-share-modal').modal('toggle');
    });
  };
});
           