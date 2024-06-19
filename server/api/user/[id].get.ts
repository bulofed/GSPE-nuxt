import { User } from '~/server/models/User'

export default defineEventHandler(async (event) => {
    try {
        const user = await User.findById({ _id: event.context.params!.id })
        setResponseStatus(event, 200, 'User found')
        return { user }
    } catch (error: unknown) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong.'
        })
    }
})