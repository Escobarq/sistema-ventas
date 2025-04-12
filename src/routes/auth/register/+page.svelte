<script lang="ts">
    import Alert from '@components/common/Alert.svelte';
    import {Button, FormGroup, Input, Label,} from "@sveltestrap/sveltestrap";
    import {goto} from "$app/navigation";
    import {pb} from "@utils/pocketBase";


    let email = "";
    let password = "";
    let name = "";
    let avatar: File | null = null;
    let previewUrl: string | null = null;
    let showPassword = false;
    let hasError = false;
    let hasSucces =false

    const togglePassword = () => (showPassword = !showPassword);


    const handleFileChange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        avatar = input.files?.[0] || null;
        avatar ? previewUrl = URL.createObjectURL(avatar) : previewUrl = null;
    };

    const handleRegister = async () => {
        try {
            const formData = new FormData();

            formData.append("email", email);
            formData.append("password", password);
            formData.append("passwordConfirm", password);
            formData.append("name", name);

            if (avatar) formData.append("avatar", avatar);

            await pb.collection("users").create(formData);

            hasSucces = true

            setTimeout(() => {
                goto("/auth/login");
            }, 3000)

        } catch (error) {
            hasError = true
            console.error(error);
        }
    };
</script>

<main class="d-flex justify-content-center align-items-center min-vh-100 bg-body">

    <div class="bg-white shadow-sm rounded-4 p-5 w-100" style="max-width: 500px;">
        <!-- Logo -->
        <div class="text-center mb-4">
            <img src="/logo.jpg" alt="Logo de la empresa" style="height: 60px;"/>
        </div>

        <!-- Título -->
        <h2 class="text-center text-dark fw-semibold mb-3">Registro</h2>
        <p class="text-center text-secondary mb-4 fs-6">
            ¿Ya tienes cuenta? <a href="/auth/login" class="text-decoration-none">Inicia sesión</a>
        </p>

        <form on:submit|preventDefault={handleRegister}>
            <FormGroup>
                <Label for="name">Nombre</Label>
                <Input
                        id="name"
                        type="text"
                        bind:value={name}
                        placeholder="Tu nombre"
                        pattern="^[a-zA-Z\s]+$"
                       required
                />
            </FormGroup>

            <FormGroup>
                <Label for="email">Correo electrónico</Label>
                <Input
                        id="email"
                        type="email"
                        bind:value={email}
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2}$"
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
                            placeholder="Contraseña minima 8 caracteres"
                            class="pe-5"
                           pattern="^[A-Za-z0-9!@#$%^&*()_+]{8,10}$"
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

            <FormGroup>
                <Label for="avatar">Avatar (opcional)</Label>
                <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        on:change={handleFileChange}
                />
            </FormGroup>

            {#if previewUrl}
                <div class="mt-3 text-center">
                    <p>Vista previa:</p>
                    <img src={previewUrl} alt="Vista previa" class="img-fluid" style="max-height: 200px;">
                </div>
            {/if}

            <Button type="submit" color="dark" class="w-100 mt-3">Registrarse</Button>
        </form>

        {#if hasError}
            <Alert color="danger" title="Ha ocurrido un error" body="Hubo un error al procesar la informacion"/>
        {/if}

        {#if hasSucces}
            <Alert color="success" title="Se realizo con exito" body="Operacion exitosa"/>
        {/if}
    </div>
</main>

<style>

    label {
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
