# Usage

Minimal required snippet:

    <form class="edys-search" ><input type="text" class="edys-search-input" /></form>
    <script src="site-search.js" type="text/javascript"> </script>

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
    
    display_fin => default = true. Values (false/true). Defines if the little fin is shown beside search popup. With default design set to false if IE6 support is needed.
    
Additional configuration variables:

    jquery_atleast_version => minimal required jQuery version. Default = "1.5"
    jquery_url => address where jQuery is obtained if is not present or version is less than jquery_atleast_version. deefault =  "ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"
    google_api_url => address where google api is lodaded if not allready loaded. defaulot ="http://www.google.com/jsapi"
    
    close_btn_class => Object defining classnames of popup close button:
        general => default = "edys-search-container-close". Should be used for designing.
        system =>  default = "edys-sw-search-container-close". Only for the widget itself to recognize objects.
        
    noresults_class => Object defining classnames of div shown when 0 results:
        general => default = "edys-search-container-noresults". Should be used for designing.
        system =>  default = "edys-sw-search-container-noresults". Only for the widget itself to recognize objects.
        
    close_btn_class => Object defining classnames of popup close button:
        general => default = "edys-search-container-close". Should be used for designing.
        system =>  default = "edys-sw-search-container-close". Only for the widget itself to recognize objects.
        
    popup_class => Object defining classnames of popup:
        general => default = "edys-search-popup". Should be used for designing.
        system =>  default = "edys-sw-search-popup". Only for the widget itself to recognize objects.
        
    loading_img_class => Object defining classnames of loading image:
        general => default = "edys-search-loading". Should be used for designing.
        system =>  default = "edys-sw-search-loading". Only for the widget itself to recognize objects.
        
    masking_iframe_class => Object defining classnames of masking iframe:
        general => default = "edys-search-masking-iframe". Should be used for designing.
        system =>  default = "edys-sw-search-masking-iframe". Only for the widget itself to recognize objects.
        
    fin_class => Object defining classnames of popup fin:
        general => default = "edys-search-masking-fin". Should be used for designing.
        system =>  default = "edys-sw-search-masking-fin". Only for the widget itself to recognize objects.
        
    fin_left_class => Object defining classnames of popup fin when left of search input:
        general => default = "edys-search-masking-fin-left". Should be used for designing.
        system =>  default = "edys-sw-search-masking-fin-left". Only for the widget itself to recognize objects.

    fin_right_class => Object defining classnames of popup fin when left of search input:
        general => default = "edys-search-masking-fin-right". Should be used for designing.
        system =>  default = "edys-sw-search-masking-fin-right". Only for the widget itself to recognize objects.
     
    fin_top_class => Object defining classnames of popup fin when left of search input:
        general => default = "edys-search-masking-fin-top". Should be used for designing.
        system =>  default = "edys-sw-search-masking-fin-top". Only for the widget itself to recognize objects.
        
    fin_bottom_class => Object defining classnames of popup fin when left of search input:
        general => default = "edys-search-masking-fin-bottom". Should be used for designing.
        system =>  default = "edys-sw-search-masking-fin-bottom". Only for the widget itself to recognize objects.
        
    default_popup_style => default css that will be added to popup on initiation. default = {position:"absolute",display:"none" }
    default_closebtn_style => default css that will be added to popup closebutton on initiation. default = {cursor:"pointer"}
    fin_style => default css that will be added to popup fin on initiation. default = {}
    
    default_stylesheet => the default styleshees css that will be added if front of all stylesheets to document head.
    
#Comments  
    
    Mutiple search boxes can be applied accross the page. 
    Also multiple js files can be loaded, but only the first is initiated. Code detects that search is loaded and does not continue.