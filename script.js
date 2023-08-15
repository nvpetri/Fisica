'use strict'

const botao1 = document.getElementById('botao')
const loadingIndicator = document.getElementById('loadingIndicator')
const customMessage = document.getElementById('customMessage')
const yesButton = document.getElementById('yesButton')
const noButton = document.getElementById('noButton')

botao1.addEventListener('click', function() {
    loadingIndicator.style.display = 'block'
        setTimeout(() => {
            window.location.href = './pag2/index2.html'
        }, 500)
})

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input')

    let searchTerm = ''
    let searchTimeout

    searchInput.addEventListener('input', function() {
        searchTerm = searchInput.value.trim()
        clearTimeout(searchTimeout)

        if (searchTerm === '') {
            removeHighlights()
            return
        }

        searchTimeout = setTimeout(searchHighlight, 5000)
    })

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            clearTimeout(searchTimeout)
            searchHighlight()
        }
    })

    async function searchHighlight() {
        const resultIndex1 = window.find(searchTerm, false, false, true, false, true, false)
        const resultIndex2 = await searchInIndex2(searchTerm)

        if (!resultIndex1 && !resultIndex2) {
            removeHighlights()
        } else if (resultIndex2) {
            customMessage.style.display = 'block'
        }
    }

    function removeHighlights() {
        const highlights = document.querySelectorAll('.highlight')
        highlights.forEach(highlight => {
            highlight.classList.remove('highlight')
        })
    }

    async function searchInIndex2(term) {
        const response = await fetch('index2.html')
        const html = await response.text()

        const tempElement = document.createElement('div')
        tempElement.innerHTML = html

        return tempElement.textContent.includes(term)
    }

    function redirectToIndex2() {
        loadingIndicator.style.display = 'block'
        setTimeout(() => {
            window.location.href = './pag2/index2.html'
        }, 500)
    }

    yesButton.addEventListener('click', function() {
        redirectToIndex2()
        customMessage.style.display = 'none'
    })

    noButton.addEventListener('click', function() {
        customMessage.style.display = 'none'
    })
})
