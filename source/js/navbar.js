/**
 * Конструктор для navbar'а
 * html: nav.navbar>a.logo+btn.navbar__toggle+ul.nav
 * Полифилы не нужны (вроде).
 */
(function() {
  if (!document.getElementById("navbar")) return;

  var navbar = new Navbar({
    element: document.getElementById("navbar"),
    activeClass: "navbar--active"
  });

  function Navbar(options) {
    var element = options.element,
        btn = element.querySelector(".navbar__toggle"),
        activeClass = options.activeClass || "active";

    element.onclick = function(event) {
      if (event.target === btn) toggle();
    };

    function toggle() {
      element.classList.toggle(activeClass);
    }
  }
})();
