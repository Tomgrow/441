// Student Name: [Your Name]

// 创建用户函数，成功后跳转到登录页面
function createUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        // 将用户信息保存到 localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        
        alert('User created successfully!');
        window.location.href = 'login.html'; // 跳转到登录页面
    } else {
        alert('Please fill in all fields.');
    }
}

// 登录函数
function login() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // 从 localStorage 获取保存的用户名和密码
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // 检查输入的用户名和密码是否匹配
    if (loginUsername === storedUsername && loginPassword === storedPassword) {
        alert('Login successful!');
        window.location.href = 'shop.html'; // 登录成功后跳转到shop
    } else {
        alert('Login failed! Redirecting to create user page.');
        window.location.href = 'createUser.html'; // 登录失败跳转到创建用户页面
    }
}

// 结账函数
function checkout() {
    const quantity = document.getElementById('quantity').value;
    const product = document.getElementById('product').value;
    let price;

    if (product === "Course A") {
        price = 100;
    } else if (product === "Course B") {
        price = 200;
    }

    const total = quantity * price;
    document.getElementById('totalOrder').innerText = `Total Order: $${total}`;
}
let cart = [];

// 将课程添加到购物车
function addToCart(id, name, price) {
    const quantity = document.getElementById('quantity' + id).value;
    
    // 检查购物车中是否已经存在该商品
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex >= 0) {
        // 如果商品已存在，则更新数量
        cart[existingItemIndex].quantity += parseInt(quantity);
    } else {
        // 如果商品不存在，则添加新商品
        cart.push({ id, name, price, quantity: parseInt(quantity) });
    }
    
    updateCart();
}

// 更新购物车内容
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // 清空购物车显示
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    // 迭代购物车中的每个商品并显示
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    // 更新总价
    cartTotalElement.innerText = `Total: $${total.toFixed(2)}`;
}

// 从购物车中移除商品
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// 清空购物车
function clearCart() {
    cart = [];
    updateCart();
}

// 结账功能（此处仅模拟）
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Your total is $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}. Thank you for your purchase!`);
        clearCart();
    }
}