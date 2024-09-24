//? Side Menu Upward Side Menu Js :-----


jQuery('.custom-nav > li').hover(function () {
    var $submenu = jQuery(this).find('ul');
    var liOffsetTop = jQuery(this).offset().top;


    // Check if liOffsetTop is 445 or more, then show submenu upwards
    if (liOffsetTop >= 445) {
        $submenu.addClass('submenu-up');
    } else {
        $submenu.removeClass('submenu-up');
    }

    jQuery(this).addClass('nav-hover');
}, function () {
    jQuery(this).removeClass('nav-hover');
    jQuery(this).find('ul').removeClass('submenu-up');
});