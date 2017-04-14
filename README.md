# vue-router-title 说明

该插件旨在帮助快捷的改变文档标题

## 使用方法

``` javascript

router = new VueRouter({
    routes:[
        {...meta:{ title:"title" }...},
        {...meta:{ title:"title" }...},
        {...meta:{ title:"title" }...},
    ]
);

VueRouterTitle(options)

//or

Vue.use(VueRouterTitle,options) //只是为了看着好看一些

```

## 参数说明

### route.meta.title

类型: String || Funcition(to, {router, store})

说明：给需要配置title的路由的meta标签赋值。当为字符串时会直接将该字符串作为初始的目标标题。当目标为函数时，会传入前往的路由对象、以及包含传入配置的 `router` 和 `store` 两个对象的对象，并利用返回的字符串作为初始的目标标题。

-----

### options.defaultTitle

类型: String

说明：当所在嵌套路由链上没有`meta.title`时，页面标题默认展示为`defaultTile`

### options.router

类型: VueRouter

说明：需要配置的 `router` 对象

### options.Store

类型: Vuex.Store

说明：需要配置的 `Vuex.Store` 对象

### options.beforeEach()

类型: Funcition(title, to, {router, store})

说明：修改标题前执行的函数。会传入当前标题、前往的路由对象、以及包含传入配置的 `router` 和 `store` 两个对象的对象。需要返回一个字符串来作为新的标题。

### options.afterEach()

类型: Funcition(title, to, {router, store})

说明：修改标题后执行的函数。传入的参数同 `beforeEach()`
