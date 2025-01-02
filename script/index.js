let bagItems;

onLoad();

function onLoad(){
  let bagItemStr = localStorage.getItem('bagItems');

  bagItems = bagItemStr? JSON.parse(bagItemStr): [];
 
  displayItem() 
  displayBagIcon()
}

function addToBag(itemId){
  bagItems.push(itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
 
  displayBagIcon()
}

function displayBagIcon(){
  let countElement = document.querySelector('.bagItemCount');
  if(bagItems.length>0){
    countElement.style.visibility = "visible";
    countElement.innerText = bagItems.length;
  }else{
    countElement.style.visibility = "hidden";
  }
  }

function displayItem(){
  let containerItem = document.querySelector(".itemsContainer");
  if(!containerItem){
    return;
  }
  newHtml = "";
  items.forEach((item)=>{
  newHtml+= `<div class="itemContainer">
          <img class="itemImage" src="${item.image}" alt="item image">
          <div class="rating">${item.rating.stars}⭐ | ${item.rating.count}</div>
          <div class="companyName">${item.company}</div>
          <div class="itemName">${item.item_name}</div>
          <div class="price">
            <span class="currentPrice">BDT ${item.current_price}</span>
            <span class="originalPrice">BDT ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage} % OFF)</span>
          </div>
          <div class="btnContainer"></div>
          <button class ="btnAddBag" onclick="addToBag(${item.id})">
            <span class="material-symbols-outlined btnLock">
              lock
              </span> <span class="btnText">Add to Bag</span></button>
        </div>`;
  })
  
  
  containerItem.innerHTML = newHtml;
}



