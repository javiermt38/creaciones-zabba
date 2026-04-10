'use strict'

$(document).ready(function () {

    // Toggle menú hamburguesa
    $('.toggle').on('click', function () {
        $('.navigation').toggleClass('active');
    });

    // Cerrar menú al hacer clic en cualquier enlace
    $('.navigation a').on('click', function () {
        $('.navigation').removeClass('active');
    });

    // Cerrar menú al hacer clic fuera
    $(document).on('click', function (e) {
        if (!$(e.target).closest('nav').length) {
            $('.navigation').removeClass('active');
        }
    });

});
