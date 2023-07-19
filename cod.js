let basket, basket_count, modal_shop
let tovar
let fio, email, index, address, tel, products, sum
const enumImg = {
    'Body plus': 'doctorem_body_plus__.png',
    'Omega Plus': 'doctorem_omega_plus_.png',
    'Epifiz Plus': 'doctorem_epifizplus_.png',
    'Thin Plus': 'doctorem_thinplus___.png',
    'Gin Plus': 'doctorem_gin.png',
    'Man Plus': 'doctorem_manplus____.png',
    'Woman Plus': 'doctorem_womanplus__.png',
    'Vita plus': 'doctorem_vitaplus___.png'
}

function onLoad() {
    basket = basket || document.querySelector('.basket')
    basket_count = basket_count || document.querySelector('.basket-count')
    modal_shop = modal_shop || document.querySelector('.modal-shop')
    products = products || document.querySelector('#products')
    sum = sum || document.querySelector('#sum')


    fio = fio || document.querySelector('#fio')
    email = email || document.querySelector('#email')
    index = index || document.querySelector('#index')
    address = address || document.querySelector('#address')
    tel = tel || document.querySelector('#tel')


    tovar = localStorage.getItem('TOVAR')
    tovar = JSON.parse(tovar)

    let summa = 0
    tovar.forEach(el => summa += el.count)
    showBasketCount(summa)
}

function closeShop() {
    modal_shop.style.opacity = '0'
    setTimeout(() => modal_shop.style.display = 'none', 500)
}

function openShop() {
    modal_shop.style.display = 'block'
    setTimeout(() => modal_shop.style.opacity = '1')
    let template = '';
    let summa = 0
    tovar.forEach(el => {
        template +=
            `<div class="product">
                <div class="quard">
                    <img src="img/${enumImg[el.name]}">
                </div>
                <b>${el.name}</b>
                <span>
                    <div class="minus">−</div>
                    ${el.count}
                    <div class="plus">+</div>
                </span>
                <span>
                    ${el.count * el.price} р.
                </span>
                <span>
                    <div class="crest" onclick="deleteElement('${el.name}')">⨉</div>
                </span>
            </div>`
        summa += el.count * el.price
    })


    products.innerHTML = template
    sum.innerHTML = `Сумма: ${summa} р.`


    if(!tovar.length)modal_shop.style.display = 'none'
}

function deleteElement(val) {
    tovar = tovar.filter(el => el.name != val)

    localStorage.setItem('TOVAR', JSON.stringify(tovar))
    onLoad()
    openShop()
}

function toBasket(val, price) {
    let exist = tovar && tovar.findIndex(el => el.name === val) + 1
    if (exist) {
        tovar[exist - 1].count = tovar[exist - 1].count + 1
    } else {
        if (!tovar) tovar = []
        tovar.push({name: val, price: price, count: 1})
    }

    localStorage.setItem('TOVAR', JSON.stringify(tovar))
    onLoad()
}


function showBasketCount(count = 0) {
    if (!count) return basket.style.display = 'none'
    basket.style.display = 'block'
    basket_count.innerText = count
}


function toDetail() {
    console.log("toDetail",)
    // отправим по имени по разным страницам
}

function submit() {
    console.log("fio.value", fio.value)
    console.log("email.value", email.value)
    console.log("address.value", address.value)
    console.log("tel.value", tel.value)
    console.log("index.value", index.value)

    if (!fio.value) return alert("Поле ФИО обязательна для заполнения")
    if (!(tel.value || email.value)) {
        if (!tel.value) return alert("Поле телефон обязательна для заполнения")
        if (!email.value) return alert("Поле email обязательна для заполнения")
    }

    //https://xn----7sbbaqhlkm9ah9aiq.net/news-new/nastroyka-telegram-bota-dlya-otpravki-soobshcheniy.html

    //6398447204:AAE2eF5tLeBWy8l-sgsDV-74KgEw66P7zr8

    // location.href = 'successfulorder.html'
}