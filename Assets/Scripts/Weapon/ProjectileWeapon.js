#pragma strict

class ProjectileWeapon extends Weapon {
	var rateOfFire : float;
	var firePower : float;
	var bulletSpeed : float;
	var spread : float;
	var clipSize : int;
	var reloadTime : float;
	var bulletPrefab : GameObject;
	var zed : GameObject;
	var zedMovement : ZedMovement;
	var zedResources : ZedResources;
	var spawnOffset : Vector2;
	var firingSound : AudioSource;
	var reloadingSound : AudioSource;
	
	
	var bullets : int;
	var bulletsInClip : int;
	var justReloaded : boolean; // for HUD
	var reloadEndTime : float;
	var bulletsInClipBeforeReload : int;
	var lastShotTime : float;
	
	function ProjectileWeapon(rateOfFire : float, 
			firePower : float, 
			bulletSpeed : float,
			spread : float,
			clipSize : int,
			reloadTime : float,
			id : String,
			bulletPrefab : GameObject, 
			zed : GameObject,
			spawnOffset : Vector2,
			firingSound : AudioSource,
			reloadingSound : AudioSource) {
			
		this.rateOfFire = rateOfFire;
		this.firePower = firePower;
		this.bulletSpeed = bulletSpeed;
		this.spread = spread;
		this.clipSize = clipSize;
		this.reloadTime = reloadTime;
		this.id = id;
		this.bulletPrefab = bulletPrefab;
		this.zed = zed;
		this.zedMovement = zed.GetComponent(ZedMovement);
		this.zedResources = zed.GetComponent(ZedResources);
		this.spawnOffset = spawnOffset;
		this.firingSound = firingSound;
		this.reloadingSound = reloadingSound;
			
		bullets = 1000; // hardcoded, should be dynamic in future implementation.
		reload();
	}
	
	// @Override
	function strike() {
		// modifications by perks
		var actualRateOfFire : float = rateOfFire;
		var actualBulletSpeed : float = bulletSpeed;
		var activeWeaponPerks : List.<WeaponPerk> = zedResources.activePerks.getWeaponPerks();
		for (var perk : WeaponPerk in activeWeaponPerks) {
			actualBulletSpeed = actualBulletSpeed*perk.getFirePowerMultiplier();
			actualRateOfFire = actualRateOfFire*perk.getRateOfFireMultiplier();
		}
		
	
		if (Time.time > reloadEndTime && 
			Time.time > lastShotTime + 1/actualRateOfFire ) {
			justReloaded = false;
			if (bulletsInClip > 0) {
				bulletsInClip--;				
				var newBullet : GameObject = Instantiate(bulletPrefab, 
						zedMovement.getPosition(), 
						Quaternion.identity);
				var angle : float = zedMovement.getUpperBodyAngle();
				newBullet.transform.eulerAngles = new Vector3(0, 0, angle);
				
//				newBullet.transform.position.x += Vector2.Dot(
//						Vector2(newBullet.transform.right.x, newBullet.transform.right.y), 
//						Vector2(spawnOffset.x, 0));
//						
//				newBullet.transform.position.y += Vector2.Dot(
//						Vector2(newBullet.transform.right.x, newBullet.transform.right.y), 
//						Vector2(0, spawnOffset.y));
				
				newBullet.transform.position.x = newBullet.transform.position.x
						+ Mathf.Cos(Mathf.Deg2Rad*angle)*spawnOffset.x
						- Mathf.Sin(Mathf.Deg2Rad*angle)*spawnOffset.y;
					
				newBullet.transform.position.y = newBullet.transform.position.y
						+ Mathf.Sin(Mathf.Deg2Rad*angle)*spawnOffset.x
						+ Mathf.Cos(Mathf.Deg2Rad*angle)*spawnOffset.y;
			
				
				newBullet.GetComponent(BulletProperties).setPower(firePower);
				newBullet.GetComponent(BulletMovement).setSpeed(actualBulletSpeed);
				
				
				firingSound.PlayOneShot(firingSound.clip,1.0);
				lastShotTime = Time.time;
				if (bulletsInClip == 0) {
					reload();
				}
			} else {
				reload();
			}
		}
	}
	
	function manualReload() {
		reload();
	}
	
	function addClips(clips : int) {
		bullets += (clips * clipSize);
	}
	
	private function reload() : boolean {
		bulletsInClipBeforeReload = bulletsInClip;
		bulletsInClip = Mathf.Min(clipSize, bullets);
		bullets -= bulletsInClip;
		justReloaded = bulletsInClip > 0;
		if (justReloaded) {
			reloadEndTime = Time.time + reloadTime;
		}
		reloadingSound.PlayDelayed(reloadTime - reloadingSound.clip.length);
		return justReloaded;
	}
	
	function getJustReloaded() : boolean {
		return justReloaded;
	}
	
	function falsifyJustReloaded() {
		justReloaded = false;
	}
	
	function getBullets() : int {
		return bullets;
	}
	
	function getBulletsInClip() : int {
		if (Time.time > reloadEndTime) {
			return bulletsInClip;
		} else {
			return bulletsInClipBeforeReload;
		}
	}
	
	function getReloadEndTime() : float {
		return reloadEndTime;
	}
	
	// @Override
	function getClipSize() : int {
		return clipSize; // 0 is melee
	}
}