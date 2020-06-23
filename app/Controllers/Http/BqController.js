'use strict'


/**
 *  BQ MODELS LOAD
 */
const BQ = use('App/Models/Bq')
const InputFile = use('App/Models/InputFile')
const Lain2 = use('App/Models/Lain2')
const Member = use('App/Models/Member')
const Perlengkapan = use('App/Models/Perlengkapan')
const Personil = use('App/Models/Personil')
const Tender = use('App/Models/Tender')

/**
 * Framework Load
 */
const Encryption = use('Encryption')
const DB = use('Database')
const Hash = use('Hash')
const { validate } = use('Validator')



class BqController {

    async TambahMember({request, response}) {

        const req = request.only(['username','pass','nama','jabatan'])
        const rules = {
            username : 'required|unique:members',
            pass : 'required|min:5|max:25',
            nama : 'required|min:5|max:50',
            jabatan : 'required' 
        }
        const messages = {
            required: 'Field harus diisi!',
            'username.unique' : 'Username telah dipakai!',
            min : 'Input Field Terlalu Pendek!',
            max : 'Input Field Terlalu Panjang!' 
        }
        const validation = await validate(req, rules, messages)
        if (validation.fails()) {    
          return validation.messages()
        }

        const member = new Member()
        member.username = req.username
        member.pass = await Hash.make(req.pass)
        member.nama = req.nama
        member.jabatan = req.jabatan

        await member.save()

        response.status(200).json({ status : 200 , msg : 'Sukses Menambahkan Member IKS' })

    }

    async MemberLogin({request, response, session})
    {
        const req = request.only(['username', 'pass'])
        const rules = {
            username : 'required|min:5|max:25',
            pass : 'required|min:5|max:25'
        }
        const messages = {
            required: 'Field harus diisi!',
            min : 'Input Field Terlalu Pendek!',
            max : 'Input Field Terlalu Panjang!' 
        }
        const validation = await validate(req, rules, messages)
        if (validation.fails()) {    
          return validation.messages()
        }

        const CallbackMember = await Member.query()
                    .where('username', req.username)
                    .first()
       if(CallbackMember) {           
            if(await Hash.verify( req.pass, CallbackMember.pass )){
                const setSesionVariable = {
                    username : CallbackMember.username,
                    nama : CallbackMember.nama,
                    jabatan : CallbackMember.jabatan
                }
                session.put('HasSession', true)
                session.put('SessionLogin', setSesionVariable)
                return response.status(200).json({ status : 200 , msg : 'Login Sukses! Anda akan dialihkan ke Dashboard!' })

            }else{
                return response.status(401).json({ status : 401, msg : 'Login Gagal! Pastikan username atau Password Benar!' })
            }
       }else{
           return response.status(401).json({ status : 401, msg : 'Login Gagal! Pastikan username atau Password Benar!' })
       }
        
    }

    async getSessionMember({request, response, session})
    {
        const getSessionData = session.get('SessionLogin')
        response.status(200).json(getSessionData)
    }

    async TambahBq({request, response, session})
    {
        const req = request.only(['nama','nilai','instansi','lama_tender'])
        const rules = {
            nama : 'required|min:5|max:25',
            nilai : 'required',
            instansi : 'required',
            lama_tender : 'required|max:2'
        }
        const messages = {
            required: 'Field harus diisi!',
            min : 'Input Field Terlalu Pendek!',
            max : 'Input Field Terlalu Panjang!' 
        }
        const validation = await validate(req, rules, messages)
        if (validation.fails()) {    
          return validation.messages()
        }

        await BQ.create(req)
        return response.status(200).json({ status : 200 , msg : 'Sukses Menambahkan BQ!' })

    }



    async TambahPersonil({request, response, session})
    {
        const req = request.only(['jabatan','gaji','jumlah','id_bq'])
        const rules = {
            jabatan : 'required',
            gaji : 'required',
            jumlah : 'required',
            id_bq : 'required'
        }
        const messages = {
            required: 'Field harus diisi!',
            min : 'Input Field Terlalu Pendek!',
            max : 'Input Field Terlalu Panjang!' 
        }
        const validation = await validate(req, rules, messages)
        if (validation.fails()) {    
          return validation.messages()
        }

        await Personil.create(req)
        return response.status(200).json({ status : 200 , msg : 'Sukses Menambahkan Personil!' })
    }

    async TambahPerlengkapan({ request, response, session})
    {
        const req = request.only(['nama','nominal','jumlah','id_bq'])
        const rules = {
            nama : 'required',
            nominal : 'required',
            jumlah : 'required',
            id_bq : 'required'
        }
        const messages = {
            required: 'Field harus diisi!',
            min : 'Input Field Terlalu Pendek!',
            max : 'Input Field Terlalu Panjang!' 
        }
        const validation = await validate(req, rules, messages)
        if (validation.fails()) {    
          return validation.messages()
        }

        await Perlengkapan.create(req)
        return response.status(200).json({ status : 200 , msg : 'Sukses Menambahkan Perlengkapan!' })
    }

    async TambahLain2({ request, response, session })
    {
        const req = request.only(['nama','nominal','jumlah','id_bq'])
        const rules = {
            nama : 'required',
            nominal : 'required',
            jumlah : 'required',
            id_bq : 'required'
        }
        const messages = {
            required: 'Field harus diisi!',
            min : 'Input Field Terlalu Pendek!',
            max : 'Input Field Terlalu Panjang!' 
        }
        const validation = await validate(req, rules, messages)
        if (validation.fails()) {    
          return validation.messages()
        }

        await Lain2.create(req)
        return response.status(200).json({ status : 200 , msg : 'Sukses Menambahkan Lain-Lain!' })
    }

    async DataBQ({request, response, session})
    {
        const data = await BQ.all()
        return response.status(200).json(data)
    }

}

module.exports = BqController
