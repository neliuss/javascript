$(document).ready(lerJson) //window.addEventListener('load', iniciar, false);
$posts = []; //posts = [];
class CampoErroneo {
    campo;
    mensaxe;
    constructor(campo, mensaxe) {
        this.campo = campo;
        this.mensaxe = mensaxe;
    }
}
$errores = [];
function lerJson() {
    $opciones={
        url: "post.json",
        type: "GET",
        dataType:"json"
    };
    $.ajax($opciones)
        .done(function(json){
            $posts = json.posts;
            console.log($posts);
            iniciar();            
        })
        .fail(function(xhr, status, errorThrown){
            console.log("Error: " +errorThrown);
            console.log("Estado; " +status)
        })
        .always(function (xhr, status) {
            console.log("Petición finalizada!!!")
        })
}
function iniciar() {
    selectorTema();
    content();
    leerLocalStorage();
   //$(input[type="submit"]).on('click', enviarFormulario); TERESITA
    $('#merda').on('click', enviarFormulario);
    $('#entrar').on('click', escribirLocalStorage);
}
function content() {
    $meses = new Array('xaneiro', 'febreiro', 'marzo', 'abril', 'maio', 'xuño', 'xullo', 'agosto', 'setembro', 'outubro', 'novembro', 'Decembro');
    $f = new Date();
    $data = ($f.getDate() + ' de ' + $meses[$f.getMonth()] + ' de ' + $f.getFullYear());
    console.log($data);
    console.log($posts);
    for (let i = 0; i < $posts.length; i++) {/*
        let $pTi = $('<h2></h2>'); //let pTi = document.createElement('h2');
        let $pDi = $('<h3></h3>'); //let pDi = document.createElement('h3');
        let $pPi = $('<p></p>');   //let pPi = document.createElement('p');
        $pTi.attr('id', 'pT' + i); //pPi.setAttribute('id', 'pP' + i);
        $pDi.attr('id', 'pD' + i); //pPi.setAttribute('id', 'pP' + i);
        $pPi.attr('id', 'pP' + i); //pPi.setAttribute('id', 'pP' + i);
        let idPosts = $('#posts');
        idPosts.append($pTi); //document.getElementById('posts').appendChild(pTi);
        idPosts.append($pDi); //document.getElementById('posts').appendChild(pDi);
        idPosts.append($pPi); //document.getElementById('posts').appendChild(pPi);
        document.getElementById('pT' + i).appendChild(document.createTextNode(`${posts[i].titulo}`));
        document.getElementById('pD' + i).appendChild(document.createTextNode(`${posts[i].fecha}`));
        document.getElementById('pP' + i).appendChild(document.createTextNode(`${posts[i].contenido}`));*/
        $('#posts').append($('<h2></h2>').text(`${$posts[i].titulo}`));
        $('#posts').append($('<p></p>').css('color','grey').text(`${$posts[i].fecha} ${$data}`)); 
        $('#posts').append($('<p></p>').css({
            'text-align': 'justify',
            'padding-top': '10px'
        }).text(`${$posts[i].contenido}`));
        $('#posts').append($('<input/>').addClass('button-more').attr({
            'type':'button',
            'value': 'Ler máis',
        }));
    }
}
function selectorTema() {
    $('#invierno').on('click', invierno)
    //document.getElementById('invierno').addEventListener('click', invierno)
    $('#primavera').on('click', primavera)
    //document.getElementById('primavera').addEventListener('click', primavera)
    $('#verano').on('click', verano)
    //document.getElementById('verano').addEventListener('click', verano)
    $('#otono').on('click', otono)
    //document.getElementById('otono').addEventListener('click', otono)
}
function invierno() {
    $('#tema').attr('href', './css/invierno.css')
    //document.getElementById('tema').setAttribute('href', './css/invierno.css')
}
function primavera() {
    $('#tema').attr('href', './css/primavera.css')
    //document.getElementById('tema').setAttribute('href', './css/primavera.css')
}
function verano() {
    $('#tema').attr('href', './css/verano.css')
    //document.getElementById('tema').setAttribute('href', './css/verano.css')
}
function otono() {
    $('#tema').attr('href', './css/otono.css')
    //document.getElementById('tema').setAttribute('href', './css/otono.css')
}
function escribirLocalStorage() {
    /* Verifica la posibilidad de usar localStorage y JSON */
    if (typeof localStorage != "undefined" && JSON) {
        /* Definición de un objeto Javascript datosPersona */
        $datosPersona = {
            nombre: $('#nombre').value, //document.getElementById("nombre").value,
            email: $('#email').value, //document.getElementById("email").value,
            password: $('#password').value //document.getElementById("password").value
        };
        /* Serialización en un objeto JSON de nombre identidad */
        localStorage.setItem("identidad", JSON.stringify($datosPersona));
        /* Visualización de control */
        //console.log(`Valor almacenado: ${JSON.stringify($datosPersona)}`);
    } else {
        /* Mensaje de error (sin posibilidad de almacén localStorage) */
        alert("localStorage no está soportado");
    }
}
function leerLocalStorage() {
    let datosPersona;
    /* Verifica la posibilidad de usar localStorage y JSON */
    if (typeof localStorage != "undefined" && JSON) {
        // comprobamos si hay datos almacenados
        if (localStorage.getItem('identidad') !== undefined && localStorage.getItem('identidad')) {
            /* Deserialización del objeto JSON leído */
            datosPersona = JSON.parse(localStorage.getItem("identidad"));
            // Actualización de los campos de visualización
            //console.log(datosPersona);
            //alert(`Nos alegramos de verte de nuevo ${datosPersona.nombre}`);
            document.getElementById("nombre").value = datosPersona.nombre;
            document.getElementById("email").value = datosPersona.email;
            document.getElementById("password").value = datosPersona.password;
            /* Visualización de control */
            //console.log("Lectura desde localStorage realizada");
        }
    } else {
        /* Mensaje de error (sin posibilidad de almacén localStorage) */
        alert("localStorage no está soportado");
    }
}
function enviarFormulario() { //Executamos ó premer o botón "Enviar". 
    $errores = []; nErr = 0;
    validarNombre();
    validarApell();
    validarEmail();
    validarEmail2();
    validarFecha();
    validarCP();
    //validarCondiciones();
    if (nErr == 0) {  //Todo correcto!!!
        if (confirm("quieres confirmar el envío?")) {
 //So se utiliza "datos" ne caso de todo correcto...
            alert('Feito!!!');
        } else {
            alert('Sen mandar')
        }
    } else { // Hai erros!!!
        let listaErrores = "";
        $errores.forEach(element => { listaErrores += `${element.mensaxe} <br>`; });
        alert(listaErrores);
    };
}
function validarNombre() { //Comproba que o campo "nombre" non esté valeiro...
    if (document.getElementById("nombref").value == "") {
        nErr += 1;
        $errores.push(new CampoErroneo("nombre", `${nErr}: O campo nome non pode estar en branco!!!`));
    }
}
function validarApell() { //Comproba que o campo "nombre" non esté valeiro...
    if (document.getElementById("apellidosf").value == "") {
        nErr += 1;
        $errores.push(new CampoErroneo("apellidosf", `${nErr}: O campo apellidos non pode estar en branco!!!`));
    }
}
function validarEmail() { //Valida o "email" (http://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=email)...
    var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; //Una implementación del Estandard Official: RFC 5322 (valida en el 99.99 % de los emails existentes).
    var emailOK = document.getElementById("emailf");
    var eOK = emailOK.value.match(re); //Devolve null se non cumpre a expresión regular "re"...
    if (!eOK) {
        console.log(emailOK.value + '  O campo E-mail non é correcto!!!');
        nErr += 1;
        $errores.push(new CampoErroneo("email", `${nErr}: O campo E-mail non é correcto!!!`))
    }/*else {
        console.log('Gracias, el email es ' + eOK[0]);
    }*/
}
function validarEmail2() { //Valida o "email" (http://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=email)...
    var emailOK = document.getElementById("emailf");
    var confemailOK = document.getElementById("confEmailf");
    if (emailOK.value != confemailOK.value) {
        eOK = null
    } else {
        eOK = !null
    }; //Devolve null se non cumpre a condición...
    console.log(eOK);
    if (!eOK) {
            console.error(confemailOK.value + '  O campo Confirmación e-mail non é correcto!!!');
        nErr += 1;
        $errores.push(new CampoErroneo("confemail", `${nErr}: O campo confe-mail non é correcto!!!`))
    }/*else {
        console.log('Gracias, el confirmar email es ' + eOK[0]);
    }*/
}
function validarFecha() {// Valida a data (http://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=fechas) "31/11/1967 :( "...
    var re = /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/;
    var fechaOK = document.getElementById("fechaf");
    var tOK = fechaOK.value.match(re); //Devolve null se non cumpre a expresión regular "re"...
    if (!tOK) {
        //console.log(fechaOK.value + ' O campo Fecha non é correcto. Formato dd/mm/aaaa ou dd-mm-aaaa!!!');
        nErr += 1;
        $errores.push(new CampoErroneo("fecha", `${nErr}: O campo Fecha non é correcto. Formato dd/mm/aaaa ou dd-mm-aaaa!!!`))
    } /*else {
        console.log('Gracias, a fecha es ' + tOK[0]);
    }*/
}
function validarCP() { //Valida o CP...
    var re = /^\d{5}$/;
    var cpOK = document.getElementById("cpf");
    var tOK = cpOK.value.match(re); //Devolve null se non cumpre a expresión regular "re"...
    if (!tOK) {
        //        console.error(telefonoOK.value + ' O C.P. está incorrecto. Só nº, e 9 díxitos!!!');
        nErr += 1;
        $errores.push(new CampoErroneo("CP", `${nErr}: O C.P. está incorrecto. Só nº e máx 5 díxitos!!!`))
    } /*else {
        console.log('Gracias, tu número de teléfono es ' + tOK[0]);
    }*/
}






















/* Al cargar la página*/
		// añadir los posts de la varaible posts al contenedor #posts
		// Sugerencias: 
		// cada post en una etiqueta article con clase 'post'
		// class button-more para el enlace  'Leer más'
		// span con clase 'date' para la fecha del post
		// p: para el contenido del post
		
	

	// Selector de tema
    // por defecto está cargado el tema invierno (invierno.css)