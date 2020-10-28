import React from 'react';

export const login = async(e) => {
    const usuario = document.querySelector(".usuario");
    const senha = document.querySelector(".senha");
    if(usuario.value != '' && senha.value != ''){
        const res = await fetch('https://bdpapiserver.com/login',{
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({usuario:usuario.value,senha:senha.value})
        });
        const json = await res.json();
        if(json.success){
            sessionStorage.setItem('token',json.token)
            window.location.reload()
        }else{
            console.log("Deu merda")
        }
    }else{
        console.log('falta alguma coisa')
    }
}

export const btnBusca = () => {
    let inputBusca = document.querySelector(".inputBusca-sm")
    let btnBusca = document.querySelector("#btnBusca")
    btnBusca.classList.toggle("btnBusca")
    inputBusca.classList.toggle("d-inline")
}

export const formataData = (data) => {
    let dia = data.slice(8,10);
    let mes = data.slice(5,7);
    let ano = data.slice(0,4);
    let dataFormated = dia + '/' + mes + '/' + ano
    return dataFormated
}

export const formataValorBr = (valor) => {
    const valorFormated = parseFloat(valor).toFixed(2).toString().replace(".",",")
    return valorFormated;
}

export const formataValor = (valor) => {
    const valorFormated = parseFloat(valor.replace(",",".")).toFixed(2);
    return valorFormated;
}

export const verificaNumeroInt = (alvo) => {

    if(Number.isInteger(parseInt(alvo.target.value.charAt(alvo.target.value.length -1)))){
        
    }else{
        alvo.target.value = alvo.target.value.substring(0,alvo.target.value.length -1);
    }
}