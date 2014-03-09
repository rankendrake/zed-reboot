#pragma strict

private var weapon : GetWeapon;

var assaultRifle : Texture2D;
var shotgun : Texture2D;

function Start() {
	weapon = GameObject.Find("zed").GetComponent(GetWeapon);
}

function OnGUI() {
	var id : String = weapon.getId();
	if (id != null) {
		GUI.color = new Color(0.0, 0.0, 0.0, 0.25);
		if (id.Equals("assault rifle")) {
			GUI.DrawTexture(Rect(10, 10, 237, 86), assaultRifle, ScaleMode.ScaleAndCrop, true);
		} else if (id.Equals("shotgun")) {
			GUI.DrawTexture(Rect(10, 10, 237, 86), shotgun, ScaleMode.ScaleAndCrop, true);
		}
	}

}