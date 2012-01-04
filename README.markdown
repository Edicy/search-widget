# Usage

Minimal required snippet:

    <form class="edys-search" ><input type="text" class="edys-search-input" /></form>
    <script src="site-search.js" type="text/javascript"></script>

#Applying design

For designing in css- the serach widget uses the following classes to mark its dom elements:

    .edys-search-popup  =>  the popup that appears when search is initiated
    .edys-search-container-noresults => box inside popup that appears when no results for search are found.
    .edys-search-container-close => popup close button
    .edys-search-masking-iframe => iframe behind the popup to mask flash and other that might penetrate through. shoukd have lower z-index than .edys-search-popup
    .edys-search-fin => the little arrow on the side of popup
    .edys-search-fin-left => litle arrow class override when popup is to the left side of the search input
    .edys-search-fin-right => litle arrow class override when popup is to the right side of the search input
    .edys-search-fin-top => litle arrow class override when popup is above the search input
    .edys-search-fin-bottom => litle arrow class override when popup is below the  search input

    by default google search data with its defautl classes will be loaded into div .edys-search-popup

#Configuration

To configure a javascript object "edys_site_search_options" for configuration can be applied before <script src="site-search.js" type="text/javascript"> </script> tag  like this:

    var edys_site_search_options = {
        without_popup: true,
        without_popup_element_id: "my-div",
        without_popup_noresults_id: "my-div-noresults",
        texts: {
          close: "Close",
          noresults: "Your search did not match any documents"
        }
    }

Main configuration variables:
    host_name => host name of the site to search. by default the host name derived from the url address is taken

    autorun_init => default = true. if set tu false bloks all automatic loading of module. if site_search jquery module is needed only it can be called out in javascript "apply_site_search_module(jQuery);" (jQuery and google search mus be preloaded then).
    autorun_search => default = true. jQuery / google search / jquery.site_search modules will be loaded, but site search will not be automatically bound to forms.
    init_complete  => default = null; function can be bound to init complete and will be fired after module has been loaded. ex:  edys_site_search_options = { init_complete: function($){ alert("foo"); } }

    without_popup =>  Values (true/false). Default = false. If set to true no popup will be displayed and search results will be displayed inside user defined div (without_popup_element_id).
    without_popup_element_id => the id of div where results are directed when without_popup = true.
    without_popup_noresults_id => When without_popup = true, the div that will be shown when zero search results are returned.

    texts => variable to override default texts. Usage:
        texts: {
            close: "Close",
            noresults: "Your search did not match any documents"
        }

    loading_image => the loading gif image that shows inside search input when searching. Encoded in base64

    search_input => class that defines the seach element input. default = ".edys-search-input"
    search_form: class that defines the seach element form. default = ".edys-search",

    popup_position => default = "auto". Values ("auto"/"left"/"right"/"bottom"/"top"). Defines the popup position in regard to the search input.
    popup_min_margin => default = 10; Defines How close to window border popup can position itself in pixels.
    display_fin => default = true. Values (false/true). Defines if the little fin is shown beside search popup. With default design set to false if IE6 support is needed.
    link_target => default = "_self", Values ("_self" / "_blank" / "_top" / "_parent"). Defines how search links will open. Like link target attribute ("_self" = in the same window, "_blank" = in a new window etc.).

    sideclick_enabled = default => true. Defines if search popup closes when somewhare on page is clicked that is not inside the serach results popup.

Additional configuration variables:

    google_api_url => address where google api is lodaded if not allready loaded. defaulot ="http://www.google.com/jsapi"

    close_btn_class => classname of popup close button, default = "edys-search-container-close"
    noresults_class => classname of div shown when 0 results, default = "edys-search-container-noresults".
    close_btn_class => classname of popup close button, default = "edys-search-container-close".
    popup_class => classname of popup, default = "edys-search-popup".
    loading_img_class => classname of loading image, default = "edys-search-loading".
    masking_iframe_class => classname of masking iframe, default = "edys-search-masking-iframe".
    fin_class => classname of popup fin, default = "edys-search-masking-fin".
    fin_left_class => classname of popup fin when left of search input, default = "edys-search-masking-fin-left".
    fin_right_class => classname of popup fin when left of search input, default = "edys-search-masking-fin-right".
    fin_top_class => classname of popup fin when left of search input, default = "edys-search-masking-fin-top".
    fin_bottom_class => classname of popup fin when left of search input, default = "edys-search-masking-fin-bottom".
    default_popup_style => default css that will be added to popup on initiation. default = {position:"absolute",display:"none" }

    default_closebtn_style => default css that will be added to popup closebutton on initiation. default = {cursor:"pointer"}
    fin_style => default css that will be added to popup fin on initiation. default = {}
    default_stylesheet => the default styleshees css that will be added if front of all stylesheets to document head.

#Configuring manually site_search on elements and its events

  site search can be initiated manually on forms as such if jQuery and google.seach is loaded. options are similiar to main configuration variables and passed as object.

      $('#element-id').site_search(options);

  searc elemets can be listened for two events:
  event after search by google has executed and poopup shown:

          $('#element-id').bind('afterSearch', function(){ alert('foo after'); });

  event before search executed and after form submit

          $('#element-id').bind('beforeSearch', function(){ alert('foo before'); });

  search form elements site_search javascript object bound to it can be called out as follows to access its functions

      var obj = $('#element-id').site_search('get_object');

  if jquery preloaded you can access module loaded event like this (alernatively to edys_site_search_options.init_complete. If edys_site_search_options.init_complete is set this event is not listened to):

      $('body').bind('Edys_search_init_complete', function (){ alert('foo'); });


#Comments

    Mutiple search boxes can be applied accross the page.
    Also multiple js files can be loaded, but only the first is initiated. Code detects that search is loaded and does not continue.