/* var posts = [
        {
            titulo: 'Prueba de titulo 1',
            fecha: 'Publicado el dia ',
            contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada erat, ac ullamcorper justo. Fusce sapien nibh, tempor fermentum mauris ac, tincidunt maximus diam. Quisque bibendum sed dui sit amet euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quam sem, scelerisque sit amet libero nec, congue blandit dolor. Aliquam a vehicula mi. Morbi id convallis dolor. Nulla eu libero nec nulla fermentum viverra quis at magna. Quisque rutrum augue nulla, bibendum viverra sapien viverra vel. Quisque malesuada ultrices felis eu porttitor.'
        },
        {
            titulo: 'Prueba de titulo 2',
            fecha: 'Publicado el dia ',
            contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada erat, ac ullamcorper justo. Fusce sapien nibh, tempor fermentum mauris ac, tincidunt maximus diam. Quisque bibendum sed dui sit amet euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quam sem, scelerisque sit amet libero nec, congue blandit dolor. Aliquam a vehicula mi. Morbi id convallis dolor. Nulla eu libero nec nulla fermentum viverra quis at magna. Quisque rutrum augue nulla, bibendum viverra sapien viverra vel. Quisque malesuada ultrices felis eu porttitor.'
        },
        {
            titulo: 'Prueba de titulo 3',
            fecha: 'Publicado el dia ',
            contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada erat, ac ullamcorper justo. Fusce sapien nibh, tempor fermentum mauris ac, tincidunt maximus diam. Quisque bibendum sed dui sit amet euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quam sem, scelerisque sit amet libero nec, congue blandit dolor. Aliquam a vehicula mi. Morbi id convallis dolor. Nulla eu libero nec nulla fermentum viverra quis at magna. Quisque rutrum augue nulla, bibendum viverra sapien viverra vel. Quisque malesuada ultrices felis eu porttitor.'
        },
        {
            titulo: 'Prueba de titulo 4',
            fecha: 'Publicado el dia',
            contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada erat, ac ullamcorper justo. Fusce sapien nibh, tempor fermentum mauris ac, tincidunt maximus diam. Quisque bibendum sed dui sit amet euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quam sem, scelerisque sit amet libero nec, congue blandit dolor. Aliquam a vehicula mi. Morbi id convallis dolor. Nulla eu libero nec nulla fermentum viverra quis at magna. Quisque rutrum augue nulla, bibendum viverra sapien viverra vel. Quisque malesuada ultrices felis eu porttitor.'
        },
        {
            titulo: 'Prueba de titulo 5',
            fecha: 'Publicado el dia',
            contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada erat, ac ullamcorper justo. Fusce sapien nibh, tempor fermentum mauris ac, tincidunt maximus diam. Quisque bibendum sed dui sit amet euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quam sem, scelerisque sit amet libero nec, congue blandit dolor. Aliquam a vehicula mi. Morbi id convallis dolor. Nulla eu libero nec nulla fermentum viverra quis at magna. Quisque rutrum augue nulla, bibendum viverra sapien viverra vel. Quisque malesuada ultrices felis eu porttitor.'
        },
        {
            titulo: 'Prueba de titulo 6',
            fecha: 'Publicado el dia' ,
            contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada erat, ac ullamcorper justo. Fusce sapien nibh, tempor fermentum mauris ac, tincidunt maximus diam. Quisque bibendum sed dui sit amet euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quam sem, scelerisque sit amet libero nec, congue blandit dolor. Aliquam a vehicula mi. Morbi id convallis dolor. Nulla eu libero nec nulla fermentum viverra quis at magna. Quisque rutrum augue nulla, bibendum viverra sapien viverra vel. Quisque malesuada ultrices felis eu porttitor.'
        },
]; */
window.addEventListener("load", meteDatos, false);
let peticion;

function meteDatos(){
    peticion = new XMLHttpRequest();
    peticion.open('GET', "http://localhost:8181/tarea/post.json", true);
    peticion.send();
    //peticion.addEventListener("load", cargada);
    peticion.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            console.log(datos);

            for (let item of datos) {
                console.log(item.titulo);
                //              let posts = document.getElementById("posts");
                //               posts.innerHTML +=
                //creamos los post
                var post = document.createElement("post"); // Crea un elemento articulo
                post.className = "post";
                publicaciones.appendChild(post);
                //título
                var titulo = document.createElement("h2"); // Crea un elemento articulo
                var dentro = document.createTextNode(item.titulo);
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
    /* 
    const cargada = () => {
        let resultados = '';
        let cds = JSON.parse(peticion.responseText);
        resultados += '<ul>';
        for (let i = 0; i < cds.length; i++) {
            resultados += `<li><b>CD nº: ${i + 1}</b><ul>`;
            resultados += `<li><b>Título:</b> ${cds[i].titulo}</li>`;
            resultados += `<li><b>Artista:</b> ${cds[i].fecha}</li>`;
    
            resultados += `</li></ul>`;
        }
        resultados += '</ul>';
    
        document.getElementById("posts").innerHTML = resultados;
    }
    
     */

    /* Al cargar la página*/
    // añadir los posts de la variable posts al contenedor #posts
    // Sugerencias: 
    // cada post en una etiqueta article con clase "post"
    // class button-more para el enlace  "Leer más"
    // span con clase "date" para la fecha del post
    // p: para el contenido del post

    //window.addEventListener("load", metePost);

    /* function metePost() {
    
        let titulosPosts = posts.map(function (a) {
            let z = {};
            z = a.titulo;
            return z;
        });    console.log(titulosPosts);
        let fechasPosts = posts.map(function (b) {
            let y = {};
            y = b.fecha;
            return y;
        });    console.log(fechasPosts);
        let contenidosPosts = posts.map(function (c) {
            let x = {};
            x = c.contenido;
            return x;
        });    console.log(contenidosPosts);
        
        publicaciones = document.getElementById("posts");
    
        for (var i = 0; i < posts.length; i++) {
    //creamos los post
            var post = document.createElement("post"); // Crea un elemento articulo
            post.className = "post";
            publicaciones.appendChild(post);
    //título
            var titulo = document.createElement("h2"); // Crea un elemento articulo
            var dentro = document.createTextNode(titulosPosts[i]);
            titulo.appendChild(dentro);
            post.appendChild(titulo);
    //fecha:
            var span = document.createElement("date"); // Crea un elemento span
            span.className= "date";
            let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            n = new Date();
            //Año
            y = n.getFullYear();
            //Mes
            m = n.getMonth();
            //Día
            d = n.getDate();  
       //     var interior2 = fechasPosts[0] + d + " de " + meses[m] + " de " + y;
            var interior = document.createTextNode(fechasPosts[i] + d + " de " + meses[m] + " de " + y);
            span.appendChild(interior); // añade el span al artículo
            post.appendChild(span);
     //contenido:       
            var nuevoParrafo = document.createElement("p");
            nuevoParrafo.className = "p";
            var nuevoTexto = document.createTextNode(contenidosPosts[i]);
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
    } */
    // Selector de tema
    // por defecto está cargado el tema invierno (invierno.css)
    window.addEventListener("load", cambioEstilo);

    function cambioEstilo() {
        //Para la pestaña inicio:
        document.getElementById("primavera").addEventListener("click", primav);
        document.getElementById("verano").addEventListener("click", veran);
        document.getElementById("otono").addEventListener("click", oton);
        document.getElementById("invierno").addEventListener("click", inv);
        //para la pestaña contacto:
/*         document.getElementById("primavera").addEventListener("click", primav2);
        document.getElementById("verano").addEventListener("click", veran2);
        document.getElementById("otono").addEventListener("click", oton2);
        document.getElementById("invierno").addEventListener("click", inv2); */
        //Para la pestaña inicio
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
        //Para la pestaña contacto:
        /*    function primav2() {
                document.getElementById("theme").href = "./css/primavera.css";
            }
            function veran2() {
                document.getElementById("theme").href = "./css/verano.css";
            }
            function oton2() {
                document.getElementById("theme").href = "./css/otono.css";
            }
            function inv2() {
                document.getElementById("theme").href = "./css/invierno.css";
            }*/
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