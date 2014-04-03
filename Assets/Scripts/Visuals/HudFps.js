#pragma strict

function OnGUI(){
    GUI.Label(
    		Rect(Screen.width - 200,Screen.height - 60,Screen.width,Screen.height), 
    		"FPS: " + (Mathf.RoundToInt((Time.timeScale/Time.smoothDeltaTime))).ToString() 
    		+ "\nTime.deltaTime = " + Time.deltaTime);
}				