<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs4>
                <v-card dark tile flat>
                    <v-card-title>
                        {{timeSelecionado}}
                    </v-card-title>
                    <v-container>
                        <span>Análise sentimental - {{polarity}} - {{polarity > 0 ? 'Positiva' : 'Negativa'}}</span>
                        <v-progress-linear :value="polarityPos.length*100/tweets.length" height="40" color="success"  background-color="error"></v-progress-linear>

                        
                        <div v-for="time in resultadosTime" :key="time.id">
                            <v-card color="white">
                                <v-container style="color:black;">
                                    <div align="center">
                                    Rodada: {{time.rodada}} <br>
                                    <span>{{time.local}} - {{time.hora}} - {{time.dataConfronto}}</span><br>
                                    {{time.mandante}} {{time.placarMandante}} x {{time.placarVisitante}} {{time.visitante}}
                                    </div>
                                </v-container>
                            </v-card>
                            <v-divider></v-divider>
                        </div>
                    </v-container>
                </v-card>
            </v-flex>
           <v-divider inset></v-divider>
            <v-flex xs8>
                <v-card dark tile flat>
                    <v-list two-line id="lista" class="scroll-y" v-scroll:#lista>
                        <template v-for="t in tweets">
                            <!-- <v-subheader v-if="t.header" :key="t.id">{{ t.header }}</v-subheader> -->
                            <!-- <v-divider v-else-if="t." :inset="t.inset" :key="t.id"></v-divider> -->
                            <v-list-tile  :key="t.id" avatar >
                            
                                <v-list-tile-content>
                                    <v-list-tile-title>{{t.user}} - {{t.createdAt}} ({{t.polarity}})</v-list-tile-title>
                                    <v-list-tile-sub-title v-html="t.tweet"></v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider :key="t.id+1"></v-divider>
                        </template>
                    </v-list>
                    <!-- <div v-for="t in tweets" :key="t.id">
                        <v-card>
                            <v-card-title>{{t.user}}</v-card-title>
                            <v-card-text>{{t.tweet}}</v-card-text>
                        </v-card>
                    </div> -->
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed:{
            timeSelecionado(){
                return this.$store.state.timeSelecionado
            },
            resultadosTime(){
                return this.$store.state.dataTimeSelecionado
            },
            tweets(){
                return this.$store.state.tweets;
            },
            polarityPos(){
                return this.$store.state.polaridadePositiva;
            },
            polarityNeg(){
                return this.$store.state.polaridadeNegativa;
            },
            polarity(){
                return this.$store.state.polarity
            }
        }
    }
</script>

<style scoped>
    #lista{
        min-height: 600px;
        max-height: 600px;
    }
</style>