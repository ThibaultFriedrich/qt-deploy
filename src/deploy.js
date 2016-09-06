var os = require('os');
var path = require('path');
var callsite = require('callsite');
var util = require('util');
var exec = require('child_process').exec;

var maxBuffer = 1024 * 1024 * 1024;


module.exports = function (opts, callback) {

    var previousCwd = process.cwd();

    var stack = callsite();
    var dirname = path.dirname(requester = stack[1].getFileName());

    if (undefined === opts.exec) {
        callback && callback(new Error('missing argument "exec"'));
        return;
    }

    if (!path.isAbsolute(opts.exec)) {
        opts.exec = path.join(dirname, opts.exec);
    }

    if(!process.env.JOM_PATH) {
        callback && callback(new Error('Environment variable JOM_PATH undefined'));
        return;
    }

    if ('win32' === os.platform()) {
        process.chdir(path.dirname(opts.exec));
        if (opts.verbose) {
            console.log('os detection done: windows');
        }
        var windeployqt = path.join(process.env.JOM_PATH, 'windeployqt.exe');
        var new_env = util._extend(process.env, {LANG: "en"});
        exec(windeployqt+' '+opts.exec,{env: new_env, maxBuffer: maxBuffer}, function (err, stdout, stderr) {
            process.chdir(previousCwd);
            if (err) {
                callback && callback(err);
            } else {
                if (opts.verbose) {
                    console.log('deployment done: windows');
                }
                callback && callback();
            }
        });
    } else {
        callback && callback(new Error('The os '+os.platform()+' is not managed for now.'));
    }

};
