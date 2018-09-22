var gulp = require('gulp');
var browserSync = require('browser-sync').create();

browserSync.init({
	server: "./"
});
browserSync.stream();