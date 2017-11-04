// package me.junglesociety.explosivechickens;

// import java.util.List;

// import org.bukkit.Bukkit;
// import org.bukkit.entity.Chicken;
// import org.bukkit.entity.Entity;
// import org.bukkit.entity.Player;
// import org.bukkit.event.EventHandler;
// import org.bukkit.event.Listener;
// import org.bukkit.event.player.PlayerMoveEvent;
// import org.bukkit.plugin.java.JavaPlugin;
// import org.bukkit.scheduler.BukkitScheduler;

// public class main extends JavaPlugin implements Listener{
// 	@Override
// 	public void onEnable() {
// 		Bukkit.getServer().getPluginManager().registerEvents(this, this);
// 	}
// 	@Override
// 	public void onDisable() {
		
// 	}
// 	@EventHandler
// 	public void ChickenNear(PlayerMoveEvent e){
// 		Player player = e.getPlayer();
// 		List<Entity> entities = player.getWorld().getEntities();
// 		for(final Entity chicken : entities){
// 			if(chicken instanceof Chicken){
// 				if(chicken.getLocation().distance(player.getLocation()) <= 6){
// 			        BukkitScheduler scheduler = Bukkit.getServer().getScheduler();
// 			        scheduler.scheduleSyncDelayedTask(this, new Runnable() {
// 			            @SuppressWarnings("deprecation")
// 						@Override
// 			            public void run() {
// 			                chicken.getWorld().createExplosion(chicken.getLocation(), 3.0F);
// 			                ((Chicken) chicken).setHealth(0);
// 			            }
// 			        }, 3*20);
// 				}
// 			}
// 		}
// 	}

// }