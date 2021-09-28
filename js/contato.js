const main = document.querySelector("main")
const modalButton = document.getElementById('modalButton')
const modalButtonSubmit = document.getElementById('modalButtonSubmit')

// COL Form
const divCol = document.createElement("div")
divCol.setAttribute('class', 'col')

// h3
const h3 = document.createElement("h3")
h3.setAttribute('class', 'mb-3')
h3.innerHTML = "ENVIE-NOS UMA MENSAGEM !"

divCol.appendChild(h3)

// form
const form = document.createElement("form")
form.setAttribute('class', 'form-floating')

divCol.appendChild(form)

// DIV name
const divName = document.createElement('div')
divName.setAttribute('class', 'form-floating mb-3')

const inputName = document.createElement('input')
inputName.setAttribute('type', 'text')
inputName.setAttribute('class', 'form-control')
inputName.setAttribute('placeholder', ' ')
inputName.setAttribute('required', true)

const labelName = document.createElement('label')
labelName.innerHTML = "Seu nome"

divName.appendChild(inputName)
divName.appendChild(labelName)

form.appendChild(divName)

// DIV Email
const divEmail = document.createElement('div')
divEmail.setAttribute('class', 'form-floating mb-3')

const inputEmail = document.createElement('input')
inputEmail.setAttribute('type', 'email')
inputEmail.setAttribute('class', 'form-control')
inputEmail.setAttribute('placeholder', ' ')
inputEmail.setAttribute('required', true)

const labelEmail = document.createElement('label')
labelEmail.innerHTML = "Endereço de e-mail"

divEmail.appendChild(inputEmail)
divEmail.appendChild(labelEmail)

form.appendChild(divEmail)

// DIV Assunto
const divAssunto = document.createElement('div')
divAssunto.setAttribute('class', 'form-floating mb-3')

const inputAssunto = document.createElement('input')
inputAssunto.setAttribute('type', 'text')
inputAssunto.setAttribute('class', 'form-control')
inputAssunto.setAttribute('placeholder', ' ')
inputAssunto.setAttribute('required', true)

const labelAssunto = document.createElement('label')
labelAssunto.innerHTML = "Assunto da mensagem"

divAssunto.appendChild(inputAssunto)
divAssunto.appendChild(labelAssunto)

form.appendChild(divAssunto)

// DIV Menssagem
const divTextArea = document.createElement('div')
divTextArea.setAttribute('class', 'form-floating mb-3')

const textArea = document.createElement('textarea')
textArea.setAttribute('class', 'form-control')
textArea.setAttribute('style', 'height: 100px;')
textArea.setAttribute('placeholder', ' ')
textArea.setAttribute('required', true)

const labelTextArea = document.createElement('label')
labelTextArea.innerHTML = 'Escreva sua mensagem'

divTextArea.appendChild(textArea)
divTextArea.appendChild(labelTextArea)

form.appendChild(divTextArea)

// DIV Button
const divButton = document.createElement('div')

const buttonReset = document.createElement('button')
buttonReset.setAttribute('type', 'reset')
buttonReset.setAttribute('class', 'btn btn-secondary me-2')
buttonReset.innerHTML = 'Reset'

const buttonSubmit = document.createElement('button')
buttonSubmit.setAttribute('type', 'submit')
buttonSubmit.setAttribute('class', 'btn btn-primary')
buttonSubmit.innerHTML = 'Submit'

divButton.appendChild(buttonReset)
divButton.appendChild(buttonSubmit)

form.appendChild(divButton)

main.appendChild(divCol)

const input = document.querySelectorAll('input')
// Função validar entrada
form.onchange = () => {

    for (let i = 0; i < input.length; i++) {
        const check = input[i].checkValidity()
        input[i].classList.remove('is-invalid'); input[i].classList.remove('is-valid')
        if (check && input[i].value != '') { input[i].classList.add('is-valid') }
        else if (!check && input[i].value != '') { input[i].classList.add('is-invalid') }
        else { input[i].classList.remove('is-invalid'); input[i].classList.remove('is-valid') }
    }
}
//  Função Form ONSUBMIT abrir modal de menssagem enviada
form.onsubmit = (event) => {
    event.preventDefault()

    modalButton.click()
    form.reset()
}
//  Função para eliminar validação quando os dados forem resetados
form.onreset = () => {
    for (let i = 0; i < input.length; i++) {
        input[i].classList.remove('is-invalid'); input[i].classList.remove('is-valid')
    }
}
// Função redirecionar página pra a principal por meio do modal
modalButtonSubmit.onclick = () => {
    window.location.href = './index.html'
}