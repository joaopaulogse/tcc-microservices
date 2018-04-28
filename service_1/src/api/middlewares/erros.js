

exports.error404 = (req, res, next) => {
    res.status(404).json({
        errors:{
            message:'Not found.'
        }
    })
    next()
}
