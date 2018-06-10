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
        <v-btn outline :color="getStatusService1_1 == 'stoped' ? 'error' : 'success' " 
            v-on:click="jobStatusMicroService1_1" >
            Micro 1.1
        </v-btn>
        <v-btn outline :color="getStatusService1_2 == 'stoped' ? 'error' : 'success' " 
            v-on:click="jobStatusMicroService1_2" >
            Micro 1.2
        </v-btn>
        <v-btn outline :color="getStatusServiceCore == 'stoped' ? 'error' : 'success' " 
            v-on:click="jobStatusServiceCore">
            M.S.Core 1.1
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
            getStatusService1_1(){
                return this.$store.state.status_service_1_1
            },
            getStatusService1_2(){
                return this.$store.state.status_service_1_2
            },
            getStatusServiceCore(){
                return this.$store.state.status_service_core
            }
        },
        methods:{
            selecionaTime(data){
                this.$store.commit("getTime", {time:data})
            },
            async jobStatusMicroService1_1(){
                try {
                    const URL = `http://0.0.0.0:3000/api/${this.$store.state.status_service_1_1 == 'stoped' ? 'start1': 'stop1'}`;
                    console.log(URL)
                    await fetch(URL, {
                        method: 'GET'
                    })
                    await this.$store.commit("status")
                } catch (error) {
                    console.error(error);
                }
            },
            async jobStatusMicroService1_2(){
                try {
                    const URL = `http://0.0.0.0:3000/api/${this.$store.state.status_service_1_2 == 'stoped' ? 'start2': 'stop2'}`;
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