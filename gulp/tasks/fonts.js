/* global app, */

import ttf2woff2 from 'gulp-ttf2woff2';
import ttf2Woff from 'gulp-ttf-to-woff';

export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(ttf2Woff())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const ttfToWoff2 = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};
