import { create } from 'zustand';

export const useBearStore = create(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),

  // Products state and actions
  products: [],
  addProduct: product =>
    set(state => ({
      products: [...state.products, product],
    })),
  removeProduct: productId =>
    set(state => ({
      products: state.products.filter(p => p.id !== productId),
    })),
  clearProducts: () => set({ products: [] }),
}));
