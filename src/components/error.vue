<template>
    <img src="../assets/bug.png" alt="">
</template>

<script>
export default {
    name:'error',
    created() {
        setTimeout(() => {
            
            this.$router.push('/login')
        }, 3000);
    },
}
</script>

<style>

</style>
