'use strict'

const botao1 = document.getElementById('botao')
const loadingIndicator = document.getElementById('loadingIndicator')

botao1.addEventListener('click', function(){

    loadingIndicator.style.display = 'block';

    setTimeout(() => {
        window.location.href = 'index2.html';
    }, 500); 
})
