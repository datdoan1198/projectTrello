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
        background-image: url("https://i.pinimg.com/originals/3a/3c/ab/3a3cabd94347cf64dade52882308c780.jpg") ;
        
    }
}
</style>