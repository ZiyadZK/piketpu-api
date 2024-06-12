const { Op } = require("sequelize")
const M_Riwayat = require("../model/M_Riwayat")

exports.F_Riwayat_getAll = async () => {
    try {
              
        const data = await M_Riwayat.findAll({
            order: [
                ['no_surat', 'desc']
            ],
            raw: true
        })

        return {
            success: true,
            data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Riwayat_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_Riwayat.bulkCreate(payload)
        }else{
            await M_Riwayat.create(payload)
        }

        return {
            success: true
        }
              
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Riwayat_delete = async (no_surat) => {
    try {
        if(Array.isArray(no_surat)) {
            await M_Riwayat.destroy({
                where: {
                    no_surat: {
                        [Op.in]: no_surat
                    }
                }
            })
        }else{
            await M_Riwayat.destroy({
                where: {
                    no_surat
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
            message: error.message
        }
    }
}