'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TenderSchema extends Schema {
  up () {
    this.create('tenders', (table) => {
      table.increments()
      table.integer('bulan', 2)
      table.integer('nominal', 11)
      table.integer('id_bq').unsigned().references('id').inTable('bqs')
      table.timestamps()
    })
  }

  down () {
    this.drop('tenders')
  }
}

module.exports = TenderSchema
