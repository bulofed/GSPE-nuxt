import { defineStore } from 'pinia';

export const useRessourceModalStore = defineStore({
  id: 'ressourceModal',
  state: () => ({
    show: false,
  }),
  actions: {
    showModal() {
      this.show = true;
    },
    hideModal() {
      this.show = false;
    }
  },
});