/* global app, */

export const robots = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/robots.txt`)
    .pipe(app.gulp.dest(app.path.build.html));
};
