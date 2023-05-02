<template>
  <q-page padding>
    <UserAccess v-if="!user" />
  </q-page>
</template>

<script>
import UserAccess from "../components/UserAccess.vue";
import { getAuth } from "firebase/auth";
import { ref } from "vue";

export default {
  name: "IndexPage",

  components: { UserAccess },
  setup() {
    const auth = getAuth();
    const user = ref(null);

    auth.onAuthStateChanged((dadosDoUsuarioLogado) => {
      if (dadosDoUsuarioLogado) {
        const uid = dadosDoUsuarioLogado.uid;
        user.value = dadosDoUsuarioLogado;
      } else {
        user.value = null;
        console.log("O usuário está desconectado");
      }
    });

    return {
      user,
    };
  },
};
</script>
