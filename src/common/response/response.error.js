import { env } from "../../../config/env.service.js"

export const ErrorResponse = ({
    status = 400,
    message = "error",
    extra = undefined

} = {}) => {
    throw new Error(message, { cause: { status, extra } })
}

export const BadRequestException = ({ message = "bad Request", extra = undefined } = {}) => {
    return ErrorResponse({ status: 400, message, extra: extra })
}
export const NotFoundException = ({ message = "Not Found", extra = undefined } = {}) => {
    return ErrorResponse({ status: 404, message, extra: extra })
}
export const UnauthorizedException = ({ message = "Unauthorized", extra = undefined } = {}) => {
    return ErrorResponse({ status: 401, message, extra: extra })
}

export const ForbiddenException = ({ message = "Forbidden", extra = undefined } = {}) => {
    return ErrorResponse({ status: 403, message, extra: extra })
}


export const globalhandlingerror = (err, req, res, next) => {
    console.log(err.stack, "from err stack")
    const mood = env.mood === "dev"
    const status = err.status ? err.status : err.cause ? err.cause.status : 500
    
    const defaultMessage = "Something went wrong"
    const displayErrorMessage = err.message || defaultMessage

    res.status(status).json({
        message: mood ? displayErrorMessage : defaultMessage,
        stack: mood ? err.stack : null,
        error: err.cause?.extra || null,
    })
}