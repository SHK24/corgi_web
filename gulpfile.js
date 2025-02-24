import gulp from 'gulp';
import fs from 'fs';
import * as pathUtil from 'path';

import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

import { copy } from './gulp/tasks/copy.js';
import { i18n } from './gulp/tasks/i18n.js';
import { robots } from './gulp/tasks/robots.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { img } from './gulp/tasks/img.js';
import { ttfToWoff, ttfToWoff2 } from './gulp/tasks/fonts.js';
import { sprite } from './gulp/tasks/svgSprite.js';

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path,
  gulp,
  plugins,
};

function getI18nFileNames(sourcePath) {
  return fs.readdirSync(sourcePath, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && pathUtil.extname(dirent.name) === '.json')
    .map(dirent => dirent.name.split('.')[0])
}

function htmlApply(lang) {
  return function htmlTask(done) {
    html(lang);
    done();
  };
}

function htmlForEachLang(done) {
  const langs = getI18nFileNames('./src/i18n'); // Получаем список языков
  if (langs.length === 0) {
    console.log('JSON-файлы в /src/i18n/ не найдены.');
    return done();
  }
  const tasks = [
    ...langs,
    '', // root directory
  ].map(lang => {
    console.log(`Копирование HTML-файлов для локализации: ${lang ? lang : 'корневая директория'}`);
    return htmlApply(lang);
  });
  return gulp.series(...tasks)(done);
}

function watcher() {
  gulp.watch(path.watch.files, reset);
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.i18n, i18n);
  gulp.watch(path.watch.html, htmlForEachLang);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, img);
}

const mainTasks = gulp.parallel(copy, i18n, robots, ttfToWoff, ttfToWoff2, htmlForEachLang, scss, js, img, sprite);
const serverTasks = gulp.parallel(watcher, server);

const dev = gulp.series(reset, mainTasks, serverTasks);
const build = gulp.series(reset, mainTasks);

export { dev };
export { build };

gulp.task('default', dev);
