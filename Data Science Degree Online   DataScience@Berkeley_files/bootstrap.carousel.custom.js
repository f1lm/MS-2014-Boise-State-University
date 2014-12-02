jQuery(document).ready(function() {
    if (jQuery('body').hasClass('home-slide') == true) {
        $('.slider_classic #feature-slider').carousel('cycle');

        $('.slider_sidebar #feature-slider').carousel({
            interval: 8000
        });

        /*
            Bootstrap Carousel - add pagination tracking and related active class
            https://forrst.com/posts/Adding_pagination_to_bootstrap_carousel-ULn#comment-land
        */

        $('.carousel[id]').each(
            function() {
                var html = '<div class="carousel-nav carousel-no-sidebar" data-target="' + $(this).attr('id') + '"><ul>';

                for(var i = 0; i < $(this).find('.item').size(); i ++) {

                        if(i == 0) {
                                html += '<li class="active"><a class="active"';
                        } else {
                            html += '<li><a';
                        }

                        html += ' href="#"></a></li>';
                }

                html += '</ul></li>';
                $('#featcontmain').append(html);
            }
        ).bind('slid',
            function(e) {
                var nav = $('.carousel-nav[data-target="' + $(this).attr('id') + '"] ul');
                var index = $(this).find('.item.active').index();
                var item = nav.find('li').get(index);

                nav.find('li a.active').removeClass('active');
                nav.find('li.active').removeClass('active');
                $(item).find('a').addClass('active');
                $(item).addClass('active');
            }
        );

        $('.carousel-nav a').bind('click',
            function(e) {
                var index = $(this).parent().index();
                var carousel = $('#' + $(this).closest('.carousel-nav').attr('data-target'));

                carousel.carousel(index);
                e.preventDefault();
            }
        );
        $('.carousel-control.play').click(function (evt) {

            evt.preventDefault();
            $('#feature-slider').carousel('cycle');
            $(this).carousel('pause');
            $('.carousel-control.play').hide();
            $('.carousel-control.pause').show();
        })

        $('.carousel-control.pause').click(function (evt) {
            $('#feature-slider').carousel('pause');
            evt.preventDefault();
            $('.carousel-control.play').show();
            $('.carousel-control.pause').hide();
        })    
        $('#feature-slider .carousel-inner div:first-child').addClass('active');
    }
});