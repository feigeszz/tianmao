define([
    'pagination', 'jquery'
], function() {
    return {
        init: function() {

            //默认渲染第一面
            let num = null;
            let arr_default = [];
            let arr = [];
            let pre = null;
            let next = null;
            $.ajax({
                type: "get",
                url: "http://localhost/js2/tianmao/php/listdata.php",
                dataType: "json",
                success: function(res) {
                    let str = '';
                    res.forEach(ele => {
                        let tp = ele.piclisturl.split(",");

                        str += ` <li class="li9">
                        <a href="" class="a5">
                            <img src="${ele.url}" alt="">
                            <div class="ulist">
                                <span class="left">&lt;</span>
                                <ul class="list">`
                        tp.forEach(elm => {
                            str += ` <li class="h">
                                                        <img src="${elm}" alt="">
                                                    </li>`
                        })
                        str += `
                                </ul>
                                <span class="right">&gt;</span>
                            </div>
                            <p>${ele.title}</p>
                            <span class="jg">￥${ele.price}</span>
                            <span class="j">${ele.sailnumber}</span>
                        </a>
                    </li>`


                    });
                    $('.main .libiao').html(str);
                    arr_default = [];
                    arr = [];
                    pre = null;
                    next = null;
                    $('.libiao .li9').each(function(index, element) {
                        arr[index] = $(this);
                        arr_default[index] = $(this);
                    });

                }
            });

            $.ajax({
                type: "get",
                url: "http://localhost/js2/tianmao/php/listd.php",
                dataType: "json",
                success: function(res) {
                    num = parseInt(res);
                    localStorage.setItem("p", num)
                }
            });

            //分页
            $('.page').pagination({
                pageCount: localStorage.getItem("p"), //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',

                callback: function(api) {
                    // console.log(api.getCurrent()); //获取的页码给后端
                    $.ajax({
                        type: "get",
                        url: "http://localhost/js2/tianmao/php/listdata.php",
                        data: {
                            page: api.getCurrent()
                        },
                        dataType: "json",
                        success: function(res) {
                            let str = '';
                            // let tp = res.piclisturl.split(",");
                            res.forEach(ele => {
                                let tp = ele.piclisturl.split(",");

                                str += ` <li class="li9">
                                <a href="" class="a5">
                                    <img src="${ele.url}" alt="">
                                    <div class="ulist">
                                        <span class="left">&lt;</span>
                                        <ul class="list">`
                                tp.forEach(elm => {
                                    str += ` <li class="h">
                                                                <img src="${elm}" alt="">
                                                            </li>`
                                })
                                str += `
                                        </ul>
                                        <span class="right">&gt;</span>
                                    </div>
                                    <p>${ele.title}</p>
                                    <span class="jg">￥${ele.price}</span>
                                    <span class="j">${ele.sailnumber}</span>
                                </a>
                            </li>`


                            });
                            $('.main .libiao').html(str);
                            arr_default = [];
                            arr = [];
                            pre = null;
                            next = null;
                            $('.libiao .li9').each(function(index, element) {
                                arr[index] = $(this);
                                arr_default[index] = $(this);
                            });

                        }
                    });
                }
            });
            //3.排序
            //默认排序
            $('.filter a').eq(0).on('click', function() {
                // console.log(arr_default);
                $.each(arr_default, function(index, value) {
                    $('.main .libiao').append(value);
                });
                return;
            });

            //价格升序
            $(' .filter a').eq(4).on('click', function() {
                for (let i = 0; i < arr.length - 1; i++) {
                    for (let j = 0; j < arr.length - i - 1; j++) {
                        pre = parseFloat(arr[j].find('.jg').html().substring(1));
                        next = parseFloat(arr[j + 1].find('.jg').html().substring(1));
                        if (pre > next) {
                            let temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }
                    }
                }
                $.each(arr, function(index, value) {
                    $('.main .libiao').append(value);
                });
            });
            //数量排序 ，降序
            $(' .filter a').eq(3).on('click', function() {
                for (let i = 0; i < arr.length - 1; i++) {
                    for (let j = 0; j < arr.length - i - 1; j++) {
                        pre = parseFloat(arr[j].find('.j').html());
                        next = parseFloat(arr[j + 1].find('.j').html());
                        if (pre < next) {
                            let temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }
                    }
                }
                $.each(arr, function(index, value) {
                    $('.main .libiao').append(value);
                });
            });


        }
    }
});