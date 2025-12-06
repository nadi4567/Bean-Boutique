document.addEventListener("DOMContentLoaded", () => {
    const popUp = document.querySelector(".popupContainer");
    const closeUp = document.querySelector("#closeBtn");
    const form = document.getElementById("signUpForm");
    console.log("loaded");

    if (!localStorage.getItem("firstVisitor")) {
        popUp.style.display = 'flex';
    }else{
        popUp.style.display = 'none';
    }

    closeUp.addEventListener("click", () => {
        popUp.style.display = 'none';
        console.log("clicked");
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        popUp.style.display = 'none';
        alert("Thank you for signing up!🤎");
        localStorage.setItem("firstVisitor", "true");
    });
});
document.getElementById("navMenu").addEventListener("click", function () {
    const navList = document.getElementById("navItem");
    navList.classList.toggle("navShow");
});


/**add to cart function **/
let addCart = (btn) => {
    var machineCard = btn.closest(".machineCardclick");
    let name = machineCard.querySelector(".blendType").innerText;
    var price = parseFloat(machineCard.querySelector(".price").innerText.replace("$", ""));
    var imgSrc = machineCard.querySelector(".machineImg").getAttribute("src");
   alert( name+ " was added to cart");
    if (localStorage.getItem("count") == null) {
        let product = [{ name, price, imgSrc, quantity: 1, subtotal: price }];
        localStorage.setItem("count", JSON.stringify(product));
        document.getElementById("itemCount").innerHTML = product.reduce((sum, item) => sum + item.quantity, 0);
    } else {
        let preSession = JSON.parse(localStorage.getItem("count"));
        //check there is already pick up that item
        let existingAdded = preSession.findIndex(item => item.name === name);

        if (existingAdded !== -1) {// if so, increase quantity
            preSession[existingAdded].quantity += 1;
            preSession[existingAdded].subtotal = preSession[existingAdded].quantity * preSession[existingAdded].price;
        } else {
            preSession.push({ name, price, imgSrc, quantity: 1, subtotal: price });
        }

        localStorage.setItem("count", JSON.stringify(preSession));
        document.getElementById("itemCount").innerHTML = preSession.reduce((sum, item) => sum + item.quantity, 0);
    }
};

const addBtns = document.querySelectorAll(".equipBtn");
addBtns.forEach((addBtn) => {
    addBtn.addEventListener("click", function () {
        addCart(this);
    });
});


    


let showItems = () => {
    const cart = JSON.parse(localStorage.getItem("count")) || [];
    const cartBody = document.querySelector(".cartBodyContainer");

    cartBody.innerHTML = "";

    if (cart.length === 0) {
        cartBody.innerHTML = `<p>Your cart is empty.</p>`;
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.subtotal;
        const cartItem = `
            <div class="cartBody">
                <div class="productDetail ftCol">
                    <img src="${item.imgSrc}" class="addItemImg" alt="shoppedcart">
                    <div class="productTxt">
                        <p class="addItemname">${item.name}</p>
                        <p class="addItemPrice">$${item.price.toFixed(2)}</p>
                        <p class="removeItem" onclick="removeItem(${index})">Remove</p>
                    </div>
                </div>
                <div class="secCol itemQua">${item.quantity}</div>
                <div class="thrCol subTotal">$${item.subtotal.toFixed(2)}</div>
            </div>
        `;
        cartBody.innerHTML += cartItem;
    });

    const totalDisplay = `
        <div class="cartTotal">
            <p>Total: <span>$${total.toFixed(2)}</span></p>
        </div>
    `;
    cartBody.innerHTML += totalDisplay;
};

const removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem("count")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        cart[index].subtotal = cart[index].quantity * cart[index].price;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("count", JSON.stringify(cart));
    showItems();

    const updatedCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("itemCount").innerHTML = updatedCount;
};

/**mixitup plugin */
var container = document.querySelector('[data-ref="container"]');
var inputSearch = document.querySelector('[data-ref="input-search"]');
var keyupTimeout;

var mixer = mixitup(container, {
    animation: {
        duration: 400,
    },
    callbacks: {
        onMixClick: function () {
            if (this.matches('[data-filter]')) {
                inputSearch.value = '';
            }
        },
    },
});

inputSearch.addEventListener('keyup', function () {
    var searchValue = inputSearch.value.length < 3 ? '' : inputSearch.value.toLowerCase().trim();

    clearTimeout(keyupTimeout);
    keyupTimeout = setTimeout(function () {
        filterByString(searchValue);
    }, 600);
});

function filterByString(searchValue) {
    if (searchValue) {
        mixer.filter('[class*="' + searchValue + '"]');
    } else {
        mixer.filter('all');
    }
}

/** */
var container = document.querySelector('[data-ref="container"]');
          var inputSearch = document.querySelector('[data-ref="input-search"]');
          var keyupTimeout;

          var mixer = mixitup(container, {
              animation: {
                  duration: 350
              },
              callbacks: {
                  onMixClick: function() {
                      // Reset the search if a filter is clicked

                      if (this.matches('[data-filter]')) {
                          inputSearch.value = '';
                      }
                  }
              }
          });

          // Set up a handler to listen for "keyup" events from the search input

          inputSearch.addEventListener('keyup', function() {
              var searchValue;

              if (inputSearch.value.length < 3) {
                  // If the input value is less than 3 characters, don't send

                  searchValue = '';
              } else {
                  searchValue = inputSearch.value.toLowerCase().trim();
              }

              // Very basic throttling to prevent mixer thrashing. Only search
              // once 350ms has passed since the last keyup event

              clearTimeout(keyupTimeout);

              keyupTimeout = setTimeout(function() {
                  filterByString(searchValue);
              }, 350);
          });

          /**
           * Filters the mixer using a provided search string, which is matched against
           * the contents of each target's "class" attribute. Any custom data-attribute(s)
           * could also be used.
           *
           * @param  {string} searchValue
           * @return {void}
           */

          function filterByString(searchValue) {
              if (searchValue) {
                  // Use an attribute wildcard selector to check for matches

                  mixer.filter('[class*="' + searchValue + '"]');
              } else {
                  // If no searchValue, treat as filter('all')

                  mixer.filter('all');
              }
          }


