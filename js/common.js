(function ($) {

    $('.b-sidebar__link').on('click', function () {
        $('.b-sidebar__link_state_active').removeClass('b-sidebar__link_state_active');
        $(this).addClass('b-sidebar__link_state_active');
    });

}(jQuery));