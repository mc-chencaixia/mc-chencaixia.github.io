

    $(function(){
        
        $.ajax({
            url: 'tpls/subnav.html',
            dataType: 'html',
            async: false,
            success: function(data){
                $('.mc-subNav').html(data);
            }
        })

        $.ajax({
            url: 'tpls/header.html',
            dataType: 'html',
            async: false,
            success: function(data){
                $('#header').html(data);
            }
        })
            
        var $subNav = $('.mc-subNav');
        $('.logoBtn').on('click', function(){
            if($subNav.width()){                   
                $subNav.find('.panel-group').fadeOut();
                $subNav.addClass('subNavHide');
                $('.content').addClass('move');
                $('footer').addClass('move');
            }
            else{
                $subNav.removeClass('subNavHide');
                $subNav.find('.panel-group').show(700);
                $('.content').removeClass('move');
                $('footer').removeClass('move');
            }
            
        })


    })

    $(function(){
        /*
        // cookie保存选中的subNav
        if($.cookie('cookie1') && $.cookie('cookie2')){
            var cookie1 = $.cookie('cookie1');
            var cookie2 = $.cookie('cookie2');
            $('.mc-subNav .panel-default').eq(cookie2).find('a.collapsed').trigger('click').addClass('current-pHeading');
            $('.mc-subNav .panel-default').eq(cookie2).find('.list-group .list-group-item').eq(cookie1).addClass('current-item');
            $('.mc-subNav .panel-default .panel-title>a').on('click', function(){
                $(this).parents('.panel-default').siblings().find('.panel-title>a').removeClass('current-pHeading');
            })
        }
        $('.mc-subNav .list-group-item').on('click', function(){
            var item = $(this).index();
            var heading = $(this).parents('.panel-default').index();
            $.cookie('cookie1', item, {expires: 7});
            $.cookie('cookie2', heading, {expires: 7});
        })
        */
    })

