<template>
  <nav
    class="fixed w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blue-500 mb-3"
  >
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div
        class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start"
      >
        <router-link
          to="/"
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
        >Shopping list</router-link>
        <button
          class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <font-awesome-icon icon="bars" />
        </button>
      </div>
      <div
        v-bind:class="{ hidden: !showMenu, flex: showMenu }"
        class="lg:flex lg:flex-grow items-center"
      >
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
            <router-link
              to="/mon-compte"
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
            >
              <span class="mr-1">Mon compte</span>
              <font-awesome-icon icon="user-circle" />
            </router-link>
          </li>
          <li class="nav-item">
            <button
              @click="logOut"
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              type="button"
            >
              <span class="mr-1">Déconnexion</span>
              <font-awesome-icon icon="sign-out-alt" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navigation",

  data: () => {
    return {
      showMenu: false
    };
  },

  methods: {
    toggleNavbar() {
      this.showMenu = !this.showMenu;
    },

    logOut() {
      this.$store.dispatch("logOut");
    }
  }
};
</script>
