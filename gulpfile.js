// Jeżeli wyjdzie GULP 4 to zamienić run-sequence na gulp.series !
// INSTALACJA PLUGINÓW
// npm install --save-dev gulp browser-sync gulp-cssmin gulp-rename gulp-autoprefixer gulp-plumber del gulp-useref gulp-if gulp-uglify gulp-imagemin run-sequence



//  Variables

var gulp = require("gulp");
var	autoprefixer = require('gulp-autoprefixer');    // dodanie wendor prefiksów
var plumber = require('gulp-plumber');              // zapobiega przerywaniu zadań - obsługa błędów
var del = require("del");
var cssmin = require('gulp-cssmin');            // minifikacja css
var rename = require('gulp-rename');            //zmiana nazwy cssmin
var useref = require('gulp-useref');        // konkatenacja plików js bez minifikacji
var gulpif = require('gulp-if');            // sprawdzanie warunków
var uglify = require('gulp-uglify');        // minifikacja plików js
var imagemin = require('gulp-imagemin');    // kompresja obrazów
var runSequence = require('run-sequence');    // kompresja obrazów
var browserSync = require('browser-sync').create(); // przeładowanie przeglądarki


// styleSheets

gulp.task('styles', function() {
    return gulp.src("src/css/style.css")
    .pipe(plumber())  //  zapobiega przerywaniu zadań - obsługa błędów
    .pipe(autoprefixer({browsers: ["last 2 version"]}))	  // dodanie wendor prefiksów
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())	// przeładowanie przeglądarki
});


//  JavaScript


gulp.task("scripts", function() {
    return gulp.src("src/*.html")
    .pipe(useref())
    .pipe(gulpif("*.js",uglify()))      // jeżeli plik ma rozszerzenie js, to wywołujemy uglify
    .pipe(gulp.dest("dist/"));
    })
 // w index html nalezy zgodnie ze wzorem podac:
// przykład do USEREF - konkatenacja plików, należy dodać:
// <html>
//     <head>
//         <!-- build:css css/combined.css -->                tutaj scieżka i nazwa nowego pliku
//         <link href="css/one.css" rel="stylesheet">
//         <link href="css/two.css" rel="stylesheet">
//         <!-- endbuild -->
//     </head>
//     <body>
//         <!-- build:js js/combined.js -->                    tutaj scieżka i nazwa nowego pliku
//         <link href="js/one.js" rel="text/javascript">
//         <link href="js/two.js" rel="text/javascript">
//         <!-- endbuild -->
//     </body>
// </html>


//  img

gulp.task("img", function() {
    return gulp.src("dist/img/*", {      // tworzy obiekt aby pobrac pliki z bazy dist
        base: "dist/"
        })
    .pipe(imagemin())
    .pipe(gulp.dest("dist/"));
    });



gulp.task('clean', function() {	                // usunięcie katalogu dist - z wersją dystrybucyjna projektu
    return del("dist/")
});

gulp.task("copy", function() {
    return gulp.src(["src/css/**/*.css", "src/img/*"], {
    base: "src"
    })
    .pipe(gulp.dest("dist/"));
    })


gulp.task('server-sync', function() {     // stworzenie serwera w katalogu src
    browserSync.init({
    server: {
        baseDir: "src/"
        }
    });
});




// wykonywanie sekwencji zadań - wywoanie gulp build
// Jeżeli wyjdzie GULP 4 to zamienić to na gulp.series !

gulp.task("build", function() {
    runSequence("clean", "scripts", "copy", "img");
    })


//  Zadania domyślne

gulp.task("default", ["styles", "server-sync"]);   //wywołanie w terminalu: gulp






//układ katalogów:
// Project /src
//             css/main.css
//             img/
//             js/
//                 scripts.js
//                 jquery.js
//                 Itd.
//             scss/
//                 base/
//                 component/
//                 layout/
//                 helpers/
//                 itd.
//                 main.scss
//             index.html
//         /node_modules
//         /dist
//         .gitignore
//         gulpfile.js
//         package.json
//         package-lock.json