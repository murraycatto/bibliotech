const authRoutes = require('./auth_routes');
module.exports = function(app,db){
	authRoutes(app,db);
}
