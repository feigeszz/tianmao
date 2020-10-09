define([
    'jquery'
], function() {
    return {
        init: function() {

            let judge = 0;
            $('.username').on('blur', function() {
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1/js2/tianmao/php/bd.php",
                    data: {
                        username: $('.username').val()
                    },
                    dataType: "json",
                    success: function(res) {
                        if (res.flag) {
                            $('.username+span').html(res.msg);
                            judge = 1;
                        } else {
                            $('.username+span').html(res.msg);
                            judge = 0;
                        }
                    }
                });
            });
            $('button').on('click', function() {
                // console.log(judge)
                if (judge == 1) {
                    $.ajax({
                        type: "post",
                        url: "http://127.0.0.1/js2/tianmao/php/zhuce.php",
                        data: {
                            username: $('.username').val(),
                            password: $('.password').val(),
                            email: $('.email').val()
                        },
                        dataType: "json",
                        success: function(res) {
                            if (res.flag) {
                                location.href = "http://127.0.0.1/js2/tianmao/src/login.html";
                            }
                        }
                    });
                } else {
                    alert('请重新输入用户名');
                }

            })


        }
    }
});