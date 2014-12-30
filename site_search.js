(function() {

    var require = function(file,callback) {
        var head = document.getElementsByTagName("head")[0],
            script = document.createElement('script');

        script.src = file;
        script.type = 'text/javascript';
        script.onload = callback;
        script.onreadystatechange = function() {
            if (this.readyState == 'complete') {
                callback();
            }
        };
        head.appendChild(script);
    };

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return undefined;
    }

    var init = function () {
        var search = new VoogSearch(document.querySelector('.edys-search'), {
            lang: getCookie('site_lang')
        });
    };

    var load = function() {
        if (!window.VoogSearch) {
            require('http://static.voog.computer/libs/edicy-search/latest/edicy-search.js', init);
        } else {
            init();
        }
    };

    window.addEventListener('load', function() {
        setTimeout(load, 10);
    }, false);
})();