import '../scss/app.scss';

// Your JS Code goes here

window.onload = function(){
    create(products);
    order()
}

let products = [];

class product {
    constructor(name, category, price) {
      this.name = name;
      this.category = category;
      this.price = price;
      this.img = 'images/content/no-camera.png'
    }
}



let product1 = {
    name: 'Name 1',
    category: ['category A', 'category B', 'category C'],
    price: 50.00,
    img: 'images/content/camera1.jpg',

};

let product2 = {
    name: 'Name 2',
    category: ['category D', 'category E', 'category F'],
    price: 100.00,
    img: 'images/content/hats2.jpg',

};

let product3 = {
    name: 'Name 3',
    category: ['category A', 'category C', 'category E'],
    price: 80.00,
    img: 'images/content/shoes3.jpg',

};

let product4 = {
    name: 'Name 4',
    category: ['category B', 'category C', 'category F'],
    price: 120.00,
    img: 'images/content/brushes4.jpg',

};

let product5 = {
    name: 'Name 5',
    category: ['category C', 'category D', 'category E'],
    price: 160.00,
    img: 'images/content/headphones5.jpg',

};



products.push(product1, product2, product3, product4, product5);

// Tworzenie okien z produktami

let create = function(tab){

    let el;

    for(el of tab){


        let cont = document.getElementsByClassName('main_cont');

        let newdiv = document.createElement('div');
        let div_att = document.createAttribute('class');
        div_att.value = 'main_box';
        cont[0].appendChild(newdiv);
        newdiv.setAttributeNode(div_att);

        let newimg = document.createElement('img');
        let img_att = document.createAttribute('src');
        img_att.value = el.img;
        let img_att2 = document.createAttribute('class');
        img_att2.value = 'main_img';
        let img_att3 = document.createAttribute('alt');
        img_att3.value = " ";
        newdiv.appendChild(newimg);
        newimg.setAttributeNode(img_att);
        newimg.setAttributeNode(img_att2);
        newimg.setAttributeNode(img_att3);

        let newh2 = document.createElement('h2');
        newh2.innerText = el.name;
        let h2_att = document.createAttribute('class');
        h2_att.value = 'main_h2';
        newdiv.appendChild(newh2);
        newh2.setAttributeNode(h2_att);

        let newul = document.createElement('ul');
        newdiv.appendChild(newul);

        let categorys = el.category;
        let li;

        for(li of categorys){
            let newli = document.createElement('li');
            newli.innerText = li;
            let li_att = document.createAttribute('class');
            li_att.value = 'main_li';
            newul.appendChild(newli);
            newli.setAttributeNode(li_att);

        }

        let price = document.createElement('h3');
        price.innerText = el.price + ' zł';
        let price_att = document.createAttribute('class');
        price_att.value = 'main_h3';
        newdiv.appendChild(price);
        price.setAttributeNode(price_att);

        let newbtn =document.createElement('button');
        newbtn.innerText = 'ADD';
        let btn_att = document.createAttribute('class');
        btn_att.value = 'main_btn';
        newdiv.appendChild(newbtn);
        newbtn.setAttributeNode(btn_att);
    
    }
}

// adding product
let showwindow = function(){

    let window =document.getElementsByClassName('main_window')[0];
    if(window.classList.contains('hidden')){
        window.classList.remove('hidden')
    }
    
}

let hidewindow = function(){
    let window = document.getElementsByClassName('main_window')[0];
    if(!window.classList.contains('hidden')){
        window.classList.add('hidden')
        reset()
    }
}

let reset = function(){

    let inputs1 = document.getElementsByClassName('test1');
    let j;
    for(j of inputs1){
        j.value = null;
    }
    let inputs2 = document.getElementsByClassName('test2');
    let el;
    for(el of inputs2){
       el.checked = false;
    }
}

let addproduct = function(){

    let inp1 = document.getElementsByClassName('test1');
    let inp2 = document.getElementsByClassName('test2');

    let cat = [];

    let el;
    for (el of inp2){
        if(el.checked == true){
            cat.push(el.value);
        }     
    }

    let name = inp1[0].value;
    let price = inp1[1].value;

    if(name && price){

        let productx = new product(name, cat, price);

        products.push(productx);
    
        let j = document.getElementsByClassName('main_box');
    
        let k = j.length;
    
        for (let i = 0; i < k ; i++) {
        
            j[0].remove();
        }
        
        create(products);
        hidewindow();
        order()
    
    }

}

let btnshow = document.getElementById('main_btn_show');
btnshow.addEventListener("click", showwindow, false);

let btncancel = document.getElementById('main_btn_cancel');
btncancel.addEventListener("click", hidewindow, false);

let btnadd = document.getElementById('main_btn_add');
btnadd.addEventListener("click", addproduct, false);


// filtrowanie

let getvalue = function(){
    pmin.textContent = min.value + ' zł';
}

let getvalue2 = function(){
    pmax.textContent = max.value + ' zł';
}

let min = document.getElementById('range_left');
let max = document.getElementById('range_right');
let pmin = document.getElementById('p_min');
let pmax = document.getElementById('p_max');

min.addEventListener("mousemove", getvalue, false);
max.addEventListener("mousemove", getvalue2, false);


let filterrr = function(){

    let min = document.getElementById('range_left');
    let max = document.getElementById('range_right');
    let minmax;
    let afterprice = [];

    for(minmax of products){
        if(minmax.price >= min.value && minmax.price <= max.value){
           afterprice.push(minmax);
        }
    }
    
    let check_inp = document.getElementsByClassName('filter_inp');
    let checked = [];
    
    let inp;
    for(inp of check_inp){
        if(inp.checked){
            checked.push(inp.value);
        };
    }

    let filtered_products = []
    let el;
    for(el of afterprice){

        let ell;
        let test = []
        for(ell of checked){
            test.push(el.category.includes(ell));
       
        }
        if(!test.includes(false)){
            filtered_products.push(el);
        }
        
    }

    

    let j = document.getElementsByClassName('main_box');
    
        let k = j.length;
    
        for (let i = 0; i < k ; i++) {
        
            j[0].remove();
        }

    create(filtered_products);

}

let resetfilter = function(){

    let j = document.getElementsByClassName('main_box');
    
        let k = j.length;
    
        for (let i = 0; i < k ; i++) {
        
            j[0].remove();
        }
    let check_inp = document.getElementsByClassName('filter_inp');
    let inp;
    for(inp of check_inp){
        inp.checked = false;
    }
    create(products);

    min.value = 0;
    max.value = 200;
    pmin.innerText = '0 zł';
    pmax.innerText = '200 zł';
   
}

let supbtn = document.getElementById('filter_btn');
supbtn.addEventListener("click", filterrr, false);

let resbtn = document.getElementById('filter_res');
resbtn.addEventListener("click", resetfilter, false);

// shopping

let btns = document.getElementsByClassName('main_btn');
let aside = document.getElementsByClassName('aside_div')[0];
let cart = document.getElementsByClassName('fa-shopping-cart')[0];
let excl = document.getElementsByClassName('fa-exclamation')[0];

let goo = function(){
    let x = this.parentNode.childNodes;
    console.log(x[1].innerText);
    console.log(x[3].innerText);

        let newp1 = document.createElement('p');
        newp1.innerText = x[1].innerText;
        let p1_att = document.createAttribute('class');
        p1_att.value = 'aside_p';
        aside.appendChild(newp1);
        newp1.setAttributeNode(p1_att);

        let newp2 = document.createElement('p');
        newp2.innerText = x[3].innerText;
        let p2_att = document.createAttribute('class');
        p2_att.value = 'aside_p';
        aside.appendChild(newp2);
        newp2.setAttributeNode(p2_att);

        let br = document.createElement('br');
        aside.appendChild(br);

        excl.classList.remove('aside_hidden');

}

let order = function(){
    let shop;
    for(shop of btns){
        shop.addEventListener("click", goo, false);
    }
}

let openclose = function(){
    if(aside.classList.contains('aside_hidden')){
        aside.classList.remove('aside_hidden');
    } else {
        aside.classList.add('aside_hidden');
    }
}

cart.addEventListener("click", openclose, false);






