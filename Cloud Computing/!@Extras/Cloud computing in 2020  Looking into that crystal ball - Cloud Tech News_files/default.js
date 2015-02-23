function showVisibleSlide(id, focus) {
    var obj = $(id);
    obj.animate({ height: "show", opacity: "show" }, 200, function () {
        if (focus) $(focus).focus();
    });
}


function hideVisibleSlide(id, focus) {
    var obj = $(id);
    obj.animate({ height: "hide", opacity: "hide" }, 200, function () {
        if (focus) $(focus).focus();
    });
}

function toggleVisibleSlide(id, focus) {
    var obj = $(id);
    console.log(obj);
    console.log(obj[0].style.display);
    if (obj[0].style.display == "none" || obj[0].style.display == "") {
        console.log("Not shown, displaying...");
        showVisibleSlide(id, focus);
    }
    else {
        console.log("Hiding...");
        hideVisibleSlide(id, focus);
    }
}

/* Taken from http://www.devcurry.com/2009/08/limit-number-of-characters-in-textarea.html with thanks */
function limitChars(textid, limit, infodiv) {
    var text = $('#' + textid).val();
    var textlength = text.length;

    if (textlength > limit) {
        $('#' + infodiv).html('You cannot write more then ' + limit + ' characters!');
        $('#' + textid).val(text.substr(0, limit));
        return false;
    }
    else {
        $('#' + infodiv).html('You have ' + (limit - textlength) + ' characters left.');
        return true;
    }
}

$(document).ready(function () {
    //$("#sidebar-review").tabs({ fx: { duration: 100, opacity: 'toggle' } });
    //$("#sidebar-latest").tabs();
    //$("#rotator").tabs({fx:{opacity: "toggle"}}).tabs("rotate", 3000);
//     Cufon.replace('div#content h2, div#sidebar h2', {
//        fontFamily: 'FranklinGothic DemiCond',
//        hover: true
//     });
    $('body#resources textarea#id_description').keyup(function () {
        var len = this.value.length;
        if (len >= 480) {
            this.value = this.value.substring(0, 480);
        }
//         $('#charLeft').text(150 - len);
    });
//     Cufon.now();

    // Get Google Analytics to record clicks on a LinkedIn share button
    $(window).bind('load', function () {
        $('.IN-widget').click(function () {
            var url = $(this).closest("div").children("script").attr("data-url");
//             console.log(url);
            _gaq.push(['_trackSocial', 'LinkedIn', 'Share', url]);
        });
    });

    $('aside.categories table').find('tr:gt(5)').addClass('toggletr').hide()
        .end().append(
            $('<tr><td class="show_more_btn" colspan="3">Show more »</td></tr>').click(function () {
                $(this).siblings('.toggletr').toggle();
                var btn = $(this).find('.show_more_btn');
                if (btn.hasClass('expanded')) {
                    btn.text('Show more »');
                    btn.removeClass('expanded');
                } else {
                    btn.text('Show less «');
                    btn.addClass('expanded');
                }
            })
        );

    var emailer_checkbox = $('form.commentform input#id_emailer');
    emailer_checkbox.click(function () {
        toggleVisibleSlide('form.commentform .details .emailer_fields');
    });

    if (emailer_checkbox.is(":checked"))
    {
        $('form.commentform .details .emailer_fields').css("display", "block");
    }
});

var date;

function getShortMonth(month) {
    switch (month) {
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'Jul';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Dec';
        default:
            return false;
    }
}

$(function () {
    $('#aside_calendar')
        .datePicker(
        {
            createButton: false,
            displayClose: true,
            closeOnSelect: false,
            selectMultiple: false,
            inline: true,
            startDate: '01/01/1996'
        }
    )
        .bind(
        'click',
        function () {
            $(this).dpDisplay();
            this.blur();
            return false;
        }
    )
        .bind(
        'dateSelected',
        function (e, selectedDate, $td, state) {
            var month = selectedDate.getMonth();
            window.location.href = '/events/' + selectedDate.getFullYear() + '/' + getShortMonth(month).toLowerCase() + '/';
        }
    );
});
