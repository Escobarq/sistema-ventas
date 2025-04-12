<script lang="ts">
  import { Styles } from "@sveltestrap/sveltestrap";
  import { goto } from "$app/navigation";

  const navigateToLogin = () => goto("/auth/login");
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</svelte:head>

<main
  class="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-body"
>
  <Styles />
  <div
    class="welcome-screen shadow-sm rounded-4 p-5 bg-white animate__animated animate__fadeIn"
  >
    <h1 class="mb-3 fw-semibold text-dark display-5">Bienvenido al Sistema</h1>
    <p class="mb-4 text-secondary fs-5">
      Por favor, inicia sesión para continuar
    </p>
    <button class="btn btn-dark btn-lg" on:click={navigateToLogin}>
      <i class="bi bi-box-arrow-in-right me-2"></i> Iniciar Sesión
    </button>
  </div>
</main>

<style>

  .bg-body {
    background-color: #f8f9fa;
  }

  .welcome-screen {
    text-align: center;
    max-width: 600px;
    width: 100%;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .welcome-screen:hover {
    transform: scale(1.01);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }

  h1 {
    letter-spacing: -0.5px;
  }

  p {
    color: #6c757d;
  }
</style>
