/* Filcom.id — slim replacement for the template's theme.js.
   Keeps only what the 17 built pages actually use: mobile menu (meanmenu),
   sticky header, FAQ accordion, and the loader class.
   Dropped: venobox, WOW, isotope/imagesLoaded, owl carousel, header search,
   team-share — none of those classes exist on any page. */
(function ($) {
  'use strict';

  // Mobile menu (meanmenu)
  if ($('.mobile-menu nav').length) {
    $('.mobile-menu nav').meanmenu({
      meanScreenWidth: '991',
      meanMenuContainer: '.mobile-menu',
      meanMenuOpen: '<span></span> <span></span> <span></span>',
      onePage: false
    });
  }

  // Sticky header
  var wind = $(window);
  var sticky = $('#sticky-header');
  if (sticky.length) {
    wind.on('scroll', function () {
      if (wind.scrollTop() < 100) { sticky.removeClass('sticky'); }
      else { sticky.addClass('sticky'); }
    });
  }

  // Loader
  $(function () { $('body').addClass('loaded'); });

  // FAQ accordion
  $(function () {
    var $c = $('.faqs-container');
    if (!$c.length) return;
    $c.find('.faq-singular:first-child').addClass('active').children('.faq-answer').slideDown();
    $c.on('click', '.faq-question', function () {
      var $parent = $(this).parent();
      if ($parent.hasClass('active')) {
        $(this).next().slideUp();
        $parent.removeClass('active');
      } else {
        $c.find('.faq-answer').slideUp();
        $c.find('.faq-singular').removeClass('active');
        $parent.addClass('active');
        $(this).next().slideDown();
      }
    });
  });

})(jQuery);
