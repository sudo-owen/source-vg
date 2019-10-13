# source-vg
Edit an SVG online by directly editing the XML!
The one thing I felt like [SVGO](https://jakearchibald.github.io/svgomg/) lacks is an easy way to manipulate the source XML of an SVG file. The other tools I found online didn't support hot-reloading, so that's why this web app exists.

![Screenshot of the user interface.](images/screenshot.png)

Features:
- Hot-reload the SVG image, no need for refresh
- Upload/Download SVG files

Open source projects source-vg uses:
- [CodeMirror](https://codemirror.net/) for the XML highlighting.
- [svg-pan-zoom](https://github.com/ariutta/svg-pan-zoom) for SVG panning/zooming.

