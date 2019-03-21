cc.Class({
    extends: cc.Component,

    properties: {
        camera: {
            default: null,
            type: cc.Node
        },

        cameraOffset: 0,

        followCamera: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.cameraOffset = this.node.y - this.camera.y
    },

    start () {

    },

    //TODO 挂钩平台移动
    // 考虑保持与建筑最上方盒子保持一定距离
    // 考虑随镜头移动

    adjustHeight(offset) {
        this.cameraOffset += offset
        let action = cc.moveBy(2, cc.v2(0, offset))
        this.node.runAction(action)
    },

    update (dt) {
        if(this.followCamera){
            this.node.y = this.camera.y + this.cameraOffset
        }
    },
});
