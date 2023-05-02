<template>
  <div class="q-px-xl">
    <h5>{{ access ? "Login" : "Cadastro" }}</h5>
    <q-form class="q-gutter-md" @submit.prevent="register">
      <q-input type="email" label="Email" v-model="email" />
      <q-input type="password" label="Senha" v-model="password" />
      <q-btn type="submit" color="primary">{{ access ? 'Login' : 'Cadastro'}}</q-btn>
      <q-btn color="primary" outline v-if="!access" @click="access = true">
        Já possui conta?
      </q-btn>
      <q-btn color="negative" outline @click="access = false" v-else>
        Não possui conta?
      </q-btn>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { firebase } from 'src/boot/firebase';

export default {
  setup() {
    const email = ref("teste1@teste1.com");
    const password = ref("123456");
    const access = ref(true);

    const register = async () => {
      if (!email.value.trim() || !password.value.trim()) {
        console.log("campos vazios");
        return;
      }
      try {
        if (!access.value) {
          //Cadastro - Nao possui login
          const auth = getAuth();
          const userCredencial = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );

          const db = getFirestore(firebase);
          const userDB = userCredencial.user
          await setDoc(doc(db, "users", userDB.uid), {
            email: userDB.email,
            state: true,
            uid: userDB.uid,
          });
          console.log('Esse é o userDB' + userDB);
          console.log(userCredencial.user);
        } else {
          //Login - possui login
          const auth = getAuth();
          const userCredencial = await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );

          const db = getFirestore(firebase);
          const userDB = userCredencial.user
          await updateDoc(doc(db, "users", userDB.uid), {
            state: true,
          });
          console.log('Esse é o userDB' + userDB);
        }
        email.value = "";
        password.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    return {
      email,
      password,
      register,
      access,
    };
  },
};
</script>
