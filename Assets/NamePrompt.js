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

var defaultScreenWidth : int = 1400; // for font size calculation
private var screenToDefaultScreenRatio : float;

var aname : String = "";

private var promptOpen : boolean = false;

private var centeredStyle : GUIStyle;

function Awake() {
	screenToDefaultScreenRatio = parseFloat(Screen.width)/defaultScreenWidth;
}


function OnGUI() {
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
        if (Event.current.type == EventType.KeyDown && Event.current.keyCode == KeyCode.Return) {
        	if (aname == String.Empty) {
        		Event.current.character = "\0"[0];
        	} else {
        		hallOfFameButtonPressed();
        	}
        } else {
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

		if (GUI.GetNameOfFocusedControl() == String.Empty) {
		    GUI.FocusControl("inputField");
		}
	}
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

function hallOfFameButtonPressed() {
	HighScoreManager._instance.SaveHighScore(aname, zedResources.getExperience(), System.DateTime.Now.ToString());
	closePrompt(); 
}