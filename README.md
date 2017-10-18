# GeekHive Gulp LESS Build

A simplified, standardized, gulp-compatible build script to bundle a source file using LESS, Autoprefixer, and CSSMin

## Installation

Using NPM

```
npm install geekhive/gulp-less-build --save-dev
```

Using yarn

```
yarn add geekhive/gulp-less-build --dev
```

## Configuration

Optional configuration for processing steps can be defined in module's `package.json` from the key `LESSBuild`.  For example:

```js
{
    // ...
    "LESSBuild": {
        "less": { ... }, // LESS options
        "autoprefixer": { ... }, // Autoprefixer options
        "cssmin": { ... } // CSSMin options
    },
    // ...
}
```

## Usage

Require `@geekhive/gulp-less-build` to access the build class.

```
const LESSBuild = require('@geekhive/gulp-less-build');
```

### `new LESSBuild(src, dest, gulp)`

Create a new `LESSBuild` object by passing it source and destination paths for the file to compile as well as a reference to `gulp`.

```
const css = new LESSBuild(
    `${__dirname}/assets/less/site.less`,
    `${__dirname}/assets/css/site.min.css`,
    gulp);
```

The `dest` argument may also be an array of destinations.

```
const css = new LESSBuild(
    `${__dirname}/assets/less/site.less`,
    [
        `${__dirname}/assets/css/site.min.css`,
        `${__dirname}/assets/example/alternative.css`
    ],
    gulp);
```

### `LESSBuild#build()`

The `LESSBuild#build` method can be passed directly to gulp as a build task:

```
gulp.task('build:css', css.build);
```

Calling `css.build` will compile the source less file using LESS, Autoprefixer, and CSSMin. It will then output the result to the destination location.

### `LESSBuild#watch()`

The `LESSBuild#watch` method can be passed directly to gulp as a watch task:

```
gulp.task('watch:css', css.watch);
```

Calling `css.watch` will start watching the source directory and subdirectories for changes and will recompile the CSS file when changes are made.