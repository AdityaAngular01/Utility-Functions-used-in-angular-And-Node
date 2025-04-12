const {JOI, dotenv, HttpStatus} = require("../package");
dotenv.config();

const envVarsSchema = JOI.object().keys({
    NODE_ENV: JOI.string().valid('production', 'development', 'test').required(),
    PORT: JOI.number().default(3000),

    SITE_URL: JOI.string().uri().required().description("Website URL"),
    
    MONGO_URI: JOI.string().required().description("Database URI"),
    
    ADMIN_ACCESS_TOKEN_SECRET: JOI.string().required().description("Admin access tooken"),
    ADMIN_REFRESH_TOKEN_SECRET: JOI.string().required().description("Admin refresh token"),
    ADMIN_ACCESS_TOKEN_EXPIRY: JOI.string().required().description("Admin access token expiry"),
    ADMIN_REFRESH_TOKEN_EXPIRY: JOI.string().required().description("Admin refresh token expiry"),
    
    USER_ACCESS_TOKEN_SECRET: JOI.string().required().description("User access token"),
    USER_REFRESH_TOKEN_SECRET: JOI.string().required().description("User refresh token"),
    USER_ACCESS_TOKEN_EXPIRY: JOI.string().required().description("User access token expiry"),
    USER_REFRESH_TOKEN_EXPIRY: JOI.string().required().description("User refresh token expiry")
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
module.exports =  {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    siteUrl: envVars.SITE_URL,
    mongoose:{
        url: envVars.MONGO_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    jwtConf:{
        admin:{
            acessTokenSecret: envVars.ADMIN_ACCESS_TOKEN_SECRET,
            refreshTokenSecret: envVars.ADMIN_REFRESH_TOKEN_SECRET,
            accessTokenExpiry: envVars.ADMIN_ACCESS_TOKEN_EXPIRY,
            refreshTokenExpiry: envVars.ADMIN_REFRESH_TOKEN_EXPIRY
        },
        user:{
            acessTokenSecret: envVars.USER_ACCESS_TOKEN_EXPIRY,
            refreshTokenSecret: envVars.USER_REFRESH_TOKEN_SECRET,
            accessTokenExpiry: envVars.USER_ACCESS_TOKEN_EXPIRY,
            refreshTokenExpiry: envVars.USER_REFRESH_TOKEN_EXPIRY
        }
    },
    serverConf: require("./server.config"),
    dbConf: require("./database.config"),
    httpCodes: HttpStatus.status
}