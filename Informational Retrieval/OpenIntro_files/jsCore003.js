/*
If you download and use this code (including modified versions), you must
include this sentence and the following information at the top of your script:

Original:  David Diez via OpenIntro (2011)
Reference: openintro.org

You may use any code in this file under the following license:

Creative Commons Attribution-ShareAlike 3.0 United States (CC BY-SA 3.0)
http://creativecommons.org/licenses/by-sa/3.0/us/

The end of this sentence marks the end of the information required to report
at the top of a copied or modified version of this script.
*/

/*
-----------------
Table of Contents
-----------------

Close Gray Box
Form Character Counter
Check (Inputs)
- A1 Code
- Check Name
- Check Letters and Spaces Only
- Plain Text Field
- Check Commas and User IDs
- Check Email Message
- Check Discussion Message
- URL
- Email
- Password
- Check Markup
- Check Date Field
Confirmation Windows

*/


//=====> Close Gray Box <=====\\
function closeGrayBox(){
  $("#PUContent").html("");
  $("#grayCover").fadeOut(0);
  $("#grayCover").css("display", "none");
  $("#footerGrayCover").fadeOut(0);
  $("#footerGrayCover").css("display", "none");
}


//=====> Form Character Counter <=====\\
function countID(elem, minL, maxL){
  if(!maxL){
    var maxL  = 40;
  }
  var theID = "#" + elem + "Count";
  var theIN = $("#" + elem).val().length;
  if(maxL - theIN < 0){
    var temp = theIN - maxL;
    $(theID).html("<span style=\'color:red;\'>" + temp + "</span>");
  } else if(theIN < minL){
    var temp = maxL - theIN;
    $(theID).html("<span style=\'color:red;\'>" + temp + "</span>");
  } else {
    var temp = maxL - theIN;
    $(theID).html(temp);
  }
}


//=====> Check Number Field <=====\\
function fieldCheckNumber(fieldID, tR, minL, maxL, negativeOkay, required){
  var t  = $("#"+fieldID).val();
  var Pt = /^[0-9.]{1,1000}$/;
  if(negativeOkay){
    var Pt = /^[-]{0,1}[0-9.]{1,999}$/;
  }
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("The number must be between "+minL+" and "+maxL+" characters long");
    tR = false;
  } else if(!Pt.test(t)){
    var Pt = /^[-]{0,1}[0-9.]{1,999}$/;
    if(Pt.test(t)){
      $("#"+fieldID+"Error").html("The number cannot be negative");
    } else {
      $("#"+fieldID+"Error").html("This is not a number");
    }
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}


//=====> Check A1 Code <=====\\
function fieldCheckA1(fieldID, tR, minL, maxL, required){
  var t  = $("#"+fieldID).val();
  var Pt = /^[A-Z0-9]{1,1000}$/i;
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("The field must contain "+minL+" to "+maxL+" characters, including only letters and/or numbers");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("Must be "+minL+" to "+maxL+" characters, including only letters and/or numbers");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}


//=====> Check Name <=====\\
function fieldCheckName(fieldID, tR, minL, maxL, required){
  var t  = $("#"+fieldID).val();
  var Pt = /^[-A-Z ]{1,1000}$/i;
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("The field must contain "+minL+" to "+maxL+" characters, including only letters, dashes, and/or spaces");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("Must be "+minL+" to "+maxL+" characters, including only letters, dashes, and/or spaces");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}


//=====> Check Letters and Spaces Only <=====\\
function fieldCheckLettersSpaces(fieldID, tR, minL, maxL, required){
  var t  = $("#"+fieldID).val();
  var Pt = /^[A-Z ]{1,1000}$/i;
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("The field must contain "+minL+" to "+maxL+" characters, including only letters and/or numbers");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("Must be "+minL+" to "+maxL+" characters, including only letters and/or numbers");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}


//=====> Check Plain Text Field <=====\\
function fieldCheckPlainText(fieldID, tR, minL, maxL, required){
  var t  = $("#"+fieldID).val();
  var Pt = /^[-A-Z0-9 ,.]{1,1000}$/i;
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("The field must contain "+minL+" to "+maxL+" characters, including only letters, numbers, spaces, periods, commas, and dashes");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("Must be "+minL+" to "+maxL+" characters, including only letters, numbers, spaces, periods, commas, and dashes");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}


//_____ Check Rich Text Field _____\\
function fieldCheckRichText(fieldID, tR, minL, maxL, required){
  var t  = $("#"+fieldID).val();
  var Pt = /^[!@#$%^&*() 0-9A-Za-z;:?,.\'\"-]{1,1000}$/i; //'
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("The field must contain "+minL+" to "+maxL+" characters. Only basic characters are allowed.");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("Must be "+minL+" to "+maxL+" characters, including only letters, numbers, spaces, periods, commas, and dashes");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}


//=====> Check Commas and User IDs <=====\\
function fieldCheckCommasUserID(fieldID, tR, minL, maxL, required){
  var i = 0;
  var t = $("#"+fieldID).val();
  t = t.replace(" ", "");
  $("#"+fieldID+"Error").html("");
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else {
    t = t.split(",");
    if(t.length > maxL){
      $("#"+fieldID+"Error").html("You may only have up to " + maxL + " TAs");
      return false;
    } else if(t.length < minL){
      $("#"+fieldID+"Error").html("You must have at least " + minL + " TAs");
      return false;
    } else if(t.length > 0){
      var Pt = /^[A-Z0-9]{4,20}$/i;
      for(i=0; i < t.length; i++){
        if(!Pt.test(t[i])){
          $("#"+fieldID+"Error").html("List only user IDs of TAs, separated by commas");
          tR = false;
        }
      }
    }
  }
  return tR;
}


//_____ Check Email Message _____ \\
function fieldCheckEmailMessage(fieldID, tR, minL, maxL, required){
  var t  = $("#"+fieldID).val();
  t      = t.replace("`", "'");
  var Pt = /^[_=+\/~!@#$%^*()[\]{} \n\t0-9A-Za-z;:?,.<>\'\'\"-]{1,10000}$/i; // '
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("The field must contain "+minL+" to "+maxL+" characters");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("Must be "+minL+" to "+maxL+" characters, with no especially uncommon characters");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}


//=====> Check Discussion Message <=====\\
function fieldCheckDiscMessage(fieldID, tR, minL, maxL, required){
  var t  = $("#"+fieldID).val();
  t      = t.replace("`", "'");
  t      = t.replace(" ", " ");
  var Pt = /^[_=+\/~!@#$%^*)([\]{}| \n\t0-9A-Za-z;:?,.><\'\"-]{1,10000}$/i; // '
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("There must be "+minL+" to "+maxL+" characters");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("Must be "+minL+" to "+maxL+" characters, with no especially uncommon characters");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}




//=====> Check Full Text Field <=====\\
function fieldCheckFullText(fieldID, tR, minL, maxL, required){
  var t  = $("#"+fieldID).val();
  var Pt = /^[_=+\/~!@#$%^*)( 0-9A-Za-z;:,.?<>\'\"-]{1,10000}$/i; // '
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("The field must contain "+minL+" to "+maxL+" characters, where only the following special characters may be used: _ = + / ~ ! @ # % ^ * ( ) : ; &#39; &quot;");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("Must be "+minL+" to "+maxL+" characters, where only the following special characters may be used: _ = + / ~ ! @ # % ^ * ( ) : ; &#39; &quot;");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}


//=====> Check URL <=====\\
function fieldCheckURL(fieldID, tR, minL, maxL, required, defaultVal){
  var t  = $("#"+fieldID).val();
  var Pt = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
  if((t == defaultVal || t == "") && !required){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("The URL must contain "+minL+" to "+maxL+" characters");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("The URL does not appear to be valid. Make sure it has no fewer than "+minL+" to "+maxL+" characters, and be certain the URL starts with something like &quot;http://&quot;.");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}



//=====> Check Email <=====\\
function fieldCheckEmail(fieldID, tR, maxL, required){
  var t  = $("#"+fieldID).val();
  var Pt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if(t == "" && !required){
    $("#"+fieldID+"Error").html("");
  } else if(t.length > maxL){
    $("#"+fieldID+"Error").html("The email address cannot be longer than "+maxL+" characters");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("The email does not appear to be valid");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}


//=====> Check Password <=====\\
function fieldCheckPassword(fieldID, userid, tR){
  var t  = $("#"+fieldID).val();
  var tL  = t.toLowerCase();
  var i   = 0;
  var ii  = 0;
  var K   = 1;
  var tH  = '';
  var tE  = '';
  for(i=1; i < t.length; i++){
    tH = t.substring(0,i);
    ii = i+1;
    tE = t.substring(i,ii);
    if(tH.indexOf(tE) == -1){
      K++;
    }
  }
  var u   = userid;
      u   = u.toLowerCase();
  var u1  = u.substring(0,3);
  var u2  = u.substring(2,5);
  var u3  = u.substring(3);
  var o01 = 'abc';
  var o02 = 'cde';
  var o03 = '123';
  var o04 = '456';
  var o05 = 'password';
  var Pt  = /^[-!@#$%^&*()_+=<>?A-Za-z0-9]{7,20}$/;
  var errorMessage = "The password must be 7 to 20 characters (letters, numbers, shift-number characters, dashes, plus-signs, equal-signs, &gt;, &lt;, and ?)";
  if(t.length < 7 || t.length > 20){
    $("#"+fieldID+"Error").html(errorMessage);
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html(errorMessage);
    tR = false;
  } else if(tL.indexOf(u1) > -1 || tL.indexOf(u2) > -1 || tL.indexOf(u3) > -1){
    tR = false;
    $("#"+fieldID+"Error").html("Your password cannot contain pieces of your username");
  } else if(tL.indexOf(o01) > -1 || tL.indexOf(o02) > -1 || tL.indexOf(o03) > -1 || tL.indexOf(o04) > -1){
    tR = false;
    $("#"+fieldID+"Error").html("The password contains a simple string that is not permitted (e.g. abC or 123)");
  } else if(tL.indexOf(o05) > -1){
    tR = false;
    $("#"+fieldID+"Error").html("The password contains &quot;password&quot;, which is not permitted");
  } else if(K < 5){
    tR = false;
    $("#"+fieldID+"Error").html("The password has too few unique characters");
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}

/* ONLY THIS ITEM COMMENTED OUT
//=====> Verify Passwords Match <=====\\
function fieldCheckMatchingPassword(fieldID1, fieldID2){
  var t1 = $("#"+fieldID1).val();
  var t2 = $("#"+fieldID2).val();
  if(t1 != t2){
    $("#"+fieldID2+"Error").html("The passwords did not match");
    tR = false;
  } else {
    $("#"+fieldID2+"Error").html("");
  }
}
*/


//=====> Check Markup <=====\\
function fieldCheckMarkup(fieldID, tR, minL, maxL, required){
  var t  = $("#"+fieldID).val();
  var Pt = /^[\][{}_=+\/~!@#$%^&*|()\s\n\t0-9A-Za-z;:\'\"<>?,.\\-]{1,5000}$/i; // '
  if(!required && t == ""){
    $("#"+fieldID+"Error").html("");
  } else if(t.length < minL || t.length > maxL){
    $("#"+fieldID+"Error").html("The field must contain "+minL+" to "+maxL+" characters, including only letters, numbers, spaces, periods, commas, and dashes");
    tR = false;
  } else if(!Pt.test(t)){
    $("#"+fieldID+"Error").html("Must be "+minL+" to "+maxL+" characters, including only letters, numbers, spaces, periods, commas, and dashes");
    //$("#"+fieldID+"Error").html(t);
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}

//=====> Check Upload <=====\\
function fieldCheckUpload(fieldID, tR, minL, maxL, required){
  var t = $("#"+fieldID).val();
  if(t == ""){
    $("#"+fieldID+"Error").html("Please select a file");
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
    var dropRegex = /^.*\\/;
    var fName = t.replace(dropRegex, "");
    var exte  = t.split(".").pop();
    var okEs  = ["jpg", "gif", "png"];
    var extFound = false;
    var i=0;
    for(i=0; i < okEs.length; i++){
      if(okEs[i] == exte){
        extFound = true;
      }
    }
    var fileNameRegex = /^[-0-9A-Z._ ]{1,40}$/i;
    if(!fileNameRegex.test(fName)){
      $("#"+fieldID+"Error").html("The file name, including the extension, may only include 1-40 letters, numbers, dashes, periods, underscores, and spaces");
      tR = false;
    } else if(!extFound){
      tR = false;
      var mess = "Sorry, only images (.jpg, .png, .gif) are permitted";
      $("#"+fieldID+"Error").html(mess);
    }
  }
  return tR;
}




//=====> Validate Date <=====\\
function validateDate(due){
  var mess  = "";
  var DDcap = new Array();
  DDcap[0]  = 31;
  DDcap[1]  = 28;
  DDcap[2]  = 31;
  DDcap[3]  = 30;
  DDcap[4]  = 31;
  DDcap[5]  = 30;
  DDcap[6]  = 31;
  DDcap[7]  = 31;
  DDcap[8]  = 30;
  DDcap[9]  = 31;
  DDcap[10] = 30;
  DDcap[11] = 31;
  var PMM  = /^[0-9]{1,2}/;
  var MM   = parseInt(PMM.exec(due), 10);
  var PTDD = /\/[0-9]{1,2}\//;
  var TDD  = PTDD.exec(due);
  var PDD  = /[0-9]{1,2}/;
  var DD   = parseInt(PDD.exec(TDD), 10);
  var PYY  = /[0-9]{1,2}$/;
  var YY   = parseInt(PYY.exec(due), 10);
  var t    = new Date();
  var bau  = true;
  if(YY < 13){
    mess += "Please enter a year after 2012";
  }
  if(MM > 12 || MM < 1){
    mess += "Please enter a valid month";
  }
  if(DD > DDcap[MM-1] && !(DD==29 && MM==2 && YY % 4 == 0) || DD == 0){
    mess += "The date you entered is not valid for the month you selected";
  }
  return mess;
}


//_____ Validate StandardDate _____\\
function validateStandardDate(due){
  var mess = "";
  if (due == "") {
    return mess;
  }
  var patt = /^20[0-9]{2}\/[01][0-9]\/[0-3][0-9]$/;
  var tmp  = patt.exec(due);
  if (tmp == "") {
    return "Date must take form YYYY/MM/DD.";
  }
  return tmp;

  var DDcap = new Array();
  DDcap[0]  = 31;
  DDcap[1]  = 28;
  DDcap[2]  = 31;
  DDcap[3]  = 30;
  DDcap[4]  = 31;
  DDcap[5]  = 30;
  DDcap[6]  = 31;
  DDcap[7]  = 31;
  DDcap[8]  = 30;
  DDcap[9]  = 31;
  DDcap[10] = 30;
  DDcap[11] = 31;
  var PYY  = /^[0-9]{1,4}/;
  var YY   = parseInt(PYY.exec(due), 10);
  var PTMM = /\/[0-9]{1,2}\//;
  var TMM  = PTMM.exec(due);
  var PMM  = /[0-9]{1,2}/;
  var MM   = parseInt(PMM.exec(TMM), 10);
  var PDD  = /[0-9]{1,2}$/;
  var DD   = parseInt(PDD.exec(due), 10);
  var t    = new Date();
  //var et   = (t.getTime() - t.getMilliseconds())/1000 - 1293840000; // time since 0:00:00 on Jan 1, 2011
  var bau  = true;
  if(YY < 2013){
    mess = "Date must take form YYYY/MM/DD. ";
  }
  if(MM > 12 || MM < 1){
    mess = "Date must take form YYYY/MM/DD. ";
  }
  if(DD > DDcap[MM-1] && !(DD==29 && MM==2 && YY % 4 == 0) || DD == 0){
    mess += "The date you entered is invalid for the month selected";
  }
  return mess;
}


/*
//=====> Check Date Field <=====\\
function fieldCheckDate(fieldID, tR, required){
  if(!required){
    var required = false;
  }
  var t  = $("#"+fieldID).val();
  var Pt = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,2}$/;
  if((t == "" || t == "MM/DD/YY") && !required){
    $("#"+fieldID+"Error").html("");
  } else if(Pt.test(t)){
    $("#"+fieldID+"Error").html("");
    var mess = validateDate(t);
    $("#"+fieldID+"Error").html(mess);
    if(mess != ""){
      tR = false;
    }
  } else {
    $("#"+fieldID+"Error").html("Please use the following format: MM/DD/YY");
    tR = false;
  }
  return tR;
}


//=====> Verify Input Checked <=====\\
function fieldCheckChecked(fieldID, message, required){
  if(!message){
    var message = "Please read and agree to the <a href=\"terms.php\" target=\"_blank\">Terms and Conditions</a> if you would like to register";
  }
  if(!required){
    var required = false;
  }
  var t  = $("#"+fieldID).is(':checked');
  if(!t){
    $("#"+fieldID+"Error").html(message);
    tR = false;
  } else {
    $("#"+fieldID+"Error").html("");
  }
  return tR;
}


*/