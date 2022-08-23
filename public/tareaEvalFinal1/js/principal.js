    /* Al cargar la página*/
    // añadir los posts de la variable posts al contenedor #posts
    // Sugerencias: 
    // cada post en una etiqueta article con clase "post"
    // class button-more para el enlace  "Leer más"
    // span con clase "date" para la fecha del post
    // p: para el contenido del post

window.addEventListener("load", meteDatos, false);
let peticion;
function meteDatos(){
    peticion = new XMLHttpRequest();
    peticion.open('GET', "http://localhost:8181/tarea/post.json", true);
    peticion.send();
    //peticion.addEventListener("load", cargada);
    peticion.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
       //     console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            publicaciones = document.getElementById("posts");
       //     console.log(datos);

            for (let item of datos) {
                console.log(item.titulo);   //para comprobar con f12
                //creamos los post
                var post = document.createElement("post"); // Crea un elemento articulo
                post.className = "post";
                publicaciones.appendChild(post);
                //título
                var titulo = document.createElement("h2"); // Crea un elemento articulo
                var dentro = document.createTextNode(item.title);
                titulo.appendChild(dentro);
                post.appendChild(titulo);
                //fecha:
                var span = document.createElement("date"); // Crea un elemento span
                span.className = "date";
                let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                n = new Date();
                //Año
                y = n.getFullYear();
                //Mes
                m = n.getMonth();
                //Día
                d = n.getDate();
                //     var interior2 = fechasPosts[0] + d + " de " + meses[m] + " de " + y;
                var interior = document.createTextNode(item.date + d + " de " + meses[m] + " de " + y);
                span.appendChild(interior); // añade el span al artículo
                post.appendChild(span);
                //contenido:       
                var nuevoParrafo = document.createElement("p");
                nuevoParrafo.className = "p";
                var nuevoTexto = document.createTextNode(item.content);
                nuevoParrafo.appendChild(nuevoTexto);
                post.appendChild(nuevoParrafo);
                //botón
                var botonMas = document.createElement('button');
                botonMas.type = "button";
                botonMas.className = "button-more";
                var botondentro = document.createTextNode("Leer más");
                botonMas.appendChild(botondentro);
                post.appendChild(botonMas);
            }
           
        }
    }
}

    // Selector de tema, por defecto está cargado el tema invierno (invierno.css)
    window.addEventListener("load", cambioEstilo);

    function cambioEstilo() {
        //Para la pestaña inicio:
        document.getElementById("primavera").addEventListener("click", primav);
        document.getElementById("verano").addEventListener("click", veran);
        document.getElementById("otono").addEventListener("click", oton);
        document.getElementById("invierno").addEventListener("click", inv);

        function primav() {
            document.getElementById("tema").href = "./css/primavera.css";
        }
        function veran() {
            document.getElementById("tema").href = "./css/verano.css";
        }
        function oton() {
            document.getElementById("tema").href = "./css/otono.css";
        }
        function inv() {
            document.getElementById("tema").href = "./css/invierno.css";
        }
    }

    window.addEventListener("load", entra_localstorage);

    function entra_localstorage() {
        leerLocalStorage();
        document.getElementById("entrar").addEventListener("click", escribirLocalStorage);
    }

    function escribirLocalStorage() {      
        //Comprobamos si podemos utilizar en el navegador, localStorage y JSON */
        if (typeof localStorage != "undefined" && JSON) {
            //Definimos el objeto
            var datos = {
                nombre: document.getElementById("nombre").value,
                password: document.getElementById("password").value,
                email: document.getElementById("email").value
            };
            //Convertimos un objeto o valor de JavaScript, en una cadena de texto JSON con stringify
            localStorage.setItem("identidad", JSON.stringify(datos));
            //Nos avisa de los datos almacenados
            alert(`Datos almacenados: ${JSON.stringify(datos)}`);
            var texto = "Bienvenido , " + datos.nombre;
            var textoNegrita = texto.bold();
            // Actualizamos con el innerHTML
            document.getElementById("login").innerHTML = textoNegrita + " " + "<span id='cierre'><a href = ''>cerrar sesión</a></span>";
            //Creamos evento asociado
            document.getElementById("cierre").addEventListener("click", eliminarLocalStorage);
        } else {
            //En caso que el navegador no soporte localStorage, nos envía un mensaje de error
            alert("localStorage no está soportado");
        }
    }
        
    function eliminarLocalStorage() {
        //avisamos del cierre de sesión y los datos perdidos del localStorage
        alert("se ha cerrado la sesión de " + localStorage.getItem("identidad"));
        localStorage.removeItem("identidad");
        localStorage.clear();     // borra todo
    }

    function leerLocalStorage() {
        let datos; 
        // comprobamos si hay datos almacenados
        if (typeof localStorage != "undefined" && JSON) {
        
            if (localStorage.getItem('identidad') !== undefined && localStorage.getItem('identidad')) {
                /* Deserialización del objeto JSON leído */
                datos = JSON.parse(localStorage.getItem("identidad"));
                            
                document.getElementById("nombre").value = datos.nombre;
                document.getElementById("password").value = datos.password;
                document.getElementById("email").value = datos.email;
                //Para comprobar con f12 en el navegador
                console.log("Lectura desde localStorage realizada");
                var texto2 = "Bienvenido de nuevo, " + datos.nombre;
                var textoNegrita2 = texto2.bold();
                // Actualizamos con el innerHTML
                document.getElementById("login").innerHTML = textoNegrita2 + " " + "<span id='cierre'><a href = ''>cerrar sesión</a></span>";
                //Creamos evento asociado
                document.getElementById("cierre").addEventListener("click", eliminarLocalStorage);
            }
        } else {
            //En caso que el navegador no soporte localStorage, nos envía un mensaje de error
            alert("localStorage no está soportado");
        }
    }

window.addEventListener("load", formular);

function formular() {
    document.getElementById("env").addEventListener("click", enviaDatos);
    document.getElementById("otros").addEventListener("click", otros);
    
    function otros() {

        if (document.getElementById("otros").checked) {
            document.getElementById("otrosIntereses").style.visibility = "visible";
            if (document.getElementById("otrosIntereses").value.trim() == 0) {
                CampoErroneo.campo = " Error en el campo otros, debe escribir cuáles ";
            errores.push(CampoErroneo.campo);
            } 
        }
    }

    function enviaDatos() {
        class CampoErroneo {
            campo;
            mensaxe;
            constructor(campo, mensaxe) {
                this.campo = campo;
                this.mensaxe = mensaxe;
            }
        }
        let errores = [];
        comprobaciones();
        muestraErrores();
        if (errores.length == 0) {
                    alert("Formulario completado correctamente, se procede a recopilar sus datos.");
                }
        

        function comprobaciones() {
            compruebaNombre();
            compruebaAp();
            compruebaMail();
            confirMail();
            compruebaCp();            
            }
        
        function muestraErrores() {
            for (let x in errores) {
                let tx = "error " + ` ${x}: ${errores[x]}` + "<br/>";
                alert(tx);     //importantísimo el + 
            }
        }

        /* Realizar una función que valide el campo NOMBRE, comprobar que tiene contenido, y, no solo espacios en blanco.Si se produce algún error
        crear un objeto CampoErroneo con las propiedades correspondientes y, añadirlo al array de errores. */
        function compruebaNombre() {
            if (document.getElementById("nombref").value.trim() == 0) {
                CampoErroneo.campo = " Error en el nombre, debe rellenarse ";
                errores.push(CampoErroneo.campo);
            } else {
                console.log(document.getElementById("nombref").value);     
            }
        }

        function compruebaAp() {
            if (document.getElementById("apellidosf").value.trim() == 0) {
                CampoErroneo.campo = " Error en el apellido, debe rellenarse ";
                errores.push(CampoErroneo.campo);
            } else {
                console.log(document.getElementById("apellidosf").value);     
            }
        }

        function compruebaMail() {
            let expMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
            if (document.getElementById("emailf").value.trim() == 0) {
                CampoErroneo.campo = "Error en el mail, está vacío";
                errores.push(CampoErroneo.campo);
            } else if (!expMail.test(document.getElementById("emailf").value)) {
                CampoErroneo.campo = "Error en el mail, por favor, revíselo";
                errores.push(CampoErroneo.campo);
            } else {
                console.log(document.getElementById("emailf").value);
            }
        }

        function confirMail() {
            if (document.getElementById("emailf").value !== document.getElementById("confEmail").value) {
                CampoErroneo.campo = "El mail debe ser el mismo";
                errores.push(CampoErroneo.campo);
            } 
        }

        function compruebaCp() {
            let val = document.getElementById("cp").value.toString().length;
            if (val !== 5) {
                CampoErroneo.campo = " Error en el CP, debe constar de 5 dígitos ";
                errores.push(CampoErroneo.campo);
            } else {
                console.log(document.getElementById("cp").value);     
            }
        }

        
    }
}