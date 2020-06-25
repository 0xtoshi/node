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
        console.log(getDataBQ.toJSON())
        return View.render('Bq',{ data_bq : getDataBQ.toJSON()})
    }

    async SuratPenerimaan(){
        return View.render('SuratPenerimaan')
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
}

module.exports = UiController
