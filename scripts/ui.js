let code = CodeMirror.fromTextArea(document.getElementById("textarea"), {
  lineWrapping: true,
  theme: 'monokai',
  lineNumbers: true
});

let default_svg = "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" viewBox=\"0 0 210 297\">\r\n  <defs\/>\r\n  <rect width=\"78.6\" height=\"78.6\" x=\"51\" y=\"83\" fill=\"#dc3c3c\" rx=\"0\" ry=\"0\"\/>\r\n  <rect width=\"65.2\" height=\"65.2\" x=\"57\" y=\"90\" fill=\"#ffa619\" rx=\"0\" ry=\"0\"\/>\r\n  <rect width=\"50.3\" height=\"50.3\" x=\"65\" y=\"98\" fill=\"#f5e700\" rx=\"0\" ry=\"0\"\/>\r\n  <rect width=\"38.2\" height=\"38.2\" x=\"71\" y=\"104\" fill=\"#96dd67\" rx=\"0\" ry=\"0\"\/>\r\n  <rect width=\"24.5\" height=\"24.5\" x=\"78\" y=\"111\" fill=\"#57a2d9\" rx=\"0\" ry=\"0\"\/>\r\n  <rect width=\"14.3\" height=\"14.3\" x=\"83\" y=\"116\" fill=\"#9244cf\" rx=\"0\" ry=\"0\"\/>\r\n  <rect width=\"6.2\" height=\"6.2\" x=\"-26.5\" y=\"148\" fill=\"#fff\" rx=\"0\" ry=\"0\" transform=\"rotate(-45)\"\/>\r\n<\/svg>\r\n";

let parser = new DOMParser();
function makeSVG(s, id) {
  let svg = parser.parseFromString(s, "image/svg+xml").documentElement;
  return(svg);
}
$(document).ready( function() {

  let file_name = "";
  code.setValue(default_svg);
  // 
  $(".render").click(function() {
    let svg = makeSVG(code.getValue(), 'svg');

    // Auto-resize
    if ($(".resize")[0].checked) {
      let attributes = ['width', 'height'];
      for (let a of attributes) {
        svg.removeAttribute(a);
      }
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', $(".svg-holder").width());
      svg.setAttribute('preserveAspectRatio', 'xMinYMin meet')
    }

    // Show new SVG
    $(".svg-holder").find(':first-child').remove();
    $(".svg-holder").append(svg);

    // Allow for drag/zoom
    svgPanZoom($("svg")[0]);
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