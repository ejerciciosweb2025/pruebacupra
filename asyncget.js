//Otra forma para pedir los datos Recomendada
//promesas con async y await
//debe estar en una función asincrona

console.log("Async Await con Try Catch");

url = "http://localhost/copra/api.php";

async function asyncContenido(){
   try{
    let response = await fetch(url);
    let data     = await response.json();
    console.log(data);
    //mi array de objetos
   // console.log(data.data);
    for( elemento of data ){
        console.log(elemento);
        let contenido = document.querySelector(".contenido");

        contenido.innerHTML += `
            <tr>
                <td>${elemento.id}</td>
                <td>${elemento.dni}</td>
                <td>${elemento.nombre} </td>
                <td>${elemento.fichaje}</td>
                <td>${elemento.SMS}</td>
                <td>${elemento.codigo}</td>
                <td>${elemento.rol} </td>
                <td>${elemento.especialidad} </td>
            </tr>
        `;
    }
   }catch(error){
    console.log("Error al conseguir la información",error);
   }
}

asyncContenido();