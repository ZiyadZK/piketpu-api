const { default: axios } = require("axios")

exports.api_get = async (url = '/', base_url = process.env.BASE_URL) => {
    try {
        const { data } = await axios.get(`${base_url}${url}`, {
            headers: {
                'X-API-KEY': process.env.API_KEY
            }
        })

        return {
            success: true,
            data: data.data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message,
            debug: error
        }
    }
}