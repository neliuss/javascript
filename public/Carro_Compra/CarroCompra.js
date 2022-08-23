window.onload = function () {
    mostrarProdutos();
    mostrarCarro();
    document.getElementById('carro').setAttribute('style', 'display : none');
    document.getElementById('totalCompra').setAttribute('style', 'display : none');
}
class Produto {
    constructor(id, nome = 'sen nome', prezo = 0, imaxen, stock = 0) {
        this.id = id;
        this.nome = nome;
        this.prezo = prezo;
        this.imaxen = imaxen;
        this.stock = stock
    }
    setStock(stock) {
        this.stock = stock
    }
}
const Produtos = [];
Produtos.push(new Produto(1, 'Patata', 0.95, './imagenes/patata.jpg', 2));
Produtos.push(new Produto(2, 'cebola', 1.5, './imagenes/cebola.jpg', 5));
Produtos.push(new Produto(3, 'cabaciña', 1.25, './imagenes/cabaciña.jpg', 4));
Produtos.push(new Produto(4, 'Grelos', 2.6, './imagenes/grelos.jpg', 2));
//Produtos.push(new Produto(5, 'Tomates', 1.35, './imagenes/tomates.jpg', 2));
let carro = []; // array para almacenar os Produtos que imos mercando: [id produto, cantidade].
let total = 0;    // Total lista da compra: suma de todos os artigos
function mostrarProdutos() {
    let x = 0; //Contador para crear nome ó fila da taboa.
    let taboaProdutos = `<table>`; //Creamos a taboa de produtos.
    taboaProdutos +=
        `<tr>
                <td>Nome</td>
                <td>Descripción</td>
                <td>Prezo</td>
                <td>Engadir</td>`;
    for (let Produto of Produtos) {
        // Estructura creamos unha nova fila con catro columnas para mostrar o nome do Produto, imaxen, prezo e botón engadir.  
        taboaProdutos +=
            `<tr>`;
        // Columna nome
        taboaProdutos +=
            `<td> ${Produto.nome}</td>`;
        // Imaxen
        taboaProdutos +=
            `<td style='text-align: center'><img width='40' height='40' src='${Produto.imaxen}'></td>`;
        // Prezo
        taboaProdutos +=
            `<td style='text-align: center'> ${Produto.prezo.toFixed(2)}€</td>`;
        // Botón
        taboaProdutos +=
            `<td style='text-align: center'><input type='button' name = ${x} id=${Produto.nome.toUpperCase()} value='+'></td>`;// Botón con nome e id.
        // Pechamos fila
        taboaProdutos +=
            `</tr>`;
        x+=1 //Contador fila para nome botón.
    }
    taboaProdutos += `</table>`;
    // Unha vez chea a taboa a pechamos e a incluimos no documento.
    document.getElementById('lista').innerHTML += taboaProdutos;
    for (let Produto of Produtos)  { //Creamos o eventos dos botóns cos escoitaEventos con cada produto...
        document.getElementById(Produto.nome.toUpperCase()).addEventListener('click', engadirProduto);
        if (Produto.stock == 0) { //Comproba o stock en caso de cero dehabilita o botón.
            document.getElementById(Produto.nome.toUpperCase()).disabled = true;
        }
    }
}
function mostrarCarro() {
    let divTaboaCarro = document.createElement('div'); //Creamos un div novo,
    divTaboaCarro.setAttribute('id', 'dTC'); //co id dTC.
    document.getElementById("carro").appendChild(divTaboaCarro); //Dependente de elemento id 'carro'.
    let taboaCarro = ''; //Creamos a taboa do carro.
    taboaCarro = `<table>`;
    taboaCarro +=
        `<thead>
            <tr>
                <td>Nome</td>
                <td>Descripción</td>
                <td>Prezo</td>
                <td>Cant.</td>
                <td>Total</td>
            </tr>
        </thead>`;
    for (x of carro) {
        // Estructura creamos unha nova fila con cinco columnas para mostrar nome do Produto, imaxen, prezo, cantidade e botón reducir, e total.
        taboaCarro +=
            `<tbody>
                    <tr>`;
        // Columna nome
        taboaCarro +=
            `<td> ${Produtos[x[0]].nome}</td>`;
        //console.log(x);
        //console.log(Produtos[x[0]]);
        // Imaxen
        taboaCarro +=
            `<td><img width='40' height='40' src='${Produtos[x[0]].imaxen}'></td>`;
        // Prezo
        taboaCarro +=
            `<td style='text-align: right'> ${(Produtos[x[0]].prezo).toFixed(2)}€</td>`;
        // Cantidade
        taboaCarro +=
            `<td style='text-align: center'>${[x[1]]} <input type='button' name =${Produtos[x[0]].id-1} id=${Produtos[x[0]].nome.toLowerCase()} value='-'></td>`; //Botón
        // Total
        taboaCarro +=
            `<td style='text-align: right'>${([x[1]] * Produtos[x[0]].prezo).toFixed(2)}€</td>`;
        // Pechamos fila
        taboaCarro +=
            `</tr>
                </tbody>`;
    }
    taboaCarro +=
        `<tfoot>
                    <tr>
                        <td colspan = '4'>Suma Total</td>
                        <td>${total.toFixed(2)}€</td>
                    </tr>
                </tfoot>`;
    taboaCarro +=
        `</table>`;
    // Unha vez chea a taboa a pechamos e a incluimos no documento.
    document.getElementById('dTC').innerHTML += taboaCarro;
    for (x of carro) { //Creamos os escoitaEventos para os botóns restar.
        document.getElementById(Produtos[x[0]].nome.toLowerCase()).addEventListener('click', restarProduto);
    }
}
function engadirProduto(evento) {
    let senProduto = true;
    for (let x of carro) { //Percorre o carro para buscar o produto para engadir unha unidade, en caso de non existir activamos senProduto.
        if (x[0] == evento.target.name) {
            x[1] += 1; // Sumamos un produto ó noso carro que xa teñamos.
            Produtos[evento.target.name].setStock(Produtos[evento.target.name].stock - 1);
            if (Produtos[evento.target.name].stock == 0) {
                document.getElementById(evento.target.id.toUpperCase()).disabled = true;
            }
            //console.log(Produtos)
            senProduto = false;
            break;
        }
    }
    if (senProduto) {
        carro.push([Number(evento.target.name), 1]); // Engadimos un Produto ó noso carro que non teñamos.       
        Produtos[evento.target.name].setStock(Produtos[evento.target.name].stock - 1);
    }
    //console.log(carro);
    calcularTotal();
    //console.log(document.getElementById('dTC').childNodes[0]); //Localizo o fillo do div id = dTC.
    document.getElementById('dTC').removeChild(document.getElementById('dTC').childNodes[0]); //Mato o fillo.
    mostrarCarro();
}
function restarProduto(evento) {
    let senProduto = false;
    let pC = 0; //Posición na lista do carro, para borrar en caso de 0.
    for (let x of carro) {
        if (x[0] == Number(evento.target.name)) {
            x[1] -= 1; // Restamos un produto ó noso carro.
            Produtos[evento.target.name].setStock(Produtos[evento.target.name].stock + 1);
            document.getElementById(evento.target.id.toUpperCase()).disabled = false;
            if (x[1] == 0)  {
                senProduto = true;
            }
            break;
        }
        pC += 1;
    }
    if (senProduto) {
        carro.splice(pC, 1); // Borramos o Produto do noso carro.        
    }           //console.log(carro);
    calcularTotal();
    //console.log(document.getElementById('dTC').childNodes[0]); //Localizo o fillo do div id = dTC.
    document.getElementById('dTC').removeChild(document.getElementById('dTC').childNodes[0]); //Mato o fillo.
    mostrarCarro();
}
function calcularTotal() {
    if (document.getElementById('pTP') != null) {
        console.log(document.getElementById('pTP').childNodes[0]);
        document.getElementById('pTP').removeChild(document.getElementById('pTP').childNodes[0]); //Mato o fillo.
    }
    // Calculo o total: busco o elemento no array Producto para saber o prezo do artigo.
    // Recorremos el array del carro.
    let carroTotal = carro.map(cT => Produtos[cT[0]].prezo * cT[1]); //cT[0] 1º posición carro=Productos.id. Localizado o Producto accedo o prezo. CT[1] 
    //2º posición carro=Cantidade: Prezo*Cantidade prezo da liña do carro
    //console.log(carroTotal.length);
    if (carroTotal.length != 0) {
        total = carroTotal.reduce(function (acumulador, actual, indice) {
            //console.log(`Valor anterior: ${(acumulador)} \nValor actual: ${actual} \nÍndice o iteración del bucle: ${indice + 1}`);
            return acumulador += actual;
        })
    } else total = 0;
    console.log(`Suma total: ${total.toFixed(2)}€`)
    // actualizamos el total en el carro. Recuperamos la etiqueta toalCompra.....
    let pTP = document.createElement('p'); //Creamos un <p> novo,
    pTP.setAttribute('id', 'pTP'); //co id dTC.
    document.getElementById("totalCompra").appendChild(pTP); //Dependente de elemento id 'totalCompra'.
    document.getElementById('pTP').appendChild(document.createTextNode(`Suma total: ${total.toFixed(2)}€`));  
    if (total == 0) {
        document.getElementById('carro').setAttribute('style', 'display : none');
        document.getElementById('totalCompra').setAttribute('style', 'display : none');
    } else {
        document.getElementById('carro').setAttribute('style', 'display : inline');
        document.getElementById('totalCompra').setAttribute('style', 'display : inline');
    }
}