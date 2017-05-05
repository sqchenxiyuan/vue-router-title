const CONFIG = {
    defaultTitle:undefined   //默认标题
}

function setTitle(title){

    if (title != undefined && window){
        window.document.title = title;
    }

}

function VueRouterTitle(options){
    install(null, options);
}

function install(
        Vue,
        {
            defaultTitle, //默认标题，如果路由链上没有设置标题的话
            router, //路由对象
            store,  //状态对象
            beforeEach, //修改前   传入当前title    返回新的title
            afterEach   //修改后操作
        })
{

    if (defaultTitle != undefined){
        CONFIG.defaultTitle = defaultTitle;
    }

    if (router){
        router.afterEach(to => {
            let title = to.matched.reduceRight( (last, data) => {
                if (last) return last;
                if (data.meta && data.meta.title){
                    return data.meta.title;
                } else {
                    return null;
                }
            }, null);

            if (title == undefined) title = CONFIG.defaultTitle;            

            if (typeof title === 'function') title = title(to, {router, store});

            if (typeof beforeEach === 'function') title = beforeEach(title, to, {router, store});

            setTitle(title);

            if (typeof afterEach === 'function') title = afterEach(title, to, {router, store});

        });
    } else {
        console.info('请传入 router 参数')
    }
}

VueRouterTitle.install = install;

export default VueRouterTitle;
