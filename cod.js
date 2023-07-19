let basket, basket_count, modal_shop
let tovar
let fio, email, index, address, tel, products
const enumImg = {
    'Body plus': 'doctorem_body_plus__.png',
    'Omega Plus': 'doctorem_omega_plus_.png',
    'Epifiz Plus': 'doctorem_epifizplus_.png',
    'Thin Plus': 'doctorem_thinplus___.png',
    'Gin Plus': 'doctorem_gin.png',
    'Man Plus': 'doctorem_manplus____.png',
    'Woman Plus': 'doctorem_womanplus__.png'
}

function onLoad() {
    basket = basket || document.querySelector('.basket')
    basket_count = basket_count || document.querySelector('.basket-count')
    modal_shop = modal_shop || document.querySelector('.modal-shop')
    products = products || document.querySelector('#products')

    fio = fio || document.querySelector('#fio')
    email = email || document.querySelector('#email')
    index = index || document.querySelector('#index')
    address = address || document.querySelector('#address')
    tel = tel || document.querySelector('#tel')


    tovar = localStorage.getItem('TOVAR')
    tovar = JSON.parse(tovar)

    let sum = 0
    tovar.forEach(el => sum += el.count)
    showBasketCount(sum)
}

function closeShop() {
    modal_shop.style.opacity = '0'
    setTimeout(() => modal_shop.style.display = 'none', 500)
}

function openShop() {

    console.log("tovar", tovar)

    modal_shop.style.display = 'block'
    setTimeout(() => modal_shop.style.opacity = '1')
    let template;
    tovar.forEach(el => {
        template +=
            `<div class="product">
            <div class="quard">
                <img src="img/doctorem_body_plus__.png">
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
                 <div class="crest">⨉</div>
            </span>
        </div>`
    })


    console.log("products", products)
    products.innerHTML = template

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
    //https://xn----7sbbaqhlkm9ah9aiq.net/news-new/nastroyka-telegram-bota-dlya-otpravki-soobshcheniy.html

    location.href = 'successfulorder.html'
}