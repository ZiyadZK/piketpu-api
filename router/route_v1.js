const express = require('express')
const { F_DataAkun_getAll, F_DataAkun_getUserdata, F_DataAkun_create, F_DataAkun_update, F_DataAkun_delete } = require('../database/function/F_Akun')
const { validateBody } = require('../middleware')

const route_v1 = express.Router()

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

module.exports = route_v1