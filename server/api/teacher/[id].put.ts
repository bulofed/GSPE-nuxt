import { Teacher } from '~/server/models/Teacher'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const id = event.context.params!.id

        await Teacher.findByIdAndUpdate(id, body)
        
        return { message: 'Teacher updated' }
    } catch (error) {
        if (error instanceof Error)
        throw createError({ message: error.message, status: 500})
    }
})