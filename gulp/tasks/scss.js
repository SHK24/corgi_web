/* global app, */

import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import csso from 'gulp-csso';

import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SCSS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
    .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserlist: ['last 3 version'],
          cascade: true,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(csso())

    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};
