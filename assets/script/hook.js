let Status = require('box')

cc.Class({
    extends: cc.Component,

    properties: {
        boxPrefab: {// 预制盒子
            default: null,
            type: cc.Prefab
        },

        //生成点位置
        boxSpawnX: 0,

        boxSpawnY: 0,

        box: {//当前绑定盒子
            default: null,
            type: cc.Node,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    start() {
        this.swing()
    },

    onLoad() {

    },

    update (dt) {

    },

    drop() {// 掉落
        this.box.getComponent('box').status = Status.building
        return this.box
    },

    spawnNewBox() {// 生成盒子
        let newBox = cc.instantiate(this.boxPrefab)

        this.node.addChild(newBox)

        newBox.setPosition(cc.v2(this.boxSpawnX, this.boxSpawnY))

        let joint = newBox.getComponent(cc.PrismaticJoint)

        joint.connectedBody = this.node.getComponent(cc.RigidBody)

        joint.connectedAnchor = cc.v2(0, -250)

        joint.anchor = cc.v2(0, 50)

        this.box = newBox
    },

    swing() {// 摇摆
        //TODO 
    }
});
