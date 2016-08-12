(function() {
  if (!document.getElementById("navbar")) return;

  function Navbar(options) {
    var element = options.element,
        btn = element.querySelector(".navbar__toggle"),
        activeClass = options.activeClass || "drop-nav";

    element.onclick = function(event) {
      if (event.target === btn) toggle();
    };

    function toggle() {
      element.classList.toggle(activeClass);
    }
  }

  var navbar = new Navbar({
    element: document.getElementById("navbar"),
    activeClass: "navbar--drop-nav"
  });
})();
