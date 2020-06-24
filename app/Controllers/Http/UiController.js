'use strict'

const View = use('View')


class UiController {

    async Dashboard({request, response, session}){
        return View.render('Dashboard')
    }

    async Bq(){
        return View.render('Bq')
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
