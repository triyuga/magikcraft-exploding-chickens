"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("./Events");
var magik = magikcraft.io;
var log = magik.dixit;
var player = magik.getSender();
var Player = {
    init: function () {
        this.enableEventListeners();
        this.setupInventory();
    },
    enableEventListeners: function () {
        Events_1.default.registerAll();
        Events_1.default.on('ProjectileHitEvent', function (event) {
            log('ProjectileHitEvent');
            // Identify shooter.
            var shooter = event.getEntity().getShooter();
            if (!shooter || shooter.getName() !== player.getName()) {
                return;
            }
            // Get loc
            var loc = null;
            if (event.getHitEntity()) {
                loc = event.getHitEntity().getLocation();
            }
            else if (event.getHitBlock()) {
                loc = event.getHitBlock().getLocation();
            }
            if (!loc)
                return;
            var location = loc.getX() + " " + loc.getY() + " " + loc.getZ();
            var server = magik.getPlugin().getServer();
            var cmd = "execute " + player.getName() + " ~ ~ ~ summon CHICKEN " + location;
            server.dispatchCommand(server.getConsoleSender(), cmd);
        });
        Events_1.default.on('PlayerRespawnEvent', function (event) {
            // PlayerRespawnEvent
        });
        Events_1.default.on('PlayerMoveEvent', function (event) {
            // PlayerMoveEvent
            log('PlayerMoveEvent!');
            var entities = player.getWorld()['getEntities']();
            entities.forEach(function (entity) {
                var type = entity.getType();
                log('type:' + type);
            });
        });
    },
    setupInventory: function () {
        var items = [
            { type: 'EGG', amount: 256 },
        ];
        var server = magik.getPlugin().getServer();
        items.map(function (item) {
            server.dispatchCommand(server.getConsoleSender(), "give " + player.getName() + " " + item.type + " " + item.amount);
            magik.dixit("server.dispatchCommand(give " + player.getName() + " " + item.type + " " + item.amount + ")");
        });
    },
};
exports.default = Player;
