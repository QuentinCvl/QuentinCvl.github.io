// jQuery for page scrolling feature - requires jQuery Easing plugin
$('.page-scroll a').bind('click', function (event) {
    let $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault()
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 51
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});

// Offset for Main Navigation
$('#mainNav').affix({
    offset: {
        top: 100
    }
})

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

$(window).scroll(function() {
    let position = window.scrollY;
    let mobileNavBtn = $('#mobileNavBtn');
    let mainNav = $('#mainNav');
    if(position >= 1) { // Ajoute une couleur de fond au menu lorsque l'on scrool
        if(mainNav.hasClass("noBg")) {
            mainNav.toggleClass("noBg haveBg");
        }
    } else if(position <= 1) { // Le remet par defaut (transparent) lorsque l'on revient en haut de la page
        if(mainNav.hasClass("haveBg") && mobileNavBtn.attr('aria-expanded') !== "true") {
            mainNav.toggleClass("noBg haveBg");
        }
    }
});
$('#mobileNavBtn').on('click', function() {
    if(window.scrollY <= 1) {
        let mainNav = $('#mainNav');
        if($(this).attr('aria-expanded') !== "true") {
            mainNav.removeClass("noBg");
            mainNav.addClass("haveBg");
        } else {
            mainNav.removeClass("haveBg");
            mainNav.addClass("noBg");
        }
    }
})

