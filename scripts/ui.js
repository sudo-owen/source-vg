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

  let file_name = "";

  // 
  $(".render").click(function() {
    let svg = makeSVG(code.getValue(), 'svg');
    // svg.removeAttribute('viewBox');
    // svg.setAttribute('viewBox', '0 0 500 500');
    // svg.setAttribute('preserveAspectRatio', 'xMinYMin meet')
    $(".svg-holder").find(':first-child').remove();
    $(".svg-holder").append(svg);
  });

  $(".inputfile").change(function(e) {
    file_name = e.target.files[0].name;
    e.target.files[0].text().then(function(src) {
      code.setValue(src);
    });
  });
  
  $(".download").click(function() {
    let src = code.getValue();
    let anchor = document.createElement('a');
    anchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(src));
    anchor.setAttribute('download', file_name);
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  });
});