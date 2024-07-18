const { default: axios } = require("axios")

exports.F_Siswa_getAll = async () => {
    try {
        const { data } = await axios.get(`${process.env.SIMAK_API}/v1/data/siswa`, {
            headers: {
                'X-API-KEY': process.env.API_KEY
            }
        })
        
        return {
            success: true,
            data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error
        }
    }
}