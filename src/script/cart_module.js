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
                    url: 'http://127.0.0.1/js2/tianmao/php/alldata.php',
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
                            totalprice(); //计算总价
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
            function totalprice() {
                let $sum = 0; //商品的件数
                let $count = 0; //商品的总价
                $('.tl:visible').each(function(index, ele) {
                    if ($(ele).find('.l1 .inc').prop('checked')) { //复选框勾选
                        $sum += parseInt($(ele).find('.jv .cou').val());
                        $count += parseFloat($(ele).find('.l5 .pr1').html());
                    }
                });
                $('.holder .sp2').html($sum);
                $('.holder .sp9').html($count.toFixed(2));
            }
            //全选
            let $inputs = $('.tl:visible').find(':checkbox');
            $(' .allx').on('click', function() {
                $('.tl:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.holder .allx').prop('checked', $(this).prop('checked'));
                totalprice(); //计算总价
            });

            $('.cartmain').on('change', $inputs, function() {
                if ($('.tl:visible').find(':checkbox').length === $('.tl:visible').find('input:checked').length) {
                    $('.holder .allx').prop('checked', true);
                } else {
                    $('.holder .allx').prop('checked', false);
                }
                totalprice(); //计算总价
            });

            //将改变后的数量存放到cookie中
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

            function setcookie(obj) {
                cookietoarray();
                let $sid = obj.parents('.tl').find('.img9').attr('sid');
                arrnum[$.inArray($sid, arrsid)] = obj.parents('.tl').find('.cou').val();
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
            }
            //计算单价
            function calcsingleprice(obj) { //obj元素对象
                let $dj = parseFloat(obj.parents('.tl').find('.l4 .pr').html());
                let $num = parseInt(obj.parents('.tl').find('.cou').val());
                return ($dj * $num).toFixed(2)
            }
            //数量的改变
            $('.jian').on('click', function() {
                let $num = $(this).parents('.tl').find('.cou').val();
                $num++;
                $(this).parents('.tl').find('.cou').val($num);
                $(this).parents('.tl').find('.l5 .pr1').html(calcsingleprice($(this)));
                totalprice(); //计算总价
                setcookie($(this));

            });


            $('.qian').on('click', function() {
                let $num = $(this).parents('.tl').find('.cou').val();
                $num--;
                if ($num < 1) {
                    $num = 1;
                }
                $(this).parents('.tl').find('.cou').val($num);
                $(this).parents('.tl').find('.l5 .pr1').html(calcsingleprice($(this)));
                totalprice(); //计算总价
                setcookie($(this));


            });


            $('.cou').on('input', function() {
                let $reg = /^\d+$/g; //只能输入数字
                let $value = $(this).val();
                if (!$reg.test($value)) { //不是数字
                    $(this).val(1);
                }
                $(this).parents('.tl').find('.l5 .pr1').html(calcsingleprice($(this)));
                totalprice(); //计算总价
                setcookie($(this));
            });

            //删除
            function delcookie(sid, arrsid) {
                let $index = -1;
                $.each(arrsid, function(index, value) {
                    if (sid === value) {
                        $index = index;
                    }
                });
                arrsid.splice($index, 1);
                arrnum.splice($index, 1);

                $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
            }
            $('.l6 .sc').on('click', function() {
                cookietoarray();
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.tl').remove();
                    delcookie($(this).parents('.tl').find('.img9').attr('sid'), arrsid);
                    totalprice(); //计算总价
                }
            });

            $('.holder .dels').on('click', function() {
                cookietoarray();
                if (window.confirm('你确定要全部删除吗?')) {
                    $('.tl:visible').each(function() {
                        if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                            $(this).remove();
                            delcookie($(this).find('.img9').attr('sid'), arrsid);
                        }
                    });
                    totalprice(); //计算总价
                }
            });
        }
    }
});