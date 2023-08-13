let basket, basket_count, modal_shop
let tovar
let fio, email, index, address, tel, products, sum
let goToTop

let summa = 0
const enumImg = {
    'Body Plus': 'doctorem_body_plus__.png',
    'Omega Plus': 'doctorem_omega_plus_.png',
    'Epifiz Plus': 'doctorem_epifizplus_.png',
    'Thin Plus': 'doctorem_thinplus___.png',
    'Gin Plus': 'doctorem_gin.png',
    'Man Plus': 'doctorem_manplus____.png',
    'Woman Plus': 'doctorem_womanplus__.png',
    'Vita Plus': 'doctorem_vitaplus___.png'
}

function onLoad() {
    basket = basket || document.querySelector('.basket')
    basket_count = basket_count || document.querySelector('.basket-count')
    modal_shop = modal_shop || document.querySelector('.modal-shop')
    products = products || document.querySelector('#products')
    sum = sum || document.querySelector('#sum')
    goToTop = goToTop || document.querySelector('#go-to-top')


    fio = fio || document.querySelector('#fio')
    email = email || document.querySelector('#email')
    index = index || document.querySelector('#index')
    address = address || document.querySelector('#address')
    tel = tel || document.querySelector('#tel')


    addEventListener("scroll", () => {
        if (!goToTop) return
        goToTop.style.display = (window.scrollY > 500) ? 'block' : 'none'
    });


    tovar = localStorage.getItem('TOVAR')
    tovar = JSON.parse(tovar)

    let summa = 0
    tovar && tovar.forEach(el => summa += el.count)
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

    tovar.forEach(el => {
        template +=
            `<div class="product">
                <div class="quard">
                    <img src="img/${enumImg[el.name]}" alt="">
                </div>
                <b>${el.name}</b>
                <span>
                    <div class="minus" onclick="deletePartElement('${el.name}')">−</div>
                    ${el.count}
                    <div class="plus" onclick="addPartElement('${el.name}')">+</div>
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


    if (!tovar.length) modal_shop.style.display = 'none'
}

function deletePartElement(val) {
    let element = tovar.findIndex(el => el.name === val)
    if (tovar[element].count > 1) {
        tovar[element].count = tovar[element].count - 1
        localStorage.setItem('TOVAR', JSON.stringify(tovar))
    } else return deleteElement(val)

    onLoad()
    openShop()
}

function addPartElement(val) {
    let element = tovar.findIndex(el => el.name === val)
    tovar[element].count = tovar[element].count + 1
    localStorage.setItem('TOVAR', JSON.stringify(tovar))
    onLoad()
    openShop()
}

function deleteElement(val) {
    tovar = tovar.filter(el => el.name !== val)
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

function requireValue(){
    let error = false
    if (!fio.value) {
        // return alert("Поле ФИО обязательна для заполнения")
        document.querySelector('#fio').style.border = "1px solid red"
        document.querySelector('#fio+span').style.display = 'block'
        error = true;
    }
    if (!(tel.value || email.value)) {
        document.querySelector('#tel').style.border = "1px solid red"
        document.querySelector('#tel+span').style.display = 'block'
        document.querySelector('#email').style.border = "1px solid red"
        document.querySelector('#email+span').style.display = 'block'
        error = true;
    }

    return error
}


function submit() {
    let textForTelegram = "<tg-emoji emoji-id=\"5368324170671202286\">👍</tg-emoji> <b>НОВЫЙ ЗАКАЗ </b> (" +
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + ")"
    tovar.forEach((el, index) => {
        textForTelegram += '%0A <i>' + (index + 1) + '. ' + el.name + ': ' + el.price + ' (' + el.price + " x " + el.count + ")</i>"
    })
    textForTelegram += '%0AК оплате: <u><b>' + summa + ' RUB</b></u>'

    if (requireValue()) return false;

    textForTelegram += '%0A%0A<b>Purchaser information:</b>'
    textForTelegram += '%0A Ф_И_О_: <pre>' + fio.value + '</pre>'
    if (tel.value) textForTelegram += '%0APhone: ' + tel.value
    if (email.value) {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (!EMAIL_REGEXP.test(email.value)) return alert('Неправильный email')
        textForTelegram += '%0AEmail: ' + email.value
    }

    if (address.value) textForTelegram += '%0AАдрес: ' + address.value
    if (index.value) textForTelegram += '%0AИндекс: ' + index.value


    let botId = 'bot6398447204:AAE2eF5tLeBWy8l-sgsDV-74KgEw66P7zr8'
    let chatId = '-1001982106032'
    let linkTelega = `https://api.telegram.org/${botId}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${textForTelegram}`

    fetch(linkTelega)
        .then(response => response.json())
        .then(json => console.log(' все будет хорошо > > > ' + json))
}


function toDetail(val) {
    if (val === 'Vita Plus') document.location = 'VitaPlus.html'
    if (val === 'Body Plus') document.location = 'BodyPlus.html'
    if (val === 'Omega Plus') document.location = 'OmegaPlus.html'
    if (val === 'Epifiz Plus') document.location = 'EpifizPlus.html'
    if (val === 'Thin Plus') document.location = 'ThinPlus.html'
    if (val === 'Gin Plus') document.location = 'GinPlus.html'
    if (val === 'Man Plus') document.location = 'ManPlus.html'
    if (val === 'Woman Plus') document.location = 'WomanPlus.html'
}

/**
 *  буду слушать сообщения от iframe
 */
window.addEventListener('message', function (event) {
    if (typeof event.data === 'string') {
        // перенаправляет на нужную страницу по команде из iframe menu
        document.location = event.data
    } else if (event.data.height) {
        // высота для мобильного меню
        document.querySelector('#ifr').style.height = event.data.height
    }
});