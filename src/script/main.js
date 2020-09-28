require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/3.4.1/jquery.min',
        'jcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min',
        'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min'
    },
    shim: {
        //让不支持AMD的模块也支持AMD模块
        'jcookie': {
            deps: ['jquery'], //依赖jQuery
            exports: 'jcookkie' //别名
        },
        'jlazyload': {
            deps: ['jquery'],
            exports: 'jlazyload'
        }
    }

});
require(['jquery', 'jcookie', 'jlazyload'], function() {
    let pagemod = $('#currentpage').attr('data-page');
    require([pagemod], function(page) {
        page.init();
    });
});