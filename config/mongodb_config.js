var env = {
    webPort: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || 'ds139841.mlab.com',
    dbPort: process.env.DB_PORT || '39841',
    dbUser: process.env.DB_USER || 'sabok',
    dbPassword: process.env.DB_PASSWORD || 'potato1',
    dbDatabase: process.env.DB_DATABASE || 'studdit_db'
}

var dburl = process.env.NODE_ENV === 'production' ?
    'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    'mongodb://localhost/' + env.dbDatabase

module.exports = {
    env: env,
    dburl: dburl
};