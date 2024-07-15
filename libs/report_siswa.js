const { default: axios } = require("axios")
const ejs = require('ejs')
const path = require('path')
const { sendEmailHtml } = require("./mailer")

exports.report_siswa = async (dataSiswa = []) => {
    if(dataSiswa.length < 1) return
    const response = await getDataKelas()
    if(response.success) {
        const kelas = response.data.data

        const emailData = dataSiswa.map(value => {
            const dataKelas = kelas.find(v => v['kelas'] === value['kelas'] && v['jurusan'] === value['jurusan'] && v['rombel'] === value['rombel'])

            if(value['tipe'] === 'Mengikuti Pelajaran' && value['jumlah_absen'] >= 3) {
                return {
                    to: [dataKelas['email_wali_kelas']].join(', '),
                    subject: 'LAPORAN KETERLAMBATAN SISWA',
                    tipe: value['tipe'],
                    siswaArr: dataSiswa.filter(v => v['kelas'] === value['kelas']).filter(v => v['jurusan'] === value['jurusan']).filter(v => v['rombel'] === value['rombel'])
                }
            }
            
            if(value['tipe'] === 'Meninggalkan Pelajaran') {
                return {
                    to: [dataKelas['email_wali_kelas']].join(', '),
                    subject: 'LAPORAN IZIN SISWA MENINGGALKAN PELAJARAN',
                    tipe: value['tipe'],
                    keterangan: value['keterangan'],
                    siswaArr: dataSiswa.filter(v => v['kelas'] === value['kelas']).filter(v => v['jurusan'] === value['jurusan']).filter(v => v['rombel'] === value['rombel'])
                }
            }
        })
        console.log(emailData)
        await report_siswa_to_email(emailData, emailData[0]['tipe'])
    }
}

const getDataKelas = async () => {
    try {
        const response = await axios.get(`${process.env.SIMAK_API}/v1/data/kelas`, {
            headers: {
                'X-API-KEY': process.env.API_KEY
            }
        })

        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.response.data
        }
    }
}

const report_siswa_to_email = async (emailData = [], tipe) => {
    try {
        await Promise.all(emailData.map(async value => {
            const htmlContent = await ejs.renderFile(path.join(__dirname, 'public', 'email_report_siswa.ejs'), { siswaArr: value['siswaArr'], tipe }, { async: true })
    
            await sendEmailHtml(value['to'], value['subject'], htmlContent)
        }))
    } catch (error) {
        console.log(error)
    }
}