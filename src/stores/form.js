import { defineStore } from "pinia";

// 定義 store，第一個引數的用意是將 store 名稱設定為 form。第二個引數則是設定用以與 store 互動的屬性.
export default defineStore("form", {
  state: () => ({
    isOpen2dCode: false,
    isOpenChangePasswordForm: false,
    isOpenSignInForm: false,
  }),
  getters: {
    hiddenClass2dCode(state) {
      return !state.isOpen2dCode ? "visually-hidden" : "";
    },
    hiddenClassChangePasswordForm(state) {
      return !state.isOpenChangePasswordForm ? "visually-hidden" : "";
    },
    hiddenClassSignInForm(state) {
      return !state.isOpenSignInForm ? "visually-hidden" : "";
    },
  },
});
