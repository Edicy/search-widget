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
            search_popup_class: "site-search-popup",
            loading_img_class: "edys-search-loading",
            default_popup_style: {position:"absolute", width: "400px",background:"#ffffff",display:"none" },
            default_closebtn_style: {cursor:"pointer", float:"right"},
            loading_image: "R0lGODlhEAAQALMNAKqon4SCecTBuXd1bZGOhpCPhoSCesPCuXd1bJCOhtDOxre1rJ2bkv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCAANACwAAAAAEAAQAAAEUrDJ2daimFqb5xHV1gAAdnwgR5LUKYDTWrYwxU6K0k0M0+S5Xa8H1HWGvuCu0aMMEJlEAjN4QicF6XRSRUADgUZWikEMGgYDuEEgLNPr5UTdiQAAIfkEBQgADQAsAAAAABAAEAAABEiwydnOoZham6dS1dYsC/Z94UiW3kmtbJuRFIJ0EwA0to3rut6tA9z5cA0dxWDIMBgYJpPyfC6ljUSiUYVes9qtFRfeIifaTgQAIfkEBQgADQAsAAAAABAAEAAABEiwydmUophamydC1dYcB/Z94UiW3kmtbJuRlGF007I0to3rut6tA9z5cA0dJZHIAAAYJpPyfC6lDQajUYVes9qtFRfeIifaTgQAIfkEBQgADQAsAAAAABAADgAABD6wydkQopham6cx1dYoCvZ94UiW3kmtbJuRVJJ003E0to3rut6tA9z5cA0dhcHILBYYJpPyfC6l1Gq0ibFKIgAh+QQFCAANACwAAAAAEAAQAAAEQrDJ2YyhmFqbZ0rV1iAI9n3hSJbeSa1sm5EUw3STojS2jeu63q0D3PlwDR1ycjgsmU0nbrFoRKUZKtWKzWqfkm0mAgAh+QQFCAANACwCAAAADgAQAAAEQbBJmdK8t1YsGWuaZRiT54HiSDbmN6kr614jZzcIck95vuO9H1CyWHAUikmxeEEiicvG4dBwJqHSKfXJ0VJ/U1sEACH5BAUIAA0ALAAAAAAQABAAAARBsMnZGKOYWpvzvknSTVwYjpQpotM5LQtrGA0Mj/Nsx11O36gZ5XDIIBAYIpFyPA6VDYWi0UQ+o9Kpc5SdsiTSTgQAIfkEBQgADQAsAAACABAADgAABEGwybWkbYzdRunN2dVVFqiJ5HdKx7FtSdK07SvFMe3auFzbN5lFoXgZDBsi8XI8XpRFBKLRRD6j0qkTmJ0CL1JbBAA7",
            popup_position: "bottom",
            texts: {
                close: "Close"
            }
		},

        vars: {
            search_control: null,
            search_options: null,
            search_websearch: null
        },
		
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
                    site_search.vars.search_control.execute(searchstring);
                    site_search.$('.site-search-popup').css({left:pos.left+"px", top:pos.top+pos.height+"px"});
                    return false;
                });
            });

            /* configure google search and delegate it to a hidden div for popup on demand */
            var search_popup = this.$('<div class="site-search-popup"></div>').css(this.defaults.default_popup_style);
            site_search.$(document.body).prepend(search_popup);
            this.configure_google_search(search_popup.get(0));
            
            /* make a popup close btn */
            var close_btn = this.$("<div></div>").css(this.defaults.default_closebtn_style).html(this.defaults.texts.close).click(function(){
                site_search.$('.'+site_search.defaults.search_popup_class).hide(); 
            });
            search_popup.prepend(close_btn);
            
            search_popup.find(".gsc-search-box").hide();
        },

        configure_google_search: function(popup_element){
            var s_c = this.vars.search_control = new google.search.SearchControl();
            var s_o = this.vars.search_options = new  google.search.SearcherOptions();
            var s_w = this.vars.search_websearch = new  google.search.WebSearch();
            s_o.setExpandMode(s_c.EXPAND_MODE_OPEN);
            s_w.setUserDefinedClassSuffix("siteSearch");
            s_w.setSiteRestriction(document.location.hostname.replace(/^www./, ''));
            s_c.addSearcher(s_w, s_o);
            s_c.setSearchCompleteCallback(this, site_search.search_complete);
             s_c.draw(popup_element);
        },

        search_complete: function (){
            this.$('.'+this.defaults.search_popup_class).show(); 
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