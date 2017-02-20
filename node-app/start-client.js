const args = [ 'start' ];

var env = Object.create( process.env );
env.CHOKIDAR_USEPOLLING = 'true';

const opts = { stdio: 'inherit', cwd: 'client', shell: true, env: env };
require('child_process').spawn('npm', args, opts);
