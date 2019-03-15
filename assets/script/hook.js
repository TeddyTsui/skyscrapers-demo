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
        boxPrefab: {
            default: null,
            type: cc.Prefab
        },

        boxSpawnX: 0,

        boxSpawnY: 0,

        box: {
            default: null,
            type: cc.Sprite,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    start () {

    },

    onLoad() {
        this.node.parent.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.log('Touch emit')
            this.box.getComponent('box').status = Status.building
        }, this)

    },

    // update (dt) {},

    spawnNewBox() {
        let newBox = cc.instantiate(this.boxPrefab)

        this.node.addChild(newBox)

        newBox.setPosition(cc.v2(this.boxSpawnX, this.boxSpawnY))

        let joint = newBox.getComponent(cc.PrismaticJoint)

        joint.connectedBody = this.node.getComponent(cc.RigidBody)

        joint.connectedAnchor = cc.v2(0, -100)

        joint.anchor = cc.v2(0, 50)

        this.box = newBox
    },
});
