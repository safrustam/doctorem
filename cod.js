let basket, basket_count
let tovar
function onLoad(){
    basket = basket || document.querySelector('.basket')
    basket_count = basket_count || document.querySelector('.basket-count')
    tovar = localStorage.getItem('TOVAR')
    tovar = JSON.parse(tovar)

    let sum = tovar.reduce((previousValue, el)=> previousValue.count + el.count)
    showBasketCount(sum)
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




function showBasketCount(count=0) {

    if(!count) return basket.style.display='none'
    basket.style.display='block'
    basket_count.innerText=count
}


function toDetail() {
    console.log("toDetail",)
}