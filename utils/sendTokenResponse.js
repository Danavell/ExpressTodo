const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    const expiry = process.env.JWT_COOKIE_EXPIRES_IN
    const msExpiry = expiry * 24 * 60 * 60 * 1000
    const options = {
        expires: new Date(Date.now() + msExpiry),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token })
}

module.exports = sendTokenResponse