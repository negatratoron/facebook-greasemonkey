// ==UserScript==
// @name        Good
// @namespace   facebook
// @include     /^https:\/\/www\.facebook\.com\/.*/
// @version     1
// @grant       none
// ==/UserScript==
// allow pasting


// hide ads on right side of screen
var hideHomeRightColumn = document.createElement("STYLE"); 
hideHomeRightColumn.innerHTML = '.home_right_column {display: none}';
document.head.appendChild(hideHomeRightColumn);


// hide all sponsored stories
// do this every 100 milliseconds, but only when facebook tab is open
var interval;
var setSponsoredInterval = function () {
  interval = setInterval(function () {
    var as = document.querySelectorAll('a');
    for (var i = 0; i < as.length; i++) {
      var a = as[i];
      if (a.innerHTML === 'Sponsored') {
        var el = a;
        while (el && el.id.indexOf('substream_') === -1) {
          el = el.parentElement;
        }
        if (el) {
          el.style.display = 'none';
        }
      }
    };
  }, 100);
};
setSponsoredInterval();
window.addEventListener('blur', function () {
  clearInterval(interval);
});
window.addEventListener('focus', setSponsoredInterval);


// show "most recent" stories, not "top stories"
if (window.location.href === 'https://www.facebook.com/' ||
   window.location.href === 'https://www.facebook.com/?sk=h_nor' ||
   window.location.href === 'https://www.facebook.com/?ref=logo') {
  window.location.href = 'https://www.facebook.com/?sk=h_chr';
}