const { Op } = require("sequelize")
const M_Riwayat = require("../model/M_Riwayat")
const M_DataAkun = require("../model/M_Akun")

exports.F_Riwayat_getAll = async () => {
    try {
              
        const data = await M_Riwayat.findAll({
            order: [
                ['no_riwayat', 'desc']
            ],
            raw: true,
            include: [
                {
                    model: M_DataAkun,
                    as: 'data_akun'
                }
            ]
        })

        const formattedData = data.map(value => ({
            no_riwayat: value['no_riwayat'],
            tanggal: value['tanggal'],
            waktu: value['waktu'],
            aksi: value['aksi'],
            keterangan: value['keterangan'],
            json: value['json'],
            id_akun: value['fk_riwayat_id_akun'],
            email_akun: value['data_akun.email_akun'],
            nama_akun: value['data_akun.nama_akun'],
        }))

        return {
            success: true,
            data: formattedData
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