const serve = require('serve');
const port = process.env.PORT || 8002;

serve('build', {
  port,
  ignore: ['node_modules'],
});

console.log('server started at port : ', port);
