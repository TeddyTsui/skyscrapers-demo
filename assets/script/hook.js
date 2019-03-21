let Status = require('box')

cc.Class({
    extends: cc.Component,

    properties: {
        boxPrefab: {
            default: null,
            type: cc.Prefab
        },

        boxSpawnX: 0,

        boxSpawnY: 0,

        box: {
            default: null,
            type: cc.Node,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    start() {

    },

    onLoad() {

    },

    update (dt) {

    },

    drop() {
        this.box.getComponent('box').status = Status.building
        return this.box
    },

    spawnNewBox() {
        let newBox = cc.instantiate(this.boxPrefab)

        this.node.addChild(newBox)

        newBox.setPosition(cc.v2(this.boxSpawnX, this.boxSpawnY))

        let joint = newBox.getComponent(cc.PrismaticJoint)

        joint.connectedBody = this.node.getComponent(cc.RigidBody)

        joint.connectedAnchor = cc.v2(0, -250)

        joint.anchor = cc.v2(0, 50)

        this.box = newBox
    },
});
