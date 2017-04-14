import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterTitle from 'vue-router-title'
Vue.use(VueRouter)

const componentIndex = {
    template:'<div>这是主页</div>'
}

const componentA = {
    template:'<div>这是页面A</div>'
}

const componentB = {
    template:'<div>这是页面B</div>'
}

const router = new VueRouter({
    mode:'history',
    base:'function',
    routes:[
        {
            path:'/',
            meta:{
                title:"主页"
            },
            component:componentIndex
        },
        {
            path:'/a',
            meta:{
                title:"页面a"
            },
            component:componentA
        },
        {
            path:'/b',
            meta:{
                title:"页面b"
            },
            component:componentB
        }
    ]
})
VueRouterTitle({router})

new Vue({
    el:"#app",
    router,
    template:"<div>                                     \
                <router-view></router-view>             \
                <router-link to='/'>/</router-link>     \
                <router-link to='/a'>/a</router-link>   \
                <router-link to='/b'>/b</router-link>   \
            </div>"
})