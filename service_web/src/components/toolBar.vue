<template>
    <v-toolbar prominent extended dark>
        <v-container>
            <v-flex xs12 sm6>
                <v-select
                :items="getTeams"
                label="Selecione um time"
                autocomplete
                v-on:change="selecionaTime"
                ></v-select>
            </v-flex>
        </v-container>
        <v-spacer></v-spacer>
        <v-btn outline :color="getStatusService1 == 'stoped' ? 'error' : 'success' " 
            v-on:click="jobStatusService1" >
            Service 1
        </v-btn>
        <v-btn outline :color="getStatusServiceCore == 'stoped' ? 'error' : 'success' " 
            v-on:click="jobStatusServiceCore">
            Service core
        </v-btn>
    </v-toolbar>
</template>

<script>
import axios from 'axios'
    export default {
        async created(){
            await this.$store.commit("getAllTimes")
            await this.$store.commit("status")
        },
        data:()=>{
            return {
                times:[]
            }
        },
        computed:{
            getTeams(){
                return this.$store.state.times;
            },
            getStatusService1(){
                return this.$store.state.status_service_1
            },
            getStatusServiceCore(){
                return this.$store.state.status_service_core
            }
        },
        methods:{
            selecionaTime(data){
                this.$store.commit("getTime", {time:data})
            },
            async jobStatusService1(){
                try {
                    const URL = `http://0.0.0.0:3000/api/${this.$store.state.status_service_1 == 'stoped' ? 'start': 'stop'}`;
                    await fetch(URL, {
                        method: 'GET'
                    })
                    await this.$store.commit("status")
                } catch (error) {
                    console.error(error);
                }
            },
            async jobStatusServiceCore(){
                try {
                    const URL = `http://0.0.0.0:3001/${this.$store.state.status_service_core == 'stoped' ? 'start': 'stop'}`;
                    await fetch(URL, {
                        method: 'GET'
                    })
                    await this.$store.commit("status")
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
</script>

<style scoped>

</style>