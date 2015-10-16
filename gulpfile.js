var gulp       = require("gulp"),
    nodemon    = require("gulp-nodemon"),
    source     = require("vinyl-source-stream"),
    buffer     = require("vinyl-buffer"),
    browserify = require("browserify"),
    watchify   = require("watchify"),
    babelify   = require("babelify");

var isProd = process.env.NODE_ENV === "production";

var bundler = browserify({
    entries:      [ "./server/index.js" ],
    transform:    [ [babelify, {}] ],
    debug:        !isProd,
    cache:        {},
    packageCache: {},
    fullPaths:    !isProd                   // for watchify
});

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task("bundle:js", function() {
    bundler
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build/"))
});

gulp.task("watch:js", function() {
    // start JS file watching and rebundling with watchify
    var watcher = watchify(bundler);
    rebundle();
    return watcher
        .on("error", handleErrors)
        .on("update", rebundle);

    function rebundle() {
        watcher
            .bundle()
            .on("error", handleErrors)
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(gulp.dest("./build/"));
    }
});

gulp.task("watch:server", function() {
    nodemon({ script: "server/index.js", ext: "js", ignore: ["gulpfile.js", "./build/*", "node_modules/*"] })
        .on("change", [])
        .on("restart", function () {
            console.log("Server restarted");
        })
});

gulp.task("default", ["watch:server", "watch:js"]);