let amigos=[];

let btnGuardar=document.querySelector("#btnGuardar");
let btnCancelar=document.querySelector("#btnCancelar");

let lista=document.querySelector(".listaAmigos");
let formulario=document.querySelector("#formulario");


function limpiar(){
    formulario[0].value="";
    formulario[1].value="";
    formulario[2].value="";
    formulario[3].value="";
}


btnCancelar.addEventListener("click",(event)=>{
    limpiar();
    event.preventDefault();
});

btnGuardar.addEventListener("click",(event)=>{
    if (formulario[0].value=="" || formulario[1].value=="" || formulario[2].value=="" || formulario[3].value=="") {
        let warning=document.getElementById("warning");
        warning.classList.remove("ocultowar");
        event.preventDefault();
    }

    else{
    let contacto={
        nombre:formulario["nombre"].value,
        telefono:formulario["telefono"].value,
        correo:formulario["correo"].value,
        foto:formulario["foto"].value,  
    } 
    amigos.push(contacto);
    limpiar();
    pintar();
    event.preventDefault();
    };
    
    
});


pintar();

function pintar(){
    if(amigos.length>0)
    {
        lista.innerHTML="";
        amigos.forEach((contacto, index)=>{
            let amigo=document.createElement("div");
            amigo.innerHTML=`<p>${contacto.nombre}</p><button class="muestraDetalles"><input type="hidden" value="${contacto.telefono}"/> Detalles</button> <button class="eliminarAmigo" indice="${index}"> Eliminar</button>`;
            lista.appendChild(amigo);
        });
        let botones=document.getElementsByClassName("muestraDetalles");
        for (let i= 0; i < botones.length; i++) {
            const element = botones[i];
            element.addEventListener("click",()=>{
                showDetalles(element.children[0].value);
            });
            
        }
        let eliminacion=document.getElementById("confirmarEliminacion");
        botones=document.getElementsByClassName("eliminarAmigo");
        for (let i= 0; i < botones.length; i++) {
            const element = botones[i];
            element.addEventListener("click",()=>{
                eliminacion.classList.remove("ocultoEliminacion");
                // amigos.splice(element.getAttribute("indice"),1);
                // pintar();
            });
        }
    }
    else{
        lista.innerHTML="<h2>No tenemos amigos</h2>";
    }
}

function showDetalles(tel){
    let detalles=document.getElementById("detallesAmigo");
    let amigo=amigos.find(a=>{
        if (a.telefono==tel) {
            return a;
        }
        
    });
        detalles.innerHTML=`<img src"${amigo.foto}">
        <h3>${amigo.nombre}</h3>
        <p><span>Telefono:</span>${amigo.telefono}</p>
        <p><span>Correo:</span>${amigo.correo}</p>
        <button id="btnCerrar" class="btnCerrar">Cerrar</button>`;
        detalles.classList.remove("oculto");
        cerrarDetalles();
}


function cerrarDetalles(){
    let btnCerrar=document.getElementById("btnCerrar");

    btnCerrar.addEventListener("click",(event)=>{
        let ventana=document.getElementById("detallesAmigo");
        ventana.classList.add("oculto");
        event.preventDefault();
    })
}
