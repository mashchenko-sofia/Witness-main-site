const btnOpenCart = document.querySelector('.btn-cart');
const cart = document.querySelector('.cart');

btnOpenCart.addEventListener('click', () => {
    cart.classList.toggle('cart-active');
});



const cursor = document.querySelector('.cursor');
    const moveCursor = (e) => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    window.addEventListener('mousemove', moveCursor);

