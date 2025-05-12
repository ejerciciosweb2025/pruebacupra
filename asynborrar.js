//Otra forma para pedir los datos Recomendada
//promesas con async y await
//debe estar en una función asincrona

console.log("Async Await con Try Catch");

url = "http://localhost/copra/api.php/8";
let miId        = 0;
let formfichaje = {};

async function asyncContenido(){
   try{
    let response = await fetch(url);
    let data     = await response.json();
    console.log(data);
    //mi array de objetos
   // console.log(data.data);
    for( elemento of data ){
        console.log(elemento);
        //let contenido = document.querySelector(".contenido");
        let contenidoid = document.querySelector("#contenidoid");
        let dni = document.querySelector("#dni");
        let nombre = document.querySelector("#nombre");
        let fichado = document.querySelector("#fichado");
        let sms = document.querySelector("#sms");
        let codigo = document.querySelector("#codigo");
        let rol = document.querySelector("#rol");
        let especialidad = document.querySelector("#especialidad");

       // miId++;
        contenidoid.value   = `${elemento.id}`
        dni.value           = `${elemento.dni}`;
        nombre.value        = `${elemento.nombre}`;
        fichado.value       = `${elemento.fichado}`;
        sms.value           = `${elemento.SMS}`;
        codigo.value        = `${elemento.codigo}`;
        rol.value           = `${elemento.rol}`;
        especialidad        = `${elemento.especialidad}`;

        miId                = contenidoid;
    }
   }catch(error){
    console.log("Error al conseguir la información",error);
   }
}

asyncContenido();

let miformulario = document.querySelector("#miformulario");
miformulario.addEventListener("submit", (evento)=>{
    evento.preventDefault(); // para que no me recargue la página

    let contenidoid = document.querySelector("#contenidoid").value;
    let dni = document.querySelector("#dni").value;
    let nombre = document.querySelector("#nombre").value;
    let fichado = document.querySelector("#fichado").value;
    let sms = document.querySelector("#sms").value;
    let codigo = document.querySelector("#codigo").value;
    let rol = document.querySelector("#rol").value;
    let especialidad = document.querySelector("#especialidad").value;

    formfichaje = {
        id: `${contenidoid}`,
        dni: `${dni}`,
        nombre: `${nombre}`,
        fichado: `${fichado}`,
        SMS: `${sms}`,
        codigo: `${codigo}`,
        rol: `${rol}`,
        especialidad: `${especialidad}`  
    }
    console.log(formfichaje);
    borarrfichaje();
});

async function borarrfichaje(  ){
    //url2

    try{
        const response2 = await fetch( url, {
            method: 'DELETE',
        });
        if( response2.ok){
            console.log("Fichaje borrado");
        }
    }
    catch (error){
        console.log("Error al borrar el fichaje",error);
    }
}