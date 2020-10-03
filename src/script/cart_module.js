define([
    'jquery', 'jcookie'
], function() {
    return {
        init: function() {
            $('.bar .b').on('mouseover', function() {
                let $that = parseInt($(this).index());
                $('.line .floater').animate({
                    'left': parseInt($('.line .floater').css('width')) * $that
                }, 300)
            });

            function showlist(sid, num) { //sid：编号  num：数量
                $.ajax({
                    url: 'http://localhost/js2/tianmao/php/alldata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (sid == value.sid) {
                            let $clonebox = $('.tl:hidden').clone(true, true); //克隆隐藏元素
                            $clonebox.find('.hao').find('img').attr('src', value.url);
                            $clonebox.find('.hao').find('img').attr('sid', value.sid);
                            $clonebox.find('.l2').find('.nan').html(value.title);
                            $clonebox.find('.l4').find('.pr').html(value.price);
                            $clonebox.find('.jv').find('input').val(num);
                            $clonebox.find('.l5').find('.pr1').html((value.price * num).toFixed(2));
                            $clonebox.css('display', 'block');
                            $('.cartmain').append($clonebox);
                            // calcprice(); //计算总价
                        }
                    });

                });
            }

            //获取cookie渲染数据
            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                let s = $.cookie('cookiesid').split(',');
                let n = $.cookie('cookienum').split(',');
                $.each(s, function(index, value) {
                    showlist(s[index], n[index]);
                });
            }
            //计算总价

        }
    }
});