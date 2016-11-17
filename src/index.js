const autoprefixer = require('gulp-autoprefixer');
const console = require('console');
const cssmin = require('gulp-cssmin');
const gutil = require('gulp-util');
const less = require('gulp-less');
const path = require('path');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const yargs = require('yargs').argv;

class LESSBuild {
    constructor(src, dest, gulp) {
        this._src = src;
        this._destinations =
            Array.isArray(dest)
                ? dest
                : [dest];

        this._verbose = yargs.verbose;
        this._gulp = gulp;

        this.build = this.build.bind(this);
        this.watch = this.watch.bind(this);
    }

    build() {
        const stream = this._gulp.src(this._src)
            .pipe(less())
            .pipe(autoprefixer())
            .pipe(this._verbose
                ? gutil.noop()
                : cssmin({
                advanced: false
            }))

        return this._destinations
            .reduce(
                (str, dest) => 
                    str
                        .pipe(rename(path.basename(dest)))
                        .pipe(this._gulp.dest(path.dirname(dest))),
                stream);
    }

    watch() {
        watch(path.join(path.dirname(this._src), '**/*.less'), () => {
            const src = gutil.colors.cyan(this._src);
            gutil.log(`Rebuilding '${src}'...`);
            this.build();
        });
        this.build();
    }
}

module.exports = LESSBuild;