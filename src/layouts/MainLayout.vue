<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title :class="user ? '' : 'text-center'">
          {{ user ? user.email : "Chat" }}</q-toolbar-title
        >

        <div v-if="user">
          <q-btn color="negative" @click="logout">Sair</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { db } from "src/boot/firebase";

export default {
  name: "MainLayout",

  components: {},

  setup() {
    const auth = getAuth();
    const user = ref(null);

    auth.onAuthStateChanged((dadosDoUsuarioLogado) => {
      if (dadosDoUsuarioLogado) {
        const uid = dadosDoUsuarioLogado.uid;
        console.log(uid);
        user.value = dadosDoUsuarioLogado;
      } else {
        user.value = null;
      }
    });

    const logout = async () => {
      try {
        await updateDoc(doc(db, "users", user.value.uid), {
          state: false,
        });
        await signOut(auth);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      user,
      logout,
    };
  },
};
</script>
