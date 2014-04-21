/*
 * As Zed dies, a prompt comes up asking for the player's name.
 * Includes functionality for submitting the score and displaying the High Scores scene.
 */

#pragma strict

var zedFont : Font;
var flavourTextFontSize : int;
var inputFontSize : int;
var maxInputLength : int;
var buttonFontSize : int;

var boxWidth : float;  // fraction of Screen.width
var boxHeight : float; // fraction of Screen.width
var textFieldHeight : float;
var buttonHeight : float;
var screenYFraction : float;
var zedResources : ZedResources;
var zedStrike : ZedStrike;
var zedMovement : ZedMovement;

var defaultScreenWidth : int = 1400; // for font size calculation
private var screenToDefaultScreenRatio : float; // for scaling across different resolutions

var aname : String = ""; // can be set to any default name to have been written in the prompt automatically

private var promptOpen : boolean = false;

private var centeredStyle : GUIStyle;

function Awake() {
	screenToDefaultScreenRatio = parseFloat(Screen.width)/defaultScreenWidth;
}

function OnGUI() {
	GUI.skin = null;

	if (promptOpen) {
		// Create general box
		changeFontSize(flavourTextFontSize, GUI.skin.box);
		changeFontSize(inputFontSize, GUI.skin.textField);
		changeFontSize(buttonFontSize, GUI.skin.button);

		GUI.Box(
			Rect((0.5 - (boxWidth/2))*Screen.width,
			screenYFraction*Screen.height,
			boxWidth*Screen.width,
			boxHeight*Screen.height), 
			"What is your name,\nmortal one?");

		GUILayout.BeginArea(
			Rect((0.5 - (boxWidth/2))*Screen.width,
			screenYFraction*Screen.height,
			boxWidth*Screen.width,
			boxHeight*Screen.height));
		GUILayout.Space(boxHeight*Screen.height - textFieldHeight*screenToDefaultScreenRatio - 4);

		GUI.SetNextControlName("inputField");

		var chr : char = Event.current.character;
		// makes sure an empty string is not submitted, but if there is text,
		// the enter button works as a submit
        if (Event.current.type == EventType.KeyDown && Event.current.keyCode == KeyCode.Return) {
        	if (aname == String.Empty) {
        		Event.current.character = "\0"[0];
        	} else {
        		hallOfFameButtonPressed();
        	}
        } else {
        	// only accepts the following characters
        	if ((chr < "a"[0] || chr > "z"[0]) && 
        		(chr < "A"[0] || chr > "Z"[0]) && 
        		(chr < "0"[0] || chr > "9"[0]) && 
        		(chr != "-"[0]) &&
        		(chr != " "[0])) {
       			Event.current.character = "\0"[0];
    		}
        	aname = GUILayout.TextField(aname, maxInputLength, centeredStyle, GUILayout.Height(textFieldHeight*screenToDefaultScreenRatio));
        }

		GUILayout.EndArea();

		GUILayout.BeginArea(
			Rect((0.5 - (boxWidth/2))*Screen.width,
			screenYFraction*Screen.height + boxHeight*Screen.height + 4,
			boxWidth*Screen.width,
			buttonHeight));
		if (GUILayout.Button("To the Hall of Fame", GUILayout.Width(boxWidth*Screen.width), GUILayout.Height(buttonHeight))) {
			if (aname != String.Empty) {
 				hallOfFameButtonPressed();
			}
		}
		GUILayout.EndArea();

		// As the prompt opens, focus is automatically put on the textbox.
		if (GUI.GetNameOfFocusedControl() == String.Empty) {
		    GUI.FocusControl("inputField");
		}
	}

	GUI.skin = null;
}

function openPrompt() {
	promptOpen = true;
}

function closePrompt() {
	promptOpen = false;
	Application.LoadLevel("HighScores");
}

function changeFontSize(newsize : int, element : GUIStyle) {
	element.fontSize = newsize*screenToDefaultScreenRatio;
	centeredStyle = GUIStyle(element);
    centeredStyle.alignment = TextAnchor.MiddleCenter;
}

// Saves the high score with other data.
function hallOfFameButtonPressed() {
	var timeInSeconds : float = Time.timeSinceLevelLoad;
	var minutes : int = timeInSeconds / 60;
	var seconds : int = timeInSeconds % 60;
	var timeString : String = minutes.ToString() + ":";
	if (seconds < 10) {
		timeString = timeString + "0" + seconds.ToString();
	} else {
		timeString = timeString + seconds.ToString();		
	}

	HighScoreManager._instance.SaveHighScore(
		aname, 
		zedResources.getExperience(), 
		System.DateTime.Now.ToString(), 
		zedStrike.getPercentageHit(),
		zedMovement.getDistanceCovered(),
		timeString);
	closePrompt(); 
}