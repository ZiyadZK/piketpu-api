const { Op } = require("sequelize")
const M_Surat = require("../model/M_Surat")
const M_DataAkun = require("../model/M_Akun")
const { date_getFirstDayOfMonth, date_getLastDayOfMonth, date_getYear, date_getMonth, date_getMonthRange } = require("../../libs/date")
const { report_siswa } = require("../../libs/report_siswa")

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
                ],
                include: [
                    {
                        model: M_DataAkun,
                        as: 'data_akun'
                    }
                ]
            })            
        }else{
            data = await M_Surat.findAll({
                raw: true,
                order: [
                    ['tanggal', 'DESC'],
                    ['waktu', 'DESC'],
                ],
                include: [
                    {
                        model: M_DataAkun,
                        as: 'data_akun'
                    }
                ]
            })
        }

        const formattedData = data.map(value => {
            return {
                id_surat_izin: value['id_surat_izin'],
                nis_siswa: value['nis_siswa'],
                nama_siswa: value['nama_siswa'],
                kelas: value['kelas'],
                jurusan: value['jurusan'],
                rombel: value['rombel'],
                tanggal: value['tanggal'],
                waktu: value['waktu'],
                tipe: value['tipe'],
                keterangan: value['keterangan'],
                fk_surat_id_akun: value['fk_surat_id_akun'],
                nama_piket: value['data_akun.nama_akun'],
                nickname_piket: value['data_akun.nickname_akun'],
                email_piket: value['data_akun.email_akun'],
            }
        })

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

exports.F_Surat_create = async (payload) => {
    try {

        const { startDate, endDate }= date_getMonthRange()
        
        if(Array.isArray(payload)) {
            await M_Surat.bulkCreate(payload)
            // Check kalau misalkan ada surat yg lebih dari 3

            let reportedSiswa = []

            await Promise.all(payload.map(async value => {
                let jumlahSurat = await M_Surat.count({
                    where: {
                        nis_siswa: value['nis_siswa'],
                        kelas: value['kelas'],
                        jurusan: value['jurusan'],
                        rombel: value['rombel'],
                        tanggal: {
                            [Op.between]: [startDate, endDate]
                        }
                    }
                })
                
                if(jumlahSurat >= 3) {
                    reportedSiswa.push({
                        nama_siswa: value['nama_siswa'],
                        nis: value['nis_siswa'],
                        kelas: value['kelas'],
                        jurusan: value['jurusan'],
                        rombel: value['rombel'],
                        jumlah_absen: jumlahSurat
                    })
                }
            }))
            await report_siswa(reportedSiswa)
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