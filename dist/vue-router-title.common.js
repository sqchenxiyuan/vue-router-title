'use strict';

var CONFIG = {
    defaultTile:undefined   //默认标题
};

function setTitle(title){
    if (title === undefined || title === null){
        title = CONFIG.defaultTile;
    }
    if (title !== undefined && title !== null && window){
        window.document.title = title;
    }
}

var index = {
    install: function install(Vue,
        ref){
        var defaultTile = ref.defaultTile;
        var router = ref.router;
        var store = ref.store;
        var beforeEach = ref.beforeEach;
        var afterEach = ref.afterEach;


        if (defaultTile !== undefined && defaultTile !== null){
            CONFIG.defaultTile === defaultTile;
        }

        if (router){
            router.afterEach(function (to) {
                var title = to.matched.reduceRight( function (last, data) {
                    if (last) { return last; }
                    if (data.meta && data.meta.title){
                        return data.meta.title;
                    } else {
                        return null;
                    }
                }, null);

                if (typeof title === 'function') { title = title(to, {router: router, store: store}); }

                if (typeof beforeEach === 'function') { title = beforeEach(title, to, {router: router, store: store}); }

                setTitle(title);

                if (typeof afterEach === 'function') { title = afterEach(title, to, {router: router, store: store}); }

            });
        } else {
            console.info('请传入 router 参数');
        }

    }
};

module.exports = index;
