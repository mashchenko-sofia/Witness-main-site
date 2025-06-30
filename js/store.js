const products = [
    {
        id: 1,
        img: '../img/products/product-1.png',
        name: 'WITNESS-V001-MIN',
        description: 'DESCRIPTION, WHERE I NEED TO WRITE SOMETHING DOWN. BUT I DON’T KNOW WHAT TO WRITE',
        type: 'DEVICE',
        price: 2500,
        amount: 0,
    },
    {
        id: 2,
        img: '../img/products/product-2.png',
        name: 'WITNESS-V001-PRO',
        description: 'DESCRIPTION, WHERE I NEED TO WRITE SOMETHING DOWN. BUT I DON’T KNOW WHAT TO WRITE',
        type: 'DEVICE',
        price: 3990,
        amount: 0,
    },
    {
        id: 3,
        img: '../img/products/product-3.png',
        name: 'BAG',
        description: 'DESCRIPTION, WHERE I NEED TO WRITE SOMETHING DOWN. BUT I DON’T KNOW WHAT TO WRITE',
        type: 'ACCESSORY',
        price: 160,
        amount: 0,
    },
    {
        id: 4,
        img: '../img/products/product-4.png',
        name: 'CHARGING CABLE',
        description: 'DESCRIPTION, WHERE I NEED TO WRITE SOMETHING DOWN. BUT I DON’T KNOW WHAT TO WRITE',
        type: 'ACCESSORY',
        price: 55,
        amount: 0,
    },
];



const btnsToCart = document.querySelectorAll('.btn-tocart');
const cartContent = document.querySelector('.cart__content');
const cartTotalPrice = document.querySelector('.cart__total-price');
const btnBuy = document.querySelector('.btn-buy');



const updateCartItem = (item, p) => {

    item.children[3].innerHTML = `x${p.amount}`;
    item.children[4].innerHTML = `${p.price * p.amount}$`;
}

const storeItems = document.querySelectorAll('.store__list-item');
storeItems.forEach((item) => {
    item.addEventListener('click', () => {
        let product = products.find(p => p.id === parseInt(item.id[8]));

        document.querySelector('.c__hero').id = product.id;
        document.querySelector('.c__hero-name').innerHTML = product.name;
        document.querySelector('.c__hero-price').innerHTML = product.price + '$';
    })
})


const createCartItem = (p) => {
    let cartItem = `
        <div class="cart__content-item" id="item-${p.id}">
            <div class="cart__content-item-photo" url="${p.img}"></div>
            <div class="cart__content-item-name">${p.name}</div>
            <div class="cart__content-item-type">${p.type}</div>
            <div class="cart__content-item-amount">x${p.amount}</div>
            <div class="cart__content-item-price">${p.price * p.amount}$</div>
            <button class="btn btn-remove">[REMOVE]</button>
        </div>`
    document.querySelector('.cart__content').insertAdjacentHTML('beforeend', cartItem);
}

let myCart;
let totalPrice;

document.addEventListener('DOMContentLoaded', () => {
    myCart = JSON.parse(localStorage.getItem('myCart'));
    if (myCart) {
        myCart.forEach((p) => {
            createCartItem(p);
        })
    } else myCart = [];
    console.log(myCart);
    totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    if (totalPrice) {
        cartTotalPrice.innerHTML = totalPrice + '$';
    } else totalPrice = 0;
    console.log(totalPrice);
    const btnsRemove = document.querySelectorAll('.btn-remove');
    btnsRemove.forEach((btn) => {
        btn.addEventListener('click', () => {
            let product = products.find(p => p.id === parseInt(btn.parentElement.id[5]));
            product.amount = 0;
    
            let item = document.querySelector(`#item-${product.id}`);
            item.remove();
            myCart = myCart.filter(p => p.id !== product.id);
            localStorage.setItem('myCart', JSON.stringify(myCart));
    
            totalPrice = myCart.reduce((acc, p) => acc + p.price * p.amount, 0);
            cartTotalPrice.innerHTML = totalPrice + '$';
            localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        })
    })
})

btnsToCart.forEach((btn) => {
    btn.addEventListener('click', () => {
        let product = products.find(p => p.id === parseInt(btn.parentElement.id));
        product.amount++;

        let cartItem = document.querySelector(`#item-${product.id}`);

        if (product.amount > 1) {
            updateCartItem(cartItem, product);
        } else {
            myCart.push(product);
            createCartItem(product);
        }
        localStorage.setItem('myCart', JSON.stringify(myCart));

        const btnsRemove = document.querySelectorAll('.btn-remove');
        btnsRemove.forEach((btn) => {
            btn.addEventListener('click', () => {
                let product = products.find(p => p.id === parseInt(btn.parentElement.id[5]));
                product.amount = 0;
                
                let item = document.querySelector(`#item-${product.id}`);
                item.remove();
                console.log(item)

                myCart = myCart.filter(p => p.id !== product.id);
                localStorage.setItem('myCart', JSON.stringify(myCart));

                totalPrice = myCart.reduce((acc, p) => acc + p.price * p.amount, totalPrice);
                cartTotalPrice.innerHTML = totalPrice + '$';
                localStorage.setItem('totalPrice', JSON.stringify(totalPrice));


                return;
            })
        })
        console.log(myCart)
        
        totalPrice = products.reduce((acc, p) => acc + p.price * p.amount, 0);
        cartTotalPrice.innerHTML = totalPrice + '$';
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    })
})