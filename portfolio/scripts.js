$(document).ready(function () {
  $('body').scrollspy({ target: '#navbar', offset: 100 });
  $('.navbar-nav a').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");
    $('a').each(function () {
      $(this).removeClass('active');
    })
    $(this).addClass('active');
    var target = this.hash,
    menu = target;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top-50
    }, 500, 'swing', function () {
      return false;
    });
    return false;
  });
});
