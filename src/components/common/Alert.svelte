<script lang="ts">
    import { Alert } from "@sveltestrap/sveltestrap";

    interface AlertProps {
        color: "success" | "warning" | "danger" | "info";
        title: string;
        body: string;
    }

    export let color: AlertProps["color"] = "info";
    export let title: string = "Título por defecto";
    export let body: string = "Mensaje por defecto";
</script>

<div class="alert-container">
    <Alert color={color}>
        <h4 class="alert-heading">{title}</h4>
        <p>{body}</p>
    </Alert>
</div>

<style>
    .alert-container {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1050;
        max-width: 300px;
    }
</style>