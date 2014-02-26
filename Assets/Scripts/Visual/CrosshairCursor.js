#pragma strict

//var cursorTexture : Texture2D;
//var cursorMode : CursorMode = CursorMode.Auto;
var hotSpot : Vector2 = Vector2.zero;

//
//function OnGUI() {
//	Cursor.SetCursor(cursorTexture, hotSpot, cursorMode);
//}
//
//
//
//function OnMouseExit() {
//	Cursor.SetCursor(null, Vector2.zero, cursorMode);
//}




//The texture that's going to replace the current cursor  
var cursorTexture : Texture2D;  

//This variable flags whether the custom cursor is active or not  
var ccEnabled : boolean = false;  

function Start() {  
	//Call the 'SetCustomCursor' (see below) with a delay of 1 seconds.   
	Invoke("SetCustomCursor", 1.0f);
	SetCustomCursor(); // to mute warnings
}  

function OnDisable() {  
	//Resets the cursor to the default  
	Cursor.SetCursor(null, Vector2.zero, CursorMode.Auto);  
	//Set the _ccEnabled variable to false  
	this.ccEnabled = false;  
}  

private function SetCustomCursor() {  
	//Replace the 'cursorTexture' with the cursor    
	Cursor.SetCursor(cursorTexture, hotSpot, CursorMode.Auto);  
	//Set the ccEnabled variable to true  
	this.ccEnabled = true;  
}  