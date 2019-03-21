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
                this.statusChanged = true
                switch (value) {
                    case Status.building:
                        this.node.getComponent(cc.PrismaticJoint).enabled = false
                        this.node.getComponent(cc.RigidBody).fixedRotation = true
                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0)
                        break
                    case Status.built:
                        this.node.getComponent(cc.RigidBody).fixedRotation = false
                        this.node.getComponent(cc.RevoluteJoint).enabled = true
                        this.node.dispatchEvent(new cc.Event.EventCustom('buildSucceed', true))
                        this.node.dispatchEvent(new cc.Event.EventCustom('buildDone', true))
                        break
                    case Status.base:
                        this.scheduleOnce(() => {
                            this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static
                        }, 0)
                        break
                }
            }
        },

        statusChanged: false,
    },

    onLoad() {

    },

    start() {
        if (this.isWaving) {
            this.wave()
        }
    },

    update(dt) {
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        if (this.status == Status.building) {
            if (otherCollider.node.getComponent('box') &&
                otherCollider.node.getComponent('box').isTop) {
                if (this.whetherToBuild(selfCollider, otherCollider)) {
                    this.doBuilding(selfCollider, otherCollider)
                }
            }
        }
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact(contact, selfCollider, otherCollider) {
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve(contact, selfCollider, otherCollider) {
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(contact, selfCollider, otherCollider) {
    },

    whetherToBuild(self, other) {
        let selfPos = self.node.convertToWorldSpaceAR(cc.v2(0, 0))
        let otherPos = other.node.convertToWorldSpaceAR(cc.v2(0, 0))
        cc.log('onBeginContact say sPos: ' + selfPos + ' oPos: ' + otherPos)
        return true
    },

    fallDown() {

    },

    doBuilding(self, other) {

        let centerArea = 10 // 中心偏差校准阈值

        cc.log('angle: ' + self.node.eulerAngles)

        let selfPos = self.node.convertToWorldSpaceAR(cc.v2(0, 0))
        let otherPos = other.node.convertToWorldSpaceAR(cc.v2(0, 0))

        other.node.getComponent('box').isTop = false

        let currentRoof = other.node
        let joint = currentRoof.addComponent(cc.RevoluteJoint)
        joint.connectedBody = this.node.getComponent(cc.RigidBody)

        joint.collideConnected = true
        joint.lowerAngle = -10
        joint.upperAngle = 10
        joint.enableLimit = true

        let dist = selfPos.x - otherPos.x

        if (Math.abs(dist) < centerArea) {
            joint.connectedAnchor = cc.v2(0, -50)
            joint.anchor = cc.v2(0, 50)
        }else if(dist > 0){
            joint.connectedAnchor = cc.v2(50 - dist, -50)
            joint.anchor = cc.v2(50, 50)
        }else{
            joint.connectedAnchor = cc.v2(-50 - dist, -50)
            joint.anchor = cc.v2(-50, 50)
        }

        this.status = Status.built
        this.isTop = true
    },

    wave() {
        // 基座摇摆
        let waveSequence = cc.sequence(cc.rotateTo(1, 15), cc.rotateTo(1, 0), cc.rotateTo(1, -15), cc.rotateTo(1, 0))
        let action = cc.repeatForever(waveSequence)
        this.node.runAction(action)
    }

})

module.exports = Status