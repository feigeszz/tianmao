define([
    'sha1', 'jquery', 'jcookie'
], function() {
    return {
        init: function() {
            $('.p3 input').on('click', function() {
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1/js2/tianmao/php/denglu.php",
                    data: {
                        user: $('.username').val(),
                        pass: hex_sha1($('.password').val()),
                    },
                    dataType: "json",
                    success: function(res) {
                        if (res) {
                            location.href = 'http://127.0.0.1/js2/tianmao/src/index.html';
                            $.cookie('username', $('.username').val(), { expires: 7, path: '/' });
                        } else {
                            alert('用户名或密码错');
                            $('.username').val() = '';
                            $('.password').val() = '';
                        }

                    }
                });
            })



        }
    }
});