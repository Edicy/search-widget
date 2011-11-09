(function() {
    var $ = null;

    var site_search_init = {
        settings: {
            jquery_atleast_version: "1.5",
            jquery_url: "ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js",
            google_api_url: "http://www.google.com/jsapi",
            search_input: ".edys-search-input",
            search_form: ".edys-search",

            autorun_init: true,
            autorun_search: true,
            load_jquery: true,
            load_google: true,

            init_complete: null
        },

        run: function (){
            /* propagate preload functions before jquery initialized */
            if ( typeof window.edys_site_search_options !='undefined' ) {
                if ( typeof window.edys_site_search_options.autorun_init !='undefined' ) {
                    this.settings.autorun_init = window.edys_site_search_options.autorun_init;
                }
                if ( typeof window.edys_site_search_options.autorun_search !='undefined' ) {
                    this.settings.autorun_search = window.edys_site_search_options.autorun_search;
                }
            } else {
                window.edys_site_search_options = {};
            }

            if ( this.settings.autorun_init ){
                if (typeof window.edys_site_search_options.loaded == "undefined") {
                    window.edys_site_search_options.loaded = true;
                    this.get_missing_scripts( function() {
                        if ( typeof window.edys_site_search_options !='undefined' ) {
                            $.extend(this.settings, window.edys_site_search_options);
                        }
                        apply_site_search_module($);
                        if ( this.settings.autorun_search ) {
                            $(document).ready( $.proxy(function() {
                                $(this.settings.search_form).site_search(this.settings);
                                if(this.settings.init_complete){
                                    this.settings.init_complete($);
                                } else {
                                    $('body').trigger('Edys_search_init_complete',$);
                                }
                            },this));
                        } else {
                            if(this.settings.init_complete){
                                this.settings.init_complete($);
                            } else {
                                $('body').trigger('Edys_search_init_complete',$);
                            }
                        }
                    });
                }
            }
        },

        get_missing_scripts: function(f) {
            this.get_jquery( function() {
                /* disable forms default action while loading if  */
                if( site_search_init.settings.autorun_search ) {
                    $( site_search_init.settings.search_form ).bind('submit.siteSearch', function() {
                        return false;
                    });
                }
                site_search_init.loadGoogle($.proxy(f,site_search_init));
            });
        },

        /* function to get script dynamically without jquery loaded */
        load_script: function(source, f) {
            (function(d, t) {
                var js = d.createElement(t);
                js.onload = f;
                var prot = (location.protocol != "file:") ? location.protocol : "http:";
                js.src = prot + '//'+source;
                js.onreadystatechange = function() {
                    if (this.readyState == 'complete' || this.readyState == 'loaded') {
                        f();
                    }
                };
                (d.getElementsByTagName('head')[0] || d.documentElement).appendChild(js);
            }(document, 'script'));
        },

        get_jquery: function(f) {
            if (window.jQuery === undefined || window.jQuery.fn.jquery < this.settings.jquery_atleast_version) {
                this.load_script(this.settings.jquery_url,function() {
                   $ = window.jQuery.noConflict(true);
                   f();
                });
            } else {
                $ = window.jQuery;
                f();
            }
        },

        /* load google api and search api */
        loadGoogle:  function(f) {
            if (typeof(window.google) == 'undefined') {
                $.getScript(this.settings.google_api_url, function() {
                    google = window.google;
                    google.load('search', '1', {"nocss": true, 'callback':f});
                });
            } else {
                google.load('search', '1', {"nocss": true, 'callback': f});
            }
        }

    };

    /* function to apply site-search module to jquery */
    var apply_site_search_module = function($) {
        var searcher = function (form_element) {
            this.settings = {
                search_input: ".edys-search-input",

                close_btn_class: "edys-search-container-close",
                noresults_class: "edys-search-container-noresults",
                popup_class: "edys-search-popup",
                loading_img_class: "edys-search-loading",
                masking_iframe_class: "edys-search-masking-iframe",
                fin_class: "edys-search-fin",
                fin_left_class: "edys-search-fin-left",
                fin_right_class: "edys-search-fin-right",
                fin_top_class: "edys-search-fin-top",
                fin_bottom_class: "edys-search-fin-bottom",

                system_classes: {
                    close_btn:"edys-sw-search-container-close",
                    noresults: "edys-sw-search-container-noresults",
                    popup: "edys-sw-search-popup",
                    loading_img: "edys-sw-search-loading",
                    masking_iframe: "edys-sw-search-masking-iframe",
                    fin: "edys-sw-search-fin",
                    fin_left: "edys-sw-search-fin-left",
                    fin_right: "edys-sw-search-fin-right",
                    fin_top: "edys-sw-search-fin-top",
                    fin_bottom: "edys-sw-search-fin-bottom",
                    default_stylesheet: "edys-sw-default-stylesheet"
                },

                default_popup_style: {position: "absolute",display: "none"},
                default_closebtn_style: {cursor: "pointer"},
                loading_image: "R0lGODlhEAAQALMNAKqon4SCecTBuXd1bZGOhpCPhoSCesPCuXd1bJCOhtDOxre1rJ2bkv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCAANACwAAAAAEAAQAAAEUrDJ2daimFqb5xHV1gAAdnwgR5LUKYDTWrYwxU6K0k0M0+S5Xa8H1HWGvuCu0aMMEJlEAjN4QicF6XRSRUADgUZWikEMGgYDuEEgLNPr5UTdiQAAIfkEBQgADQAsAAAAABAAEAAABEiwydnOoZham6dS1dYsC/Z94UiW3kmtbJuRFIJ0EwA0to3rut6tA9z5cA0dxWDIMBgYJpPyfC6ljUSiUYVes9qtFRfeIifaTgQAIfkEBQgADQAsAAAAABAAEAAABEiwydmUophamydC1dYcB/Z94UiW3kmtbJuRlGF007I0to3rut6tA9z5cA0dJZHIAAAYJpPyfC6lDQajUYVes9qtFRfeIifaTgQAIfkEBQgADQAsAAAAABAADgAABD6wydkQopham6cx1dYoCvZ94UiW3kmtbJuRVJJ003E0to3rut6tA9z5cA0dhcHILBYYJpPyfC6l1Gq0ibFKIgAh+QQFCAANACwAAAAAEAAQAAAEQrDJ2YyhmFqbZ0rV1iAI9n3hSJbeSa1sm5EUw3STojS2jeu63q0D3PlwDR1ycjgsmU0nbrFoRKUZKtWKzWqfkm0mAgAh+QQFCAANACwCAAAADgAQAAAEQbBJmdK8t1YsGWuaZRiT54HiSDbmN6kr614jZzcIck95vuO9H1CyWHAUikmxeEEiicvG4dBwJqHSKfXJ0VJ/U1sEACH5BAUIAA0ALAAAAAAQABAAAARBsMnZGKOYWpvzvknSTVwYjpQpotM5LQtrGA0Mj/Nsx11O36gZ5XDIIBAYIpFyPA6VDYWi0UQ+o9Kpc5SdsiTSTgQAIfkEBQgADQAsAAACABAADgAABEGwybWkbYzdRunN2dVVFqiJ5HdKx7FtSdK07SvFMe3auFzbN5lFoXgZDBsi8XI8XpRFBKLRRD6j0qkTmJ0CL1JbBAA7",
                default_stylesheet: '.edys-sw-search-popup{ background: #eeeeee; -moz-border-radius: 5px; -webkit-border-radius: 5px; width: 340px; position: absolute; z-index: 1000; } .edys-sw-search-container-close{ display: block; text-align: right; overflow: hidden; clear: both; margin:3px 10px; } .edys-sw-search-masking-iframe{ width: 340px; position: absolute; border: none; z-index: 900; } .edys-sw-search-container-noresults { padding: 10px; margin: 10px; background: #ffffff; color: black; } .edys-sw-search-popup .gsc-result-siteSearch { padding: 10px; margin: 10px 10px 0 10px; background: #ffffff; text-align: left; font: 12px/13px Helvetica, Arial, sans-serif; } .edys-sw-search-popup .gsc-cursor-box { padding: 10px 0 10px 10px; margin: 10px 10px 10px 10px; background: #ffffff; } .edys-sw-search-popup .gsc-cursor-page { display: inline; cursor: pointer; color: #b9000f; padding: 3px 5px; } .edys-sw-search-popup .gsc-cursor-page:hover { background: #b9000f; color: white; } .edys-sw-search-popup .gsc-cursor-current-page { font-weight: bold; } .edys-sw-search-popup .gsc-resultsHeader, .edys-sw-search-popup .gsc-twiddle, .edys-sw-search-popup .gs-watermark, .edys-sw-search-popup .gs-visibleUrl, .edys-sw-search-popup .gsc-trailing-more-results { display: none; } .edys-sw-search-fin { border-width: 12px; width:0; height:0; border-style: solid; position: absolute; } .edys-sw-search-fin-left { border-color: transparent transparent transparent #eeeeee ; } .edys-sw-search-fin-right { border-color: transparent #eeeeee transparent transparent; } .edys-sw-search-fin-top { border-color: #eeeeee transparent transparent transparent; } .edys-sw-search-fin-bottom { border-color: transparent transparent #eeeeee transparent; } .edys-sw-search-popup .gsc-control { margin-top: -28px; padding-top: 28px; }',
                default_stylesheet_enabled: true,
                popup_position: "auto",
                popup_min_margin: 10,
                fin_style: {},
                display_fin: true, /* disable to support ie6 */
                without_popup: false,
                without_popup_element_id: "",
                without_popup_noresults_id: "",
                texts: {
                    close: "Close",
                    noresults: "Your search did not match any documents"
                },
                link_target: "_self",
                sideclick_enabled: true,
                host_name: document.location.hostname.replace(/^www./, '')
            };

            /* varaibles to remember */
            this.search_control = null;
            this.search_options = null;
            this.search_websearch = null;
            this.is_ie_lte_7 =  (typeof($.browser.msie) != "undefined" && parseInt($.browser.version, 10) <= 7) ? true : false;
            this.current_input = null;
            this.search_popup = null;
            this.search_iframe = null

            this.init = function( options ){
                if ( options ) { $.extend( this.settings, options ); }
                if ( this.settings.default_stylesheet_enabled ) { this.add_stylesheet(this.settings.default_stylesheet); }

                var input_el = form_element.find(this.settings.search_input);

                if ( !this.settings.without_popup ) {
                    this.init_popup();
                } else {
                    this.init_without_popup();
                }

                form_element.bind( 'submit.siteSearch', $.proxy(this.submit_form, this) );
                form_element.data( 'EdysSearchObject', this );
            };

            this.init_popup = function(){
                var search_popup = $('<div></div>').addClass( this.settings.system_classes.popup )
                                                   .addClass( this.settings.popup_class )
                                                   .css( this.settings.default_popup_style ),
                    search_iframe = $("<iframe></iframe>").addClass( this.settings.system_classes.masking_iframe)
                                                          .addClass(this.settings.masking_iframe_class).hide(),
                    noresults = $('<div></div>').addClass( this.settings.system_classes.noresults)
                                                .addClass( this.settings.noresults_class)
                                                .html( this.settings.texts.noresults ),
                    close_btn = $("<div></div>").addClass( this.settings.system_classes.close_btn)
                                                .addClass( this.settings.close_btn_class)
                                                .css( this.settings.default_closebtn_style)
                                                .html( this.settings.texts.close).bind('click.siteSearch', $.proxy( function(){
                                                    this.popup_hide();
                                                },this)),
                    fin = $("<div></div>").addClass( this.settings.system_classes.fin )
                                          .addClass( this.settings.fin_class )
                                          .css( this.settings.fin_style );

                $(document.body).prepend(search_iframe,search_popup);
                this.search_popup = search_popup;
                this.search_iframe = search_iframe;

                this.configure_google_search({
                   popup_element: search_popup,
                   hostname: this.settings.host_name,
                   link_target: this.settings.link_target,
                   complete_function: this.search_complete
                });

                search_popup.find(".gsc-search-box").hide();
                search_popup.prepend(close_btn,noresults);

                /* add fin if needed */
                if ( this.settings.display_fin ) { search_popup.prepend(fin); }

                /* orientation and resize functions */
                if ("onorientationchange" in window) {
                    $(window).bind('orientationchange.siteSearch', $.proxy(function() {
                        this.resize_window(search_popup);
                    }, this));
                } else {
                    $(window).bind('resize.siteSearch',$.proxy( function() {
                        this.resize_window(search_popup);
                    }, this));
                }
            };

            this.init_without_popup = function(){
                this.configure_google_search({
                   popup_element: $("#"+this.settings.without_popup_element_id).get(0),
                   hostname: this.settings.host_name,
                   link_target: this.settings.link_target,
                   complete_function: this.search_complete
                });

                $("#"+this.settings.without_popup_element_id).find(".gsc-search-box").hide();
            };

            this.popup_hide = function(){
                var sd = this.settings;

                if ( sd.sideclick_enabled ) {
                    $( document.body ).unbind( 'click.siteSearch' );
                }

                $( '.'+sd.system_classes.popup ).hide();
                $( '.'+sd.system_classes.masking_iframe ).hide();
                this.current_input = null;
            };

            this.resize_window = function(pop) {
                var inp = this.current_input;
                if(inp !== null){
                    this.position_popup(pop, inp);
                }
            };

            this.submit_form = function(){
                form_element.trigger('beforeSearch');
                var input_el = form_element.find( this.settings.search_input ),
                    pos = input_el.offset(),
                    loader = $("<img />").attr({ "src":"data:image/png;base64," + this.settings.loading_image })
                                         .addClass( this.settings.system_classes.loading_img )
                                         .addClass( this.settings.loading_img_class )
                                         .css({ position:"absolute", visibility:"hidden" }),
                    searchstring = input_el.val();

                pos.height = input_el.outerHeight();
                pos.width= input_el.outerWidth();

                /* draw loading img */
                /* make ie7 and less ignore it as they cannot display base64 images */
                if (!this.is_ie_lte_7) {
                    $("." + this.settings.system_classes.loading_img ).remove();
                    loader.load(function() {
                        $(this).css({
                            top: pos.top + ((pos.height - $(this).height()) / 2) + "px",
                            left: (pos.left + (pos.width - $(this).width() - ($(this).width() / 4))) + "px",
                            visibility:"visible"
                        });
                    });
                    $("body").prepend(loader);
                }
                this.search_control.setSearchCompleteCallback( this, $.proxy( function() { this.search_complete(input_el); } , this) );
                this.search_control.execute(searchstring);
                return false;
            };

            this.configure_google_search = function(opts) {
                var s_c = this.search_control   = new google.search.SearchControl(),
                    s_o = this.search_options   = new google.search.SearcherOptions(),
                    s_w = this.search_websearch = new google.search.WebSearch();

                s_o.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);
                s_w.setUserDefinedClassSuffix("siteSearch");
                s_w.setSiteRestriction(opts.hostname);
                s_c.addSearcher(s_w, s_o);
                s_c.setSearchCompleteCallback(this, $.proxy(opts.complete_function,this));

                switch(opts.link_target) {
                    case '_blank':
                        s_c.setLinkTarget(google.search.Search.LINK_TARGET_BLANK);
                    break;
                    case '_top':
                        s_c.setLinkTarget(google.search.Search.LINK_TARGET_TOP);
                    break;
                    case '_parent':
                        s_c.setLinkTarget(google.search.Search.LINK_TARGET_PARENT);
                    break;
                    default:
                        s_c.setLinkTarget(google.search.Search.LINK_TARGET_SELF);
                }
                s_c.draw(opts.popup_element.get(0));
            };

            this.search_complete = function(input){
                var pop = this.search_popup,
                    nr_of_results = pop.find(".gsc-stats").html(),
                    noresults_el = (!this.settings.without_popup) ? pop.find(' .'+this.settings.system_classes.noresults) : $("#" + this.settings.without_popup_noresults_id);

                if (nr_of_results == "(0)") {
                    noresults_el.show();
                } else {
                    noresults_el.hide();
                }

                if (!this.settings.without_popup) {
                    pop.css( {visibility: "hidden"} ).show();
                    if ( typeof(input) != 'undefined' ){
                        this.position_popup ( pop, input );
                        this.search_iframe.show();
                        this.current_input = input;
                        if ( this.settings.sideclick_enabled ) {
                            $( document.body ).bind('click.siteSearch', $.proxy(function(event) {
                                if ( $(event.target).parents().filter(this.search_popup).length == 0 && event.target != this.search_popup.get(0) ) {
                                    this.popup_hide();
                                }

                            },this));
                        }
                    }
                    pop.css({visibility: "visible"});
                }
                if(!this.is_ie_lte_7){
                    $("." + this.settings.system_classes.loading_img).remove();
                }

                form_element.trigger('afterSearch');
            };

            this.position_popup = function ( pop, input ) {
                var viewport = {
                        top: $(window).scrollTop(),
                        left: $(window).scrollLeft(),
                        bottom:  $(window).scrollTop()+$(window).height(),
                        right: $(window).scrollLeft()+$(window).width()
                    },
                    input_pos = input.offset();

                input_pos.bottom = input_pos.top+input.outerHeight();
                input_pos.right = input_pos.left+input.outerWidth();
                input_pos.width = input.outerWidth();
                input_pos.height = input.outerHeight();

                if ( this.settings.display_fin ){
                    var thefin = $("." + this.settings.system_classes.fin),
                        fin = {
                            width: thefin.outerWidth() / 2,
                            height: thefin.outerHeight() / 2
                        };
                } else {
                    var fin = false;
                }

                switch ( this.settings.popup_position ){
                    case "auto":
                        if ( viewport.right > (input_pos.right + pop.width()) ){ /* esimesena proovitakse asetada paremale */
                            this.position_popup_right(pop, input, viewport, input_pos, fin);
                        } else if(viewport.left < (input_pos.left - pop.width())){ /* siis vasakule */
                            this.position_popup_left(pop, input, viewport, input_pos, fin);
                        } else if(viewport.top < (input_pos.top - pop.height())){ /* siis üles */
                            this.position_popup_top(pop, input, viewport, input_pos, fin);
                        } else { /* kui midagi üle ei j22 siis alla (mahub tavaliselt alati kuna lehed üldiselt venivad) */
                            this.position_popup_bottom(pop, input, viewport, input_pos, fin);
                        }
                    break;
                    case "left":
                        this.position_popup_left(pop, input, viewport, input_pos, fin);
                    break;
                    case "right":
                        this.position_popup_right(pop, input, viewport, input_pos, fin);
                    break;
                    case "bottom":
                        this.position_popup_bottom(pop, input, viewport, input_pos, fin);
                    break;
                    case "top":
                        this.position_popup_top(pop, input, viewport, input_pos, fin);
                    break;
                }
            };

            this.position_popup_left = function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (((input_pos.bottom - input_pos.top) / 2) +input_pos.top) - (pop.outerHeight() / 2),
                    left: (fin !== false) ? input_pos.left - pop.outerWidth() - fin.width : input_pos.left - pop.outerWidth(),
                    right: (fin !== false) ? input_pos.left - fin.width : input_pos.left,
                    bottom: (((input_pos.bottom - input_pos.top) / 2) + input_pos.top) + (pop.outerHeight() / 2)
                }
                this.fix_bounds_and_position(pop, newPos, viewport, input_pos, "left", fin);
            };

            this.position_popup_right = function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (((input_pos.bottom - input_pos.top) / 2) +input_pos.top) - (pop.outerHeight() / 2),
                    left: (fin !== false) ? input_pos.right + fin.width : input_pos.right,
                    right: (fin !== false) ? input_pos.left + pop.outerWidth() + fin.width : input_pos.left + pop.outerWidth(),
                    bottom: (((input_pos.bottom - input_pos.top) / 2) + input_pos.top) + (pop.outerHeight() / 2)
                }
                this.fix_bounds_and_position(pop, newPos, viewport, input_pos, "right", fin);
            };

            this.position_popup_top = function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (fin !== false) ? input_pos.top - pop.outerHeight() - fin.width : input_pos.top - pop.outerHeight(),
                    left: input_pos.left - ((pop.outerWidth() - input_pos.width) / 2),
                    right: input_pos.right + ((pop.outerWidth() - input_pos.width) / 2),
                    bottom: (fin !== false) ? input_pos.top - fin.width : input_pos.top
                }
                this.fix_bounds_and_position(pop, newPos, viewport, input_pos, "top", fin);
            };

            this.position_popup_bottom = function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (fin !== false) ? input_pos.bottom + fin.width : input_pos.bottom,
                    left: input_pos.left - ((pop.outerWidth() - input_pos.width) / 2),
                    right: input_pos.right + ((pop.outerWidth() - input_pos.width) / 2),
                    bottom: (fin !== false) ? input_pos.bottom + pop.outerHeight() + fin.width : input_pos.bottom + pop.outerHeight()
                }
                this.fix_bounds_and_position(pop, newPos, viewport, input_pos, "bottom", fin);
            };

            this.fix_bounds_and_position = function ( pop, pos,viewport, input_pos, fin_mode, fin ) {
                var newPos = pos;

                /* fix popup position */
                if ( newPos.left < viewport.left + this.settings.popup_min_margin ) {
                    newPos.left = viewport.left + this.settings.popup_min_margin;
                } else if ( newPos.right > viewport.right - this.settings.popup_min_margin ) {
                    newPos.left =  viewport.right - pop.outerWidth() - this.settings.popup_min_margin;
                }

                if ( newPos.top > viewport.bottom - pop.outerHeight() - this.settings.popup_min_margin && fin_mode != "bottom" && fin_mode != "top" ) {
                    if(input_pos.bottom + (pop.outerHeight() * 0.05) > viewport.bottom - this.settings.popup_min_margin){
                        newPos.top = input_pos.bottom + (pop.outerHeight() * 0.05) - pop.outerHeight();
                    } else {
                        newPos.top = viewport.bottom - pop.outerHeight() - this.settings.popup_min_margin;
                    }
                }

                if ( newPos.top < this.settings.popup_min_margin ) { newPos.top = this.settings.popup_min_margin; }

                /* fix fin position */
                if (this.settings.display_fin) {
                    var thefin = pop.find("."+this.settings.system_classes.fin);
                    this.remove_fin_classes(thefin);
                    switch(fin_mode) {
                        case "bottom":
                            thefin.addClass(this.settings.system_classes.fin_bottom).addClass(this.settings.fin_bottom_class);
                            fin_left_pos = ((input_pos.right - input_pos.left) / 2) + (input_pos.left - newPos.left) - (thefin.outerWidth() / 2);
                            thefin.css({
                                left: fin_left_pos + "px",
                                top: -thefin.outerWidth() + "px",
                                bottom: "auto"
                            });
                        break;
                        case "top":
                            thefin.addClass(this.settings.system_classes.fin_top).addClass(this.settings.fin_top_class);
                            fin_left_pos = ((input_pos.right-input_pos.left) / 2) + (input_pos.left - newPos.left) - (thefin.outerWidth() / 2);
                            thefin.css({
                                left: fin_left_pos + "px",
                                top: "auto",
                                bottom: -thefin.outerWidth() + "px"
                            });
                        break;
                        case "left":
                            thefin.addClass(this.settings.system_classes.fin_left).addClass(this.settings.fin_left_class);
                            fin_top_pos = ((input_pos.bottom - input_pos.top) / 2) + (input_pos.top - newPos.top) - (thefin.outerHeight() / 2);
                            thefin.css({
                                top: fin_top_pos + "px",
                                left: "auto",
                                right: -thefin.outerHeight() + "px"
                            });
                        break;
                        case "right":
                            thefin.addClass(this.settings.system_classes.fin_right).addClass(this.settings.fin_right_class);
                            fin_top_pos = ((input_pos.bottom-input_pos.top) / 2) + (input_pos.top-newPos.top) - (thefin.outerHeight() / 2);
                            thefin.css({
                                top: fin_top_pos + "px",
                                right: "auto",
                                left: -thefin.outerHeight() + "px"
                            });
                        break;
                    }
                }

                pop.css({
                    top: newPos.top + "px",
                    left: newPos.left + "px"
                });

                $("." + this.settings.system_classes.masking_iframe).css({
                    top: newPos.top + "px",
                    left: newPos.left + "px",
                    width: pop.outerWidth(),
                    height: pop.outerHeight()
                });
            };

            this.remove_fin_classes = function ( fin ) {
                fin.removeClass( this.settings.system_classes.fin_left );
                fin.removeClass( this.settings.system_classes.fin_right );
                fin.removeClass( this.settings.system_classes.fin_top );
                fin.removeClass( this.settings.system_classes.fin_bottom );
            };

            this.add_stylesheet = function(source) {
                if( $(document.head).find('.'+ this.settings.system_classes.default_stylesheet ).length == 0 ){
                    var styles = $("head").children("style, link"),
                        style = $("<style>" + source + "</style>").attr("type", "text/css").addClass( this.settings.system_classes.default_stylesheet );

                    if ( styles.length > 0 ) {
                        styles.eq(0).before(style);
                    } else {
                        $("head").append(style);
                    }
                }
            };

            this.init();
        };

        var methods = {
            init: function( options ) {
                return this.each(function(){
                    new searcher($(this));
                });
            },

            get_object: function() {
                return this.eq(0).data('EdysSearchObject');
            }
        };

        $.fn.site_search = function( method ) {
            if ( methods[method] ) {
                return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.site_search' );
            }
        };

    };

    site_search_init.run();
})();