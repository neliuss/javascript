window.addEventListener("load", creaTabla);
var eligeColor;
var pincel = false;

function creaTabla() {
		var tablearea = document.getElementById('zonadibujo');
	    table = document.createElement('table');	//creamos table y especificamos su className
	    table.className='tablerodibujo';

	for (var i = 0; i < 29; i++) {
	    var tr = document.createElement('tr');
	    for(var j = 0; j < 29; j++){
	    	var td = document.createElement('td');
			td.classList.add('color6');	//para que nos salga todo en blanco, si seleccionáramos el primero, saldría todo pintado de amarillo
			td.addEventListener('mouseover', pinta, false);
	    	td.style.border ="1px solid #000";	//creamos los bordes de las celdas, sino estarían pero no se percibirían
			tr.appendChild(td); //Agregamos un nuevo nodo (td), al final de la lista de tr.
	    }
	    table.appendChild(tr);
	}

	table.addEventListener('mousedown', activarPintar, false);
	tablearea.appendChild(table);

	document.getElementById("pincel").childNodes[0].nodeValue = cambiarEstadoPincel(pincel);	//nos indica el estado del pincel, y lo usamos en la función para cambiar su valor/estado

	 //creamos el evento para la primera casilla/celda, gracias a la función casilla(más abajo)
	eligeColor = document.getElementById("paleta").getElementsByTagName('tr')[0].getElementsByTagName('td');
	for (var i = 0; i < eligeColor.length; i++) {
		casilla(eligeColor[i], true);
	 }
}

function casilla(objeto) {
	objeto.addEventListener('click', seleccionaColor, false);	
}

//que nos muestre, según el estado del pincel, si éste está o no activado 
function cambiarEstadoPincel(estado) {
	if (estado) {
		return document.getElementById("pincel").innerHTML = "PINCEL ACTIVADO";
	} else {
		return document.getElementById("pincel").innerHTML = "PINCEL DESACTIVADO";
	}
}

function seleccionaColor() {
	//Reemplazamos el elemento seleccionado
	for (var i = 0; i < 6; i++)	{
		eligeColor[i].className = eligeColor[i].className.replace(" seleccionado", "");//las segundas "", es pq sino, se solapan los colores, y se reemplazan entre ellos
	}	
	//selecciono el color donde hacemos click
	this.className = this.className + " seleccionado";
}

function activarPintar() {
	pincel = !pincel;	//sino, no colorea, aparece desactivado
	document.getElementById("pincel").childNodes[0].nodeValue = cambiarEstadoPincel(pincel);
}

function pinta() {
	if (pincel) {
		var color = document.querySelectorAll(".seleccionado")[0];   //Devuelve la lista de "seleccionados", quedándonos con el primero de la lista
		var colorActual = color.className.replace(" seleccionado", "");	//Reemplazamos
		this.className = colorActual;
	}
}
