/* global app, */

import fileinclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlmin from 'gulp-htmlmin';

const version = versionNumber({
  value: '%DT%',
  append: {
    key: '_v',
    cover: 0,
    to: ['css', 'js'],
  },
  output: {
    file: 'gulp/version.json',
  },
})

export const html = (destSubDirectory='') => {
  const isRoot = destSubDirectory === ''
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, '/img/'))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(app.plugins.if(
      app.isBuild && isRoot,
      version,
    ))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(app.gulp.dest(app.path.build.html + destSubDirectory))
    .pipe(app.plugins.browsersync.stream());
};
