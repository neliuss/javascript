/**************************************************************
* Si se ejecuta en Chrome desde local, las cookies no se pueden crear, ya que este navegador requiere que sea
* llamado desde http: y en local se llamaría desde file:
***************************************************************/

/**************************************************************
* Cuando todos los elementos del formulario estén cargados se llamará a la función iniciar
***************************************************************/
window.onload=iniciar;

/**************************************************************
*	Esperamos los eventos de click para el botón y de pérdida de foco para nombre y apellidos.
*	También borramos la cookie (si está creada) para volver a contar desde 0
***************************************************************/
function iniciar(){
	// Comenzamos borrando la cookie si existe previamente (para empezar a contar desde 0)
	borrarCookie("visita");
	// Al hacer click en el botón de enviar tendrá que llamar a la la función validar que se encargará
	// de validar el formulario.
	// Cuando se pierda el foco de nombre o apellidos se llamará a la función convertirMayusculas.
	// El evento de click y el de perder el foco lo programamos en la fase de burbujeo (false).
	document.getElementById("enviar").addEventListener('click',validar,false);
	document.getElementById("nombre").addEventListener('blur',convertirMayusculas,false);
	document.getElementById("apellidos").addEventListener('blur',convertirMayusculas,false);
}

/**************************************************************
* añadimos 1 a la cookie y añadimos el nuevo valor en ella.
* Mostramos su valor en el contenedor indicado, y validamos los datos introducidos.
* Sin todos son correctos se envía el formulario, y en caso contrario se anula su efecto
* de envío
**************************************************************/
function validar(eventopordefecto){
	//	Introducimos el valor de la cookie almacenada (si tiene datos, ya que de lo contrario almacenamos 1)
	var valor=parseInt(leerCookie("visita"))+1;
	// Creamos la cookie si no está creada. Si ya la tenemos le introducimos el nuevo valor
	crearCookie("visita",valor,30);
	// Mostramos el valor de la cookie incrementada en 1 desde la última vez
	f

	// Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
	if (validarcampostexto(this) &&	validarEdad() && validarNif() && validarEmail() && validarProvincia() && validarFecha() && validarTelefono() && validarHora() && confirm("¿Deseas enviar el formulario?"))
		return true;
	else{
		// Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
		eventopordefecto.preventDefault();		
		return false;	// Salimos de la función devolviendo false.
	}
}

/**************************************************************
* Validamos que todos los campos de texto tengan algun valor introducido
***************************************************************/
function validarcampostexto(objeto){
	// A esta función le pasamos un objeto (que en este caso es el botón de enviar.
	// Puesto que validarcampostexto(this) hace referencia al objeto dónde se programó ese evento
	// que fue el botón de enviar.
	var formulario = objeto.form;	// La propiedad form del botón enviar contiene la referencia del formulario dónde está ese botón submit.
	// De esta manera podemos recorrer todos los elementos del formulario, buscando los que son de tipo texto.
	// Para validar que contengan valores.
	for (var i=0; i<formulario.elements.length; i++){
		// Eliminamos la clase Error que estuviera asignada a algún campo.
		formulario.elements[i].className="";
		if (formulario.elements[i].type == "text" && formulario.elements[i].value==""){
			formulario.elements[i].className="error";
			formulario.elements[i].focus();
			document.getElementById("errores").innerHTML="ERROR: "+formulario.elements[i].name.toUpperCase()+" no puede estar vacío";
			return false;
		}
	}
	return true;	 // Si sale de la función con esta instrucción es que todos los campos de texto son válidos.
}

/**************************************************************
* Función llamada cada vez que se pierda el foco en nombre o apellidos, y que convierte
* el valor introducido a mayúsculas
***************************************************************/
function convertirMayusculas(){
	document.getElementById("nombre").value=document.getElementById("nombre").value.toUpperCase();
	document.getElementById("apellidos").value=document.getElementById("apellidos").value.toUpperCase();
}

/**************************************************************
* Sólo permitimos edades con valores numéricos entre 0 y 105
***************************************************************/
function validarEdad(){
	// Si no es número o es inferior a 0 ó superior a 105
	if (isNaN(document.getElementById("edad").value) || document.getElementById("edad").value <0 || document.getElementById("edad").value >105){
			document.getElementById("errores").innerHTML="ERROR: La edad debe estar entre 0 y 105";
			document.getElementById("edad").className="error";
			document.getElementById("edad").focus();
			return false;
	}
	// Si llega aquí es que la edad es correcta
	document.getElementById("edad").className="";
	return true;
}

/**************************************************************
* Sólo permitimos números de teléfono de 9 dígitos que comiencen
* por 6 ó por 9
***************************************************************/
function validarTelefono(){
	// Comenzará con un 6 ó un 9 y seguirá por 8 dígitos numéricos
	var patron=/^[69]\d{8}$/;
	// Si el dato introducido no cumple el patrón
	if(!patron.test(document.getElementById("telefono").value)){
		document.getElementById("errores").innerHTML="ERROR: Sólo teléfonos que comiencen por 6 ó 9";
		document.getElementById("telefono").className="error";
		document.getElementById("telefono").focus();
		return false;
	}
	// Si llega aquí es que el teléfono es correcto
	document.getElementById("telefono").className="";
	return true;
}

/**************************************************************
* Comprobamos el email (caracteres)@(caracteres).(de 2 a 4 caracteres)
***************************************************************/
function validarEmail(){
	/* 	Comienza con 2 ó más caracteres alfanuméricos incluidos el guión y el punto, seguido de un símbolo @
		Seguirá con cualquier conjunto de 2 ó más caracteres alfanuméricos incluido el guión y finalizando en un punto.
		Terminará con 2 a 4 caracteres alfanuméricos incluidos el guión
	*/
	var patron = /^[\w-\.]{2,}@([\w-]{2,}\.)+([\w-]{2,4})$/;
	// Si no se cumple el patrón
	if (!patron.test(document.getElementById("email").value)){
		document.getElementById("errores").innerHTML="ERROR: No es un email válido.";
		// Situamos el foco en el campo email y le asignamos la clase error.
		document.getElementById("email").focus();
		document.getElementById("email").className="error";	
		return false;
	}
	// Si llega aquí es que el email es correcto
	document.getElementById("email").className="";	
	return true;
}

/**************************************************************
* Comprobamos que el NIF esté compuesto por 8 dígitos, un guión y una letra mayúscula
***************************************************************/
function validarNif(){
	// 8 Números 1 letra de la A-Z en mayúsculas, separados por un guión
	var patron = /^\d{8}-[A-Z]$/;
	// Si no se cumple el patrón definido
	if (!patron.test(document.getElementById("nif").value)){
		document.getElementById("errores").innerHTML="ERROR: No es un número de NIF válido.";
		// Situamos el foco en el campo nif y le asignamos la clase error.
		document.getElementById("nif").focus();
		document.getElementById("nif").className="error";	
		return false;
	}
	// Si llega aquí es que el número del NIF es correcto
	document.getElementById("nif").className="";	
	return true;
}

/**************************************************************
* Función que comprueba se hemos realizado alguna selección de provincia
***************************************************************/
function validarProvincia(){
	// Comprueba que la opción seleccionada sea diferente a 0.
	// Si es la 0 es que no ha seleccionado ningún nombre de Provincia.
	if (document.getElementById("provincia").selectedIndex==0){
		document.getElementById("errores").innerHTML="ERROR: No ha seleccionado ninguna provincia.";
		// Situamos el foco en el campo provincia y le asignamos la clase error.
		document.getElementById("provincia").focus();
		document.getElementById("provincia").className="error";	
		return false;
	}
	// Si llega aquí es que sí hemos seleccionado alguna provincia
	return true;
}

/**************************************************************
* Función que valida la introducción de un dia entre 1 y 31, un mes entre 1 y 12
* y un año entre 1000 y 2999. Todo separado por un guión o una barra inclinada, y
* que permite la introducción de hasta dos dígitos (para el día y el mes) con 0 delante ó  sin él
***************************************************************/
function validarFecha(){
	/* Debe empezar por 0 (no obligatorio) y un número del 1 al 9, ó por 1 y un dígito decimal, ó por 2 y un
	   dígito decimal, ó por 3 y un dígito entre el 0 y el 1.
	   A continuación admitirá un guión o una barra inclinada.
	   Seguirá con un 0 (no obligatorio) y un dígito entre el 1 y el 9, ó un 1 seguido de dígitos entre el 0 y el 2
	   Seguirá con un guión o una barra inclinada, y terminaremos con un dígito entre el 1 y el 2 seguido de 
	   3 dígitos numéricos
	*/
	var patron=/^((0?[1-9])|(1\d)|(2\d)|(3[0-1]))[-|\/]((0?[1-9])|(1[0-2]))[-|\/]([1-2]\d{3})$/
	// Si no se cumple el patrón definido
	if (!patron.test(document.getElementById("fecha").value)){
		document.getElementById("errores").innerHTML="Fecha errónea. Introdúzcala de nuevo (dd/mm/aaaa)";
		document.getElementById("fecha").focus();
		document.getElementById("fecha").className="error";	
		return false;
	}
	// Si llega aquí es que todo ha sido correcto
	return true;
}

/**************************************************************
* Función que comprueba la introducción de una hora entre 01 ó 1 hasta 23,
* y unos minutos entre 01 ó 1 hasta 59. Separados por dos puntos (:)
***************************************************************/
function validarHora(){
	// Comenzamos con un 0 (no obligatorio) y un dígito del 1 al 9, ó un 1 y un dígito numérico, 
	// ó un 2 y un dígito de 0 a 3, continuamos con dos puntos y un dígito entre el 0 y el 5 (no obligatorio)
	// seguido de otro dígito numérico
	var patron=/^(0?[1-9]|1\d|2[0-3]):([0-5]?\d)$/;
	// Si no se cumple el patrón definido
	if (!patron.test(document.getElementById("hora").value)){
		document.getElementById("errores").innerHTML="Hora errónea. Introdúzcala de nuevo (hh:mm)";
		document.getElementById("hora").focus();
		document.getElementById("hora").className="error";	
		return false;
	}
	// Si todo ha sido correcto
	return true;
}

/**************************************************************
* Funciones para crear, leer y borrar cookies
***************************************************************/

	// Función para crear/borrar cookies, a la que se le puede indicar los
	// días para que expire dicha cookie, y en caso de no hacerlo, la eliminará
	// porque la creará con fecha anterior a la actual
  function crearCookie(nombre,valor,dias) {
		// Si se indica cuántos días ha de tardar en expirar la cookie
    if (dias){
			// Se almacena la fecha actual
      var date = new Date();
			// a la fecha almacenada se le añaden los días recibidos por la función
      date.setTime(date.getTime()+(dias*24*60*60*1000));
			// se almacena la cadena "; expires=" mas la fecha actual con los días añadidos
      var expirar = "; expires="+date.toGMTString();
    }else{
			// si no se le pasan días querrá decir que queremos borrarla cuando se cierre el navegador
			var expirar = "";
    }
		// Se crea/borra la nueva cookie, por ejemplo visita=1;expires=Tue, 12 Mar 2013 12:12:00 GMT; path=/ 
    document.cookie = nombre+"="+valor+expirar+"; path=/";
  }

	// Función para leer cookies creadas
  function leerCookie(nombre) {
		// Almacenamos el nombre de la cookie seguida del signo de igual
    var miNombre = nombre + "=";
		// Almacenamos en el array cadena todos los apartados de la cookie, ya que
		// cada uno de ellos va separado del otro por el signo de punto y coma
    var cadena = document.cookie.split(';');
		// Se recorre todos los elementos del array creado
    for(var i=0;i < cadena.length;i++) {
			// en 'c' se almacena el valor del elemento de índice 'i' 
      var c = cadena[i];
			// Se eliminan los caracteres en blanco iniciales
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
			// Si se encuentra el contenido de 'miNombre' en el elemento del array leído
			// se devuelve el valor existente a continuación del símbolo igual, es decir
			// de visita=12 devolvería el valor 12
      if (c.indexOf(miNombre) == 0)
				return c.substring(miNombre.length,c.length);
    }
		// Si llega aquí es que no existe la cookie y devuelve el valor 0
    return 0;
  }

	// Función que llama a crearCookie pasándole un número de días negativo
	// con el fin de que la elimine
  function borrarCookie(nombre) {
    crearCookie(nombre,"",-1);
  }
/***************************************************************/
