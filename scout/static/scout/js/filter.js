var Filter = {
    set_filter_params: function() {

        var campuses = $("#campus_select input:radio:checked").map(function() {
            return $(this).val();
        }).get();

        var payments = $("#payment_select input:checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        var types = $("#type_select input:checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        var foods = $("#food_select input:checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        var cuisines = $("#cuisine_select input:checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        var periods = $("#period_select input:checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        var params = {};

        params = $.extend(params, Filter._get_params_for_select(campuses,
                                                                "campus"));
        params = $.extend(params, Filter._get_params_for_select(payments,
                                                                "payment"));
        params = $.extend(params, Filter._get_params_for_select(types,
                                                                "type"));
        params = $.extend(params, Filter._get_params_for_select(foods,
                                                                "food"));
        params = $.extend(params, Filter._get_params_for_select(cuisines,
                                                                "cuisine"));
        params = $.extend(params, Filter._get_params_for_select(periods,
                                                                "period"));
        if($("#open_now input").is(":checked")){
            params = $.extend(params, {"open_now": true});
        }
        // Store these
        sessionStorage.setItem("filter_params", JSON.stringify(params));

    },

    get_filter_url: function() {
        var params;
        try {
            params = JSON.parse(sessionStorage.getItem("filter_params"));
        } catch(e) {}

        if(params === undefined || $.isEmptyObject(params)){
            params = {"campus0": "seattle"};
            sessionStorage.setItem("filter_params", JSON.stringify(params));
        }
        return $.param(params);
    },

    _get_params_for_select: function(select_results, prefix) {
        var params = {};
        if(select_results !== null && select_results.length > 0){
            $.each(select_results, function(idx, result){
                params[prefix + idx] = result;
            });
        }
        return params;

    },

    _get_filter_label_text: function(){
        var filter_categories = [];
        var url = window.location.href;
        var filter_string = "";
        /***
        if(url.indexOf("&campus") > -1 || url.indexOf("?campus") > -1){
            filter_categories.push("Campus");
        }
        ***/
        if(url.indexOf("&payment") > -1 || url.indexOf("?payment") > -1){
            filter_categories.push("Payment Accepted");
        }
        if(url.indexOf("&type") > -1 || url.indexOf("?type") > -1){
            filter_categories.push("Restaurant Type");
        }
        if(url.indexOf("&food") > -1 || url.indexOf("?food") > -1){
            filter_categories.push("Food Served");
        }
        if(url.indexOf("&period") > -1 || url.indexOf("?period") > -1){
            filter_categories.push("Open Period");
        }
        if(url.indexOf("&open_now") > -1 || url.indexOf("?open_now") > -1){
            filter_categories.push("Open Now");
        }
        if(url.indexOf("&cuisine") > -1 || url.indexOf("?cuisine") > -1){
            filter_categories.push("Cuisine");
        }
        for(var i = 0; i < filter_categories.length; i++){
            filter_string += filter_categories[i];
            if (i < filter_categories.length - 1){
                filter_string += ", ";
            }
        }
        return filter_string;
    },

    set_filter_text: function(){
        // this will now have a paramater, so it can set the filter text
        // based on what it recieves as a parameter.
        var filter_text = Filter._get_filter_label_text();
        if(filter_text.length > 0){
            $("#filter_label_text").html(filter_text);
        }
    },

    reset_filter: function() {
        // this will now have a paramater, so it can set the delete app type
        // specific filters.
        sessionStorage.removeItem("filter_params");
        Filter.replace_navigation_href();
        var filter_url = Filter.get_filter_url();
        var type_url = Filter.get_current_type();
        window.location.href = type_url + "?" + filter_url;
    },

    init_events: function() {

        Filter.set_filter_text();

        $("#run_search").click(function(){
            Filter.set_filter_params();
            var filtered_url = Filter.get_filter_url();
            if (filtered_url !== undefined){
                var current_type = Filter.get_current_type();
                window.location.href = current_type+"?"+filtered_url;
            } else {
                // reset filter if user submits empty search
                Filter.reset_filter();
            }
        });

        $("#reset_button").click(function() {
            Filter.reset_filter();
        });

        /****
        $("#campus_select_base").change(function(){

            var campus = $(this).val();
            params = JSON.parse(sessionStorage.getItem("filter_params"));
            params["campus0"] = campus;
            sessionStorage.setItem("filter_params", JSON.stringify(params));
            var filter_url = Filter.get_filter_url();
            var type_url = Filter.get_current_type();
            window.location.href = type_url + "?" + filter_url;
        });
        ***/
    },

    get_current_type: function() {
        var current_page = window.location.pathname;
        if (current_page.indexOf("study") !== -1){
            return "/study/";
        }
        else if (current_page.indexOf("tech") !== -1){
            return "/tech/";
        }
        else if (current_page.indexOf("food") !== -1){
            return "/food/";
        } else {
            return "/"
        }
    },

    init: function() {
        Filter.populate_filters_from_saved();
    },

    populate_filters_from_saved: function() {
        var filter_item;
        // do nothing if no filters are saved
        if(sessionStorage.getItem("filter_params") === null){
            return;
        }

        var params = JSON.parse(sessionStorage.getItem("filter_params"));
        $.each(params, function(idx, val){

            /**
            if(idx.indexOf("campus") > -1){
                filter_item = $("#campus_select").find("input[value='" + val + "']");
                $(filter_item[0]).prop("checked", true);
                //$("#campus_select_base").val(val).change();
            }
            **/
            if(idx.indexOf("period") > -1){
                filter_item = $("#period_select").find("input[value='" + val + "']");
                $(filter_item[0]).prop("checked", true);
            }
            if(idx.indexOf("open_now") > -1){
                filter_item = $("#open_now").find("input[value='open_now']");
                $(filter_item[0]).prop("checked", true);
            }
            if(idx.indexOf("type") > -1){
                filter_item = $("#type_select").find("input[value='" + val + "']");
                $(filter_item[0]).prop("checked", true);
            }
            if(idx.indexOf("payment") > -1){
                filter_item = $("#payment_select").find("input[value='" + val + "']");
                $(filter_item[0]).prop("checked", true);
            }
            if(idx.indexOf("cuisine") > -1){
                filter_item = $("#cuisine_select").find("input[value='" + val + "']");
                $(filter_item[0]).prop("checked", true);
            }
            if(idx.indexOf("food") > -1){
                filter_item = $("#food_select").find("input[value='" + val + "']");
                $(filter_item[0]).prop("checked", true);
            }

        });
    },

    replace_navigation_href: function(){
        var filter = Filter.get_filter_url();

        /***
        var anchors = {
            "/food/" : "#link_food",
            "/study/" : "#link_study",
            "/tech/" : "#link_tech",
        };

        for (anchor in anchors){
            // build the url with filtered params
            var filtered_url = anchor;
            var anchor_id = $(anchors[anchor]);
            if (filter !== undefined){
                filtered_url = filtered_url + "?" + filter;
            }
            if(anchor_id !== undefined){
                anchor_id.attr('href', filtered_url);
            }
        }
        ***/

    },

};

/* node.js exports */
if (typeof exports == "undefined") {
    var exports = {};
}
exports.Filter = Filter;
