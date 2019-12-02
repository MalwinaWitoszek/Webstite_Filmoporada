//  Variables
var gulp = require("gulp");
var ghPages = require('gulp-gh-pages');         // umieszczenie projektu na github pages


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

