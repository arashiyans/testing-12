// JavaScript for Cart functionality

let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        let ticketType = this.getAttribute('data-ticket');
        let price = parseFloat(this.getAttribute('data-price'));
        
        // Add ticket to cart
        let cartItem = { ticketType, price };
        cart.push(cartItem);
        
        // Update cart UI
        updateCart();
    });
});

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <span>${item.ticketType} - $${item.price}</span>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Update checkout button visibility
    const checkoutButton = document.getElementById('checkout-btn');
    checkoutButton.style.display = cart.length > 0 ? 'block' : 'none';
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            let index = this.getAttribute('data-index');
            cart.splice(index, 1);  // Remove item from cart
            updateCart();  // Re-render cart
        });
    });
}
