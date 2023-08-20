import dotenv from "dotenv"
import commander from "../utils/commander.js"

const {mode} = commander.opts()

dotenv.config({
    path: mode == 'development' ? './.env.development' : './.env.production'
})

export default {
    MODE: process.env.MODE,
    port: process.env.PORT || 8080,
    LINK_MONGO: process.env.LINK_MONGO,
    SECRET_COOKIE: process.env.SECRET_COOKIE,
    SECRET_SESSION: process.env.SECRET_SESSION,
    GH_CLIENT_ID: process.env.GH_CLIENT_ID,
    GH_CLIENT_SECRET: process.env.GH_CLIENT_SECRET,
    SECRET_COOKIE: process.env.SECRET_COOKIE,
    GM_PASS: process.env.GM_PASS,
    GM_USER: process.env.GM_USER
}

