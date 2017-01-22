const gulp = require("gulp"),
watch = require("gulp-watch"),
postcss = require("gulp-postcss"),
prefix = require("autoprefixer"),
imports = require("postcss-import"),
variables = require("postcss-simple-vars"),
nesting = require("postcss-nesting"),
browserSync = require("browser-sync").create(),
mixins = require("postcss-mixins");
/*#################################################################################*/
gulp.task("default", function(){
	console.log("DEFAULT TASK");
})

gulp.task("css", function(){
	return gulp.src("./app/assets/styles/styles.css")
	.pipe(postcss([imports, mixins, prefix, variables, nesting]))
	.on("error", function(errorInfo){
		console.log(errorInfo.toString());
		this.emit("end");
	})
	.pipe(gulp.dest("./app/temp/styles/"));
})
gulp.task("watch", function(){
	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});
	watch("./app/index.html", function(){
		browserSync.reload();
	})

	watch("./app/assets/styles/**/*.css", function(){
		gulp.start("cssInject");
	})
})
gulp.task("cssInject", ["css"], function(){
	return gulp.src("./app/temp/styles/styles.css")
	.pipe(browserSync.stream());
})