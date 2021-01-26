<template>
    <div class="baseLoginLayout">
        <div class="styles_login">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "baseLoginLayout",
}
</script>

<style lang="scss">
.baseLoginLayout {
    .styles_login{
        height: 100vh;
        overflow: auto;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0093e9;
        background-image: linear-gradient(160deg,#0093e9,#80d0c7);
        
    }
}
</style>