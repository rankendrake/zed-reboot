#pragma strict

var zedResources : ZedResources;

var revolverBulletPrefab : GameObject;
var shotgunBulletPrefab : GameObject;
var assaultRifleBulletPrefab : GameObject;
var zed : GameObject;
var clips : AudioClip[];

function initializeArsenal () : Weapon[] {
	var weapons : Weapon[] = new Weapon[4];
			
	/*
	Parameters in order:
			rateOfFire : float, 
			firePower : float, 
			bulletVelocity : float,
			spread : float,
			clipSize : int,
			reloadTime : float,
	*/
	
	// Sword
	weapons[0] = new MeleeWeapon(4000, "sword", zed);
	
	// Shotgun
	weapons[1] = new ProjectileWeapon(1.1, 30, 30, 20, 5, 7, 1, 10, 0.5, 2, "shotgun", shotgunBulletPrefab, zed, new Vector2(0.8,-0.13), clips[0],clips[1]);
	
	// AssaultRifle
	weapons[2] = new ProjectileWeapon(7, 20, 30, 0, 1, 24, 1, 20, 0.1, 2, "assaultRifle", assaultRifleBulletPrefab, zed, new Vector2(0.8,-0.13), clips[2],clips[3]);
	
	// Revolver
	weapons[3] = new ProjectileWeapon(1, 120, 50, 0, 1, 6, 2, 30, 0.4, 2, "revolver", revolverBulletPrefab, zed, new Vector2(0.81,-0.02), clips[4],clips[5]);
	
	
	// initialize Sword strike data: time, angle, length
	var swordData : float[] = [
			0.00, -120.0, 0.50,
			0.05,-80.0, 0.80,
			0.15, -60.0, 0.85,
			0.20, -45.0, 1.10,
			0.23, -25.0, 1.15,
			0.25,  05.0, 1.15,
			0.28,  25.0, 1.15,
			0.31,  50.0, 1.15,
			0.40,  0.00, 0.50,
			0.45,-10.00, 0.30
		];
	(weapons[0] as MeleeWeapon).initSwordAngleData(swordData);
	
	return weapons;
}