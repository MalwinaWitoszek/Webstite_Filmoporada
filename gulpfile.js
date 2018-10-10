// Jeżeli wyjdzie GULP 4 to zamienić run-sequence na gulp.series !
// INSTALACJA PLUGINÓW
// npm install --save-dev gulp gulp-watch browser-sync gulp-sass gulp-autoprefixer gulp-plumber gulp-gh-pages del gulp-useref gulp-if gulp-uglify gulp-imagemin run-sequence



//  Variables

var gulp = require("gulp");
var sass = require("gulp-sass");                    //kompilacja scss --> css i minifikacja csss
// var	autoprefixer = require('autoprefixer');    // dodanie wendor prefiksów
var	autoprefixer = require('gulp-autoprefixer');    // dodanie wendor prefiksów
var	watch = require('gulp-watch');                      // nasłuchiwanie zmian w plikach
var plumber = require('gulp-plumber');              // zapobiega przerywaniu zadań - obsługa błędów
var del = require("del");
var useref = require('gulp-useref');        // konkatenacja plików js bez minifikacji
var gulpif = require('gulp-if');            // sprawdzanie warunków
var uglify = require('gulp-uglify');        // minifikacja plików js
var imagemin = require('gulp-imagemin');    // kompresja obrazów
var runSequence = require('run-sequence');    // kompresja obrazów
var browserSync = require('browser-sync').create(); // przeładowanie przeglądarki
var ghPages = require('gulp-gh-pages');         // umieszczenie projektu na github pages

// styleSheets

gulp.task('styles', function() {
    return gulp.src("src/sass/main.scss")
    .pipe(plumber())  //  zapobiega przerywaniu zadań - obsługa błędów
    .pipe(sass.sync({  //   kompilacja SCSS → CSS
        outputStyle: "expanded"          // możliwości: nested, expanded, compact, compressed
    }))
    .pipe(autoprefixer({   // dodanie wendor prefiksów
        browsers: ['last 2 versions'],
        grid: true
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())	// przeładowanie przeglądarki
});
// gulp.task('styles', function() {
//     return gulp.src("src/sass/main.scss")
//     .pipe(plumber())  //  zapobiega przerywaniu zadań - obsługa błędów
//     .pipe(sass.sync({  //   kompilacja SCSS → CSS
//         outputStyle: "expanded"          // możliwości: nested, expanded, compact, compressed
//     }))
//     .pipe(autoprefixer({ grid: true }))	  // dodanie wendor prefiksów
//     .pipe(gulp.dest('src/css'))
//     .pipe(browserSync.stream())	// przeładowanie przeglądarki
// });


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
//          <script type="text/javascript" src="scripts/one.js"></script>
//          <script type="text/javascript" src="scripts/two.js"></script>
//         <!-- endbuild -->
//     </body>
// </html>


//  Images

gulp.task("images", function() {
    return gulp.src("dist/img/*", {      // tworzy obiekt aby pobrac pliki z bazy dist
        base: "dist/"
        })
    .pipe(imagemin())
    .pipe(gulp.dest("dist/"));
    });


// Automatyzacja

gulp.task('watch', function() {	                // nasłuchiwanie zmian w plikach
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch(["src/*.html", "src/**/*.js"], browserSync.reload);
});
    // gulp.watch(["src/*.scripts", "src/**/*.js"]).on('change', browserSync.reload);


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

gulp.task('deploy', function () {   // wdrożenie projektu na github pages
    return gulp.src("src/**/*")
      .pipe(ghPages())
  });
//   co zrobic:
//   1.npm install gulp-gh-pages --save-dev
//   2.dodać zmienna require('gulp-gh-pages')
//   3.dodać task deploy(patrz wyzej) ścieżka src lub dist
//   4.gulp build - aby utworzyc dist
//   4.push the latest changes to your repo to Github:
//   git add . , git commit ,git push origin MediaStreamError5.
//   5.make sure you have a gh-pages branch, if you don’t already. (Be careful when using git rm -rf )
//     git checkout --orphan gh-pages
//     git rm -rf .
//     touch README.md
//     git add README.md
//     git commit -m "Init gh-pages"
//     git push --set-upstream origin gh-pages
//     git checkout master
//  6. gulp deploy

// in case of Error:
// TypeError: Cannot read property '0' of null
// the solution:
//     Need to upgrade gift within the gulp-gh-pages module:
//     cd node_modules/gulp-gh-pages/
//     npm install --save gift@0.10.2
//     cd ../../
//     gulp deploy



// wykonywanie sekwencji zadań - wywołanie gulp build
// Jeżeli wyjdzie GULP 4 to zamienić to na gulp.series !

gulp.task("build", function() {
    runSequence("clean", "scripts", "copy", "images");
    })


//  Zadania domyślne

gulp.task("default", ["styles", "server-sync", "watch"]);   //wywołanie w terminalu: gulp






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