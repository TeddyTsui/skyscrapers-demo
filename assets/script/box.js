cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad() {

    },
    
    onTouch() {
        cc.log('emit func onTouch')
        cc.log(this.getComponent(cc.RopeJoint).enabled)
    }
})