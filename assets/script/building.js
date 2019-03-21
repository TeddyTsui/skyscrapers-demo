let Status = require('box')

cc.Class({
    extends: cc.Component,

    properties: {
        camera: {
            default: null,
            type: cc.Node
        },

        levels: {// 盒子队列
            default: [],
            type: [cc.Node]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    goUpstairs() {// 镜头移动
        let action = cc.moveBy(2, cc.v2(0, 100))
        this.camera.runAction(action)
    },

    buildSucceed(newBox) {// 添加盒子
        this.levels.push(newBox)

        if(this.levels.length >= 6){
            this.goUpstairs()
            let boxCtrl = this.levels[2].getComponent('box')
            if(boxCtrl != null){
                boxCtrl.status = Status.base
            }

            if(this.levels.length >= 7){
                let node_ready_to_destroy =  this.levels.shift()
                cc.log(this.levels.length)
            }
        }
    }

    // update (dt) {},
});
