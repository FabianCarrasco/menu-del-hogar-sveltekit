import delay from 'delay'
import {t} from '../router'

export const greetingRouter = t.router({
    greeting: t.procedure.query(async () => {
        await delay(500)
        return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`
    })
})