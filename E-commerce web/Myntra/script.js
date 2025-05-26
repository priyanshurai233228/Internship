// let item={
//  item_image:"13.jpg",
//  rating: {
//   stars:4.5,
//   review:1000,
//  },
//  company_name:"Carlton London",
//  item_name:"Rhodium-Plated CZ Floral Studs",
//  price:{
//   current:606,
//   original:1046,
//   discount:42,
//  },
// }

let bagItems = [];
onload();

function onload() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];

  displayItemsOnHomePage();
  displayBagIcon();
}
function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}
function displayBagIcon() {
  let bagItemCount = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagItemCount.style.visibility = "visible";
    bagItemCount.innerText = bagItems.length;
  } else {
    bagItemCount.style.visibility = "hidden";
  }
}

function displayItemsOnHomePage() {
  let itemContainerElement = document.querySelector(".items-container");
  
  if(!itemContainerElement){
    return;
  }
  let innerHTML = "";
  items.forEach((item) => {
    innerHTML += `
  <div class="item-container">
          <div class="item-image"><img src=${item.image}   alt="item image"></div>
          <div class="rating">
            ${item.rating.stars} ⭐| ${item.rating.count}
          </div>
          <div class="company-name">${item.company}</div>
        <div class="iten-name">${item.item_name}</div>
          <div class="price">
            <span class="current-price">Rs${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% off)</span>
          </div>
          <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
        </div>
 `;
  });
  itemContainerElement.innerHTML = innerHTML;
}
