////////Significados////////

//npm = node package manager
//json = java script object notation


////////Passo a passo////////

//no terminal git, entrar na pasta src onde está o server.js para poder compilar e testar
//voltar para a pasta nlw 'cd ../'
//npm init -y               =    irá criar o package.json
//npm install express       =    irá criar o package-lock.json e a pasta node_modules
//npm install nodemon       =    monitoramento do node
//npm install hbs           =    handlebars (ele é uma template engine) handlebarsjs.com
//npm install sqlite-async  =    sql lite


////////  Comandos  ////////

//clear = ctrl + L (no terminal git)
//ctrl + C no terminal   =    DESLIGAR SERVIDOR
//ctrl + J no vscode     =    abrir terminal
//node src/server.js     =    LIGAR SERVIDOR (forma antiga)
//npm start              =    LIGAR SERVIDOR (forma nova, depois de alterar package.json)


//////// Códigos //////////

//o path.join() irá configurar o caminho corretamente, indiferente do sistema operacional
//por exemplo, windows é usado '\' e linux é usado '/' 
////console.log(request.query)  =  pegará todas as informações de formulário 


//toda vez que precisar fazer alterações no servidor, é preciso desligá-lo!

//importar dependencia
const express = require('express'); //atribui a função express p variavel express
const path = require('path');
const pages = require('./pages.js');

//iniciando o express
const server = express(); //executa a funcao e armazena dentro da variavel server

server
    //utilizar body do req
    .use(express.urlencoded({extended: true})) //estendendo as propriedades de urlencoded

    //criando rotas automaticamente para os arquivos estáticos
    .use(express.static('public')) 
    //será preciso mudar o caminho dos arquivos dentro do html (pequise globalmente e remova './public')

    //configurar template engine
    .set('views', path.join(__dirname,"views"))
    .set('view engine', 'hbs')  //preciso modificar todos os .html para .hbs

    //rotas de aplicação (é necessário criar uma rota para cada página )
    .get('/', pages.index)
    .get('/orphanage',pages.orphanage)
    .get('/orphanages',pages.orphanages)
    .get('/create-orphanage',pages.createOrphanage)
    .post('/save-orphanage', pages.saveOrphanage);

//ligar o servidor na porta 5500  (antes, desinstale a extensão do live server)
server.listen(5500)




//.get('/', (req, res) => { //req = request, res = response
    //const city = req.query.city
   // return res.render('index', { city })    
    //const name = "Lucas";
    //return response.render('index', { name }) 
    //é necessário colocar {name: name}, mas como os nomes são iguais, pode colocar apenas { name }
    //E lá no HBS, antigo html, é necessário colocar {{ name }}
//})


