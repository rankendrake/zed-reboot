#pragma strict

var zedResources : ZedResources;

var revolverBulletPrefab : GameObject;
var shotgunBulletPrefab : GameObject;
var assaultRifleBulletPrefab : GameObject;
var zed : GameObject;

function initializeArsenal () : Weapon[] {
	var weapons : Weapon[] = new Weapon[4];
	
	// Sword
	weapons[0] = new MeleeWeapon(2, 1, "sword");
	
	// Shotgun
	weapons[1] = new ProjectileWeapon(4, 1, 1, 2, 4, 1, "shotgun", shotgunBulletPrefab, zed.GetComponent(ZedMovement));
	
	// AssaultRifle
	weapons[2] = new ProjectileWeapon(20, 400, 100, 2, 80, 1, "assaultRifle", assaultRifleBulletPrefab, zed.GetComponent(ZedMovement));
	
	// Revolver
	weapons[3] = new ProjectileWeapon(2, 3, 40, 2, 9, 2, "revolver", revolverBulletPrefab, zed.GetComponent(ZedMovement));

	return weapons;
}