import { EventEmitter } from 'events';
const Emitter = new EventEmitter();

const magik = magikcraft.io;
const log = magik.dixit;

declare const Java: any;
const EventPriority = Java.type("org.bukkit.event.EventPriority");
const EventCallback = Java.type("io.magikcraft.EventCallback");

const eventTypes = {
	PlayerMoveEvent: 'org.bukkit.event.player.PlayerMoveEvent',
	ProjectileHitEvent: 'org.bukkit.event.entity.ProjectileHitEvent',
	PlayerRespawnEvent: 'org.bukkit.event.player.PlayerRespawnEvent',
};

const Events = {

	on: (eventName, callback) => Emitter.on(eventName, callback),

	registerAll: () => {
		for (let type in eventTypes) {
			const javaType = eventTypes[type];
			log('registering event: ' + type);
			log('javaType: ' + javaType);
			magik.getPlugin().registerEvent(
				Java.type(javaType).class,
				EventPriority.MONITOR,
				true,
				new EventCallback({
					callback: function (event: any) {
						Emitter.emit(type, event);
					}
				})
			);
		}
	},
};

export default Events;