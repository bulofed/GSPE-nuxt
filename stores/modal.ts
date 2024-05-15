import { defineStore } from 'pinia';

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    show: false,
    teacher_id: '',
    component: null,
  }),
  actions: {
    showModal() {
      this.show = true;
    },
    hideModal() {
      this.show = false;
    },
    setTeacherId(id: string) {
      this.teacher_id = id;
    },
    setComponent(comp: any) {
      this.component = comp;
    },
  },
});