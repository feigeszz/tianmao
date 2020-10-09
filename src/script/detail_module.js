define([
    'jquery', 'jcookie'
], function() {
    return {
        init: function() {
            let datasid = location.search.substring(1).split('=')[1];
            if (!datasid) {
                datasid = 1;
            }
            $.ajax({
                type: "get",
                url: "http://127.0.0.1/js2/tianmao/php/getsid.php",
                data: {
                    sid: datasid
                },
                dataType: "json",
                success: function(res) {
                    $('.smallpic').attr("src", res.url);
                    $('.smallpic').attr("sid", res.sid);
                    $('.bpic').attr("src", res.url);

                    $('.p-name').html(res.title);
                    $('.loadpcp').html(res.price);
                    let tp = res.piclisturl.split(',');
                    let str = '';
                    tp.forEach(ele => {
                        str += `<li class="li3"><img src="${ele}"/></li>`
                    });
                    $('.list .ul3').html(str);
                    hidearrow();

                }
            });
            //1.显示小放和大放
            $('.spic').hover(function() {
                    $('.sf').css({
                        visibility: 'visible'
                    });
                    $('.bf').css({
                        visibility: 'visible'
                    });
                    //2.计算放大镜的尺寸。利用公式来计算放大镜的尺寸
                    $('.sf').css({
                            width: $('.spic').outerWidth() * $('.bf').outerWidth() / $('.bpic').outerWidth() + 'px',
                            height: $('.spic').outerHeight() * $('.bf').outerHeight() / $('.bpic').outerHeight() + 'px'

                        })
                        //3.计算比例
                    let $bili = $('.bpic').outerHeight() / $('.spic').outerWidth();

                    //4.小图内鼠标移动
                    $('.spic').on('mousemove', function(ev) {
                        let left = ev.pageX - $('.wrap').offset().left - $('.sf').width() / 2;
                        let top = ev.pageY - $('.wrap').offset().top - $('.sf').height() / 2;
                        //限制范围
                        if (left <= 0) {
                            left = 0;
                        } else if (left > $('.spic').width() - $('.sf').width()) {
                            left = $('.spic').width() - $('.sf').width();
                        };
                        if (top <= 0) {
                            top = 0;
                        } else if (top > $('.spic').height() - $('.sf').height()) {
                            top = $('.spic').height() - $('.sf').height();
                        };
                        $('.sf').css({
                            left: left,
                            top: top
                        });
                        $('.bpic').css({
                            left: -$bili * left,
                            top: -$bili * top
                        });
                    });
                },
                function() {
                    $('.sf').css({
                        visibility: 'hidden'
                    });
                    $('.bf').css({
                        visibility: 'hidden'
                    });
                });
            $('.list .ul3').on('click', 'li', function() {
                let url2 = $(this).find('img').attr('src');
                $('.spic img').attr('src', url2);
                $('.bpic').attr('src', url2);
            });
            let lichang = 6;

            function hidearrow() {

                if ($('.list .ul3 li').length <= lichang) {
                    $('.right').css({
                        color: '#fff'
                    });
                }
            };
            $('.right').on('click', function() {
                let liwidth = $('.list .ul3 li').eq(0).outerWidth();
                if ($('.list .ul3 li').length > lichang) {
                    lichang++;
                    $('.left').css({
                        color: '#333'
                    });
                    if ($('.list .ul3 li').length === lichang) {
                        $('.right').css({
                            color: '#fff'
                        });
                    };
                    $('.list .ul3').animate({
                        left: -(lichang - 6) * liwidth
                    });
                }
            });
            $('.left').on('click', function() {
                let liwidth = $('.list .ul3 li').eq(0).outerWidth();
                if (lichang > 6) {
                    lichang--;
                    $('.right').css({
                        color: '#333'
                    });
                    if (lichang == 6) {
                        $('.left').css({
                            color: '#fff'
                        });
                    };
                    $('.list .ul3').animate({
                        left: -(lichang - 6) * liwidth
                    });
                }
            });
            //购物车数量变化
            let i = $('.p-btn >input').val();
            $('.p-btn .sp1').on('click', function() {
                i++;
                $('.p-btn >input').val(i);
            });
            $('.p-btn .sp2').on('click', function() {
                if (i > 0) {
                    i--;
                    $('.p-btn >input').val(i);
                } else {
                    i = 0;
                    $('.p-btn >input').val(i);
                }
            });
            let arrsid = [];
            let arrnum = [];

            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                } else {
                    arrsid = [];
                    arrnum = [];
                }
            }
            $('#anniu').on('click', function() {
                cookietoarray();
                if ($.inArray(datasid, arrsid) != -1) {
                    let $num = parseInt(arrnum[$.inArray(datasid, arrsid)]) + parseInt($('.p-btn >input').val());
                    arrnum[$.inArray(datasid, arrsid)] = $num;
                    $.cookie('cookienum', arrnum, { expires: 7, path: '/' });
                } else {
                    arrsid.push(datasid);
                    $.cookie('cookiesid', arrsid, { expires: 7, path: '/' });
                    arrnum.push($('.p-btn .count').val());
                    $.cookie('cookienum', arrnum, { expires: 7, path: '/' });
                }
            });
        }
    }
});