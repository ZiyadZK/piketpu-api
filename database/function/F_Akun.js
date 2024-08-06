const { Op } = require("sequelize")
const { encryptKey } = require("../../libs/encryptor")
const M_DataAkun = require("../model/M_Akun")
const { api_get } = require("../../libs/services")

exports.F_DataAkun_getUserdata = async (parameter) => {
    try {
        // const data = await M_DataAkun.findOne({
        //     where: parameter
        // })

        // if(!data || data === null || typeof(data) === 'undefined') {
        //     return {
        //         success: false,
        //         error: {
        //             message: 'Email dan Password tidak ditemukan!'
        //         }
        //     }
        // }

        const data = await M_DataAkun.findAll({
            raw: true
        })

        const response_getPegawai = await api_get('/v1/data/pegawai', process.env.SIMAK_API)


        if(!response_getPegawai.success) {
            return {
                success: false,
                message: 'Terdapat error dalam memproses data, hubungi Administrator'
            }
        }

        const updatedData = data
        .filter(value => {
            const dataPegawai = response_getPegawai.data.find(v => v['id_pegawai'] === value['piket_id_pegawai'])

            if(dataPegawai) {
                return true
            }else{
                return false
            }
        })
        .map(value => {
            const dataPegawai = response_getPegawai.data.find(v => v['id_pegawai'] === value['piket_id_pegawai'])

            if(dataPegawai) {
                return {
                    id_akun: value['id_akun'],
                    nama_akun: dataPegawai['nama_pegawai'],
                    email_akun: dataPegawai['email_pegawai'],
                    nickname_akun: value['nickname_akun'],
                    password_akun: value['password_akun'],
                    role_akun: value['role_akun'],
                    piket_id_pegawai: value['piket_id_pegawai'],
                }
            }
        })

        const userdata = updatedData.find(value => value['email_akun'] === parameter['email_akun'] && value['password_akun'] === parameter['password_akun'])

        if(!userdata) {
            return {
                success: false,
                error: {
                    message: 'Email dan Password tidak ditemukan!'
                }
            }
        }

        const response = await encryptKey(userdata)
        
        return {
            success: true,
            token: response.data
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
        const data = await M_DataAkun.findAll({
            raw: true
        })

        const response_getPegawai = await api_get('/v1/data/pegawai', process.env.SIMAK_API)


        if(!response_getPegawai.success) {
            return {
                success: false,
                message: 'Terdapat error dalam memproses data, hubungi Administrator'
            }
        }

        const updatedData = data
        .filter(value => {
            const dataPegawai = response_getPegawai.data.find(v => v['id_pegawai'] === value['piket_id_pegawai'])

            if(dataPegawai) {
                return true
            }else{
                return false
            }
        })
        .map(value => {
            const dataPegawai = response_getPegawai.data.find(v => v['id_pegawai'] === value['piket_id_pegawai'])

            if(dataPegawai) {
                return {
                    id_akun: value['id_akun'],
                    nama_akun: dataPegawai['nama_pegawai'],
                    email_akun: dataPegawai['email_pegawai'],
                    nickname_akun: value['nickname_akun'],
                    password_akun: value['password_akun'],
                    role_akun: value['role_akun'],
                    piket_id_pegawai: value['piket_id_pegawai'],
                }
            }
        })



        return {
            success: true,
            data: updatedData
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
            await M_DataAkun.destroy({
                where: {
                    id_akun: {
                        [Op.in]: id_akun
                    }
                }
            })
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
            await M_DataAkun.update(payload, {
                where: {
                    id_akun: {
                        [Op.in]: id_akun
                    }
                }
            })
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