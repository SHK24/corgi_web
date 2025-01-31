export const i18n = () => {
  return app.gulp
    .src(app.path.src.i18n)
    .pipe(app.gulp.dest(app.path.build.i18n));
};
