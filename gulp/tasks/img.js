/* global app, */

import webp from 'gulp-webp';
import imagemin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';

export const img = () => {
  return app.gulp
    .src(app.path.src.img)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'IMAGES',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(app.plugins.if(app.isBuild, webp()))
    .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.img)))
    .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.img)))
    .pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.img)))
    /*.pipe(
      app.plugins.if(
        app.isBuild,
        imagemin([
          optipng({ optimizationLevel: 5 }),
          mozjpeg({ quality: 75, progressive: true }),
          svgo({
            plugins: [
              {
                name: 'removeViewBox',
                active: true,
              },
              {
                name: 'cleanupIDs',
                active: false,
              },
            ],
          }),
        ])
      )
    )*/
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.plugins.browsersync.stream());
};
