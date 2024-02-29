import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());

const builderFolder = './docs';
const srcFolder = './src';

export const path = {
  build: {
    fonts: `${builderFolder}/fonts/`,
    js: `${builderFolder}/js/`,
    img: `${builderFolder}/img/`,
    css: `${builderFolder}/css/`,
    html: `${builderFolder}/`,
    files: `${builderFolder}/files/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    img: `${srcFolder}/img/**/*.{jpeg,jpg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    img: `${srcFolder}/img/**/*.{jpeg,jpg,png,gif,webp,svg,ico}`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: builderFolder,
  builderFolder,
  srcFolder,
  rootFolder,
};
