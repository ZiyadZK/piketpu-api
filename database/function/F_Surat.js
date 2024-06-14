const { Op } = require("sequelize")
const M_Surat = require("../model/M_Surat")

exports.F_Surat_getAll = async (parameter) => {
    try {
        let data
        if(parameter) {
            data = await M_Surat.findAll({
                where: parameter,
                raw: true,
                order: [
                    ['tanggal', 'DESC'],
                    ['waktu', 'DESC'],
                ]
            })            
        }else{
            data = await M_Surat.findAll({
                raw: true,
                order: [
                    ['tanggal', 'DESC'],
                    ['waktu', 'DESC'],
                ]
            })
        }

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

exports.F_Surat_create = async (payload) => {
    try {
        
        if(Array.isArray(payload)) {
            await M_Surat.bulkCreate(payload)
        }else{
            await M_Surat.create(payload)
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

exports.F_Surat_update = async (id_surat_izin, payload) => {
    try {
        if(Array.isArray(id_surat_izin)) {
            await M_Surat.update(payload, {
                where: {
                    id_surat_izin: {
                        [Op.in]: id_surat_izin
                    }
                }
            })
        }else{
            await M_Surat.update(payload, {
                where: {
                    id_surat_izin
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

exports.F_Surat_delete = async (id_surat_izin) => {
    try {
        if(Array.isArray(id_surat_izin)) {
            await M_Surat.destroy({
                where: {
                    id_surat_izin: {
                        [Op.in]: id_surat_izin
                    }
                }
            })
        }else{
            await M_Surat.destroy({
                where: {
                    id_surat_izin
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