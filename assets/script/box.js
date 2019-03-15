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

        isWaving: false,

        isTop: false,

        rotate_angle: {
            default: 0,
            type: cc.Integer
        },

        status: {
            type: Status,
            get() {
                return this._status
            },
            set(value) {
                cc.log('status changed')
                this._status = value
                switch (value){
                    case Status.building :
                        this.node.getComponent(cc.PrismaticJoint).enabled = false
                        this.node.getComponent(cc.RigidBody).fixedRotation = true
                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0)
                        //TODO set speed
                        break
                    case Status.built :
                        this.node.getComponent(cc.RigidBody).fixedRotation = false
                        this.node.getComponent(cc.RevoluteJoint).enabled = true
                        break
                    case Status.base :
                        this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static
                        break
                    default: 
                        cc.log(value)
                }
            }
        }
    },

    onLoad() {
    
    },

    start() {
        if(this.isWaving){
            this.wave()
        }
    },

    onTouch() {
        cc.log('emit func onTouch')
        cc.log(this.getComponent(cc.RopeJoint).enabled)
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(this.status == Status.building){
            if(otherCollider.node.isTop){
                let currentRoof = otherCollider.node
                let joint = currentRoof.getComponent(cc.RevoluteJoint)
                joint.connectedBody = this.node.getComponent(cc.RigidBody)
                this.node.status = Status.built
            }
        }
    },

    wave() {
        //TODO 摇摆
        let waveSequence = cc.sequence(cc.rotateTo(1, 15),cc.rotateTo(1, 0), cc.rotateTo(1, -15), cc.rotateTo(1, 0))
        let action = cc.repeatForever(waveSequence)
        this.node.runAction(action)
    }

})

module.exports = Status