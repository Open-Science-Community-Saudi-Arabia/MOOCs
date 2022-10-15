/*
    USAGE
    
    const loginController = asyncWrapper((req, res, next) => {
        # Login controller function goes in here

        return res.status(200).send('OK')
    })
*/

const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            return await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}


module.exports = asyncWrapper