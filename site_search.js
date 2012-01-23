(function() {
    var $ = null;

    /* initialisation module. does load all missing needed javascripts before applying jquery site_search module */
    var site_search_init = {
        settings: {
            jquery_atleast_version: "1.5",
            jquery_url: "ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js",
            google_api_url: "http://www.google.com/jsapi",
            search_input: ".edys-search-input",
            search_form: ".edys-search",

            autorun_init: true,
            autorun_search: true,

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
                        $.extend(true, this.settings, window.edys_site_search_options);
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
            if ( window.jQuery === undefined ){
				this.load_script(this.settings.jquery_url,function() {
                   $ = window.jQuery.noConflict(true);
                   f();
                });
			} else if ( window.jQuery.fn.jquery < this.settings.jquery_atleast_version ) {
                var old_script = window.jQuery;
				var old$ = (window.$ !== undefined ) ? window.$ : null;
				this.load_script(this.settings.jquery_url,function() {
                   $ = window.jQuery.noConflict(true);
				   window.jQuery = old_script;
				   if( old$ != null ) { window.$ = old$; }
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

    site_search_init.run();
    /* initialisation module end*/

    /* function to apply site-search module to jquery. can be used as separate if function substituted with jquery wrapper */
    var apply_site_search_module = function($) {

        var searcher = function (form_element, user_options) {
			this.default_images_url = 'http://static.edicy.com/assets/site_search/3.0/';
            this.settings = {
                search_input: ".edys-search-input",

                close_btn_class: "edys-search-container-close",
                noresults_class: "edys-search-container-noresults",
                popup_class: "edys-search-popup",
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
                default_stylesheet: '.edys-sw-search-popup { background: #e1e1e1; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; width: 330px; position: absolute; z-index: 10000; -moz-box-shadow: 0px 2px 15px rgba(0,0,0,0.15); -webkit-box-shadow: 0px 2px 15px rgba(0,0,0,0.15); box-shadow: 0px 2px 15px rgba(0,0,0,0.15); color: #484d4f; font-size: 12px; font: 12px/14px "Helvetica Neue", Helvetica, Arial, sans-serif; padding: 10px 0px 10px 0px; -moz-text-shadow: 0 1px 0 #ffffff; -webkit-text-shadow: 0 1px 0 #ffffff; text-shadow: 0 1px 0 #ffffff; text-align: left; -moz-opacity: 0.95; -webkit-opacity: 0.95; opacity: 0.95; } .edys-sw-search-popup table { border-collapse: collapse; } .edys-sw-search-popup .gs-title { color: #1b2124; font-weight: bold; text-decoration: none; padding: 0 0 10px 0; } .edys-sw-search-container-close { display: block; float: right; overflow: hidden; width: 10px; height: 11px; clear: both; margin-right: 10px; background: url("'+this.default_images_url+'site-search-closebtn.png") no-repeat right 0; } .edys-sw-search-masking-iframe { width: 340px; position: absolute; border: none; z-index: 9000; } .edys-sw-search-container-noresults { padding: 20px; text-align: center; } .edys-sw-search-popup .gsc-result-siteSearch { margin: 0px 10px 10px 10px; overflow: hidden; } .edys-sw-search-popup .gsc-results { padding-top: 30px; margin-top: -20px; overflow: hidden; } .edys-sw-search-popup .gsc-cursor-box { border-top: 1px solid #b9b9b9; padding-top: 10px; font-size: 14px; color: #0066bb; text-align: right; padding-right: 10px; } .edys-sw-search-popup .gsc-cursor-page { display: inline; cursor: pointer; padding: 3px 5px; } .edys-sw-search-popup .gsc-cursor-page:hover, .edys-sw-search-popup .gsc-cursor-current-page { color: #484d4f; } .edys-sw-search-popup .gsc-cursor-current-page { font-weight: bold; } .edys-sw-search-popup .gsc-resultsHeader, .edys-sw-search-popup .gsc-twiddle, .edys-sw-search-popup .gs-watermark, .edys-sw-search-popup .gs-visibleUrl, .edys-sw-search-popup .gsc-trailing-more-results { display: none; } .edys-sw-search-fin { width:0px; height:0px; position: absolute; border-width: 20px; margin-top:-20px; margin-left:-20px; border-style: solid; border-color: #e1e1e1; } .edys-sw-search-fin-left { margin-right:-40px; border-top-color: transparent !important; border-right-color: transparent !important; border-bottom-color: transparent !important;} .edys-sw-search-fin-right { margin-left: -40px; border-top-color: transparent !important; border-left-color: transparent !important; border-bottom-color: transparent !important;  } .edys-sw-search-fin-top { margin-bottom:-40px; border-left-color: transparent !important; border-right-color: transparent !important; border-bottom-color: transparent !important;  } .edys-sw-search-fin-bottom { margin-top: -40px; border-top-color: transparent !important; border-right-color: transparent !important; border-left-color: transparent !important;}',
                default_stylesheet_enabled: true,
                popup_position: "auto",
                popup_min_margin: 10,
                fin_style: {},
                display_fin: true, /* disable to support ie6 */
				fin_shift_percent: 0.3,
                without_popup: false,
                without_popup_element_id: "",
                without_popup_noresults_id: "",
                texts: {
                    close: "",
                    noresults: "Your search did not match any documents"
                },
                link_target: "_self",
                sideclick_enabled: true,
                host_name: document.location.hostname.replace(/^www./, '')
            };

            /* varaibles to remember */
            /* google search vars */
            this.search_control = null;
            this.search_options = null;
            this.search_websearch = null;

            /* module vars */
            this.is_ie_lte_7 =  (typeof($.browser.msie) != "undefined" && parseInt($.browser.version, 10) <= 7) ? true : false;
            this.current_input = null;
            this.search_popup = null;
            this.search_iframe = null;
            this.form_element = form_element;

            /* run */
            this.init( user_options );
        };

        searcher.prototype = {
            init: function( options ){
                if ( options ) { $.extend( true, this.settings, options ); }
                if ( this.settings.default_stylesheet_enabled ) { this.add_stylesheet(this.settings.default_stylesheet); }

                var input_el = this.form_element.find(this.settings.search_input);

                if ( !this.settings.without_popup ) {
                    this.init_popup();
                } else {
                    this.init_without_popup();
                }

                this.form_element.bind( 'submit', $.proxy(this.submit_form, this) );
                this.form_element.data( 'EdysSearchObject', this );
            },

            init_popup: function(){
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
            },

            init_without_popup: function(){
                this.configure_google_search({
                   popup_element: $("#"+this.settings.without_popup_element_id),
                   hostname: this.settings.host_name,
                   link_target: this.settings.link_target,
                   complete_function: this.search_complete
                });

                $("#"+this.settings.without_popup_element_id).find(".gsc-search-box").hide();
            },

            popup_hide: function(){
                var sd = this.settings;

                if ( sd.sideclick_enabled ) {
                    $( document.body ).unbind( 'click.siteSearch' );
                }

                $( '.'+sd.system_classes.popup ).hide();
                $( '.'+sd.system_classes.masking_iframe ).hide();
                this.current_input = null;
            },

            resize_window: function(pop) {
                var inp = this.current_input;
                if(inp !== null){
                    this.position_popup(pop, inp);
                }
            },

            submit_form: function(){
                this.form_element.trigger('beforeSearch');
                var input_el = this.form_element.find( this.settings.search_input ),
                    pos = input_el.offset(),
                    searchstring = input_el.val();

                pos.height = input_el.outerHeight();
                pos.width= input_el.outerWidth();
                this.search_control.setSearchCompleteCallback( this, $.proxy( function() { this.search_complete(input_el); } , this) );
                this.search_control.execute(searchstring);
                return false;
            },

            configure_google_search: function(opts) {
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
				if( opts.popup_element.find('.gsc-control').get(0).scrollIntoView ) {
					opts.popup_element.find('.gsc-control').get(0).scrollIntoView = function(){ return false; };
				}
            },

            search_complete: function(input){
                var pop = this.search_popup,
                    nr_of_results = (!this.settings.without_popup) ? pop.find(".gsc-stats").html() : $("#" + this.settings.without_popup_element_id).find(".gsc-stats").html(),
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

                this.form_element.trigger('afterSearch');
            },

            position_popup: function ( pop, input ) {
                var viewport = {
                        top: $(window).scrollTop(),
                        left: $(window).scrollLeft(),
                        bottom:  $(window).scrollTop()+$(window).height(),
                        right: $(window).scrollLeft()+$(window).width()
                    },
                    input_pos = input.offset(),
					fin = null;

                input_pos.bottom = input_pos.top+input.outerHeight();
                input_pos.right = input_pos.left+input.outerWidth();
                input_pos.width = input.outerWidth();
                input_pos.height = input.outerHeight();

                if ( this.settings.display_fin ){
                    var thefin = $("." + this.settings.system_classes.fin);
                        fin = {
                            width: thefin.outerWidth() + parseInt(thefin.css("borderLeftWidth"),10) + parseInt(thefin.css("borderRightWidth"),10),
                            height: thefin.outerHeight() + parseInt(thefin.css("borderTopWidth"),10) + parseInt(thefin.css("borderBottomWidth"),10)
                        };
                } else {
                    fin = false;
                }
				var finh = (fin != false) ? fin.height : 0;

                switch ( this.settings.popup_position ){
                    case "auto":
						
                        if ( viewport.right > (input_pos.right + pop.width()) && viewport.top < (input_pos.top - (finh/2) ) ){ /* esimesena proovitakse asetada paremale */
                            this.position_popup_right(pop, input, viewport, input_pos, fin);
                        } else if(viewport.left < (input_pos.left - pop.width()) && viewport.top < (input_pos.top - (finh/2) )  ){ /* siis vasakule */
                            this.position_popup_left(pop, input, viewport, input_pos, fin);
                        } else if(viewport.top < (input_pos.top - pop.outerHeight())){ /* siis üles */
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
            },

            position_popup_left: function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (((input_pos.bottom - input_pos.top) / 2) +input_pos.top) - (pop.outerHeight() / 2),
                    left: (fin !== false) ? input_pos.left - pop.outerWidth() - (fin.width * this.settings.fin_shift_percent) : input_pos.left - pop.outerWidth(),
                    right: (fin !== false) ? input_pos.left - (fin.width * this.settings.fin_shift_percent) : input_pos.left,
                    bottom: (((input_pos.bottom - input_pos.top) / 2) + input_pos.top) + (pop.outerHeight() / 2)
                };
                this.fix_bounds_and_position(pop, newPos, viewport, input_pos, "left", fin);
            },

            position_popup_right: function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (((input_pos.bottom - input_pos.top) / 2) +input_pos.top) - (pop.outerHeight() / 2),
                    left: (fin !== false) ? input_pos.right + (fin.width * this.settings.fin_shift_percent) : input_pos.right,
                    right: (fin !== false) ? input_pos.left + pop.outerWidth() + (fin.width * this.settings.fin_shift_percent) : input_pos.left + pop.outerWidth(),
                    bottom: (((input_pos.bottom - input_pos.top) / 2) + input_pos.top) + (pop.outerHeight() / 2)
                };
                this.fix_bounds_and_position(pop, newPos, viewport, input_pos, "right", fin);
            },

            position_popup_top: function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (fin !== false) ? input_pos.top - pop.outerHeight() - (fin.width * this.settings.fin_shift_percent) : input_pos.top - pop.outerHeight(),
                    left: input_pos.left - ((pop.outerWidth() - input_pos.width) / 2),
                    right: input_pos.right + ((pop.outerWidth() - input_pos.width) / 2),
                    bottom: (fin !== false) ? input_pos.top - (fin.width * this.settings.fin_shift_percent) : input_pos.top
                };
                this.fix_bounds_and_position(pop, newPos, viewport, input_pos, "top", fin);
            },

            position_popup_bottom: function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (fin !== false) ? input_pos.bottom + (fin.width * this.settings.fin_shift_percent) : input_pos.bottom,
                    left: input_pos.left - ((pop.outerWidth() - input_pos.width) / 2),
                    right: input_pos.right + ((pop.outerWidth() - input_pos.width) / 2),
                    bottom: (fin !== false) ? input_pos.bottom + pop.outerHeight() + (fin.width * this.settings.fin_shift_percent) : input_pos.bottom + pop.outerHeight()
                };
                this.fix_bounds_and_position(pop, newPos, viewport, input_pos, "bottom", fin);
            },

            fix_bounds_and_position: function ( pop, pos, viewport, input_pos, fin_mode, fin ) {
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
                    var thefin = pop.find("."+this.settings.system_classes.fin),
						fin_left_pos,fin_top_pos;
                    this.remove_fin_classes(thefin);
                    switch(fin_mode) {
                        case "bottom":
                            thefin.addClass(this.settings.system_classes.fin_bottom).addClass(this.settings.fin_bottom_class);
                            fin_left_pos = ((input_pos.right - input_pos.left) / 2) + (input_pos.left - newPos.left);
                            thefin.css({
                                left: fin_left_pos + "px",
                                top: "0px",
                                bottom: "auto"
                            });
                        break;
                        case "top":
                            thefin.addClass(this.settings.system_classes.fin_top).addClass(this.settings.fin_top_class);
                           	fin_left_pos = ((input_pos.right-input_pos.left) / 2) + (input_pos.left - newPos.left);
                            thefin.css({
                                left: fin_left_pos + "px",
                                top: "auto",
                                bottom: "0px"
                            });
                        break;
                        case "left":
                            thefin.addClass(this.settings.system_classes.fin_left).addClass(this.settings.fin_left_class);
                            fin_top_pos = ((input_pos.bottom - input_pos.top) / 2) + (input_pos.top - newPos.top);
							if ( fin_top_pos < 0 + (thefin.outerHeight() / 3) ) {
								fin_top_pos = 0 + (thefin.outerHeight() / 3);
							}
							if ( fin_top_pos > ( newPos.bottom - newPos.top ) - (thefin.outerHeight() * 0.33) ) {
								fin_top_pos = ( newPos.bottom - newPos.top ) - (thefin.outerHeight() * 0.33);
							}
                            thefin.css({
                                top: fin_top_pos + "px",
                                left: "auto",
                                right: "0px"
                            });
                        break;
                        case "right":
                            thefin.addClass(this.settings.system_classes.fin_right).addClass(this.settings.fin_right_class);
                           	fin_top_pos = ((input_pos.bottom-input_pos.top) / 2) + (input_pos.top-newPos.top);
							if ( fin_top_pos < 0 + (thefin.outerHeight() / 3) ) {
								fin_top_pos = 0 + (thefin.outerHeight() / 3);
							}
							if ( fin_top_pos > ( newPos.bottom - newPos.top ) - (thefin.outerHeight() * 0.33) ) {
								fin_top_pos = ( newPos.bottom - newPos.top ) - (thefin.outerHeight() * 0.33);
							}
                            thefin.css({
                                top: fin_top_pos + "px",
                                right: "auto",
                                left: "0px"
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
            },

            remove_fin_classes: function ( fin ) {
                fin.removeClass( this.settings.system_classes.fin_left );
                fin.removeClass( this.settings.system_classes.fin_right );
                fin.removeClass( this.settings.system_classes.fin_top );
                fin.removeClass( this.settings.system_classes.fin_bottom );
            },

            add_stylesheet: function(source) {
                if( $(document.head).find('.'+ this.settings.system_classes.default_stylesheet ).length == 0 ){
                    var styles = $("head").children("style, link"),
                        style = $("<style>" + source + "</style>").attr("type", "text/css").addClass( this.settings.system_classes.default_stylesheet );

                    if ( styles.length > 0 ) {
                        styles.eq(0).before(style);
                    } else {
                        $("head").append(style);
                    }
                }
            }
        };

        var methods = {
            init: function( options ) {
                return this.each(function(){
                    new searcher($(this), options);
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
				return null;
            }
        };

    };

	window.apply_site_search_module = apply_site_search_module;

})();