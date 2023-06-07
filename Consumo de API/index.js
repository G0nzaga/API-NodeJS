//  const { response } = require("express");

 //Vai retornar os dados da requisição
 axios.get("http://localhost:8080/games").then(response =>{
    var games = response.data;
    
    var list = document.getElementById("games");

    games.forEach(game =>{
        var item = document.createElement("li");

        //Atributos customizados
        item.setAttribute("data-id", game.id);
        item.setAttribute("data-title", game.title);
        item.setAttribute("data-year", game.year);
        item.setAttribute("data-price",game.price)

        item.innerHTML = game.id + " - " + game.title + " - $" + game.price;

        var deleteBNT = document.createElement("button");
        deleteBNT.innerHTML = "deletar";

        
        deleteBNT.style.backgroundColor = "red"
        deleteBNT.style.marginLeft = "20px";
        deleteBNT.style.borderRadius = "10px"
        deleteBNT.style.color = 'white';
        deleteBNT.addEventListener("click", function(){
            deleteGame(item)
        })

        var editBtn = document.createElement("button");

        editBtn.innerHTML = "Editar";
        editBtn.style.backgroundColor = "green"
        editBtn.style.marginLeft = "20px";
        editBtn.style.borderRadius = "10px"
        editBtn.style.color = 'white';

        editBtn.addEventListener("click", function(){
            loadForm(item);
        })


        
        item.appendChild(deleteBNT);
        item.appendChild(editBtn)
        list.appendChild(item);

    })
    
}).catch(error =>{
    console.log(error);
})




// var axiosConfig = {
//     headers:{
//         Authorization: "Bearer" + localStorage.getItem("token")
//     }
// }



// function login(){
//     var emailField = document.getElementById("email")
//     var passwordField = document.getElementById("password")

//     var email = emailField.value;
//     var password = passwordField.value;

//     axios.post("http://localhost:8080/auth",{
//         email,
//         password
//     }).then(res =>{
//         var token = res.data.token;
//         localStorage.setItem("token", token);
//         axiosConfig.headers.Authorization = "Bearer" + localStorage.getItem("token");
        

     
//     }).catch(err =>{
//         alert("Login inválido")
//     })
// }



function createGame(){
    var titleInput = document.getElementById("title");
    var yearInput = document.getElementById("year");
    var priceInput = document.getElementById("price");

    var game = {
       title: titleInput.value,
       year:  yearInput.value,
       price: priceInput.value
    }

    axios.post("http://localhost:8080/game", game).then(response =>{

            if(response.status == 200){
                alert("Game cadastrado!")
            }
    }).catch(error =>{
        console.log(error)
    })
}


function deleteGame(ListItem){
    var id = ListItem.getAttribute("data-id");
    axios.delete("http://localhost:8080/game/"+id).then(response =>{
        alert("Game deletado!")
    }).catch(err =>{
        console.log(err)
    })
}


function loadForm(ListItem){
   
    var id = ListItem.getAttribute("data-id");
    var title = ListItem.getAttribute("data-title");
    var year = ListItem.getAttribute("data-year");
    var price = ListItem.getAttribute("data-price");

    document.getElementById("idEdit").value = id;
    document.getElementById("titleEdit").value = title;
    document.getElementById("yearEdit").value = year;
    document.getElementById("priceEdit").value = price;
    
}

function updateGame(){

    var idInput = document.getElementById("idEdit");
    var titleInput = document.getElementById("titleEdit");
    var yearInput = document.getElementById("yearEdit");
    var priceInput = document.getElementById("priceEdit");

    var game = {
       title: titleInput.value,
       year:  yearInput.value,
       price: priceInput.value
    }

    var id = idInput.value;

    axios.put("http://localhost:8080/game/"+id, game).then(response =>{

            if(response.status == 200){
                alert("Game atualizado!")
            }
    }).catch(error =>{
        console.log(error)
    })
}