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
}

module.exports = UiController
