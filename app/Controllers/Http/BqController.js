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
          return response.status(400).json({ status : 400 , msg : validation.messages() })
        }

        const member = new Member()
        member.username = req.username
        member.pass = await Hash.make(req.pass)
        member.nama = req.nama
        member.jabatan = req.jabatan

        await member.save()

        return response.status(200).json({ status : 200 , msg : 'Sukses Menambahkan Member IKS' })

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
            return response.status(400).json({ status : 400 , msg : validation.messages() })
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
                return response.status(401).json({ status : 401, msg : [{message : 'Login Gagal! Pastikan username atau Password Benar!'}] })
            }
       }else{
           return response.status(401).json({ status : 401, msg : [{message : 'Login Gagal! Pastikan username atau Password Benar!'}] })
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
            return response.status(400).json({ status : 400 , msg : validation.messages() })
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
            return response.status(400).json({ status : 400 , msg : validation.messages() })
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
            return response.status(400).json({ status : 400 , msg : validation.messages() })
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
            return response.status(400).json({ status : 400 , msg : validation.messages() })
        }

        await Lain2.create(req)
        return response.status(200).json({ status : 200 , msg : 'Sukses Menambahkan Lain-Lain!' })
    }

    async DataBQ({request, response, session})
    {
        const data = await BQ.all()
        return response.status(200).json(data)
    }

    async InsertMultiBQ({ request , response , session})
    {
        var post = request.all()
        var param_tender = {
            nama : post.nama_tender,
            nilai : post.nilai_tender,
            instansi : post.instansi_tender,
            lama_tender : post.lama_tender
        }

        var CreateBQ = await BQ.create(param_tender)

        var getIDBQ = CreateBQ.id

        var personil_jabatan = post.personil_jabatan
        var personil_gaji  = post.personil_gaji
        var personil_jumlah = post.personil_jumlah

        var personil_push = []
        for (let i = 0; i < personil_jabatan.length; i++) {
            personil_push.push({
                jabatan : personil_jabatan[i],
                gaji : personil_gaji[i],
                jumlah : personil_jumlah[i],
                id_bq : getIDBQ
            })
            
        }
        
        var nama_perlengkapan = post.nama_perlengkapan
        var nominal_perlengkapan = post.nominal_perlengkapan
        var jumlah_perlengkapan = post.jumlah_perlengkapan
        var perlengkapan_push = []
        for (let p = 0; p < nama_perlengkapan.length; p++) {
            perlengkapan_push.push({
                nama : nama_perlengkapan[p],
                nominal : nominal_perlengkapan[p],
                jumlah : jumlah_perlengkapan[p],
                id_bq : getIDBQ
            })
        }

        var nama_lain2 = post.nama_lain2
        var nominal_lain2 = post.nominal_lain2
        var jumlah_lain2 = post.jumlah_lain2
        var lain2_push = []
        for (let l = 0; l < nama_lain2.length; l++) {
            lain2_push.push({
                nama : nama_lain2[l],
                nominal : nominal_lain2[l],
                jumlah : jumlah_lain2[l],
                id_bq : getIDBQ
            })
        }

        await Personil.createMany(personil_push)
        await Perlengkapan.createMany(perlengkapan_push)
        await Lain2.createMany(lain2_push)

        return response.status(200).json({ status : 200 , msg : 'Sukses Menyimpan BQ Tender!' })
    }

}

module.exports = BqController
