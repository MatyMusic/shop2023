// export const addDecimals = (num) => {
//   return (Math.round(num * 100) / 100).toFixed(2);
// };

// export const updateCart = (state) => {
//   //?חישוב מחיר המוצר

//   state.itemsPrice = addDecimals(
//     state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//   );

//   //?חישוב מחיר המשלוח
//   //! אם ההזמנה מעל 100 אז המשלוי יהיה בחינם ואם לא אז המשלוח יעלה 20 שקל

//   state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 20);

//   //?חישוב מחיר המס

//   state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

//   //?חישוב מחיר סך הכל
//   state.totalPrice =
//     Number(state.itemsPrice) +
//     Number(state.shippingPrice) +
//     Number(state.taxPrice).toFixed(2);

//   localStorage.setItem("cart", JSON.stringify(state));

//   return state;
// };

export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// NOTE: the code below has been changed from the course code to fix an issue
// with type coercion of strings to numbers.
// Our addDecimals function expects a number and returns a string, so it is not
// correct to call it passing a string as the argument.

export const updateCart = (state) => {
  // Calculate the items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate the shipping price
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate the tax price
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // Calculate the total price
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
