//importando banco
const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {

    index(req,res){
        return res.render('index')
    },

    async orphanage(req,res){
        
        const id = req.query.id;

        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`);
            const orphanage = results[0]

            //entre cada imagem terá uma vírgula. O split irá dividir as strings quando encontrar uma vírgula
            orphanage.images = orphanage.images.split(",");

            //definindo qual será a primeira imagem
            orphanage.firstImage = orphanage.images[0];

            if(orphanage.open_on_weekends == "0"){
                orphanage.open_on_weekends = false;
            } else{
                orphanage.open_on_weekends = true;
            }

            //Desafio: descobrir como usar if Ternário       
            //orphanage.open_on_weekends == "0" ? orphanage.open_on_weekends = false : orphanage.open_on_weekends = true;

            return res.render("orphanage",{orphanage});

        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados!');
        }
    },

    async orphanages(req,res){
        try{
            const db = await Database;
            const orphanages = await db.all(("SELECT * FROM orphanages"))
            return res.render('orphanages', { orphanages }) //O { orphanages } passará conteúdo ao HTML 
        } catch(error){
            console.log(error);
            return res.send('Erro no banco de dados!')
        }
    },
    
    createOrphanage(req,res){
        return res.render('create-orphanage')
    },

    async saveOrphanage(req,res) {
        const fields = req.body

        //validar se todos os campos estao preenchidos
        if(Object.values(fields).includes('')) { //se tiver qualquer campo vazio
            return res.send('Todos os campos devem ser preenchidos!')
        }

        try {
            //salvar um orfanato
            const db = await Database
            await saveOrphanage(db,{
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends
            })

            //redirecionamento
            return res.redirect('/orphanages')
        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados!')
        }

        
    }

}