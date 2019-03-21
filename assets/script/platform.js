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
