const { encryptKey } = require("../../libs/encryptor")
const M_DataAkun = require("../model/M_Akun")

exports.F_DataAkun_getUserdata = async (parameter) => {
    try {
        const data = await M_DataAkun.findOne({
            where: parameter
        })

        if(!data || data === null || typeof(data) === 'undefined') {
            return {
                success: false,
                error: {
                    message: 'Email dan Password tidak ditemukan!'
                }
            }
        }

        const token = await encryptKey(data.dataValues)
        
        return {
            success: true,
            token
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: {
                message: error.message,
                debug: error
            }
        }
    }
}

exports.F_DataAkun_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_DataAkun.bulkCreate(payload)
        }else{
            await M_DataAkun.create(payload)
        }
        
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: {
                message: error.message,
                debug: error
            }
        }
    }
}

exports.F_DataAkun_getAll = async () => {
    try {
        const data = await M_DataAkun.findAll()

        return {
            success: true,
            data: data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: {
                message: error.message,
                debug: error
            }
        }
    }
}

exports.F_DataAkun_delete = async (id_akun) => {
    try {

        if(Array.isArray(id_akun)) {
            await Promise.all(id_akun.forEach(async value => await M_DataAkun.destroy({ where: { id_akun: value }})))
        }else{
            await M_DataAkun.destroy({
                where: {
                    id_akun
                }
            })
        }
        
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: {
                message: error.message,
                debug: error
            }
        }
    }
}

exports.F_DataAkun_update = async (id_akun, payload) => {
    try {
        
        if(Array.isArray(id_akun)) {
            await Promise.all(id_akun.forEach(async value => await M_DataAkun.update(payload, {
                where: {
                    id_akun: value
                }
            })))
        }else{
            await M_DataAkun.update(payload, {
                where: {
                    id_akun
                }
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: {
                message: error.message,
                debug: error
            }
        }
    }
}