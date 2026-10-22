const products = [
  {id:1,name:"Precision Tweezers Set",category:"Tweezers",department:"beauty",price:8.99,oldPrice:11.99,discount:"-25%",rating:4.8,reviews:124,image:"https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"},
  {id:2,name:"Professional Hair Scissors",category:"Hair Scissors",department:"beauty",price:14.99,oldPrice:18.99,discount:"-21%",rating:4.7,reviews:98,image:"https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=600&q=80"},
  {id:3,name:"Stainless Nail Clipper Set",category:"Nail Tools",department:"beauty",price:7.99,oldPrice:9.99,discount:"-20%",rating:4.9,reviews:76,image:"https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=600&q=80"},
  {id:4,name:"Cuticle Nipper",category:"Nail Tools",department:"beauty",price:9.99,oldPrice:12.99,discount:"-23%",rating:4.6,reviews:64,image:"https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80"},
  {id:5,name:"Eyebrow Scissors & Comb",category:"Grooming Tools",department:"beauty",price:6.99,oldPrice:8.99,discount:"-22%",rating:4.8,reviews:112,image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"},
  {id:6,name:"Makeup Brush Set",category:"Beauty Tools",department:"beauty",price:12.99,oldPrice:15.99,discount:"-19%",rating:4.7,reviews:83,image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"},
  {id:7,name:"Classic Leather Jacket",category:"Leather Jackets",department:"fashion",price:79.99,oldPrice:99.99,discount:"-20%",rating:4.9,reviews:124,image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"},
  {id:8,name:"Everyday Hoodie",category:"Hoodies",department:"fashion",price:34.99,oldPrice:39.99,discount:"-12%",rating:4.7,reviews:76,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"},
  {id:9,name:"Casual Cargo Trousers",category:"Trousers",department:"fashion",price:42.99,oldPrice:49.99,discount:"-14%",rating:4.6,reviews:82,image:"https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=600&q=80"},
  {id:10,name:"Classic Men's Shirt",category:"Men's Shirts",department:"fashion",price:29.99,oldPrice:34.99,discount:"-14%",rating:4.8,reviews:54,image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"},
  {id:11,name:"Casual Denim Jacket",category:"Jackets",department:"fashion",price:54.99,oldPrice:64.99,discount:"-15%",rating:4.6,reviews:60,image:"https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80"},
  {id:12,name:"Men's Basic T-Shirt",category:"T-Shirts",department:"fashion",price:16.99,oldPrice:19.99,discount:"-15%",rating:4.8,reviews:43,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"}
];

const currencySymbols = {USD:"$",GBP:"£",EUR:"€",PKR:"Rs. "};
let currency = "USD";
let cart = [];
let wishlist = new Set();
let activeSearch = "";
const money = amount => `${currencySymbols[currency] || "$"}${(amount * ({USD:1,GBP:.79,EUR:.92,PKR:278}[currency])).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const stars = rating => "★★★★★";
const productCard = p => `
  <article class="product-card" data-id="${p.id}">
    <div class="product-image-wrap">
      <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x600/edf4fa/09213a?text=Zabish+Product'">
      <span class="discount">${p.discount}</span>
      <button class="wish-button ${wishlist.has(p.id)?"selected":""}" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist">${wishlist.has(p.id)?"♥":"♡"}</button>
    </div>
    <div class="product-info">
      <p class="product-name" title="${p.name}">${p.name}</p><p class="product-category">${p.category}</p>
      <div class="rating" aria-label="${p.rating} out of 5 stars">${stars(p.rating)} <small>(${p.reviews})</small></div>
      <div class="product-bottom"><span class="product-price">${money(p.price)}<span class="old-price">${money(p.oldPrice)}</span></span><button class="add-cart" data-add="${p.id}" aria-label="Add ${p.name} to cart">＋</button></div>
    </div>
  </article>`;

function renderProducts() {
  const matching = products.filter(p => {
    const text = `${p.name} ${p.category} ${p.department} ${p.department === "beauty" ? "beauty tools tweezers scissors nail clipper grooming" : "mens clothing leather jacket hoodie trousers shirt"}`.toLowerCase();
    return text.includes(activeSearch.toLowerCase());
  });
  const beauty = matching.filter(p=>p.department==="beauty");
  const fashion = matching.filter(p=>p.department==="fashion");
  document.querySelector("#beautyGrid").innerHTML = beauty.length ? beauty.map(productCard).join("") : `<div class="no-results">No beauty products match your search.</div>`;
  document.querySelector("#fashionGrid").innerHTML = fashion.length ? fashion.map(productCard).join("") : `<div class="no-results">No fashion products match your search.</div>`;
}
function toast(message) {
  const el=document.querySelector("#toast");el.textContent=message;el.classList.add("show");
  clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2300);
}
function updateCounts() {
  document.querySelector("#cartCount").textContent=cart.reduce((sum,item)=>sum+item.qty,0);
  document.querySelector("#drawerCount").textContent=`(${cart.reduce((sum,item)=>sum+item.qty,0)})`;
  document.querySelector("#wishlistCount").textContent=wishlist.size;
}
function addToCart(id) {
  const found=cart.find(item=>item.id===id);
  if(found) found.qty++; else cart.push({id,qty:1});
  updateCounts();renderCart();toast("Added to your cart");
}
function renderCart() {
  const container=document.querySelector("#cartItems");
  if(!cart.length) container.innerHTML='<div class="empty-cart"><div style="font-size:38px">🛒</div><h3>Your cart is waiting</h3><p>Explore our collections and add something you love.</p></div>';
  else container.innerHTML=cart.map(item=>{
    const p=products.find(product=>product.id===item.id);
    return `<div class="cart-line"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${money(p.price)} each</small><div class="quantity-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div><span class="cart-line-price">${money(p.price*item.qty)}</span></div>`;
  }).join("");
  document.querySelector("#cartSubtotal").textContent=money(cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0));
}
function openCart() {
  document.querySelector("#cartDrawer").classList.add("open");
  document.querySelector("#drawerBackdrop").classList.add("open");
  document.querySelector("#cartDrawer").setAttribute("aria-hidden","false");
}
function closeCart() {
  document.querySelector("#cartDrawer").classList.remove("open");
  document.querySelector("#drawerBackdrop").classList.remove("open");
  document.querySelector("#cartDrawer").setAttribute("aria-hidden","true");
}
document.addEventListener("click",event=>{
  const add=event.target.closest("[data-add]");
  if(add) addToCart(Number(add.dataset.add));
  const wish=event.target.closest("[data-wish]");
  if(wish){
    const id=Number(wish.dataset.wish);
    wishlist.has(id)?wishlist.delete(id):wishlist.add(id);
    updateCounts();renderProducts();toast(wishlist.has(id)?"Saved to wishlist":"Removed from wishlist");
  }
  const qty=event.target.closest("[data-qty]");
  if(qty){
    const item=cart.find(x=>x.id===Number(qty.dataset.qty));
    if(item){item.qty+=Number(qty.dataset.delta);if(item.qty<=0)cart=cart.filter(x=>x.id!==item.id);}
    updateCounts();renderCart();
  }
});
document.querySelector("#searchForm").addEventListener("submit",e=>{
  e.preventDefault();activeSearch=document.querySelector("#searchInput").value.trim();renderProducts();
  document.querySelector("#beautyProducts").scrollIntoView({behavior:"smooth"});
  if(activeSearch)toast(`Search results for “${activeSearch}”`);
});
document.querySelector("#searchInput").addEventListener("input",e=>{
  if(!e.target.value.trim()){activeSearch="";renderProducts();}
});
document.querySelector("#currency").addEventListener("change",e=>{currency=e.target.value;renderProducts();renderCart();toast(`Prices shown in ${currency}`);});
document.querySelector("#cartToggle").addEventListener("click",openCart);
document.querySelector("#closeCart").addEventListener("click",closeCart);
document.querySelector("#drawerBackdrop").addEventListener("click",closeCart);
document.querySelector("#checkoutButton").addEventListener("click",()=>toast("Demo only — connect a payment provider to enable checkout."));
document.querySelector("#wishlistToggle").addEventListener("click",()=>{
  const ids=[...wishlist];
  if(!ids.length){toast("Your wishlist is empty");return;}
  activeSearch="";renderProducts();toast(`${ids.length} saved product${ids.length===1?"":"s"} in your wishlist`);
  document.querySelector("#beautyProducts").scrollIntoView({behavior:"smooth"});
});
document.querySelector("#newsletterForm").addEventListener("submit",e=>{
  e.preventDefault();const email=document.querySelector("#newsletterEmail").value.trim();
  if(email){toast("Thanks for your interest! Connect an email service to collect subscribers.");e.target.reset();}
});
document.querySelector("#mobileMenu").addEventListener("click",()=>{
  const nav=document.querySelector("#mainNav");const open=nav.classList.toggle("open");
  document.querySelector("#mobileMenu").setAttribute("aria-expanded",String(open));
});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.querySelector("#mainNav").classList.remove("open")));
document.querySelectorAll(".category-item").forEach(a=>a.addEventListener("click",()=>{
  activeSearch=a.dataset.filter==="beauty"?"":"";
}));
document.querySelector("#year").textContent=new Date().getFullYear();

// Small visual interaction for the hero dots/arrows.
let heroSlide=0;
const heroDots=[...document.querySelectorAll(".hero-dots .dot")];
function setHeroSlide(index){
  heroSlide=(index+heroDots.length)%heroDots.length;
  heroDots.forEach((dot,i)=>dot.classList.toggle("active",i===heroSlide));
  const copy=document.querySelector(".hero-copy");
  copy.style.opacity="0.45";
  setTimeout(()=>copy.style.opacity="1",100);
}
document.querySelector(".hero-prev").addEventListener("click",()=>setHeroSlide(heroSlide-1));
document.querySelector(".hero-next").addEventListener("click",()=>setHeroSlide(heroSlide+1));
heroDots.forEach((dot,i)=>dot.addEventListener("click",()=>setHeroSlide(i)));
renderProducts();renderCart();updateCounts();
