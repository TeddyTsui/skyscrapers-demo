// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let Status = require('box')

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        camera: {
            default: null,
            type: cc.Node
        },

        levels: {
            default: [],
            type: [cc.Node]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    goUpstairs() {
        let action = cc.moveBy(2, cc.v2(0, 100))
        this.camera.runAction(action)
    },

    buildSucceed(newBox) {
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
