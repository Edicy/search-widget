;(function() {

    // Initialisation module. does load all missing needed javascripts before applying jquery site_search module */
    var site_search_init = {
        settings: {
            search_input: ".edys-search-input",
            search_form: ".edys-search"
        },

        run: function() {
            var form_class = window.edys_site_search_options && window.edys_site_search_options.search_form || this.settings.search_form,
                input_class = window.edys_site_search_options && window.edys_site_search_options.search_input || this.settings.search_input;
            
            var search_forms = document.querySelectorAll(form_class), search_form;
            
            for (var i = 0, l = search_forms.length; i < l; i++) {
                search_form = search_forms[i];
                
                search_form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    
                    try {
                        var searchstring = event.target.querySelectorAll(input_class)[0].value;
                        window.open('http://www.google.com/search?q=' + searchstring + '+site:' + window.location.hostname.replace(/^www./, ''));
                    } catch (e) {}
                });
            }
        }
    };

    site_search_init.run();
})();
