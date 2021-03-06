﻿/*
 * Defines the behaviour of the visuals of the crosshair. Depends on the current scatter angle magnitude:
 * crosshair is as wide as the bullets could ever reach angularly. Thus it also depends on how far the 
 * mouse cursor currently is from Zed.
 */

#pragma strict

var zedTransform : Transform;
var zedResources : ZedResources;
var minRadius : float;
var crosshairTL : Texture2D; // top-left
var crosshairTR : Texture2D; // top-right
var crosshairScale : float;

private var crosshairTextureSize : Vector2;
private final var SQRT_2 : float = Mathf.Sqrt(2);

function Awake() {
	crosshairTextureSize = (new Vector2(crosshairTL.width, crosshairTL.height))*crosshairScale;
}

function OnGUI() {
	if (zedResources.getHealth() > 0) {
		drawCrosshair();
	}
}

function drawCrosshair() {
	var mouseScreenPosition : Vector3 = Input.mousePosition;
	mouseScreenPosition.z = transform.position.z - Camera.main.transform.position.z;
	var mouseWorldPosition : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);

	var zedDisplacement : Vector3 = zedTransform.position - mouseWorldPosition;
	zedDisplacement.z = 0;
	var distanceToZed : float = zedDisplacement.magnitude;
	
	var radius : float = Mathf.Max(minRadius, zedResources.getCurrentScatterAngle()*distanceToZed);	 
	radius = radius/SQRT_2; // if textures are drawn at 45 degrees, this needs to be scaled
	
	// Draw crosshair elements
	GUI.DrawTexture(new Rect(mouseScreenPosition.x - radius - 0.5*crosshairTextureSize.x, 
			Screen.height-mouseScreenPosition.y - radius - 0.5*crosshairTextureSize.y, 
			crosshairTextureSize.x, crosshairTextureSize.y),
			crosshairTL, ScaleMode.ScaleToFit);
	GUI.DrawTexture(new Rect(mouseScreenPosition.x + radius - 0.5*crosshairTextureSize.x, 
			Screen.height-mouseScreenPosition.y - radius - 0.5*crosshairTextureSize.y, 
			crosshairTextureSize.x, crosshairTextureSize.y),
			crosshairTR, ScaleMode.ScaleToFit);
	GUI.DrawTexture(new Rect(mouseScreenPosition.x - radius - 0.5*crosshairTextureSize.x, 
			Screen.height-mouseScreenPosition.y + radius - 0.5*crosshairTextureSize.y, 
			crosshairTextureSize.x, crosshairTextureSize.y),
			crosshairTR, ScaleMode.ScaleToFit);
	GUI.DrawTexture(new Rect(mouseScreenPosition.x + radius - 0.5*crosshairTextureSize.x, 
			Screen.height-mouseScreenPosition.y + radius - 0.5*crosshairTextureSize.y, 
			crosshairTextureSize.x, crosshairTextureSize.y),
			crosshairTL, ScaleMode.ScaleToFit);
}