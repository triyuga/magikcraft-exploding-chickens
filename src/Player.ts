import Events from './Events';

const magik = magikcraft.io;
const log = magik.dixit;

const player = magik.getSender();

const Player = {
	init() {
		this.enableEventListeners();
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
		});
		Events.on('PlayerRespawnEvent', (event) => {
			// PlayerRespawnEvent
		});
		Events.on('PlayerMoveEvent', (event) => {
			// PlayerMoveEvent
			const entities = player.getWorld()['getEntities']();
			entities.forEach(entity => {
				const type = entity.getType();
				log('type:' + type);
			})
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