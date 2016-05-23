$(document).ready(function(){
  $(".slider--screenshots").owlCarousel({
    items: 4,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true,
            dots: false,
            margin: 10
        },
        573: {
          items: 2,
          margin: 15
        },
        768: {
            items: 3,
            margin: 30,
        },
        1200: {
            items: 4,
            margin: 30,
        }
    }
  });
  $(".slider--testimonials").owlCarousel({
    items: 1,
    margin: 30,
    smartSpeed: 500
  });
  $(".slider--blog-preview").owlCarousel({
    items: 1,
    margin: 100,
    smartSpeed: 500
  });
});
