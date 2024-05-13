import { Teacher } from '~/server/models/Teacher'

export default defineEventHandler(async (event) => {
    try {
        const teachers = await Teacher.find().sort('lastname')
        return { teachers }
    } catch (error: unknown) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong.'
        })
    }
})