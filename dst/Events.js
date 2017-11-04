"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Emitter = new events_1.EventEmitter();
var magik = magikcraft.io;
var log = magik.dixit;
var EventPriority = Java.type("org.bukkit.event.EventPriority");
var EventCallback = Java.type("io.magikcraft.EventCallback");
var eventTypes = {
    PlayerMoveEvent: 'org.bukkit.event.entity.PlayerDeathEvent',
    ProjectileHitEvent: 'org.bukkit.event.entity.ProjectileHitEvent',
};
var Events = {
    on: function (eventName, callback) { return Emitter.on(eventName, callback); },
    registerAll: function () {
        var _loop_1 = function (type) {
            var javaType = eventTypes[type];
            log('registering event: ' + type);
            log('javaType: ' + javaType);
            magik.getPlugin().registerEvent(Java.type(javaType).class, EventPriority.MONITOR, true, new EventCallback({
                callback: function (event) {
                    Emitter.emit(type, event);
                }
            }));
        };
        for (var type in eventTypes) {
            _loop_1(type);
        }
    },
};
exports.default = Events;
