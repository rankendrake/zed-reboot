#pragma strict

private var weapon : GetWeapon;
private var clipSize : int;
private var bullets : int;
private var clipBullets : Texture2D[];
private var ammoPouch : AmmoPouch;

var assaultRifle : Texture2D;
var shotgun : Texture2D;
var leftBracket : Texture2D;
var rightBracket : Texture2D;
var bullet1 : Texture2D;
var bullet2 : Texture2D;
var bullet3 : Texture2D;
var bullet4 : Texture2D;
var bullet5 : Texture2D;
var bulletSkins : Texture2D[];



function Start() {
	weapon = GameObject.Find("zed").GetComponent(GetWeapon);
	ammoPouch = GameObject.Find("zed").GetComponent(AmmoPouch);
	clipSize = weapon.getClipSize();
	bullets = 0;
	reloadClip();
}

function OnGUI() {
	var id : String = weapon.getId();
	if (!id.Equals("")) {
		GUI.color = new Color(0.0, 0.0, 0.0, 0.25);
		
		// Weapon image
		if (id.Equals("assault rifle")) {
			GUI.DrawTexture(Rect(10, 10, 237, 86), assaultRifle, ScaleMode.ScaleAndCrop, true);
		} else if (id.Equals("shotgun")) {
			GUI.DrawTexture(Rect(10, 10, 237, 86), shotgun, ScaleMode.ScaleAndCrop, true);
		}
		
		// Clip image
		if (weapon.testAndSetClipChanged()) {
			reloadClip();
		}
		// Clip image overlay
		GUI.DrawTexture(Rect(10, 100, 24, 38), leftBracket, ScaleMode.ScaleAndCrop, true);
		var i : int;
		bullets = weapon.getBullets();
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

function reloadClip() {
	bullets = weapon.getBullets();
	clipBullets = new Texture2D[bullets];
	for (var i = 0; i < bullets; i++) {
		clipBullets[i] = getRandomBulletTexture();
	}
}


function getRandomBulletTexture() : Texture2D {
	var bulletNumber : int = Mathf.FloorToInt(Random.Range(0, bulletSkins.Length-0.01));
	return bulletSkins[bulletNumber];
}