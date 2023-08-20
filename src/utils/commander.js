import {Command} from "commander"

const commander = new Command()

commander
    .option('--mode <mode>', 'Modo de ejecucion de app', 'development')
    .parse()

export default commander