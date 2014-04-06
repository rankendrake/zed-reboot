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
	weapons[0] = new MeleeWeapon(2, 1, "sword");
	
	// Shotgun
	weapons[1] = new ProjectileWeapon(1.2, 20, 3, 2, 4, 1, 10, 0.5, 2, "shotgun", shotgunBulletPrefab, zed, new Vector2(0.55,-0.1), clips[0],clips[1]);
	
	// AssaultRifle
	weapons[2] = new ProjectileWeapon(10, 100, 30, 2, 80, 1, 20, 0.1, 2, "assaultRifle", assaultRifleBulletPrefab, zed, new Vector2(0.55,-0.1), clips[2],clips[3]);
	
	// Revolver
	weapons[3] = new ProjectileWeapon(1.25, 40, 5, 2, 9, 2, 30, 0.4, 2, "revolver", revolverBulletPrefab, zed, new Vector2(0.55,-0.1), clips[4],clips[5]);

	return weapons;
}