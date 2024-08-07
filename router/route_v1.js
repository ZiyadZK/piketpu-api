const express = require('express')
const { F_DataAkun_getAll, F_DataAkun_getUserdata, F_DataAkun_create, F_DataAkun_update, F_DataAkun_delete } = require('../database/function/F_Akun')
const { validateBody } = require('../middleware')
const { F_Surat_getAll, F_Surat_create, F_Surat_update, F_Surat_delete, F_Surat_delete_nis, F_Surat_peringatkan_siswa } = require('../database/function/F_Surat')
const { F_Riwayat_getAll, F_Riwayat_create, F_Riwayat_delete } = require('../database/function/F_Riwayat')
const path = require('path');
const ejs = require('ejs')
const { F_Detail_get, F_Detail_getAll_thisMonth, F_Detail_getAll } = require('../database/function/F_Detail')

const route_v1 = express.Router()

.get('/', async (req, res) => {
    return res.status(200).json({
        message: "PIKET API is Connected!"
    })
})

.get('/v1', async (req, res) => {
    return res.status(200).json({
        message: "PIKET API v1 is Connected!"
    })
})

.get('/v1/data', async (req, res) => {
    return res.status(200).json({
        message: 'PIKET API of Data v1 is Connected!'
    })
})

// DATA AKUN
.get('/v1/data/akun', async (req, res) => {
    try {

        const response = await F_DataAkun_getAll()

        if(response.success) {
            return res.status(200).json({
                data: response.data
            })
        }
        
        return res.status(400).json({
            error: 'Terjadi kesalahan disaat request data, hubungi Administrator',
            debug: response.error
        })
        
    } catch (err) {
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server, hubungi Administrator',
            debug: {
                error: err
            }
        })
    }
})

.post('/v1/data/akun', validateBody, async(req, res) => {
    try {

        const payload = await req.body

        const response = await F_DataAkun_create(payload)

        if(response.success) {
            return res.status(200).json({
                success: "Berhasil membuat akun tersebut",
                akun: payload
            })
        }

        return res.status(400).json({
            error: 'Terjadi kesalahan disaat request data, hubungi Administrator',
            debug: response.error
        })

    } catch (err) {
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server, hubungi Administrator',
            debug: {
                error: err
            }
        })
    }
})

.put('/v1/data/akun', validateBody, async (req, res) => {
    try {

        const id_akun = await req.body.id_akun
        const payload = await req.body.payload
        
        const response = await F_DataAkun_update(id_akun, payload)

        if(response.success) {
            return res.status(200).json({
                success: 'Berhasil mengubah data-data akun tersebut',
                id_akun,
                data: payload
            })
        }

        return res.status(400).json({
            error: 'Terjadi kesalahan disaat request data, hubungi Administrator',
            debug: response.error
        })

    } catch (err) {
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server, hubungi Administrator',
            debug: {
                error: err
            }
        })
    }
})

.delete('/v1/data/akun', validateBody, async (req, res) => {
    try {

        const id_akun = await req.body.id_akun
        
        const response = await F_DataAkun_delete(id_akun)

        if(response.success) {
            return res.status(200).json({
                success: 'Berhasil menghapus data-data akun tersebut',
                id_akun
            })
        }

        return res.status(400).json({
            error: 'Terjadi kesalahan disaat request data, hubungi Administrator',
            debug: response.error
        })

    } catch (err) {
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server, hubungi Administrator',
            debug: {
                error: err
            }
        })
    }
})

// MINTA USERDATA TOKEN
.post('/v1/userdata/create', validateBody, async (req, res) => {
    try {

        const payload = await req.body

        const response = await F_DataAkun_getUserdata(payload)
        console.log(response)
        if(response.success) {
            return res.status(200).json({
                success: 'Berhasil mendapatkan token userdata!',
                userdata: payload,
                data: response.token
            })
        }

        return res.status(400).json({
            error: response.error.message,
            debug: response.error
        })

    } catch (err) {
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server, hubungi Administrator',
            debug: {
                error: err
            }
        })
    }
})

// DATA SURAT

.get('/v1/data/surat', async (req, res) => {
    try {
        const filters = req.query.filters

        const response = await F_Surat_getAll(filters)
        if(response.success) {
            return res.status(200).json({
                data: response.data
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.post('/v1/data/surat', validateBody, async (req, res) => {
    try {
        const payload = await req.body

        const response = await F_Surat_create(payload)

        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil menambahkan data surat yang baru!'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.put('/v1/data/surat', validateBody, async (req,res) => {
    try {
        const id_surat_izin = await req.body.id_surat_izin
        const payload = await req.body.payload

        const response = await F_Surat_update(id_surat_izin, payload)

        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil mengubah data surat tersebut!'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.delete('/v1/data/surat', validateBody, async (req, res) => {
    try {
        const id_surat_izin = await req.body.id_surat_izin

        const response = await F_Surat_delete(id_surat_izin)

        if(response.success) {
            return res.status(200).json({
                message: "Berhasil menghapus data surat tersebut!"
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.delete('/v1/data/surat/:nis', async (req, res) => {
    try {
        const nis = req.params.nis

        const response = await F_Surat_delete_nis(nis)

        if(response.success) {
            return res.status(200).json({
                message: "Berhasil menghapus data surat tersebut!"
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

// DATA RIWAYAT
.get('/v1/data/riwayat', async (req, res) => {
    try {

        const response = await F_Riwayat_getAll()
        if(response.success) {
            return res.status(200).json({
                data: response.data
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.post('/v1/data/riwayat', validateBody, async (req, res) => {
    try {

        const payload = await req.body

        const response = await F_Riwayat_create(payload)

        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil membuat riwayat!'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.delete('/v1/data/riwayat', validateBody, async (req, res) => {
    try {
        const no_surat = await req.body.no_surat

        const response = await F_Riwayat_delete(no_surat)
        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil menghapus riwayat!'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

// DETAIL
.get('/v1/data/detail/:nis', async (req, res) => {
    try {
        const nis = req.params.nis

        const responseGet = await F_Detail_getAll(nis)
        const responseGetMonth = await F_Detail_getAll_thisMonth(nis)
        if(responseGet.success && responseGetMonth.success) {
            const response = {
                data_total_semua: responseGet.data,
                data_total_bulan: responseGetMonth.data
            }
            return res.status(200).json({
                data: response
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: [responseGet.message, responseGetMonth.message],
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

// PERINGATAN SISWA
.post('/v1/peringatkan-siswa', validateBody, async (req, res) => {
    try {
        const nis = await req.body.nis_siswa

        const response = await F_Surat_peringatkan_siswa(nis)
        if(response.success) {
            return res.status(200).json({
                message: `Berhasil memperingatkan siswa dengan nis ${nis}`,
                nis
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

module.exports = route_v1