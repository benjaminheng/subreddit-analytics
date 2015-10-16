require('babel/register');
if (process.env.NODE_ENV === "production") {
    require('./server');
} else {
    require('./dev-server');
}
