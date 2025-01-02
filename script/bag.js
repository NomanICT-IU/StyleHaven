let bagItemObject;
const deliveryFee = 100;
onLoad();

function onLoad() {
  loadBagItemObject();
  displayBagItem();
  displayBagSummary();
}
function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");
  let totalItem = bagItemObject.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;

  bagItemObject.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    console.log(totalMRP);
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });
  bagItemObject.length > 0
    ? (finalPayment = totalMRP - totalDiscount + deliveryFee)
    : (finalPayment = 0);

  bagSummaryElement.innerHTML = ` <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">BDT ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-BDT ${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Delivery Fee</span>
              <span class="price-item-value">DBT 100</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">BDT ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}

function loadBagItemObject() {
  bagItemObject = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}

function displayBagItem() {
  let bagItemsElement = document.querySelector(".bag-items-container");
  if (!bagItemsElement) {
    return;
  }
  let innerHTML = "";
  bagItemObject.forEach((bagItem) => {
    innerHTML += generateItemHTML(bagItem);
  });

  bagItemsElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObject();
  displayBagItem();
  displayBagIcon();
  displayBagSummary();
}
function generateItemHTML(item) {
  return ` <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">BDT ${item.current_price}</span>
                <span class="original-price">BDT ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>

          </div>
`;
}
