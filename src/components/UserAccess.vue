<template>
    <div class="q-px-xl">
        <h5>Formulário de {{access ? 'Login' : 'Cadastro'}}</h5>
        <q-form class="q-gutter-md" @submit.prevent="processForm">
            <q-input type="email" label="Email" v-model="email" />
            <q-input type="password" label="Senha" v-model="password" />
            <q-btn :label="access ? 'Login' : 'Cadastro'" type="submit" color="primary" />
            <q-btn color="primary" outline v-if="!access" @click="access = true"> Já possui conta? </q-btn>
            <q-btn color="negative" outline v-else @click="access = false"> Não possui conta? </q-btn>
        </q-form>
    </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  setup() {
    const email = ref("teste1@teste1.com");
    const password = ref("123456");
    const access = ref(true)

    const processForm = async() => {
        if(!email.value.trim() || !password.value.trim()){
            console.log('campos vazios')
            return;
        }
        try {
            if (!access.value) {
                //Cadastro
                const auth = getAuth()
                const user = await createUserWithEmailAndPassword(auth, email.value, password.value)
                console.log(user.user)
            }else {
                //Login
                const auth = getAuth()
                const user = await signInWithEmailAndPassword(auth, email.value, password.value)
                console.log(user.user)
            }
            email.value = ""
            password.value = ""
        } catch (error) {
            const errorCode = error.code
            const errorMessage = error.message
        }
    }

    return {
      email,
      password,
      processForm,
      access
    };
  },
};
</script>
