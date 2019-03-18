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

        rotate_angle: {// 基座旋转角度
            default: 0,
            type: cc.Integer
        },

        status: { // 状态
            type: Status,
            get() {
                return this._status
            },
            set(value) {
                cc.log('status changed: ' + value)
                this._status = value
                switch (value){
                    case Status.building :
                        this.node.getComponent(cc.PrismaticJoint).enabled = false
                        this.node.getComponent(cc.RigidBody).fixedRotation = true
                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0)
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

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(this.status == Status.building){
            if(otherCollider.node.getComponent('box').isTop){
                // TODO 判断落点(接触点)

                let selfPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
                let otherPos = otherCollider.node.convertToWorldSpaceAR(cc.v2(0, 0))

                cc.log( 'onBeginContact say sPos: ' + selfPos + ' oPos: ' + otherPos )

                let currentRoof = otherCollider.node
                let joint = currentRoof.getComponent(cc.RevoluteJoint)
                joint.connectedBody = this.node.getComponent(cc.RigidBody)
                joint.connectedAnchor = cc.v2(0, -50)
                joint.anchor = cc.v2(0, 50)
                this.status = Status.built
            }
        }
    },

    onCollisionEnter: function (other, self) {
        if(this.status == Status.building){
            if(otherCollider.node.getComponent('box').isTop){
                // TODO 判断落点(接触点)

                let selfPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0))
                let otherPos = otherCollider.node.convertToWorldSpaceAR(cc.v2(0, 0))

                cc.log( 'onCollisionEnter say sPos: ' + selfPos + ' oPos: ' + otherPos )
                
                let currentRoof = otherCollider.node
                let joint = currentRoof.getComponent(cc.RevoluteJoint)
                // this.node.getComponent(cc.RigidBody)
                joint.connectedBody = this.node.getComponent(cc.RigidBody)
                joint.connectedAnchor = cc.v2(0, -50)
                joint.anchor = cc.v2(0, 50)
                this.status = Status.built
            }
        }
    },

    wave() {
        // 基座摇摆
        let waveSequence = cc.sequence(cc.rotateTo(1, 15),cc.rotateTo(1, 0), cc.rotateTo(1, -15), cc.rotateTo(1, 0))
        let action = cc.repeatForever(waveSequence)
        this.node.runAction(action)
    }

})

module.exports = Status