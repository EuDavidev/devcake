import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  checkoutMessage: "",
  addToCart: (product, quantity = 1) => {
    const existing = get().cart.find((item) => item.id === product.id);

    if (existing) {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      }));
      return;
    }

    set((state) => ({
      cart: [...state.cart, { ...product, quantity }],
    }));
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },
  clearCart: () => set({ cart: [] }),
  setCheckoutMessage: (message) => set({ checkoutMessage: message }),
  totalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
  totalPrice: () =>
    get().cart.reduce((acc, item) => acc + item.quantity * item.preco, 0),
}));
