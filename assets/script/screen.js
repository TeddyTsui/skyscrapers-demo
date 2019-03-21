let Status = cc.Enum({
    ready: 1,
    building: 2,
})

cc.Class({
    extends: cc.Component,

    properties: {
        platform: {
            default: null,
            type: cc.Node,
        },

        platformCtrl: {
            default: null,
            type: cc.Component,
            visible: false,
        },

        hook: {
            default: null,
            type: cc.Node,
        },

        hookController: {
            default: null,
            type: cc.Component,
            visible: false,
        },

        hookCtrlEnable: {
            default: true,
            visible: false
        },

        building: {
            default: null,
            type: cc.Node,
        },

        buildingController: {
            default: null,
            type: cc.Component,
            visible: false,
        },

        buildingBox: {
            default: null,
            type: cc.Node,
            visible: false
        }
        // _status: {
        //     default: Status.ready,
        //     type: Status,
        // },

        // status: {
        //     get() {
        //         return this._status
        //     },

        //     set(value) {
        //         switch(value){
        //             case Status.ready:
        //                 this.node.on(cc.Node.EventType.TOUCH_START, this.build, this)
        //                 break
        //             case Status.building:
        //                 this.node.off(cc.Node.EventType.TOUCH_START, this.build, this)
        //         }
        //     }
        // }
    },

    onLoad() {
        // 获取控制组件
        this.hookController = this.hook.getComponent('hook')

        this.buildingController = this.building.getComponent('building')

        // this.platformCtrl = this.platform.getComponent('platform')

        // 监听冒泡事件
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.doBuild()
            event.stopPropagation()
        }, this)

        this.node.on('buildSucceed', (event) => {
            this.buildSucceed()
            event.stopPropagation()
        })

        this.node.on('buildDone', (event) => {
            this.ready()
            event.stopPropagation()
        })
    },

    start() {
    },

    update() {
    },

    doBuild() {
        if (this.hookController !== null && this.hookCtrlEnable) {
            let node = this.hookController.drop()
            node.setParent(this.building)
            this.buildingBox = node
        }
    },

    buildSucceed() {
        if(this.buildingController !== null){
            this.buildingController.buildSucceed(this.buildingBox)
        }
    },

    ready() {
        this.hookCtrlEnable = true
        if (this.hookController !== null) {
            this.hookController.spawnNewBox()
        }
    }

})