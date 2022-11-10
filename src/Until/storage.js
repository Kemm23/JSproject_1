const STORAGE_KEY = "Users";

function Storage() {
  return {
      get() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      },
      set(users) {
        c;
      },
  }
};

