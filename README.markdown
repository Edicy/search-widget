# Edicy search widget
Edicy graphical implementaton plugin for google ajax search.

## Usage

Minimal required snippet:

    <form class="edys-search" ><input type="text" class="edys-search-input" /></form>
    <script src="site-search.js" type="text/javascript"></script>

##Applying design

For designing in css- the serach widget uses the following classes to mark its dom elements:

* `.edys-search-popup` the popup that appears when search is initiated
* `.edys-search-container-noresults` box inside popup that appears when no results for search are found.
* `.edys-search-container-close` popup close button
* `.edys-search-masking-iframe` iframe behind the popup to mask flash and other that might penetrate through. Should have lower z-index than .edys-search-popup
* `.edys-search-fin` the little arrow on the side of popup
* `.edys-search-fin-left` litle arrow class override when popup is to the left side of the search input
* `.edys-search-fin-right` litle arrow class override when popup is to the right side of the search input
* `.edys-search-fin-top` litle arrow class override when popup is above the search input
* `.edys-search-fin-bottom` litle arrow class override when popup is below the  search input

by default google search data with its default classes will be loaded into div .edys-search-popup

##Configuration

To configure a javascript object "edys_site_search_options" for configuration can be applied before `<script src="site-search.js" type="text/javascript"> </script>` tag  like this:

    var edys_site_search_options is {
        without_popup: true,
        without_popup_element_id: "my-div",
        without_popup_noresults_id: "my-div-noresults",
        texts: {
          close: "Close",
          noresults: "Your search did not match any documents"
        }
    }

###Main configuration variables:

* `host_name` host name of the site to search. By default the host name derived from the url address is taken (without www. prefix)
* `autorun_init` default is `true`. If set to `false` bloks all automatic loading of module. if `site_search` jquery module is needed only it can be called out in javascript `apply_site_search_module(jQuery);` (jQuery and google search must be preloaded then).
* `autorun_search` default is true. jQuery / google search / jquery.site_search modules will be loaded, but site search will not be automatically bound to forms.
* `init_complete`  default is null. Function can be bound to init complete and will be fired after module has been loaded. ex:  `edys_site_search_options = { init_complete: function($){ alert("foo"); } }`
* `without_popup` Values (`true`/`false`). Default is `false`. If set to `true` no popup will be displayed and search results will be displayed inside user defined div `without_popup_element_id`.
* `without_popup_element_id` the id of div where results are directed when without_popup is true.
* `without_popup_noresults_id` When `without_popup` is `true`, the div that will be shown when zero search results are returned.
* `texts` variable to override default texts. Usage:

    texts: {
        close: "Close",
        noresults: "Your search did not match any documents"
    }

* `loading_image` the loading gif image that shows inside search input when searching. Encoded in base64
* `search_input` class that defines the seach element input. default is `.edys-search-input`
* `search_form` class that defines the seach element form. default is `.edys-search`,
* `default_stylesheet_enabled` default is `true`. Values `true`/`false` If set to `false` default css will not be loaded.
* `popup_position` default is `auto`. Values (`auto`/`left`/`right`/`bottom`/`top`). Defines the popup position in regard to the search input.
* `popup_min_margin` default is `10`; Defines how close to window border popup can position itself in pixels.
* `display_fin` default is true. Values (`false`/`true`). Defines if the little fin is shown beside search popup. With default design set to false if IE6 support is needed.
* `link_target` default is "_self", Values ("_self" / "_blank" / "_top" / "_parent"). Defines how search links will open. Like link target attribute ("_self" is in the same window, "_blank" is in a new window etc.).
* `sideclick_enabled` default => true. Defines if search popup closes when somewhare on page is clicked that is not inside the serach results popup.

###Additional configuration variables:

`google_api_url` address where google api is lodaded if not allready loaded. default ="http://www.google.com/jsapi"

* `close_btn_class` classname of popup close button, default is `edys-search-container-close`
* `noresults_class` classname of div shown when 0 results, default is `edys-search-container-noresults`.
* `close_btn_class` classname of popup close button, default is `edys-search-container-close`.
* `popup_class` classname of popup, default is `edys-search-popup`.
* `loading_img_class` classname of loading image, default is `edys-search-loading`.
* `masking_iframe_class` classname of masking iframe, default is `edys-search-masking-iframe`.
* `fin_class` classname of popup fin, default is `edys-search-masking-fin`.
* `fin_left_class` classname of popup fin when popup is left of the search input, default is `edys-search-masking-fin-left`.
* `fin_right_class` classname of popup fin when popup is right of search input, default is `edys-search-masking-fin-right`.
* `fin_top_class` classname of popup fin when popup is ontop of the search input, default is `edys-search-masking-fin-top`.
* `fin_bottom_class` classname of popup fin when popup is at the bottom of search input, default is `edys-search-masking-fin-bottom`.

* `default_popup_style` default css that will be added to the popup on initiation. Default is `{position:"absolute",display:"none" }`.
* `default_closebtn_style` default css that will be added to popup closebutton on initiation. default is `{cursor:"pointer"}`
* `fin_style` default css that will be added to popup fin on initiation. default is `{}`
* `default_stylesheet` the default stylesheet css string that will be added if front of all stylesheets to document head.

##Geting searcher object from element and listening to events

site search can be initiated manually on forms as such if jQuery and google.seach is loaded. options are similiar to main configuration variables and passed as object.

    $('#element-id').site_search(options);

**Search elemets can be listened for two events:**

Event after search by google has executed and poopup shown:

    $('#element-id').bind('afterSearch', function () { alert('foo after'); });

Event before search executed and after form submit:

    $('#element-id').bind('beforeSearch', function () { alert('foo before'); });

Search form elements `site_search` javascript object bound to it can be called out as follows to access its functions

    var obj = $('#element-id').site_search('get_object');

If jQuery preloaded you can access module loaded event like this (alernatively to `edys_site_search_options.init_complete`. If `edys_site_search_options.init_complete` is set this event is not listened to):

    $('body').bind('Edys_search_init_complete', function () { alert('foo'); });

##Comments

Mutiple search boxes can be applied accross the page.
Also multiple js files can be loaded, but only the first is initiated. Code detects that search is loaded and does not continue.

#Default styles
When there are some flickering at page loading related to @fontface-s then the css can be added manually to page and module should be blocked from loading its own stylesheet `default_stylesheet_enabled: false`
 
    .edys-sw-search-popup {
      background: #e1e1e1;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      width: 330px;
      position: absolute;
      z-index: 10000;
      -moz-box-shadow: 0px 2px 15px rgba(0,0,0,0.15);
      -webkit-box-shadow: 0px 2px 15px rgba(0,0,0,0.15);
      box-shadow: 0px 2px 15px rgba(0,0,0,0.15);
      color: #484d4f;
      font-size: 12px;
      font: 12px/14px "Helvetica Neue", Helvetica, Arial, sans-serif;
      padding: 10px 0px 10px 0px;
      -moz-text-shadow: 0 1px 0 #ffffff;
      -webkit-text-shadow: 0 1px 0 #ffffff;
      text-shadow: 0 1px 0 #ffffff;
      text-align: left;
      -moz-opacity: 0.95;
      -webkit-opacity: 0.95;
      opacity: 0.95;
    }
      .edys-sw-search-popup table {
      border-collapse: collapse;
    }
      .edys-sw-search-popup .gs-title {
      color: #1b2124;
      font-weight: bold;
      text-decoration: none;
      padding: 0 0 10px 0;
    }
    .edys-sw-search-container-close {
      display: block;
      float: right;
      overflow: hidden;
      width: 10px;
      height: 11px;
      clear: both;
      margin-right: 10px;
      background: url("http://static.edicy.com/assets/site_search/3.0/site-search-closebtn.png") no-repeat right 0;
    }
    .edys-sw-search-masking-iframe {
      width: 340px;
      position: absolute;
      border: none;
      z-index: 9000;
    }
    .edys-sw-search-container-noresults {
      padding: 20px;
      text-align: center;
    }
    .edys-sw-search-popup .gsc-result-siteSearch {
      margin: 0px 10px 10px 10px;
      overflow: hidden;
    }
    .edys-sw-search-popup .gsc-results {
      padding-top: 30px;
      margin-top: -20px;
      overflow: hidden;
    }
    .edys-sw-search-popup .gsc-cursor-box {
      border-top: 1px solid #b9b9b9;
      padding-top: 10px;
      font-size: 14px;
      color: #0066bb;
      text-align: right;
      padding-right: 10px;
    }
    .edys-sw-search-popup .gsc-cursor-page {
      display: inline;
      cursor: pointer;
      padding: 3px 5px;
    }
    .edys-sw-search-popup .gsc-cursor-page:hover, .edys-sw-search-popup .gsc-cursor-current-page {
      color: #484d4f;
    }
    .edys-sw-search-popup .gsc-cursor-current-page {
      font-weight: bold;
    }
    .edys-sw-search-popup .gsc-resultsHeader, .edys-sw-search-popup .gsc-twiddle, .edys-sw-search-popup .gs-watermark, .edys-sw-search-popup .gs-visibleUrl, .edys-sw-search-popup .gsc-trailing-more-results {
      display: none;
    }
    .edys-sw-search-fin {
      width: 0px;
      height: 0px;
      position: absolute;
      border-width: 20px;
      margin-top: -20px;
      margin-left: -20px;
      border-style: solid;
      border-color: #e1e1e1;
    }
    .edys-sw-search-fin-left {
      margin-right: -40px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
    }
    .edys-sw-search-fin-right {
      margin-left: -40px;
      border-top-color: transparent !important;
      border-left-color: transparent !important;
      border-bottom-color: transparent !important;
    }
    .edys-sw-search-fin-top {
      margin-bottom: -40px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
    }
    .edys-sw-search-fin-bottom {
      margin-top: -40px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-left-color: transparent !important;
    }