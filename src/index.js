const CONFIG = {
    defaultTile:undefined   //默认标题
}

function setTitle(title){
    if (title === undefined || title === null){
        title = CONFIG.defaultTile;
    }
    if (title !== undefined && title !== null && window){
        window.document.title = title;
    }
}

export default {
    install(Vue,
        {
            defaultTile, //默认标题，如果路由链上没有设置标题的话
            router, //路由对象
            store,  //状态对象
            beforeEach, //修改前   传入当前title    返回新的title
            afterEach   //修改后操作
        }){

        if (defaultTile !== undefined && defaultTile !== null){
            CONFIG.defaultTile === defaultTile;
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

                if (typeof title === 'function') title = title(to, {router, store});

                if (typeof beforeEach === 'function') title = beforeEach(title, to, {router, store});

                setTitle(title);

                if (typeof afterEach === 'function') title = afterEach(title, to, {router, store});

            });
        } else {
            console.info('请传入 router 参数')
        }

    }
}
