(function() {
    var $ = null;
    var google = null;

    var site_search = {
        defaults: {
            jquery_atleast_version: "1.5",
            jquery_url: "ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js",
            google_api_url: "http://www.google.com/jsapi",
            search_input: ".edys-search-input",
            search_form: ".edys-search",

            /* module generated elements */
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
                fin_bottom: "edys-sw-search-fin-bottom"
            },

            default_popup_style: {position: "absolute",display: "none"},
            default_closebtn_style: {cursor: "pointer"},
            loading_image: "R0lGODlhEAAQALMNAKqon4SCecTBuXd1bZGOhpCPhoSCesPCuXd1bJCOhtDOxre1rJ2bkv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCAANACwAAAAAEAAQAAAEUrDJ2daimFqb5xHV1gAAdnwgR5LUKYDTWrYwxU6K0k0M0+S5Xa8H1HWGvuCu0aMMEJlEAjN4QicF6XRSRUADgUZWikEMGgYDuEEgLNPr5UTdiQAAIfkEBQgADQAsAAAAABAAEAAABEiwydnOoZham6dS1dYsC/Z94UiW3kmtbJuRFIJ0EwA0to3rut6tA9z5cA0dxWDIMBgYJpPyfC6ljUSiUYVes9qtFRfeIifaTgQAIfkEBQgADQAsAAAAABAAEAAABEiwydmUophamydC1dYcB/Z94UiW3kmtbJuRlGF007I0to3rut6tA9z5cA0dJZHIAAAYJpPyfC6lDQajUYVes9qtFRfeIifaTgQAIfkEBQgADQAsAAAAABAADgAABD6wydkQopham6cx1dYoCvZ94UiW3kmtbJuRVJJ003E0to3rut6tA9z5cA0dhcHILBYYJpPyfC6l1Gq0ibFKIgAh+QQFCAANACwAAAAAEAAQAAAEQrDJ2YyhmFqbZ0rV1iAI9n3hSJbeSa1sm5EUw3STojS2jeu63q0D3PlwDR1ycjgsmU0nbrFoRKUZKtWKzWqfkm0mAgAh+QQFCAANACwCAAAADgAQAAAEQbBJmdK8t1YsGWuaZRiT54HiSDbmN6kr614jZzcIck95vuO9H1CyWHAUikmxeEEiicvG4dBwJqHSKfXJ0VJ/U1sEACH5BAUIAA0ALAAAAAAQABAAAARBsMnZGKOYWpvzvknSTVwYjpQpotM5LQtrGA0Mj/Nsx11O36gZ5XDIIBAYIpFyPA6VDYWi0UQ+o9Kpc5SdsiTSTgQAIfkEBQgADQAsAAACABAADgAABEGwybWkbYzdRunN2dVVFqiJ5HdKx7FtSdK07SvFMe3auFzbN5lFoXgZDBsi8XI8XpRFBKLRRD6j0qkTmJ0CL1JbBAA7",
            default_stylesheet: '.edys-sw-search-popup{ background: #eeeeee; -moz-border-radius: 5px; -webkit-border-radius: 5px; width: 340px; position: absolute; z-index: 1000; } .edys-sw-search-container-close{ display: block; text-align: right; overflow: hidden; clear: both; margin:3px 10px; } .edys-sw-search-masking-iframe{ width: 340px; position: absolute; border: none; z-index: 900; } .edys-sw-search-container-noresults { padding: 10px; margin: 10px; background: #ffffff; color: black; } .edys-sw-search-popup .gsc-result-siteSearch { padding: 10px; margin: 10px 10px 0 10px; background: #ffffff; text-align: left; font: 12px/13px Helvetica, Arial, sans-serif; } .edys-sw-search-popup .gsc-cursor-box { padding: 10px 0 10px 10px; margin: 10px 10px 10px 10px; background: #ffffff; } .edys-sw-search-popup .gsc-cursor-page { display: inline; cursor: pointer; color: #b9000f; padding: 3px 5px; } .edys-sw-search-popup .gsc-cursor-page:hover { background: #b9000f; color: white; } .edys-sw-search-popup .gsc-cursor-current-page { font-weight: bold; } .edys-sw-search-popup .gsc-resultsHeader, .edys-sw-search-popup .gsc-twiddle, .edys-sw-search-popup .gs-watermark, .edys-sw-search-popup .gs-visibleUrl, .edys-sw-search-popup .gsc-trailing-more-results { display: none; } .edys-sw-search-fin { border-width: 12px; width:0; height:0; border-style: solid; position: absolute; } .edys-sw-search-fin-left { border-color: transparent transparent transparent #eeeeee ; } .edys-sw-search-fin-right { border-color: transparent #eeeeee transparent transparent; } .edys-sw-search-fin-top { border-color: #eeeeee transparent transparent transparent; } .edys-sw-search-fin-bottom { border-color: transparent transparent #eeeeee transparent; } .edys-sw-search-popup .gsc-control { margin-top: -28px; padding-top: 28px; }',
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
            sideclick_enabled: true
        },

        vars: {
            search_control: null,
            search_options: null,
            search_websearch: null,
            is_ie_lte_7: false,
            current_input: null
        },

        /* starting point of moule*/
        init: function() {
            /* if loaded leave global mark and disable additional loads */
            if (typeof edys_site_search_loaded == "undefined") {
                window.edys_site_search_loaded = true;
                this.get_missing_scripts(function() {
                    $(document).ready(function() { site_search.after_init(); });
                });
            }
        },

        /* starting point of moule after missing scripts added*/
        after_init: function () {
            this.vars.is_ie_lte_7 = (typeof($.browser.msie) != "undefined" && parseInt($.browser.version, 10) <= 7) ? true : false;
            if (typeof window.edys_site_search_options !='undefined') {
                $.extend(this.defaults, window.edys_site_search_options);
            }
            this.add_stylesheet(this.defaults.default_stylesheet);

            /* implement on every search form */
            var search_frm = $(this.defaults.search_form);
            search_frm.each(function() {
                /* get input position and dimensions */
                var frm = $(this);
                var frm_input = frm.find(site_search.defaults.search_input);
                var pos = frm_input.offset();
                pos.height = frm_input.outerHeight();
                pos.width= frm_input.outerWidth();

                frm.submit(function() {
                    var this_frm = $(this);
                    /* draw loading img */
                    /* make ie7 and less ignore it as they cannot display base64 images */
                    if (!site_search.vars.is_ie_lte_7) {
                        $("."+site_search.defaults.system_classes.loading_img).remove();
                        var loader = $("<img />").attr({
                            "src":"data:image/png;base64,"+site_search.defaults.loading_image
                        }).addClass(site_search.defaults.system_classes.loading_img).addClass(site_search.defaults.loading_img_class).css({
                            position:"absolute",
                            visibility:"hidden"
                        });

                        loader.load(function() {
                            $(this).css({
                                top: pos.top + ((pos.height - $(this).height()) / 2) + "px",
                                left: (pos.left + (pos.width - $(this).width() - ($(this).width() / 4))) + "px",
                                visibility:"visible"
                            });
                        });
                        $("body").prepend(loader);
                    }

                    /* send search string to google and disable submitting form  */
                    var searchstring = this_frm.find(site_search.defaults.search_input).val();
                    site_search.vars.search_control.setSearchCompleteCallback(this, function() {
                        site_search.search_complete(frm_input);
                    });
                    site_search.vars.search_control.execute(searchstring);
                    return false;
                });
            });

            if (!this.defaults.without_popup) {
                /* configure google search and delegate it to a hidden div for popup on demand */
                var search_popup = $('<div></div>').addClass(this.defaults.system_classes.popup).addClass(this.defaults.popup_class).css(this.defaults.default_popup_style);
                /* make masking frame so flash and other browser mistakes do not show through */
                var search_iframe = $("<iframe></iframe>").addClass(this.defaults.system_classes.masking_iframe).addClass(this.defaults.masking_iframe_class).hide();
                $(document.body).prepend(search_iframe,search_popup);
                this.configure_google_search(search_popup.get(0));
                /* make a popup close btn and noresults box */
                var noresults = $('<div></div>').addClass(this.defaults.system_classes.noresults).addClass(this.defaults.noresults_class).html(this.defaults.texts.noresults);
                var close_btn = $("<div></div>").addClass(this.defaults.system_classes.close_btn).addClass(this.defaults.close_btn_class).css(this.defaults.default_closebtn_style).html(this.defaults.texts.close).click(function(){
                    site_search.popup_hide();
                });
                search_popup.prepend(close_btn,noresults);
                /* add fin if needed */
                if (this.defaults.display_fin) {
                    var fin = $("<div></div>").addClass(this.defaults.system_classes.fin).addClass(this.defaults.fin_class).css(this.defaults.fin_style);
                    search_popup.prepend(fin);
                }

                if ("onorientationchange" in window) {
                    window.addEventListener('orientationchange', function() { site_search.resize_window(search_popup); }, false);
                } else {
                    $(window).resize(function() {
                        site_search.resize_window(search_popup);
                    });
                }

            } else {
                this.configure_google_search($("#"+this.defaults.without_popup_element_id).get(0));
            }
            $(document.body).prepend(search_popup);
            /* hide google default search input */
            if (!this.defaults.without_popup) {
                search_popup.find(".gsc-search-box").hide();
            } else {
                $("#"+this.defaults.without_popup_element_id).find(".gsc-search-box").hide();
            }
        },

        popup_hide: function(){
            var sd = site_search.defaults,
                sv = site_search.vars;

            if ( sd.sideclick_enabled ) {
                $( document.body ).unbind( 'click' );
            }
            $( '.'+sd.system_classes.popup ).hide();
            $( '.'+sd.system_classes.masking_iframe ).hide();
            sv.current_input = null;
        },

        resize_window: function(pop) {
            var inp = site_search.vars.current_input;
            if(inp !== null){
                site_search.position_popup.go(pop, inp);
            }
        },

        /* position the popup and check if out of bounds */
        position_popup:{
            go: function(pop, input) {
                var input_pos = input.offset();
                input_pos.bottom = input_pos.top+input.outerHeight();
                input_pos.right = input_pos.left+input.outerWidth();
                input_pos.width = input.outerWidth();
                input_pos.height = input.outerHeight();
                var viewport = {
                    top: $(window).scrollTop(),
                    left: $(window).scrollLeft(),
                    bottom:  $(window).scrollTop()+$(window).height(),
                    right: $(window).scrollLeft()+$(window).width()
                }

                if(site_search.defaults.display_fin){
                    var thefin = $("." + site_search.defaults.system_classes.fin);
                    var fin = {
                        width: thefin.outerWidth() / 2,
                        height: thefin.outerHeight() / 2
                    }
                } else {
                    var fin = false;
                }

                switch(site_search.defaults.popup_position){
                    case "auto":
                        if(viewport.right > (input_pos.right + pop.width())){ /* esimesena proovitakse asetada paremale */
                            site_search.position_popup.right(pop, input, viewport, input_pos, fin);
                        } else if(viewport.left < (input_pos.left - pop.width())){ /* siis vasakule */
                            site_search.position_popup.left(pop, input, viewport, input_pos, fin);
                        } else if(viewport.top < (input_pos.top - pop.height())){ /* siis üles */
                            site_search.position_popup.top(pop, input, viewport, input_pos, fin);
                        } else { /* kui midagi üle ei jää siis alla (mahub tavaliselt alati kuna lehed üldiselt venivad) */
                            site_search.position_popup.bottom(pop, input, viewport, input_pos, fin);
                        }
                    break;
                    case "left":
                        site_search.position_popup.left(pop, input, viewport, input_pos, fin);
                    break;
                    case "right":
                        site_search.position_popup.right(pop, input, viewport, input_pos, fin);
                    break;
                    case "bottom":
                        site_search.position_popup.bottom(pop, input, viewport, input_pos, fin);
                    break;
                    case "top":
                        site_search.position_popup.top(pop, input, viewport, input_pos, fin);
                    break;
                }
            },

            fix_bounds_and_position: function (pop, pos,viewport, input_pos, fin_mode, fin){
                var newPos = pos;

                /* fix popup position */
                if (newPos.left < viewport.left + site_search.defaults.popup_min_margin) {
                    newPos.left = viewport.left + site_search.defaults.popup_min_margin;
                } else if (newPos.right > viewport.right - site_search.defaults.popup_min_margin) {
                    newPos.left =  viewport.right - pop.outerWidth() - site_search.defaults.popup_min_margin;
                }


                if (newPos.top > viewport.bottom - pop.outerHeight() - site_search.defaults.popup_min_margin && fin_mode != "bottom" && fin_mode != "top" ) {
                    if(input_pos.bottom + (pop.outerHeight() * 0.05) > viewport.bottom - site_search.defaults.popup_min_margin){
                        newPos.top = input_pos.bottom + (pop.outerHeight() * 0.05) - pop.outerHeight();
                    } else {
                        newPos.top = viewport.bottom - pop.outerHeight() - site_search.defaults.popup_min_margin;
                    }
                }

                if (newPos.top < site_search.defaults.popup_min_margin ) { newPos.top = site_search.defaults.popup_min_margin; }

                /* fix fin position */
                if (site_search.defaults.display_fin) {
                    var thefin = pop.find("."+site_search.defaults.system_classes.fin);
                    site_search.position_popup.remove_fin_classes(thefin);
                    switch(fin_mode) {
                        case "bottom":
                            thefin.addClass(site_search.defaults.system_classes.fin_bottom).addClass(site_search.defaults.fin_bottom_class);
                            fin_left_pos = ((input_pos.right - input_pos.left) / 2) + (input_pos.left - newPos.left) - (thefin.outerWidth() / 2);
                            thefin.css({
                                left: fin_left_pos + "px",
                                top: -thefin.outerWidth() + "px",
                                bottom: "auto"
                            });
                        break;
                        case "top":
                            thefin.addClass(site_search.defaults.system_classes.fin_top).addClass(site_search.defaults.fin_top_class);
                            fin_left_pos = ((input_pos.right-input_pos.left) / 2) + (input_pos.left - newPos.left) - (thefin.outerWidth() / 2);
                            thefin.css({
                                left: fin_left_pos + "px",
                                top: "auto",
                                bottom: -thefin.outerWidth() + "px"
                            });
                        break;
                        case "left":
                            thefin.addClass(site_search.defaults.system_classes.fin_left).addClass(site_search.defaults.fin_left_class);
                            fin_top_pos = ((input_pos.bottom - input_pos.top) / 2) + (input_pos.top - newPos.top) - (thefin.outerHeight() / 2);
                            thefin.css({
                                top: fin_top_pos + "px",
                                left: "auto",
                                right: -thefin.outerHeight() + "px"
                            });
                        break;
                        case "right":
                            thefin.addClass(site_search.defaults.system_classes.fin_right).addClass(site_search.defaults.fin_right_class);
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

                $("."+site_search.defaults.system_classes.masking_iframe).css({
                    top: newPos.top + "px",
                    left: newPos.left + "px",
                    width: pop.outerWidth(),
                    height: pop.outerHeight()
                });
            },

            remove_fin_classes: function(fin) {
                fin.removeClass(site_search.defaults.system_classes.fin_left);
                fin.removeClass(site_search.defaults.system_classes.fin_right);
                fin.removeClass(site_search.defaults.system_classes.fin_top);
                fin.removeClass(site_search.defaults.system_classes.fin_bottom);
            },

            left: function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (((input_pos.bottom - input_pos.top) / 2) +input_pos.top) - (pop.outerHeight() / 2),
                    left: (fin !== false) ? input_pos.left - pop.outerWidth() - fin.width : input_pos.left - pop.outerWidth(),
                    right: (fin !== false) ? input_pos.left - fin.width : input_pos.left,
                    bottom: (((input_pos.bottom - input_pos.top) / 2) + input_pos.top) + (pop.outerHeight() / 2)
                }
                site_search.position_popup.fix_bounds_and_position(pop, newPos, viewport, input_pos, "left", fin);
            },

            right: function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (((input_pos.bottom - input_pos.top) / 2) +input_pos.top) - (pop.outerHeight() / 2),
                    left: (fin !== false) ? input_pos.right + fin.width : input_pos.right,
                    right: (fin !== false) ? input_pos.left + pop.outerWidth() + fin.width : input_pos.left + pop.outerWidth(),
                    bottom: (((input_pos.bottom - input_pos.top) / 2) + input_pos.top) + (pop.outerHeight() / 2)
                }
                site_search.position_popup.fix_bounds_and_position(pop, newPos, viewport, input_pos, "right", fin);
            },

            top: function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (fin !== false) ? input_pos.top - pop.outerHeight() - fin.width : input_pos.top - pop.outerHeight(),
                    left: input_pos.left - ((pop.outerWidth() - input_pos.width) / 2),
                    right: input_pos.right + ((pop.outerWidth() - input_pos.width) / 2),
                    bottom: (fin !== false) ? input_pos.top - fin.width : input_pos.top
                }
                site_search.position_popup.fix_bounds_and_position(pop, newPos, viewport, input_pos, "top", fin);
            },

            bottom: function(pop,input,viewport,input_pos,fin) {
                var newPos = {
                    top: (fin !== false) ? input_pos.bottom + fin.width : input_pos.bottom,
                    left: input_pos.left - ((pop.outerWidth() - input_pos.width) / 2),
                    right: input_pos.right + ((pop.outerWidth() - input_pos.width) / 2),
                    bottom: (fin !== false) ? input_pos.bottom + pop.outerHeight() + fin.width : input_pos.bottom + pop.outerHeight()
                }
                site_search.position_popup.fix_bounds_and_position(pop, newPos, viewport, input_pos, "bottom", fin);
            }
        },

        configure_google_search: function(popup_element) {
            var s_c = this.vars.search_control = new google.search.SearchControl();
            var s_o = this.vars.search_options = new  google.search.SearcherOptions();
            var s_w = this.vars.search_websearch = new  google.search.WebSearch();
            s_o.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);
            s_w.setUserDefinedClassSuffix("siteSearch");
            s_w.setSiteRestriction(document.location.hostname.replace(/^www./, ''));
            s_c.addSearcher(s_w, s_o);
            s_c.setSearchCompleteCallback(this, site_search.search_complete);
            switch(this.defaults.link_target) {
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
            s_c.draw(popup_element);
        },

        search_complete: function (input) {
            var nr_of_results = $(".gsc-stats").html();
            var class_string = (!site_search.defaults.without_popup) ? '.' + site_search.defaults.system_classes.popup + ' .'+site_search.defaults.system_classes.noresults : "#" + site_search.defaults.without_popup_noresults_id;
            if (nr_of_results == "(0)") {
                $(class_string).show();
            } else {
                $(class_string).hide();
            }

            if (!this.defaults.without_popup) {
                var pop = $('.' + this.defaults.system_classes.popup);
                pop.css({visibility: "hidden"}).show();
                if(typeof(input) != 'undefined'){
                    site_search.position_popup.go(pop, input);
                    $("."+site_search.defaults.system_classes.masking_iframe).show();
                    site_search.vars.current_input = input;
                    if ( site_search.defaults.sideclick_enabled ) {
                        $( document.body ).click( function(event) {
                            if ( $(event.target).parents('.' + site_search.defaults.system_classes.popup).length == 0 && event.target != pop.get(0) ) {
                                site_search.popup_hide();
                            }
                        });
                    }
                }
                pop.css({visibility: "visible"});
            }
            if(!site_search.vars.is_ie_lte_7){
                $("." + this.defaults.system_classes.loading_img).remove();
            }
        },

        /* load need javascripts if they dpo not exist */
        get_missing_scripts: function(f) {
            site_search.get_jquery(function() {
                $(site_search.defaults.search_form).submit(function() {
                    return false;
                });
                site_search.loadGoogle(f);
            });
        },

        /* load google api and search api */
        loadGoogle:  function(f) {
            if (typeof(window.google) == 'undefined') {
                $.getScript(site_search.defaults.google_api_url, function() {
                    google = window.google;
                    google.load('search', '1', {"nocss": true,'callback':f});
                });
            } else {
                google.load('search', '1', {"nocss": true,'callback': f});
            }
        },

        /* function to get script dynamically without jquery loaded */
        load_script: function(source, f) {
            (function(d, t) {
                var js = d.createElement(t);
                js.onload = f;
                var prot = (location.protocol!="file:") ? location.protocol : "http:";
                js.src = prot + '//'+source;
                js.onreadystatechange = function() {
                    if (this.readyState == 'complete' || this.readyState == 'loaded') {
                        f();
                    }
                };
                (d.getElementsByTagName('head')[0] || d.documentElement).appendChild(js);
            }(document, 'script'));
        },

        add_stylesheet: function(source) {
            var styles = $("head").children("style, link");
            var style = $("<style>" + source + "</style>").attr("type", "text/css");
            if (styles.length > 0){
                styles.eq(0).before(style);
            } else {
                $("head").append(style);
            }
        },

        /*safely load jQuery or neglect if loaded and run the code */
        get_jquery: function (f){
            if (window.jQuery === undefined || window.jQuery.fn.jquery < site_search.defaults.jquery_atleast_version) {
                site_search.load_script(site_search.defaults.jquery_url,function() {
                   $ = window.jQuery.noConflict(true);
                   f();
                });
            } else {
                $ = window.jQuery;
                f();
            }
        }
    }

    site_search.init();
})();