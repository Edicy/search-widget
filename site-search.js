(function() {
    var site_search = {
        $:null,
        google: null,

        defaults: {
            jquery_atleast_version: "1.5", /* minimum jQuery version */
            jquery_url: "ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js",
            google_api_url: "http://www.google.com/jsapi",
            search_input: ".edys-search-input",
            search_form: ".edys-search",
            close_btn_class: "searchcontainer-close",
            noresults_class: "searchcontainer-noresults",
            search_popup_class: "edys-search-popup",
            loading_img_class: "edys-search-loading",
            fin_class: "edys-search-fin",
            fin_left_class: "edys-search-fin-left",
            fin_right_class: "edys-search-fin-right",
            fin_top_class: "edys-search-fin-top",
            fin_bottom_class: "edys-search-fin-bottom",
            default_popup_style: {position:"absolute",display:"none" },
            default_closebtn_style: {cursor:"pointer"},
            loading_image: "R0lGODlhEAAQALMNAKqon4SCecTBuXd1bZGOhpCPhoSCesPCuXd1bJCOhtDOxre1rJ2bkv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCAANACwAAAAAEAAQAAAEUrDJ2daimFqb5xHV1gAAdnwgR5LUKYDTWrYwxU6K0k0M0+S5Xa8H1HWGvuCu0aMMEJlEAjN4QicF6XRSRUADgUZWikEMGgYDuEEgLNPr5UTdiQAAIfkEBQgADQAsAAAAABAAEAAABEiwydnOoZham6dS1dYsC/Z94UiW3kmtbJuRFIJ0EwA0to3rut6tA9z5cA0dxWDIMBgYJpPyfC6ljUSiUYVes9qtFRfeIifaTgQAIfkEBQgADQAsAAAAABAAEAAABEiwydmUophamydC1dYcB/Z94UiW3kmtbJuRlGF007I0to3rut6tA9z5cA0dJZHIAAAYJpPyfC6lDQajUYVes9qtFRfeIifaTgQAIfkEBQgADQAsAAAAABAADgAABD6wydkQopham6cx1dYoCvZ94UiW3kmtbJuRVJJ003E0to3rut6tA9z5cA0dhcHILBYYJpPyfC6l1Gq0ibFKIgAh+QQFCAANACwAAAAAEAAQAAAEQrDJ2YyhmFqbZ0rV1iAI9n3hSJbeSa1sm5EUw3STojS2jeu63q0D3PlwDR1ycjgsmU0nbrFoRKUZKtWKzWqfkm0mAgAh+QQFCAANACwCAAAADgAQAAAEQbBJmdK8t1YsGWuaZRiT54HiSDbmN6kr614jZzcIck95vuO9H1CyWHAUikmxeEEiicvG4dBwJqHSKfXJ0VJ/U1sEACH5BAUIAA0ALAAAAAAQABAAAARBsMnZGKOYWpvzvknSTVwYjpQpotM5LQtrGA0Mj/Nsx11O36gZ5XDIIBAYIpFyPA6VDYWi0UQ+o9Kpc5SdsiTSTgQAIfkEBQgADQAsAAACABAADgAABEGwybWkbYzdRunN2dVVFqiJ5HdKx7FtSdK07SvFMe3auFzbN5lFoXgZDBsi8XI8XpRFBKLRRD6j0qkTmJ0CL1JbBAA7",
            popup_position: "auto",
            fin_style: {  },
            display_fin: true,
            texts: {
                close: "Close",
                noresults: "Your search did not match any documents"
            }
        },

        vars: {
            search_control: null,
            search_options: null,
            search_websearch: null
        },

        /* starting point of moule*/
        init: function(){
            if(typeof window.edys_site_search_options !='undefined'){
                site_search.extend(site_search.defaults, window.edys_site_search_options);
            }
            this.get_missing_scripts(function(){
                 site_search.after_init();
            });
        },

        /* starting point of moule after missing scripts added*/
        after_init: function (){
            /* implement on every search form */
            var search_frm = this.$(this.defaults.search_form);
            search_frm.each(function(){
                /* get input position and dimensions */
                var frm = site_search.$(this);
                var frm_input = frm.find(site_search.defaults.search_input);
                var pos = frm_input.offset();
                pos.height = frm.height();
                pos.width= frm_input.width();

                frm.submit(function(){
                     var this_frm = site_search.$(this);

                    /* draw loading img */
                    site_search.$("."+site_search.defaults.loading_img_class).remove();
                    var loader = site_search.$("<img />").attr({
                        "src":"data:image/png;base64,"+site_search.defaults.loading_image
                    }).addClass(site_search.defaults.loading_img_class).css({
                        position:"absolute",
                        visibility:"hidden"
                    });
                    site_search.$("body").prepend(loader);
                    loader.css({
                        top:pos.top+((pos.height-loader.height())/2)+"px",
                        left:(pos.left+(pos.width-loader.width()))+"px",
                        visibility:"visible"
                     });

                   /* send search string to google and disable submitting form  */
                    var searchstring = this_frm.find(site_search.defaults.search_input).val();

                    site_search.vars.search_control.setSearchCompleteCallback(this, function(){
                        site_search.search_complete(frm_input);
                     });
                    site_search.vars.search_control.execute(searchstring);

                    //site_search.$('.'+site_search.defaults.search_popup_class).css({left:pos.left+"px", top:pos.top+pos.height+"px"});
                    return false;
                });
            });

            /* configure google search and delegate it to a hidden div for popup on demand */
            var search_popup = this.$('<div class="'+this.defaults.search_popup_class+'"></div>').css(this.defaults.default_popup_style);
            site_search.$(document.body).prepend(search_popup);
            this.configure_google_search(search_popup.get(0));

            /* make a popup close btn and noresults box */
            var noresults = this.$('<div></div>').addClass(this.defaults.noresults_class).html(this.defaults.texts.noresults);

            var close_btn = this.$("<div></div>").addClass(this.defaults.close_btn_class).css(this.defaults.default_closebtn_style).html(this.defaults.texts.close).click(function(){
                site_search.$('.'+site_search.defaults.search_popup_class).hide();
            });

             search_popup.prepend(close_btn,noresults);

            if(this.defaults.display_fin){
                var fin = this.$("<div></div>").addClass(this.defaults.fin_class).css(this.defaults.fin_style);
                search_popup.prepend(fin)
             }

            site_search.$(document.body).prepend(search_popup);
            search_popup.find(".gsc-search-box").hide();
        },

        /* position the popup and check if out of bounds */
        /* needs optimization */
        position_popup:{
            go: function(pop,input){
                var input_pos = input.offset();
                input_pos.bottom =  input_pos.top+input.outerHeight();
                input_pos.right =  input_pos.left+input.outerWidth();
                input_pos.width = input.outerWidth();
                input_pos.height =  input.outerHeight();

                var viewport = {
                    top: site_search.$(window).scrollTop(),
                    left: site_search.$(window).scrollLeft(),
                    bottom:  site_search.$(window).scrollTop()+site_search.$(window).height(),
                    right: site_search.$(window).scrollLeft()+site_search.$(window).width()
                }

                switch(site_search.defaults.popup_position){
                    case "auto":
                        if(viewport.top < (input_pos.top - pop.height())){
                            site_search.position_popup.top(pop,input,viewport,input_pos);
                        } else if(viewport.left < (input_pos.left - pop.width())){
                              site_search.position_popup.left(pop,input,viewport,input_pos);
                        }  else if(viewport.right > (input_pos.right+pop.width())){
                             site_search.position_popup.right(pop,input,viewport,input_pos);
                        } else {
                            site_search.position_popup.bottom(pop,input,viewport,input_pos);
                        }
                    break;
                    case "left":
                        site_search.position_popup.left(pop,input,viewport,input_pos);
                    break;
                    case "right":
                        site_search.position_popup.right(pop,input,viewport,input_pos);
                    break;
                    case "bottom":
                        site_search.position_popup.bottom(pop,input,viewport,input_pos);
                    break;
                    case "top":
                        site_search.position_popup.top(pop,input,viewport,input_pos);
                    break;
                }
            },

            fix_bounds_and_position: function (pop, pos,viewport, input_pos, fin_mode){
                var newPos = pos;
                if (newPos.left < viewport.left){
                    newPos.left = viewport.left;
                } else if (newPos.right > viewport.right){
                    newPos.left =  viewport.right-pop.outerWidth();
                }
                if(newPos.top <0){ newPos.top = 0; }

                 if(site_search.defaults.display_fin){
                    var thefin = pop.find("."+site_search.defaults.fin_class);
                    site_search.position_popup.remove_fin_classes(thefin);
                    switch(fin_mode){
                        case "bottom":
                            thefin.addClass(site_search.defaults.fin_bottom_class);
                            fin_left_pos = ((input_pos.right-input_pos.left)/2)+(input_pos.left-newPos.left)-(thefin.outerWidth()/2);
                            thefin.css({
                                left: fin_left_pos+"px",
                                top: -thefin.outerWidth()+1+"px",
                                bottom: "auto"
                            });
                        break;
                        case "top":
                              thefin.addClass(site_search.defaults.fin_top_class);
                            fin_left_pos = ((input_pos.right-input_pos.left)/2)+(input_pos.left-newPos.left)-(thefin.outerWidth()/2);
                            thefin.css({
                                left: fin_left_pos+"px",
                                top: "auto",
                                bottom: -thefin.outerWidth()+1+"px"
                            });
                        break;
                        case "left":
                            thefin.addClass(site_search.defaults.fin_left_class);
                            fin_top_pos = ((input_pos.bottom-input_pos.top)/2)+(input_pos.top-newPos.top)-(thefin.outerHeight()/2);
                            thefin.css({
                                top: fin_top_pos+"px",
                                left: "auto",
                                right: -thefin.outerHeight()+1+"px"
                            });
                        break;
                        case "right":
                            thefin.addClass(site_search.defaults.fin_right_class);
                            fin_top_pos = ((input_pos.bottom-input_pos.top)/2)+(input_pos.top-newPos.top)-(thefin.outerHeight()/2);
                            thefin.css({
                                top: fin_top_pos+"px",
                                right: "auto",
                                left: -thefin.outerHeight()+1+"px"
                            });
                        break;
                    }
               }

                pop.css({
                    top: newPos.top+"px",
                    left: newPos.left+"px"
                });
            },

            remove_fin_classes: function(fin){
                fin.removeClass(site_search.defaults.fin_left_class);
                fin.removeClass(site_search.defaults.fin_right_class);
                fin.removeClass(site_search.defaults.fin_top_class);
                fin.removeClass(site_search.defaults.fin_bottom_class);
            },

            left: function(pop,input,viewport,input_pos){
                 var newPos = {
                    top: (((input_pos.bottom-input_pos.top)/2) +input_pos.top)-(pop.outerHeight()/2),
                    left: input_pos.left - pop.outerWidth(),
                    right: input_pos.left,
                    bottom: (((input_pos.bottom-input_pos.top)/2) +input_pos.top)+(pop.outerHeight()/2),
                }
                site_search.position_popup.fix_bounds_and_position(pop,newPos,viewport, input_pos, "left");
            },
            right: function(pop,input,viewport,input_pos){
                 var newPos = {
                    top: (((input_pos.bottom-input_pos.top)/2) +input_pos.top)-(pop.outerHeight()/2),
                    left: input_pos.right,
                    right: input_pos.left + pop.outerWidth(),
                    bottom: (((input_pos.bottom-input_pos.top)/2) +input_pos.top)+(pop.outerHeight()/2),
                }
                site_search.position_popup.fix_bounds_and_position(pop,newPos,viewport, input_pos, "right");
            },
            top: function(pop,input,viewport,input_pos){
                 var newPos = {
                    top: input_pos.top-pop.outerHeight(),
                    left: input_pos.left-((pop.outerWidth()-input_pos.width)/2),
                    right: input_pos.right+ ((pop.outerWidth()-input_pos.width)/2),
                    bottom: input_pos.top
                }
                 site_search.position_popup.fix_bounds_and_position(pop,newPos,viewport, input_pos, "top");
            },
            bottom: function(pop,input,viewport,input_pos){
                var newPos = {
                    top: input_pos.bottom,
                    left: input_pos.left - ((pop.outerWidth()-input_pos.width)/2),
                    right: input_pos.right + ((pop.outerWidth()-input_pos.width)/2),
                    bottom: input_pos.bottom + pop.outerHeight()
                }
                site_search.position_popup.fix_bounds_and_position(pop,newPos,viewport, input_pos, "bottom");
            }
        },

        configure_google_search: function(popup_element){
            var s_c = this.vars.search_control = new google.search.SearchControl();
            var s_o = this.vars.search_options = new  google.search.SearcherOptions();
            var s_w = this.vars.search_websearch = new  google.search.WebSearch();
            s_o.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);
            s_w.setUserDefinedClassSuffix("siteSearch");
            s_w.setSiteRestriction(document.location.hostname.replace(/^www./, ''));
            s_c.addSearcher(s_w, s_o);
            s_c.setSearchCompleteCallback(this, site_search.search_complete);
             s_c.draw(popup_element);
        },

        search_complete: function (input){
             var nr_of_results = site_search.$(".gsc-stats").html();
             var class_string ='.'+site_search.defaults.search_popup_class+' .'+site_search.defaults.noresults_class;
            if (nr_of_results == "(0)") {
                site_search.$(class_string).show();
            } else {
                site_search.$(class_string).hide();
            }

            var pop = this.$('.'+this.defaults.search_popup_class);
            pop.css({visibility:"hidden"}).show();
            if(typeof(input) != 'undefined' ){
                site_search.position_popup.go(pop,input);
             }

            pop.css({visibility:"visible"});


            this.$("."+this.defaults.loading_img_class).remove();
        },

        /* load need javascripts if they dpo not exist */
          get_missing_scripts: function(f){
            site_search.get_jquery(function(){
                site_search.loadGoogle(f);
            });
        },

        /* load google api and search api */
        loadGoogle:  function(f) {
            if (typeof(google) == 'undefined') {
                site_search.$.getScript(site_search.defaults.google_api_url, function() {
                    google.load('search', '1', {"nocss": true,'callback':f});
                });
            } else {
                google.load('search', '1', {"nocss": true,'callback': f});
            }
        },

        /* function to get script dynamically without jquery loaded */
        load_script: function(source,f){
            (function(d, t) {
                var js = d.createElement(t);
                 js.onload = f;
                var prot = (location.protocol!="file:")?location.protocol:"http:";
                js.src = prot + '//'+source;
                js.onreadystatechange = function() {
                    if (this.readyState == 'complete' || this.readyState == 'loaded') {
                        f();
                    }
                };
                (d.getElementsByTagName('head')[0] || d.documentElement).appendChild(js);
            }(document, 'script'));
        },

        /*safely load jQuery or neglect if loaded and run the code */
        get_jquery: function (f){
            if (window.jQuery === undefined || window.jQuery.fn.jquery < site_search.defaults.jquery_atleast_version) {
               site_search.load_script(site_search.defaults.jquery_url,function() {
                   site_search.$ = window.jQuery.noConflict(true);
                   f();
                });
            } else {
                site_search.$ = window.jQuery;
                f();
            }
        },

        /* extend object function to be used before jQuery is loaded */
        extend:  function(destination, source) {
          for (var property in source) {
            if (source[property] && source[property].constructor &&
             source[property].constructor === Object) {
              destination[property] = destination[property] || {};
              arguments.callee(destination[property], source[property]);
            } else {
              destination[property] = source[property];
            }
          }
          return destination;
        }
    }

    window.site_search = site_search;
    site_search.init();
})();