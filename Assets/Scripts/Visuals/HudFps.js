/*
 * Shows the FPS of the game as a label. Is not synchronized or even ever equivalent 
 * with the unity built-in FPS meter, just convenient.
 */

#pragma strict

var zedFont : Font;
var labelFontSize : int;

function Awake() {
	Application.targetFrameRate = -1;
}

function OnGUI(){
	GUI.skin.font = zedFont;
	GUI.skin.label.fontSize = labelFontSize;

    GUI.Label(
    		Rect(Screen.width - 200,Screen.height - 60, Screen.width, Screen.height), 
    		"FPS: " + (Mathf.RoundToInt((Time.timeScale/Time.smoothDeltaTime))).ToString() 
    		+ "\nΔTime = " + Time.deltaTime);
    		
	//displayAllTransforms();
}				

// displays all objects' names in the scene as an addition to the FPS
function displayAllTransforms() {
	var gameObjects : Object[] = GameObject.FindObjectsOfType(typeof(GameObject)); //returns Object[]
	
	for (var i : int; i < gameObjects.Length; i++) {
		var g : GameObject = gameObjects[i] as GameObject;
		
		if (g != null) {	
			if (g.transform != null) {
				var screenPosition = Camera.main.WorldToScreenPoint(g.transform.position);
				GUI.Label(new Rect(screenPosition.x, Screen.height-screenPosition.y, 140, 140), g.name);
			//	Debug.Log(g.name + " " + g.transform.position.x);
			}
		}
	}
}