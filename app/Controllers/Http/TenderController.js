'use strict'

const BQ = use('App/Models/Bq')
const InputFile = use('App/Models/InputFile')
const Lain2 = use('App/Models/Lain2')
const Member = use('App/Models/Member')
const Perlengkapan = use('App/Models/Perlengkapan')
const Personil = use('App/Models/Personil')
const Tender = use('App/Models/Tender')

class TenderController {

    async TambahSuratPenerimaan({ request , response , session})
    {
        var post = request.all()

        var id_personil = post.id_personil
        var personil_jabatan = post.personil_jabatan
        var personil_gaji  = post.personil_gaji
        var personil_jumlah = post.personil_jumlah

        for (let i = 0; i < personil_jabatan.length; i++) {


            await Tender.updateOrCreate({
                id : id_personil[i],
            }, {
                jabatan : personil_jabatan[i],
                gaji : personil_gaji[i],
                jumlah : personil_jumlah[i] })

            
        }
        
        var id_perlengkapan = post.id_perlengkapan
        var nama_perlengkapan = post.nama_perlengkapan
        var nominal_perlengkapan = post.nominal_perlengkapan
        var jumlah_perlengkapan = post.jumlah_perlengkapan
        for (let p = 0; p < nama_perlengkapan.length; p++) {

            if( id_perlengkapan[p] == 'new' ) { 
                await Perlengkapan.create({
                    id_bq : post.id,
                    nama : nama_perlengkapan[p],
                    nominal : nominal_perlengkapan[p],
                    jumlah : jumlah_perlengkapan[p]
                })

            }else{
            await Perlengkapan.updateOrCreate({
                id : id_perlengkapan[p]
            }, { 
                nama : nama_perlengkapan[p],
                nominal : nominal_perlengkapan[p],
                jumlah : jumlah_perlengkapan[p], }) 
            }
        }

        var id_lain2 = post.id_lain2
        var nama_lain2 = post.nama_lain2
        var nominal_lain2 = post.nominal_lain2
        var jumlah_lain2 = post.jumlah_lain2
        for (let l = 0; l < nama_lain2.length; l++) {
            if( id_lain2[l] == 'new' ) { 
                await Lain2.create({
                    id_bq : post.id,
                    nama : nama_lain2[l],
                    nominal : nominal_lain2[l],
                    jumlah : jumlah_lain2[l]
                })

            }else{
            await Lain2.updateOrCreate({
                id : id_lain2[l]
            }, {
                nama : nama_lain2[l],
                nominal : nominal_lain2[l],
                jumlah : jumlah_lain2[l],
            })
            }
        }

        
        
        

        return response.status(200).json({ status : 200 , msg : 'Sukses Update BQ Tender!' })
    }

}

module.exports = TenderController
