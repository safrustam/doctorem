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



function submit() {

console.log("tovar",tovar)

    let textForTelegram = "<b>Новый заказ </b>"
    tovar.forEach((el, index)=>{
        textForTelegram+='<br>'+(index+1)+'. '+el.name+': '+el.price+' ('+el.price+" x "+el.count+")"
    })

    textForTelegram+='<br>К оплате: <b>'+ summa+ ' RUB</b>'


/////////////////////// _  _  ////////////////////////
    if (!fio.value) return alert("Поле ФИО обязательна для заполнения")
    if (!(tel.value || email.value)) {
        if (!tel.value) return alert("Поле телефон обязательна для заполнения")
        if (!email.value) return alert("Поле email обязательна для заполнения")
    }


    textForTelegram += '<br><br><br><b>Purchaser information:</b>'
    textForTelegram += '<br>Ф_И_О_: ' + fio.value
    if (tel.value) textForTelegram += '<br>Phone: ' + tel.value
    if (email.value) {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (!EMAIL_REGEXP.test(email.value)) return alert('Неправильный email')
        textForTelegram += '<br>Email: ' + email.value
    }

    if (address.value) textForTelegram += '<br>Адрес: ' + address.value
    if (index.value) textForTelegram += '<br>Индекс: ' + index.value



    let botId = 'bot6398447204:AAE2eF5tLeBWy8l-sgsDV-74KgEw66P7zr8'
    let chatId = '-1001982106032'


    let linkTelega = `https://api.telegram.org/${botId}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${textForTelegram}`


    console.log("linkTelega", linkTelega)

    // let zzz = `https://api.telegram.org/bot6398447204:AAE2eF5tLeBWy8l-sgsDV-74KgEw66P7zr8/sendMessage?chat_id=-1001982106032&text="попробуем\nтак "Первая%20строка.%0AВто<b>ра</b>я%20стро<i>ка</i>.%0Aеще&parse_mode=Markdown`

    fetch(linkTelega)
        .then(response => response.json())
        .then(json => console.log('> > > '+json))


/*
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log('> > > '+json))
*/
/*
    fetch(zzz)
    .then(response => response.json())
    .then(json => console.log('> > > '+json))
*/

    //`https://api.telegram.org/bot6398447204:AAE2eF5tLeBWy8l-sgsDV-74KgEw66P7zr8/sendMessage?chat_id=-1001982106032&text="попробуем\nтак "Первая%20строка.%0AВто<b>ра</b>я%20стро<i>ка</i>.%0Aеще&parse_mode=Markdown`

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