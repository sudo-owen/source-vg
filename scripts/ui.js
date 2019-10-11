let code = CodeMirror.fromTextArea(document.getElementById("textarea"), {
  lineWrapping: true,
  theme: 'monokai'
});

let parser = new DOMParser();
function makeSVG(s, id) {
  let svg = parser.parseFromString(s, "image/svg+xml").documentElement;
  return(svg);
}
$(document).ready( function() {
  $(".render").click(function() {
    let svg = makeSVG(code.getValue(), 'svg');
    svg.removeAttribute('viewBox');
    svg.setAttribute('viewBox', '0 0 500 500');
    svg.setAttribute('preserveAspectRatio', 'xMinYMin meet')
    $(".svg-holder").find(':first-child').remove();
    $(".svg-holder").append(svg);
  });
});