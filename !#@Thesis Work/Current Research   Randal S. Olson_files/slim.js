$(document).ready(function(){

    var domain = '//wl.figshare.com'
    var article_id = $('#art_id').val()
    var w_w, w_h;

    var load_embed=function(){
         w_w = $(window).width()
         w_h = $(window).height()

        //if its different than 'resposive-ok' do MAGIC
        if($('.figshare-embed').css('content')!="responsive-ok"){
            var break_points = [170, 230, 340, 460]

            for (var i = 0; i < break_points.length; i++) {
                if(w_w >= break_points[i]){
                    $('html').addClass('w-'+break_points[i])
                }
            };
        }

        $('.figshare-embed').attr('style','content:normal;');
        //-------------------------------------------------------
        // check if we have a fileset
        //-------------------------------------------------------
        var is_fileset = $('.is-fileset').val()


        //now calculate the embed height
        //window height - footer height - 2px border
        $('.fe-embed').height(
            w_h-$('.fe-footer').height()-2-$('.fe-head').height()
        )
        $('.fe-embed iframe').attr('src',$('.fe-embed iframe').attr('src'))

        //now we get the article id

        //max height for the embed code/cie code
        $('.fsc-code, .fse-code').css('max-height',w_h*0.4)

        //we position the embed/cite box horizonatly
        $('.fs-overlay').css({
            'width':w_w*0.8,
            'margin-left':-w_w*0.4
        })

        $('.fe-embed').css('width', w_w-2)

        if(is_fileset){

            //-------------------------------------------------------
            // if we have a fileset we will check how many chars
            // will the filename can support
            //-------------------------------------------------------
            var max_f_chars = 0
            if(w_w>=170)
                max_f_chars = 8
            if(w_w>=230)
                max_f_chars = 16
            if(w_w>=340)
                max_f_chars = 22
            if(w_w>=460)
                max_f_chars = 32

            var filenames = $('.fef-name')
            for (var i = 0; i < filenames.length; i++) {
                var jq_obj = $(filenames[i])
                var original = jq_obj.html()
                var get_ext = original.split('.')
                var ext = get_ext[get_ext.length-1]
                var new_fn = ""
                if(original.length>max_f_chars){
                    new_fn = original.substring(0, max_f_chars-ext.length-3)+'...'+ext
                }else{
                    new_fn = original
                }
                jq_obj.html(new_fn)
            };


        }
    }
    $('.fe-cta').on('click', '.fe-share', function(){
        el=$('#figshare-share')
        $.getJSON(domain+'/articles/'+article_id+'/share?get=share', function(json) {
            data=json
            $('.fs-main-overlay .fs-social').html(data.output)
            stLight.options({publisher:'229707e0-c139-406b-b360-7aaeca60e334'});
            stButtons.locateElements();
        })
            el.fadeIn()
    });
    $('#figshare-share').on('click', '.get-embed', function(){
        var show_title = $('#show_h').val()
        var data ={}
        $.getJSON(domain+'/articles/'+article_id+'/share?get=embed&show_title='+ show_title +'&width=' + w_w + '&height=' + w_h, function(json) {

            data=json
            $('.fse-code').text(data.output)
            $('.fs-main-overlay').fadeOut()
            $('.fs-embed-overlay').fadeIn()
            var el = $('.fs-embed-overlay')
            el.css({
                    'margin-top':-(el.height()/2)
                })
        })
    });
    $('#figshare-share').on('click', '.get-cite', function(){
        var data ={}
        $.getJSON(domain+'/articles/'+article_id+'/share?get=cite', function(json){
            data=json
            $('.fsc-code').html(data.output)
            var el = $('.fs-cite-overlay')
            $('.fs-main-overlay').fadeOut()
            el.fadeIn()
            el.css({
                'margin-top':-(el.height()/2)
            })
        })
    });
    $('#figshare-share').on('click', '.fs-close a', function(){
        $('#figshare-share').fadeOut()
        $('.fs-overlay').fadeOut()
        $('.fs-main-overlay').fadeIn()
    });

    var w_hi = $(window).height()

    if(w_hi>0) {
        load_embed()
    } else {
        var count = 0;
        var load_all = setInterval(function () {
            var w_hi = $(window).height()
            if(w_hi>0) {
                clearInterval(load_all)
                load_embed()
            }
            if(count>6) {
                clearInterval(load_all)
            }
            count++;
        }, 1000)
    }

    })
