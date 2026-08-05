import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  itemIds: string[];
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      itemIds: [],
      toggleItem: (productId) => {
        set((state) => {
          const exists = state.itemIds.includes(productId);
          if (exists) {
            return { itemIds: state.itemIds.filter((id) => id !== productId) };
          } else {
            return { itemIds: [...state.itemIds, productId] };
          }
        });
      },
      isInWishlist: (productId) => {
        return get().itemIds.includes(productId);
      },
      clearWishlist: () => set({ itemIds: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
