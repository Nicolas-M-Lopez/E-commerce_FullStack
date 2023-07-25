import "dotenv/config.js"

const config = {
    port: process.env.PORT || 8080,
    LINK_MONGO: process.env.LINK_MONGO,
    SECRET_COOKIE: process.env.SECRET_COOKIE,
    SECRET_SESSION: process.env.SECRET_SESSION,
    GH_CLIENT_ID: process.env.GH_CLIENT_ID,
    GH_CLIENT_SECRET: process.env.GH_CLIENT_SECRET,
    SECRET_COOKIE: process.env.SECRET_COOKIE
}

export default config