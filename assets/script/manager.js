cc.Class({
    extends: cc.Component,

    properties: {
        platform: cc.Node, // 平台节点
        // platformCtrl: cc.Component,

        hook: cc.Node, // 钩子节点
        hookController: cc.Component, // 钩子控制
        hookCtrlEnable: true,

        building: cc.Node, // 建筑节点
        buildingController: cc.Component, // 建筑控制

        buildingBox: cc.Node, // 激活状态盒子
    },

    onLoad() {

        // 获取控制组件
        this.hookController = this.hook.getComponent('hook')
        this.buildingController = this.building.getComponent('building')
        // this.platformCtrl = this.platform.getComponent('platform')

        // 监听冒泡事件
        // 监听点击
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.doBuild()
            event.stopPropagation()
        }, this)
        // 监听成功搭建
        this.node.on('buildSucceed', (event) => {
            this.buildSucceed()
            event.stopPropagation()
        })
        // 监听搭建失败
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