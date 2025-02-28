const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

function compileSass() {
  return src("Styles/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("Styles/"))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: "./",
  });

  watch("Styles/**/*.scss", compileSass);
  watch("*.html").on("change", browserSync.reload);
  watch("js/**/*.js").on("change", browserSync.reload);
}

exports.default = series(compileSass, serve);
