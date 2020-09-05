const asyncHandler = func => (req, res, next) => {
    Promise.resolve(func(req, res).catch(next))
}

module.exports = asyncHandler