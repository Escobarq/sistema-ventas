<script lang="ts">
  import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
  } from "@sveltestrap/sveltestrap";
  import { goto } from "$app/navigation";
  import {pb} from "@utils/pocketBase";
  import Alert from "@components/common/Alert.svelte";

  const togglePassword = () => (showPassword = !showPassword);

  let email = '';
  let password = '';
  let showPassword = false;
  let errorMsg = false;


  const handleLogin = async () => {
    try {
      await pb.collection('users').authWithPassword(email, password);
      pb.authStore.token //se guarda automaticamente en localstorage
      await goto('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      errorMsg = true;
    }
  };
</script>



<main
  class="d-flex justify-content-center align-items-center min-vh-100 bg-body"
>
  <div
    class="login-box bg-white shadow-sm rounded-4 p-5 w-100"
    style="max-width: 400px;"
  >
    <!-- Logo -->
    <div class="text-center mb-4">
      <img src="/logo.jpg" alt="Logo de la empresa" style="height: 60px;" />
    </div>

    <!-- Título -->
    <h2 class="text-center text-dark fw-semibold mb-3">Inicio de Sesión</h2>
    <p class="text-center text-secondary mb-4 fs-6">
      ¿No tienes cuenta? <a href="/auth/register" class="text-decoration-none"
        >Regístrate</a
      >
    </p>

    <!-- Formulario -->
    <form on:submit|preventDefault={handleLogin}>
      <FormGroup>
        <Label for="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          bind:value={email}
          placeholder="tucorreo@ejemplo.com"
          required
        />
      </FormGroup>

      <FormGroup class="position-relative">
        <Label for="password">Contraseña</Label>
        <div class="position-relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            bind:value={password}
            placeholder="••••••••"
            required
          />
          <Button
            type="button"
            color="link"
            class="position-absolute top-50 end-0 translate-middle-y border-0 p-0 me-2"
            style="z-index: 10;"
            on:click={togglePassword}
          >
            <i
              class="bi d-flex align-items-center"
              class:bi-eye-slash={!showPassword}
              class:bi-eye={showPassword}
            ></i>
          </Button>
        </div>
      </FormGroup>

      <Button type="submit" color="dark" class="w-100 mt-3">
        Iniciar Sesión
      </Button>
    </form>

    {#if errorMsg}
      <Alert color="danger" title="Ha ocurrido un error" body="Hubo un error al procesar la informacion"/>
    {/if}
  </div>
</main>

<style>
  .login-box label {
    font-weight: 500;
    font-size: 0.95rem;
  }
  a {
    color: #212529;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
