const CryptoJS = require('crypto-js')

exports.decryptKey = async (token) => {
    try {
        const bytes = CryptoJS.AES.decrypt(token, process.env.PUBLIC_KEY)
        const payload = bytes.toString(CryptoJS.enc.Utf8)

        return {
            success: true,
            data: JSON.parse(payload)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.encryptKey = async (data) => {
    let encryptedData

    if(typeof data === 'string') {
        encryptedData = CryptoJS.AES.encrypt(data, process.env.PUBLIC_KEY).toString()
    }

    if(typeof data === 'number') {
        encryptedData = CryptoJS.AES.encrypt(data.toString(), process.env.PUBLIC_KEY).toString()
    }

    if(typeof data === 'object') {
        encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.PUBLIC_KEY).toString()
    }

    return {
        success: true,
        data: encryptedData
    }
}