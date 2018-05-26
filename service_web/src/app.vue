<template>
    <v-app>
        <tool-bar></tool-bar>
        <dashboard></dashboard>
    </v-app>
</template>

<script>
    import ToolBar from "./components/toolBar.vue";
    import Dashboard from './components/dashboard.vue'
    export default {
        components:{
            "tool-bar": ToolBar,
            Dashboard
        }
    }
</script>

<style scoped>

</style>