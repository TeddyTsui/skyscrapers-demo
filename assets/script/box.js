let Status = cc.Enum({
    ready: 1,
    building: 2,
    built: 3,
    base: 4,
})

cc.Class({
    extends: cc.Component,

    properties: {
        _status: {
            default: Status.ready,
            type: Status,
            visible: false,
        },
        status: {
            type: Status,
            get() {
                return this._status
            },
            set(value) {
                this._status = value
                switch (value){
                    case Status.building :
                        this.node.getComponent(cc.PrismaticJoint).enabled = false
                        this.node.getComponent(cc.RigidBody).fixedRotation = true
                        cc.log(value)
                        //TODO set speed
                        break
                    case Status.built :
                        this.node.getComponent(cc.RigidBody).fixedRotation = false
                        this.node.getComponent(cc.RevoluteJoint).enabled = true
                        cc.log(value)
                        break
                    case Status.base :
                        this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static
                        cc.log(value)
                        break
                    default: 
                        cc.log(value)
                }
            }
        }
    },

    onLoad() {
    
    },

    onTouch() {
        cc.log('emit func onTouch')
        cc.log(this.getComponent(cc.RopeJoint).enabled)
    },

    wave() {
        //TODO 摇摆
    }

})