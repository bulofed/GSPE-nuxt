import { User } from '~/server/models/User'

export default defineEventHandler(async () => {
    try {
        const users = await User.find()

        return { users }
    } catch (error: unknown) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong.'
        })
    }
})