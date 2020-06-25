'use strict'

const View = use('View')
const BQ = use('App/Models/Bq')
const InputFile = use('App/Models/InputFile')
const Lain2 = use('App/Models/Lain2')
const Member = use('App/Models/Member')
const Perlengkapan = use('App/Models/Perlengkapan')
const Personil = use('App/Models/Personil')
const Tender = use('App/Models/Tender')

class UiController {

    async Dashboard({request, response, session}){
        return View.render('Dashboard')
    }

    async Bq(){
        const getDataBQ = await BQ.all()
        
        return View.render('Bq',{ data_bq : getDataBQ.toJSON()})
    }

    async SuratPenerimaan(){
        const getDataBQ = await BQ.all()
        return View.render('SuratPenerimaan', { data_bq : getDataBQ.toJSON()})
    }

    async PilihSuratPenerimaan({request, response, session}){
        var id = request.params.id
        const getBQData = await BQ.find(id)
        return View.render('PilihSuratPenerimaan', { data_bq : getBQData.toJSON()})
    }

    async Login(){
        return View.render('Login')
    }

    async TambahBQ(){
        return View.render('TambahBQ')
    }

    async Invoice(){
        return View.render('Invoice')
    }

    async EditBQ({request, response, session}){
        var id = request.params.id
        const getBQ = await BQ.find(id)
        const getPersonil = await Personil.query().where('id_bq',id).fetch()
        const getPerlengkapan = await Perlengkapan.query().where('id_bq',id).fetch()
        const getLain2 = await Lain2.query().where('id_bq',id).fetch()
        const BQS = getBQ.toJSON()
        const Personils = getPersonil.toJSON()
        const Perlengkapans = getPerlengkapan.toJSON()
        const Lain2s = getLain2.toJSON()
        
  
        return View.render('EditBQ',{BQS, Personils, Perlengkapans, Lain2s})
    }
}

module.exports = UiController
