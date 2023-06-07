const express = require("express")
const app = express();
const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken")
const cors = require("cors");

//Instalar e configurar aqui
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// const jwtSecret = "$#@*74376463526v526v532653!¨%V@¨#¨V%@356v2363v62"


//Midleware, uma função que é executada antes da requisição da rota
// function auth(req, res, next){
//     const authToken = req.headers['authorization'];

//     if(authToken != undefined){

//         const bearer = authToken.split(' ');
//         var token = bearer[1];

//         jwt.verify(token,jwtSecret,(err, data) =>{

//             if(err){
//                 res.status(401);
//                 res.json({err: "Token inválido"})

//             }else{
//                 req.token = token;
//                  req.loggedUser = {id: data.id, email: data.email};
//                 // req.empresa = "Empresa do Gonzaga"
//                 next()
//             }
//         });
        
//     }else{
//         res.status(401);
//         res.json({err: "Token inválido"})
//     }

    
// }


var DB = {
    games: [
        {
            id: 1,
            title: "Call od Duty",
            year: 2019,
            price: 60
        },
        {
            id: 2,
            title: "Sea of Thieves",
            year: 2010,
            price: 20
        },
        {
            id: 3,
            title: "Minecraft",
            year: 2004,
            price: 25
        },
        {
            id: 4,
            title: "Mario",
            year: 1992,
            price: 100
        },
        {
            id: 5,
            title: "Metroid",
            year: 1990,
            price: 200
        },
        {
            id: 6,
            title: "The Last of Us",
            year: 2021,
            price: 400
        },
        {
            id: 7,
            title: "CyberPunk",
            year: 2003,
            price: 120
        },
        {
            id: 8,
            title: "Turok",
            year: 1994,
            price: 230
        },
        {
            id: 9,
            title: "Fina Fantasy Tatics",
            year: 1998,
            price: 300
        },
        {
            id: 10,
            title: "Luigi Maison",
            year: 1993,
            price: 300
        },
    ],
    // users:[
    //     {
    //         id: 1,
    //         name: "Gonzaga",
    //         email: "gonzaga@gmail.com",
    //         password: 123
    //     },
    //     {
    //         id: 2,
    //         name: "Neto",
    //         email: "neto@gmail.com",
    //         password: 456
    //     }
    // ]
}


//Endpoints, rotas da API
//Por exemplo, listagem de todos os games que existe no banco de dados
app.get("/games", (req, res) =>{
    //200 significa que a requisição foi feita com sucesso
    res.statusCode = 200;
     res.json(DB.games);
    // res.json({empresa: req.empresa, user: req.loggedUser,games: DB.games})
})

//Pegando dados pelo id
app.get("/game/:id", (req, res) =>{

    if(isNaN(req.params.id)){
        //Utilizando os verbos http
        res.sendStatus(400);
    }else{
        //converter para int
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id ==id );
        
        
        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
})

//Rotas com nomes iguais, mas métodos diferentes
//Cadastrar um game porque utiliza POST
app.post("/game",  (req, res) =>{
    
    var {title, year, price} = req.body;

    DB.games.push({
        id:2323,
        title, 
        year, 
        price
    });

    res.sendStatus(200);
})


app.delete('/game/:id', (req, res) =>{

    if(isNaN(req.params.id)){
        //Utilizando os verbos http
        res.sendStatus(400);
    }else{
        //converter para int
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id ==id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200)
        }
    }

})

//Endpoint editar(put)
app.put("/game/:id", (req, res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(req.params.id);

        var game  = DB.games.find(g => g.id == id);

        if(game != undefined){
            
        var {title, price, year} = req.body;

        if(title != undefined){
            game.title = title;
        }

        if(price != undefined){
            game.price = price;
        }

        if(year != undefined){
            game.year = year;
        }

        res.sendStatus(200);
            
        }else{
            res.sendStatus(404)
        }
    }
})

//Endpoint de autenticação API
app.post("/auth", (req, res) =>{

    var {email, password} = req.body;

    if(email != undefined){

       var user =  DB.users.find(u => u.email ==email);

       if(user != undefined){

        if(user.password == password){

            //salvar informaçõe essenciais
            jwt.sign({id: user.id, email: user.email}, jwtSecret, {expiresIn: '48h'},(err, token) =>{
                if(err){
                    res.status = 400;
                    res.json({err: "Falha interna"})
                }else{
                    res.status(200);
                    res.json({token: token})
                }
            })

        }else{
            res.status(401);
            res.json({err: "Credenciais inválidas"})

        }

       }else{
        res.status(404);
        res.json({err: "O email enviado não existe na base de dados"})
       }

    }else{
        res.status(400);
        res.json({err: "O email enviado é inválido"})
    }
})


//Server com callback
app.listen(8080, () =>{
    console.log("Api rodando!")
})