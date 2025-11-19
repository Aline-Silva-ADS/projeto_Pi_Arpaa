// Toggle mobile navigation visibility
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  // helper to open/close with height animation
  function openNav() {
    // ensure it's rendered so scrollHeight is available
    mobileNav.style.display = 'block';
    var full = mobileNav.scrollHeight + 'px';
    mobileNav.style.maxHeight = full;
    mobileNav.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    mobileNav.style.maxHeight = '0';
    mobileNav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }

  // initialize (hidden)
  mobileNav.style.maxHeight = '0';
  mobileNav.style.display = 'none';
  mobileNav.setAttribute('aria-hidden', 'true');

  // when transition ends, if closed, hide element to remove possible focusable content
  mobileNav.addEventListener('transitionend', function () {
    // computed maxHeight may be '0px' when closed
    var current = window.getComputedStyle(mobileNav).maxHeight;
    if (current === '0px') {
      mobileNav.style.display = 'none';
    }
  });

  toggle.addEventListener('click', function () {
    var expanded = this.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeNav();
    } else {
      openNav();
    }
  });

  // close when resizing to desktop to reset styles
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      mobileNav.style.maxHeight = '0';
      mobileNav.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ---- active menu link highlighting ----
  try {
    var pagePath = window.location.pathname.split('/').pop() || 'index.html';
    // normalize empty path
    if (pagePath === '') pagePath = 'index.html';

    function markActiveLinks(containerId) {
      var container = document.getElementById(containerId);
      if (!container) return;
      var links = container.querySelectorAll('a');
      links.forEach(function (a) {
        var href = a.getAttribute('href') || '';
        // consider links like '#eventos' and anchors; match only file names or full path
        var linkPath = href.split('/').pop();
        if (!linkPath) return;
        // treat index variants
        if ((linkPath === pagePath) || (linkPath === '' && pagePath === 'index.html') || (linkPath === 'index.html' && pagePath === '')) {
          a.setAttribute('aria-current', 'page');
        }
      });
    }

    markActiveLinks('desktop-nav');
    markActiveLinks('mobile-nav');
  } catch (e) {
    // fail silently
    console.warn('Failed to mark active nav link', e);
  }
});
