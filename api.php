<?php
/**Para permitir el acceso y que no de el error raro */
header('Access-Control-Allow-Origin: *');
//conectar con la base de datos
$host       = "localhost";
$usuario    = "root";
$password   = "";
$basedatos  = "api";

//pido a mi base de datos si puedo conectar 
$conexion   = new mysqli($host,$usuario,$password,$basedatos);
/*if( $conexion ->connect_error){
    die("Conexión fallida con la base de datos" . $conexion_error);
}*/

//Para permitir capturas del formato JSON
header("Content-Type: application/json");

//Capturar todas peticiones del navegador GET, PUT, DELETE, POST
$metodo = $_SERVER['REQUEST_METHOD'];

/**
 * Para capturar el parámetro de la ruta 1, 2,4 http://localhost.../1
 * Nos valdrá para actualizar o alguno con parámetro sino queremos la ruta completa
 * y capturamos el id
 */
$path = isset($_SERVER['PATH_INFO'])?$_SERVER['PATH_INFO']:'/';
$buscarId = explode('/', $path);
//el id va aqui
$id = ($path!=='/') ? end($buscarId):null;

switch( $metodo ){
    case 'GET':
        //echo "Consulta GET";
        consulta($conexion, $id);
        break;
    case 'POST':
        //echo "Consulta POST";
        insertar($conexion);
        break;
    case 'PUT':
        //echo "Consulta PUT";
        actualizar($conexion,$id);
        break;
    case 'DELETE':
        // echo "Consulta DELETE";
        borrar($conexion,$id);
        break;
    default:
        echo "Método no permitido";
}

function consulta($conexion,$id){
    //$sql        = "SELECT * FROM fichaje";
    $sql = ($id===null) ? "SELECT * FROM fichaje":"SELECT * FROM fichaje WHERE id=$id";
    $resultado  = $conexion->query($sql);
    
    //si tenemos algún resultado es decir devuelve algo la tabla de la bbdd ..
    if($resultado){
        //me guardo sus valores en un array llamado datos lo que seria un push
        $datos = array();
        while( $fila=$resultado->fetch_assoc() ){ //recorro cada una de las filas 
        // que tengo en la tabla y la añado a datos
            $datos[]=$fila;
        }
        echo json_encode($datos);
    }
}

function insertar($conexion){
    /** php input nos devuelve el contenido del archivo pasado como argumento 
     * 
     * Esto lo uso para recolectar los datos y que vaya bien
     * y lo usaremos tanto para insertar como para el de actualizar
    */
    /**
     * Asegurar que existan datos antes de enviar/crear json y que cuando enviemos ese json se envien con datos
     * 
     */
    $dato         = json_decode(file_get_contents('php://input'),true );
    $dni          = $dato['dni'];
    $nombre       = $dato['nombre'];
    $fichado      = $dato['fichado'];
    $sms          = $dato['SMS'];
    $codigo       = $dato['codigo'];
    $rol          = $dato['rol'];
    $especialidad = $dato['especialidad'];
    
    //print_r($dni);
    /*dni, nombre, fichado, SMS, codigo, rol, especialidad*/

    $sql = "INSERT INTO fichaje (dni,nombre,fichado,sms,codigo,rol,especialidad) VALUES('$dni','$nombre','$fichado','$sms','$codigo','$rol','$especialidad')";
    $resultado=$conexion->query($sql);
    
    //insert_id devuelve el último valor insertado/leido 
    if($resultado){
        $dato['id']=$conexion->insert_id;
        echo json_encode($dato);
    }
    else{
        //no hay resultados
        echo json_encode(array('error'=>'Error al crear fichaje: '.$id));
    }

}

function borrar($conexion,$id){
    echo "Borramos el id: " .$id;
    $sql = "DELETE FROM fichaje WHERE id = $id";
    $resultado = $conexion->query($sql);

    if($resultado){
        echo json_encode(array('mensaje'=>'Fichaje eliminado'.$id));
    }
    else{
        echo json_encode(array('error'=>'Error al eliminar el fichaje'));
    }
}

function actualizar($conexion, $id){
    $dato         = json_decode(file_get_contents('php://input'),true );
    $dni          = $dato['dni'];
    $nombre       = $dato['nombre'];
    $fichado      = $dato['fichado'];
    $sms          = $dato['SMS'];
    $codigo       = $dato['codigo'];
    $rol          = $dato['rol'];
    $especialidad = $dato['especialidad'];

    $sql = "UPDATE fichaje SET dni='$dni', nombre='$nombre',fichado='$fichado',SMS='$sms',codigo='$codigo',rol='$rol',especialidad='$especialidad' WHERE id='$id'";

    $resultado=$conexion->query($sql);

    if($resultado){
        echo json_encode(array('mensaje'=>'Fichaje actualizado/modificado '.$id));
    }
    else{
        echo json_encode(array('error'=>'Error al actualizar o modificar el fichaje'));
    }
    
}


?>