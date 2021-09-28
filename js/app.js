const main = document.querySelector('main')
const form = document.querySelector('form')
const input = document.querySelectorAll('input')
// Função responsavel por criar os cards
form.onsubmit = (event) => {
    event.preventDefault()

    // Div col
    const divCol = document.createElement('div')
    divCol.setAttribute('class', 'col')

    // Elemento ancora
    const a = document.createElement('a')
    a.setAttribute('href', '#')
    a.setAttribute('class', 'text-decoration-none')

    divCol.appendChild(a)

    // Div Card
    const divCard = document.createElement('div')
    divCard.setAttribute('class', 'card h-100 text-center')

    a.appendChild(divCard)

    // Url
    divCard.innerHTML += `<div class="cardImg"><img src="${input[1].value}" class="card-img-top p-2"></div>`
    // Title
    divCard.innerHTML += `<div><h5>${input[0].value}</h5></div>`

    // DIV Stars
    const divStars = document.createElement('div')
    divStars.setAttribute('class', 'stars mb-2')

    //Stars gerar estrelas
    divCard.appendChild(divStars)
    for (let i = 0; i < input[5].value; i++) {
        divStars.innerHTML += `<img src="imgs/star.png" class="img-fluid" alt=""> `
    }
    // Valores dos inputs
    divCard.innerHTML += `<div>
    <div class="de">De: R$ ${parseFloat(input[2].value).toLocaleString()}</div>
    <div class="por">Por: R$ ${parseFloat(input[3].value).toLocaleString()}</div>
    <div class="parc">${input[4].value}x de R$ ${parseFloat(input[3].value / input[4].value).toFixed(2)} s/ juros</div>
    </div>`
    // Card pronto para ser inserido na main
    main.appendChild(divCol)
    // Limpar campos de formularios no final da operação
    form.reset()
}
// Função validar entrada dos inputs
form.onchange = () => {

    for (let i = 0; i < input.length; i++) {
        const check = input[i].checkValidity()
        input[i].classList.remove('is-invalid'); input[i].classList.remove('is-valid')
        if (check && input[i].value != '') { input[i].classList.add('is-valid') }
        else if (!check && input[i].value != '') { input[i].classList.add('is-invalid') }
        else { input[i].classList.remove('is-invalid'); input[i].classList.remove('is-valid') }
    }
}
//  Função para eliminar validação quando os dados forem resetados
form.onreset = () => {
    for (let i = 0; i < input.length; i++) {
        input[i].classList.remove('is-invalid'); input[i].classList.remove('is-valid')
    }
}