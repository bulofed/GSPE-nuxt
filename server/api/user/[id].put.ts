import { User } from '~/server/models/User'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const id = event.context.params!.id

        await User.findByIdAndUpdate(id, body)
        
        return { message: 'User updated' }
    } catch (error) {
        if (error instanceof Error)
        throw createError({ message: error.message, status: 500})
    }
})