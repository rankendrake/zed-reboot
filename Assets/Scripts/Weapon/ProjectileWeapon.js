#pragma strict

class ProjectileWeapon extends Weapon {
	var rateOfFire : float;
	var firePower : float;
	var bulletVelocity : float;
	var spread : float;
	var clipSize : int;
	var reloadTime : float;
	var bulletPrefab : GameObject;
	var zedMovement : ZedMovement;
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
			bulletVelocity : float,
			spread : float,
			clipSize : int,
			reloadTime : float,
			id : String,
			bulletPrefab : GameObject, 
			zedMovement : ZedMovement,
			firingSound : AudioSource,
			reloadingSound : AudioSource) {
			
		this.rateOfFire = rateOfFire;
		this.firePower = firePower;
		this.bulletVelocity = bulletVelocity;
		this.spread = spread;
		this.clipSize = clipSize;
		this.reloadTime = reloadTime;
		this.id = id;
		this.bulletPrefab = bulletPrefab;
		this.zedMovement = zedMovement;
		this.firingSound = firingSound;
		this.reloadingSound = reloadingSound;
			
		bullets = 1000; // hardcoded, should be dynamic in future implementation.
		reload();
	}
	
	// @Override
	function strike() {
		if (Time.time > reloadEndTime && 
			Time.time > lastShotTime + 1/rateOfFire ) {
			justReloaded = false;
			if (bulletsInClip > 0) {
				bulletsInClip--;
				var angle : float = Vector2.Angle(zedMovement.getDirection(), Vector2.right);
				if (zedMovement.getDirection().y < 0) angle *= -1;
				var newBullet : GameObject = Instantiate(bulletPrefab, 
						zedMovement.getPosition(), Quaternion.AngleAxis(angle, Vector3.forward));
				newBullet.GetComponent(BulletProperties).setPower(firePower);
				newBullet.rigidbody2D.velocity = bulletVelocity*zedMovement.getDirection();
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
	
	function increaseFirePower(factor : float) {
		firePower *= factor;
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