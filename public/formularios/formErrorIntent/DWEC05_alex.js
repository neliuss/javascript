
window.onload = carga; //al cargarse la página, comienza la función carga

function carga() {
    document.getElementById("enviar").addEventListener("click", intent); //al darle a enviar, entra función intent
    document.getElementById("nombre").addEventListener("blur", mayus); 
    document.getElementById("enviar").addEventListener("click", comprobaciones );
    document.getElementById("limpiar").addEventListener("click", limpiar);

}
/* Utilizar una variable "envios" para almacenar el número de intentos de envío del formulario que se van produciendo y, mostrar un mensaje en
el contenedor con id "intentos" del documento similar a: "Intento de Envíos del formulario: X".Es decir cada vez que le demos al botón
de enviar tendrá que incrementar el valor de la variable envios en 1 y mostrar su contenido en el div antes mencionado.
Nota: para poder actualizar el contenido de un contenedor o div la propiedad que tenemos que modificar para ese objeto es innerHTML. */
var envios = 0;
function intent() { 
    envios = envios + 1;
    document.getElementById("intentos").innerHTML = "Intentos de envío del formulario: " + envios;
}

/* Cada vez que el campo NOMBRE pierda el foco(evento blur), el contenido que se haya escrito en el campo se convertirá a mayúsculas. */
 function mayus () {
    document.getElementById("nombre").value = document.getElementById("nombre").value.toUpperCase();
}

/* -Definir un objeto CampoErroneo con dos propiedades:
    campo: almacenará el campo erróneo. Puedes almacenar el el campo entero, o solo el id, como prefieras.
    mensaje: almacenará el mensaje de error para ese campo concreto.*/
    
function CampoErroneo(campo, mensaje) {
    this.campo = campo;
    this.mensaje = mensaje;
}

//Crear un array de errores denominado "errores". Almacenará un objeto CampoErroneo para cada uno de los campos con errores en el formulario.
let errores = new Array();

function comprobaciones() {
    //   Primero vacío el array, para que no se me dupliquen los errores en caso de no solventarlos, la siguiente vez q presione enviar, y luego vacío el cajetín div de errores
    errores.splice(0, errores.length);
    vaciaDivErrores();
    vaciaDivDatos();
    
    compruebaNombre();
    compruebaMail();
    compruebaProvincia();
    compruebaFecha();
    compruebaTelef();
    visualiza();
    
    muestraErrores();
    confirmar();
}
  
function muestraErrores() {
    for (let x in errores) {
        document.getElementById("errores").innerHTML += "error " + ` ${x}: ${errores[x]}` + "<br/>";     //importantísimo el +   
    }
} 
function muestraDatos() {
    for (let x in datosFormulario) {
        document.getElementById("datos").innerHTML += "Campo " + ` ${x}. Valor: ${datosFormulario[x]}` + "<br/>";     //importantísimo el +   
    }
} 

function vaciaDivErrores() {
    document.getElementById("errores").innerHTML = "";
}
 function vaciaDivDatos() {
    document.getElementById("datos").innerHTML = "";
} 

function visualiza() {
    if (document.getElementById("condiciones").checked == false)  { 
        CampoErroneo.campo = " Las condiciones y términos de uso, deben ser aceptadas ";
        errores.push(CampoErroneo.campo);
    } 
}

/* Realizar una función que valide el campo NOMBRE, comprobar que tiene contenido, y, no solo espacios en blanco.Si se produce algún error
crear un objeto CampoErroneo con las propiedades correspondientes y, añadirlo al array de errores. */ 
function compruebaNombre() {   
    if (document.getElementById("nombre").value.trim() == 0) {
        CampoErroneo.campo = " Error en el nombre, por favor, revíselo "; 
        errores.push(CampoErroneo.campo);    
    }  
} 

/* Validar el E - MAIL.Utilizar una expresión regular que nos permita comprobar que el e - mail sigue un formato correcto.
Si se produce algún error crear un objeto CampoErroneo con las propiedades correspondientes y, añadirlo al array de errores.
Explicar las partes de la expresión regular mediante comentarios. */
function compruebaMail() {
    let expMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (document.getElementById("email").value.trim() == 0) {
        CampoErroneo.campo = "Error en el mail, está vacío"; 
        errores.push(CampoErroneo.campo);
    } else if (!expMail.test(document.getElementById("email").value)) {
        CampoErroneo.campo = "Error en el mail, por favor, revíselo"; 
        errores.push(CampoErroneo.campo);
    } 
} 
//La letra o número se expresa mediante el carácter \w.Para asegurarnos de que la letra o número aparece al menos una vez utilizaremos el modificador +.w es equivalente a[A - Za - z0 -9_]
//Puede contener puntos y guiones además de las letras y números, por lo que  utilizaremos el modificador * (cero o varias veces)   \w+([\.-]?\w+)*
//Debe llevar el símbolo  @, por lo que tb lo metemos
//Finalmente, debe contener un punto. Podrá tener dos (.es, .fr, .it,…) o tres letras (.com, .net, .org,..) o cuatro (.mobi, info,…). Si queremos indicar un número concreto de caracteres lo expresamos con el número entre los operadores { y }
//Además podemos tener varios dominios seguidos(.com.ar, .com.uk, ….) es por ello que deberemos de usar el modificador +.Ya que el dominio podrá aparecer varias veces.     (\.\w{ 2, 3, 4 }) +


/* Validar que se haya seleccionado alguna de las PROVINCIAS.crear un objeto CampoErroneo con las propiedades correspondientes
y, añadirlo al array de errores */
function compruebaProvincia() {
    if (document.getElementById("provincia").selectedIndex == 0) {
        CampoErroneo.campo = "Error en campo provincia, debe marcar el campo provincia.";
        errores.push(CampoErroneo.campo);
    } else {
        datosFormulario.provincia = document.formulario.provincia.options[document.formulario.provincia.selectedIndex].text;    //sacada de internet, la de arriba me da sólo el id de provincias (C,OU..)
    }
}	  

/* Validar el campo FECHA utilizando una expresión regular.Debe cumplir alguno de los siguientes formatos: dd / mm / aaaa o dd - mm - aaaa.
No se pide validar que sea una fecha de calendario correcta.Si se produce algún error crear un objeto CampoErroneo con las propiedades
correspondientes y, añadirlo al array de errores.Explicar las partes de la expresión regular mediante comentarios. */
function compruebaFecha() {
 //   let expFecha = /^(?:3[01]|[12][0-9]|0?[1-9])([\-/])(0?[1-9]|1[1-2])\1\d{4}$/;
    let expFecha = /^(3[01]|[12][0-9]|0[1-9])([\-])(0[1-9]|1[1-2])\d{4}$/;
    if (!expFecha.test(document.getElementById("fecha").value)) {
        CampoErroneo.campo = "Error en la fecha, por favor, revíselo. Formato: dd-mm-aaaa, o dd/mm/aaaa";
        errores.push(CampoErroneo.campo);
    } else {
        datosFormulario.fecha = document.getElementById("fecha").value;
    }
}
/*  ^: marca el principio;   (?:  : grupo que no captura, ignora     
    3[01]|[12][0-9]|0?[1-9] : el día puede empezar por 3, seguido de un 0 ó un 1; puede empezar por 1 ó 2, seguido de otro número de 0 a 9; o puede empezar por 0, seguido de un número entre 0 y 9
    ([\-/])  :  puede ir separado por barras / , o guiones -
    (0?[1-9]|1[1-2])  : los meses pueden empezar por 0, seguido de un número entre 1 y 9; o por un 1, seguido de un 1 o un 2
    \1  : referencia numérica, encuentra el mismo texto que en el primer grupo      \d{4}  : seguida de 4 dígitos     $ : cierre de la expresión regular   
*/

/* Validar el campo TELEFONO utilizando una expresión regular.Debe permitir 9 dígitos obligatorios.Si se produce algún error crear un objeto
CampoErroneo con las propiedades correspondientes y, añadirlo al array de errores.Explicar las partes de la expresión regular mediante comentarios. */
function compruebaTelef() {
    let expTelef = /^[0-9]+$/;   //para crear una expresión regular, debemos crear un patrón encerrado entre barras /xxx/; ^ marca el comienzo de la entrada, y $ marca el final de la entrada.En el nuestro, estamos obligando a que el campo sea únicamente cifras.[0 - 9] indica que solo acepta caractéres del 0 al 9. + indica que los caractéres del 0 al 9 pueden repetirse en cualquier orden.
    if (!expTelef.test(document.getElementById("telefono").value)) {  
        CampoErroneo.campo = "Error en campo teléfono, deben ser solo números.";
        errores.push(CampoErroneo.campo);
    } else if (document.getElementById("telefono").value.length !== 9) {  //que su valor sea de 9 caracteres
        CampoErroneo.campo = "Error en campo teléfono, deben ser 9 caracteres..";
        errores.push(CampoErroneo.campo);
    } else {
        datosFormulario.telef = document.getElementById("telefono").value;
    }
}	     

/* Pedir confirmación de envío del formulario.Si se confirma el envío mostrará en el contenedor con id datos del documento el valor
de los campos del formulario(excepto los botones), de la forma campo: valor, en otro caso cancelará el envío. */
function confirmar() {
    if (errores.length == 0) {
        if (confirm("¿Desea ver los datos registrados?")) {
          muestraDatos();
        } else {
            return false;
      }
    }
}

/* Botón limpiar: borrará los datos del formulario y de los contenedores del documento(intentos, errores y datos) */
function limpiar() {
    document.getElementById("formulario").reset();
}

