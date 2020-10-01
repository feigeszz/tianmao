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
            })
        }
    }
});