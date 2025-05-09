//Otra forma para pedir los datos Recomendada
//promesas con async y await
//debe estar en una función asincrona

console.log("Async Await con Try Catch");

url = "http://localhost/copra/api.php";

async function asyncUsuarios2(){
   try{
    let response = await fetch(url);
    let data     = await response.json();
    console.log(data);
    //mi array de objetos
   // console.log(data.data);
    for( elemento of data ){
        console.log(elemento);
        let miusuario = document.querySelector("#usuario");

        miusuario.innerHTML += `
            <p>${elemento.dni} -  ${elemento.nombre} </p>
            <p>${elemento.fichaje} -  ${elemento.SMS} </p>
            <p>${elemento.codigo} -  ${elemento.rol} </p>
        `;
    }
   }catch(error){
    console.log("Error al conseguir la información",error);
   }
}

asyncUsuarios2();