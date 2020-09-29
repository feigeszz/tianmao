define([
    'jquery'
], function() {
    return {
        init: function() {
            let $num = $('.p3 li').length
            $.ajax({
                type: "get",
                url: "http://localhost/js2/tianmao/php/alldata.php",
                dataType: "json",
                success: function(res) {
                    // console.log(res);
                    // console.log($num);
                    let str = '';
                    let strlem = '';
                    res.forEach(ele => {
                        str += `<li class="xuanran">
                                <a href="">
                                    <img src="${ele.url}" class="i6">
                                   <p>${ele.title}</p>
                                   <span class="jg">￥${ele.price}</span>
                                    </a>
                                </li>`
                    });
                    $.each(res, function(i, value) {
                        if (i < 8) {
                            strlem += `<li>
                            <a href="" class="g">
                                <img src="${value.url}" class="i6">
                                <p>${value.title}</p>
                                <span class="jg">￥${value.price}</span>
                            </a>
                        </li>`
                        }
                    })
                    $('.wonderful ul').html(str);
                    $('.p3').html(strlem);

                }
            });
            //二级菜单
            $('.caidan li').hover(function() {
                $(this).addClass('active').siblings().removeClass('active');
                $('.item').eq($(this).index()).show().siblings('.item').hide();
                $('.cartlist').show();
            }, function() {
                $('.cartlist').hide();
            });
            $('.cartlist').hover(() => {
                $('.cartlist').show();
            }, () => {
                $('.cartlist').hide();
            });
            //楼梯效果
            $(window).on('scroll', function() {
                let $top = $(window).scrollTop();
                $top >= 600 ? $('.louti').show() : $('.louti').hide();
                $('.louceng').each(function(index, ele) {
                    let top1 = $(ele).offset().top + $(ele).height() / 3;
                    if (top1 > $top) {
                        let $bc = $(ele).attr('data-bgcl');
                        let $mr = "rgba(0, 0, 0, .6)";
                        $('.louti .li8').eq(index).css("background-color", $bc).siblings('.li8').css("background-color", $mr);
                        return false;
                    }
                })


            });
            $('.louti .li8').on('click', function() {
                let $bgc = $('.louceng').eq($(this).index()).attr('data-bgcl');
                $(this).css('background-color', $bgc);
                let loucengtop = $('.louceng').eq($(this).index() - 1).offset().top;
                $('html,body').animate({
                    scrollTop: loucengtop
                })
            })

            $('.louti .last').on('click', function() {
                $('html,body').animate({
                    scrollTop: 0
                })
            });
            //轮播图
            $(function() {
                //点击按钮切换页面
                let index = 0;
                let timer = null;
                let tz = $('.ul0 li').length - 1;
                $('.slider .slk').on('click', function() {
                    $(this).addClass('active').siblings().removeClass('active');
                    let $that = parseInt($(this).index());
                    $('.ul0').animate({
                        'left': parseInt($('.ul0 li').css('width')) * -$that
                    }, 300)
                });
                //鼠标移入
                $(' .lunbo').on('mouseover', function() {
                        clearInterval(timer);
                        $('.left').css({
                            'display': 'block'
                        });
                        $('.right').css({
                            'display': 'block'
                        });
                    })
                    //鼠标移出
                $(' .lunbo').on('mouseout', function() {
                    clearInterval(timer);
                    $('.left').css({
                        'display': 'none'
                    });
                    $('.right').css({
                        'display': 'none'
                    });
                    timer = setInterval(function() {
                        $('.right').trigger('click');
                        fn();
                    }, 2000);

                })
                $('.right').on('click', function() {
                    if (index == tz) {
                        index = 0;
                        $('.ul0').css({
                            'left': 0
                        })
                    }
                    index++;
                    $('.ul0').stop(true).animate({
                        'left': parseInt($('.ul0 li').css('width')) * -index
                    });
                    fn();
                    fs();
                });
                $('.left').on('click', function() {
                    if (index == 0) {
                        index = tz;
                        $('.ul0').css({
                            'left': parseInt($('.ul0 li').css('width')) * -tz
                        })
                    }
                    index--;
                    $('.ul0').stop(true).animate({
                        'left': parseInt($('.ul0 li').css('width')) * -index
                    });
                    fn();
                    fs();
                });
                //设定计时器，让图片自动轮播
                timer = setInterval(function() {
                    $('.right').trigger('click');
                    fn();
                    fs();
                }, 5000);
                //图片切换时对应的ol li也切换
                function fn() {
                    $('.ul0 li').eq(index).addClass('active').siblings().removeClass('active');
                    if (index == tz) {
                        $('.ul0 li').eq(0).addClass('active').siblings().removeClass('active');
                    }
                }

                function fs() {
                    //#e5e5e5
                    switch (index) {
                        case 0:
                            $('.content>.banner').css('background-color', '#e5e5e5');
                            break;
                        case 1:
                            $('.content>.banner').css('background-color', '#a13600');
                            break;
                        case 2:
                            $('.content>.banner').css('background-color', '#a13600');
                            break;
                        case 3:
                            $('.content>.banner').css('background-color', '#e5e5e5');
                            break;
                        case 4:
                            $('.content>.banner').css('background-color', '#d7133b');
                            break;
                        case 5:
                            $('.content>.banner').css('background-color', '#e8e8e8');
                            break;


                    }
                };
            });

        }
    }
});