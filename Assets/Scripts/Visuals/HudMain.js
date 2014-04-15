#pragma strict

var zedFont : Font;
var labelFontSize : int;

var zed : GameObject;
var sword : Texture2D;
var revolver : Texture2D;
var assaultRifle : Texture2D;
var shotgun : Texture2D;
var leftBracket : Texture2D;
var rightBracket : Texture2D;
var bulletSkins : Texture2D[];

var healthBar : Texture2D;
var healthSymbol : Texture2D;

private var zedResources : ZedResources;
private var clipSize : int;
private var bullets : int;
private var clipBullets : Texture2D[];
private var weapon : Weapon;
private var lastWeaponId : String;

function Start() {
	zedResources = zed.GetComponent(ZedResources);
	bullets = 0;
	reloadClip();
	lastWeaponId = "";
}

function OnGUI() {
	GUI.skin.font = zedFont;
	GUI.skin.label.fontSize = labelFontSize;

	weapon = zedResources.weapons[zedResources.currentWeaponIndex];
	clipSize = weapon.getClipSize();
	GUI.color = new Color(0.0, 0.0, 0.0, 0.2);
	GUI.DrawTexture(Rect(Screen.width/2 - 80,  Screen.height-30, 200, 18), healthBar, ScaleMode.StretchToFill); 
	
	GUI.color = new Color(0.0, 0.0, 0.0, 0.4);
	GUI.DrawTexture(Rect(Screen.width/2 - 100, Screen.height-30, 8, 18), healthSymbol, ScaleMode.StretchToFill); 
	GUI.DrawTexture(Rect(Screen.width/2 - 80,  Screen.height-30, 2*zedResources.getHealth(), 18), healthBar, ScaleMode.StretchToFill); 
	
	
	GUI.Label(
		Rect(10, 175, 100, 120), 
		"Score: " +  zedResources.getExperience().ToString() +
		"\nHealth: " +  zedResources.getHealth().ToString() + 
		"\nSkillPoints: " + zedResources.getSkillPoints().ToString() +
		"\nMoney: " + zedResources.getMoney().ToString()
		);
	
	if (weapon.getId() != null) {
		var melee : boolean = false;
		
		// Weapon image
		if (weapon.getId().Equals("assaultRifle")) {
			GUI.DrawTexture(Rect(10, 10, 237, 86), assaultRifle, ScaleMode.ScaleAndCrop, true);
		} else if (weapon.getId().Equals("shotgun")) {
			GUI.DrawTexture(Rect(10, 10, 237, 86), shotgun, ScaleMode.ScaleAndCrop, true);
		} else if (weapon.getId().Equals("revolver")) {
			GUI.DrawTexture(Rect(10, 10, 237, 86), revolver, ScaleMode.ScaleAndCrop, true);
		} else if (weapon.getId().Equals("sword")) {
			GUI.DrawTexture(Rect(10, 10, 237, 86), sword, ScaleMode.ScaleAndCrop, true); // placeholder texture
			melee = true;
		}
		
		
		if (!melee) {
			// Total bullets left
			GUI.Label(
	    		Rect(10, 145, 100, 100), 
	    		weapon.getBullets().ToString() + "\\"+  weapon.getBulletsInClip().ToString());
		
			// Clip image
			if (weapon.getJustReloaded() || !weapon.getId().Equals(lastWeaponId)) {
				reloadClip();
			}
			// Clip image overlay
			GUI.DrawTexture(Rect(10, 100, 24, 38), leftBracket, ScaleMode.ScaleAndCrop, true);
			var i : int;
			bullets = weapon.getBulletsInClip();
			for (i = 0; i < bullets; i++) {
				GUI.DrawTexture(Rect(17 + i*9, 105, 9, 28), clipBullets[i], ScaleMode.ScaleAndCrop, true);
			}
			GUI.DrawTexture(Rect(0 + clipBullets.length*9, 100, 24, 38), rightBracket, ScaleMode.ScaleAndCrop, true);
			// Clip image background
			GUI.color = new Color(0.0, 0.0, 0.0, 0.10);
			for (i = 0; i < clipBullets.length; i++) {
				GUI.DrawTexture(Rect(17 + i*9, 105, 9, 28), clipBullets[i], ScaleMode.ScaleAndCrop, true);
			}
		}
	}
	
	lastWeaponId = weapon.getId();
}

function reloadClip() {
	clipSize = weapon.getClipSize();
	clipBullets = new Texture2D[clipSize];
	for (var i = 0; i < clipSize; i++) {
		clipBullets[i] = getRandomBulletTexture();
	}
	weapon.falsifyJustReloaded();
}


function getRandomBulletTexture() : Texture2D {
	var bulletNumber : int = Mathf.FloorToInt(Random.Range(0, bulletSkins.Length-0.01));
	return bulletSkins[bulletNumber];
}