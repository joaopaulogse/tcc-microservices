
import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const urlify = (text) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

const store = new Vuex.Store({
    state:{
        times:[],
        timeSelecionado:'',
        dataTimeSelecionado:[],
        tweets:[],
        polarity:0,
        status_service_1:'stoped',
        status_service_core:'stoped'
    },
    mutations:{
        async getAllTimes(state, payload){
            try {
                let { data } = await axios.get("http://0.0.0.0:3000/api/times");
                state.times = data;
            } catch (error) {
                console.error(error);
            }
        },
        async getTime(state, payload){
            try {
                
                let { data } = await axios.get(`http://0.0.0.0:3000/api/jogos/${payload.time}`);
                state.timeSelecionado = payload.time;
                state.dataTimeSelecionado = data;
                let response = await axios.get(`http://0.0.0.0:3001/tweets/${payload.time}`);
                state.tweets = response.data.map(tweet=>{
                    tweet.tweet = urlify(tweet.tweet)
                    return tweet;
                });
                let totalPolarity = []
                response.data.map((a) => {
                    totalPolarity.push(Number(a.polarity))
                })
                state.polarity = parseInt((totalPolarity.reduce((a,c)=>a+c)/response.data.length)*100)+50
                await store.commit("status")
            } catch (error) {
                console.error(error);
            }
        },
        async status(state, payload){
            let responseService1 = await axios.get("http://0.0.0.0:3000/api/status");
            state.status_service_1 = responseService1.data.status
            let responseServiceCore = await axios.get("http://0.0.0.0:3001/status");
            state.status_service_core = responseServiceCore.data.status
        }
    }
})

export default store;