//Otra forma para pedir los datos Recomendada
//promesas con async y await
//debe estar en una función asincrona

console.log("Async Await con Try Catch");

url = "http://localhost/copra/api.php";
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

        miId++;
        contenidoid.value   = miId+1;
        dni.value           = "";
        nombre.value        = "";
        fichado.value       = "";
        sms.value           = "";
        codigo.value        = "";
        rol.value           = "";
        especialidad        = "";
    }
   }catch(error){
    console.log("Error al conseguir la información",error);
   }
}

asyncContenido();

let miformulario = document.querySelector("#miformulario");
miformulario.addEventListener("submit", (evento)=>{
    evento.preventDefault(); // para que no me recargue la página

    let contenidoid = miId+1
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
    crearfichaje(formfichaje);
});

async function crearfichaje( formfichaje ){
    //url2

    try{
        const response2 = await fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formfichaje)
        } )
        const data2 = await response2.json();
        console.log("Fichaje creado: ", data2);
    }
    catch (error){
        console.log("Error al crear el fichaje",error);
    }
}