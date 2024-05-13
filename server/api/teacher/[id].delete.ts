import { Teacher } from '~/server/models/Teacher'

export default defineEventHandler(async (event) => {
    try {
        console.log(event)
        await Teacher.findByIdAndDelete(event.context.params!.id)
        return setResponseStatus(event, 200, 'Teacher deleted')
    } catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})