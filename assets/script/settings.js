cc.game.on(cc.game.EVENT_ENGINE_INITED, () => {

    let physicsManager = cc.director.getPhysicsManager()

    physicsManager.enabled = true

    physicsManager.debugDrawFlags =
        // 0;
        // cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_jointBit |
        cc.PhysicsManager.DrawBits.e_shapeBit

    // let colliderManager = cc.director.getCollisionManager()

    // colliderManager.enabled = true
});