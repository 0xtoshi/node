'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

/**
 * ADMIN ROUTE
 */

 Route.post('Api/AddMember','BqController.TambahMember')
 Route.post('Api/Login','BqController.MemberLogin')
 Route.get('Api/Session','BqController.getSessionMember')
 Route.post('Api/TambahBQ','BqController.TambahBq')
 Route.post('Api/TambahPersonil','BqController.TambahPersonil')
 Route.post('Api/TambahPerlengkapan','BqController.TambahPerlengkapan')
 Route.post('Api/TambahLain2','BqController.TambahLain2')
 Route.post('Api/InsertBQ','BqController.InsertMultiBQ')
 Route.get('Api/DataBQ','BqController.DataBQ')
 Route.post('Api/UpdateMultiBQ','BqController.UpdateMultiBQ')
 Route.get('Api/DeleteBq/:id','BqController.DeletBQ').as('id')
 Route.get('Api/DeletePersonil/:id','BqController.DeletePersonil').as('id')
 Route.get('Api/DeletePerlengkapan/:id','BqController.DeletePerlengkapan').as('id')
 Route.get('Api/DeleteLain2/:id','BqController.DeleteLain2').as('id')
 
 



 /**
  * UI CONTROLLER
  */
  Route.get('login','UiController.Login')
  Route.get('dashboard','UiController.Dashboard')
  Route.get('bq','UiController.Bq')
  Route.get('bq/tambah','UiController.TambahBQ')
  Route.get('bq/edit/:id','UiController.EditBQ').as('id')
  Route.get('surat_penerimaan','UiController.SuratPenerimaan')
  Route.get('surat_penerimaan/id/:id','UiController.PilihSuratPenerimaan').as('id')
  Route.get('surat_penerimaan/tambah/:id','UiController.TambahSuratPenerimaan').as('id')
  Route.get('invoice','UiController.Invoice')
  Route.get('surat_penerimaan','UiController.SuratPenerimaan')
  Route.get('input_surat_laporan','UiController.SuratPenerimaan')
  Route.get('tender_selesai','UiController.SuratPenerimaan')
  Route.get('progress_tender','UiController.SuratPenerimaan')
