export const sucessResponse = ({ res,message="done", status =200 , data = undefined }) => {
    res.status(status).json({
        message,
        data
    })

}