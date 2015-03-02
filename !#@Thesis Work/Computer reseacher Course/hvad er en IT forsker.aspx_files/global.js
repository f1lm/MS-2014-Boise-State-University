function SubmitSearch(searchWords,langcode,language)
{
if (searchWords.length != 0)
    {
        //location.href = "/Search.aspx?cx=012247359196088331808%3Aopbgschux9e&cof=FORID%3A11&ie=ISO-8859-1&q=" + encodeURI(searchWords) + "&sa=S%F8g";
        jQuery(location).attr('href',"/Search.aspx?cx=012247359196088331808%3A"+langcode+"&cof=FORID%3A11&ie=UTF-8&q=" + encodeURI(searchWords) + "&sa=S%F8g&lr=lang_" + language);
        return false;
    }
}

function checkEnter(e, caller) //e is event object passed from function invocation
{
    var characterCode //literal character code will be stored in this variable

    if (e && e.which || e.which == 0) { //if which property of event object is supported (NN4)
        e = e
        characterCode = e.which //character code is contained in NN4's which property
    }
    else {
        e = event
        characterCode = e.keyCode //character code is contained in IE's keyCode property
    }

    if (characterCode == 13)//if generated character code is equal to ascii 13 (if enter key)
    {
        document.getElementById(caller).click();
        return false
    }
    else {
        return true
    }
}