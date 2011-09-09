google.load("search", "1", {
    "nocss": true
});
google.load("jquery", "1.2.6");
google.setOnLoadCallback(searchLoaded);
function searchLoaded() {
    jQuery("#onpage_search").attr("value", search_translations["search"]);
    jQuery("#onpage_search").focus(function () {
        if (jQuery("#onpage_search").attr("value") == search_translations["search"]) {
            jQuery("#onpage_search").attr("value", "");
        }
    });
    jQuery("#onpage_search").blur(function () {
        if (jQuery("#onpage_search").attr("value") == "") {
            jQuery("#onpage_search").attr("value", search_translations["search"]);
        }
    });
    jQuery(window).resize(function () {
        positionSearch();
    });
    jQuery("#onpage_search").parents("form").submit(function () {
        _1.execute(jQuery("#onpage_search").attr("value"));
        return false;
    });
    jQuery("<div>").attr({
        id: "searchcontainer"
    }).css({
        display: "none"
    }).appendTo("body");
    jQuery("<iframe>").attr({
        id: "searchiframe"
    }).css({
        display: "none"
    }).appendTo("body");
    var _1 = new GSearchControl();
    var _2 = new GsearcherOptions();
    _2.setExpandMode(GSearchControl.EXPAND_MODE_OPEN);
    var _3 = new GwebSearch();
    _3.setUserDefinedClassSuffix("siteSearch");
    _3.setSiteRestriction(document.location.hostname.replace(/^www./, ''));
    _1.addSearcher(_3, _2);
    _1.setSearchCompleteCallback(this, searchComplete);
    _1.draw(document.getElementById("searchcontainer"));
    jQuery("<div>").attr({
        id: "searchcontainer-close"
    }).css({
        display: "block",
        padding: "10px 10px 0",
        "text-align": "right",
        margin: "10px"
    }).html("<a onclick=\"jQuery('#searchcontainer').hide(); jQuery('#searchiframe').hide(); return false;\" href=\"#close\">" + search_translations["close"] + "</a>").prependTo("#searchcontainer");
    jQuery("<div>").attr({
        id: "searchcontainer-noresults"
    }).css({
        display: "none",
        padding: "10px",
        margin: "10px",
        background: "#f0f0f0"
    }).text(search_translations["noresults"]).appendTo("#searchcontainer");
	jQuery("<div>").attr({
		id: "search-fin"
	}).prependTo("#searchcontainer");
    jQuery("form.gsc-search-box table").remove();
}
function positionSearch() {
    var _4 = {
        "above": parseInt(jQuery("#onpage_search").offset()["top"]),
        "below": parseInt(jQuery(window).height() - jQuery("#onpage_search").height() - jQuery("#onpage_search").offset()["top"]),
        "right": parseInt(jQuery(window).width() - jQuery("#onpage_search").width() - jQuery("#onpage_search").offset()["left"]),
        "left": parseInt(jQuery("#onpage_search").offset()["left"])
    };
    if ((_4["above"] > _4["below"]) && (_4["above"] > parseInt(jQuery("#searchcontainer").outerHeight()))) {
        var _5 = parseInt(jQuery("#onpage_search").offset()["top"]) - parseInt(jQuery("#searchcontainer").outerHeight() + 10);
		jQuery("#search-fin").addClass('search-fin-bottom');
    } else {
        var _5 = parseInt(jQuery("#onpage_search").offset()["top"] + jQuery("#onpage_search").outerHeight() + 10);
		jQuery("#search-fin").addClass('search-fin-top');
    }
	var _6 = parseInt(jQuery("#onpage_search").offset()["left"]-(jQuery("#searchcontainer").width()-jQuery("#onpage_search").width())/2);
    jQuery("#searchcontainer").css({
        top: _5,
        left: _6
    });
    jQuery("#searchiframe").css({
        top: _5,
        left: _6,
        height: jQuery("#searchcontainer").outerHeight()
    });
}
function searchComplete() {
    var _7 = jQuery(".gsc-stats").html();
    if (_7 == "(0)") {
        jQuery("#searchcontainer-noresults").show();
    } else {
        jQuery('#searchcontainer-noresults').hide();
    }
    positionSearch();
    jQuery("#searchiframe").show();
    jQuery("#searchcontainer").show();
}