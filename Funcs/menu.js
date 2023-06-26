$(document).ready(function() {
    let domenuclose = true;
    
    $(".header_menu").on("click", function() {
        $(".header_menu_dropdown").css({"display": "flex"});

        setTimeout(function() {
            if(domenuclose) { $(".header_menu_dropdown").css({"display": "none"}); }
        }, 2000);
    });
    $(".header_menu_dropdown").on("mouseenter", function() {
        domenuclose = false;
    });
    $(".header_menu_dropdown").on("mouseleave", function() {
        $(this).css({"display": "none"});
        domenuclose = true;
    });
});