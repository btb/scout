var Layout = {

    init_layout: function(){

        // async load css by flipping the media attribute to all
    	$('link[rel="stylesheet"]').attr('media', 'all');

        var isMobile = $("body").data("mobile");

        var offsetHeight;

        // set min height for pages
        if ($('#page_discover').length > 0) {

            // discover page doesn't have filter results display
            offsetHeight = ($(".scout-header").outerHeight() + $(".scout-geolocation").outerHeight() + $(".scout-footer").outerHeight());
            $(".scout-discover-container").css({minHeight: $(window).outerHeight() - offsetHeight });

            // 404 page
            if($("#page_404").length > 0) {
                var offsetHeight = ($(".scout-header").outerHeight() + $(".scout-footer").outerHeight());
                $("#page_404").css({minHeight: $(window).outerHeight() - offsetHeight });
            }

        } else if ($('#page_filter').length > 0)  {

            // filter page doesn't have geolocation bar
            offsetHeight = ($(".scout-header").outerHeight() + $(".scout-footer").outerHeight());
            $(".scout-filter-container").css({minHeight: $(window).outerHeight() - (offsetHeight + 10) });

        } else {

            offsetHeight = ($(".scout-header").outerHeight() + $(".scout-geolocation").outerHeight() + $(".scout-filter-results").outerHeight() + $(".scout-footer").outerHeight());
            $(".scout-list-container").css({minHeight: $(window).outerHeight() - offsetHeight });

        }

        // if mobile, calculate height of image container
        if (isMobile !== undefined ) {
            var aspectHeight = Math.round(( $(".spot-detail-main-image").width() /100)*67); //(i.e. 16:9 or 100:67)
            $(".spot-detail-main-image").height(aspectHeight);
            $(".scout-spot-gallery").css('max-height', aspectHeight);
        }

        $("#blah").click(function(e) {
            e.preventDefault();
            Layout.display_mobile_map();
        });

        $("#foo").click(function(e) {
            e.preventDefault();
            Layout.hide_mobile_map();
        });

    },

    display_mobile_map: function(){

        // calculate remaining height of viewport for map display
        var offsetHeight = ($(".scout-header").outerHeight() + $(".scout-geolocation").outerHeight() + ($(".scout-mobile-map-chooser").outerHeight()) );
        $(".scout-mobile-map-container").css({height: $(window).outerHeight() - offsetHeight });
        $("#food_list_map").css({height: $(window).outerHeight() - offsetHeight });

        // freeze body to prevent scrolling outside of map viewport
        $("body").addClass("freeze");
        $(".scout-filter-results").hide();
        $(".scout-list-container").hide();
    },

    hide_mobile_map: function(){

        // set height of mobile map container to 0 to hide
        $(".scout-mobile-map-container").height(0);
        $("body").removeClass("freeze");
        $(".scout-filter-results").show();
        $(".scout-list-container").show();
    },

};
