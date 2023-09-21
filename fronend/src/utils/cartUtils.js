export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //?חישוב מחיר המוצר

  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //?חישוב מחיר המשלוח
  //! אם ההזמנה מעל 100 אז המשלוי יהיה בחינם ואם לא אז המשלוח יעלה 20 שקל

  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 20);

  //?חישוב מחיר המס

  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  //?חישוב מחיר סך הכל
  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
