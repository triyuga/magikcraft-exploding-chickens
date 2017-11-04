import Events from './Events';

const magik = magikcraft.io;
const log = magik.dixit;

const player = magik.getSender();

const Player = {
	init() {
		this.enableEventListeners();
		this.setupInventory();
	},

	enableEventListeners() {
		Events.registerAll();
		Events.on('ProjectileHitEvent', (event) => { 
			log('ProjectileHitEvent'); 
						// Identify shooter.
			const shooter = event.getEntity().getShooter();
			if (!shooter || shooter.getName() !== player.getName()) {
				return;
			}
			
			// Get loc
			let loc:any = null;
			if (event.getHitEntity()) {
				loc = event.getHitEntity().getLocation();
			} else if (event.getHitBlock()) {
				loc = event.getHitBlock().getLocation();
			}

			if (!loc) return;
			
			const location = `${loc.getX()} ${loc.getY()} ${loc.getZ()}`;
			const server = magik.getPlugin().getServer();
			const cmd = `execute ${player.getName()} ~ ~ ~ summon CHICKEN ${location}`;
			server.dispatchCommand(server.getConsoleSender(), cmd);

			magik.setTimeout(() => {
				log('explode!');
				const entities = player.getWorld()['getEntities']();
				entities.forEach(entity => {
					const type = entity.getType();
					if (type == 'CHICKEN') {
						if(entity.getLocation().distance(player.getLocation()) <= 30) {
							entity.getWorld().createExplosion(entity.getLocation(), '5.0F');
							entity.setHealth(0);
						}
					}
				});
			}, 3000)
		});
		Events.on('PlayerRespawnEvent', (event) => {
			// PlayerRespawnEvent
		});
		Events.on('PlayerMoveEvent', (event) => {
			// PlayerMoveEvent
			// log('PlayerMoveEvent!');
			// const entities = player.getWorld()['getEntities']();
			// entities.forEach(entity => {
			// 	const type = entity.getType();
			// 	if (type == 'CHICKEN') {
			// 		if(entity.getLocation().distance(player.getLocation()) <= 10) {
						
			// 		}
			// 	}
			// })
		});
	},

	setupInventory() {
		const items = [
			{ type: 'EGG', amount: 256 },
		];

		const server = magik.getPlugin().getServer();
		items.map(item => {
			server.dispatchCommand(server.getConsoleSender(), `give ${player.getName()} ${item.type} ${item.amount}`);
			magik.dixit(`server.dispatchCommand(give ${player.getName()} ${item.type} ${item.amount})`);
		});
	},
}

export default Player;