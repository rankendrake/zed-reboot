#pragma strict
var boxWidth : float;  // fraction of Screen.width
var boxHeight : float; // fraction of Screen.width
var padding : float;
var screenYFraction : float;
var zedResources : ZedResources;

var aname : String;

private var promptOpen : boolean = false;

function OnGUI() {
	if (promptOpen) {
		// Create general box
		GUI.Box(
			Rect((0.5 - (boxWidth/2))*Screen.width,
			screenYFraction*Screen.height,
			boxWidth*Screen.width,
			boxHeight*Screen.height), 
			"What is your name, mortal one?");

		GUI.BeginGroup(
			Rect((0.5 - (boxWidth/2))*Screen.width + padding,
			screenYFraction*Screen.height,
			boxWidth*Screen.width - 2*padding,
			boxHeight*Screen.height));

		GUILayout.Space(32);

		aname = GUILayout.TextField(aname);
		if (GUILayout.Button("To the Hall of Fame", GUILayout.Width(boxWidth*Screen.width - 2*padding), GUILayout.Height(38))) {
			HighScoreManager._instance.SaveHighScore(aname, zedResources.getExperience(), System.DateTime.Now.ToString());
			closePrompt();  
		}

		GUI.EndGroup();
	}
}

function openPrompt() {
	promptOpen = true;
}

function closePrompt() {
	promptOpen = false;
	Application.LoadLevel("HighScores");
}