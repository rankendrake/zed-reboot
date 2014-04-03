#pragma strict

var perkMenuBackground : Texture2D;
var purchasedIcon : Texture2D; // checkmark-image
var zedResources : ZedResources;
var perkStock : PerkStock;

// all lengths are fractions of Screen.width 
var backgroundWidth : float;
var backgroundHeight : float;
var backgroundCenter : Vector2;
var iconSize : Vector2; 
var iconVerticalDistance : float;
var iconHorizontalDistance : float;
var iconOffset : Vector2; // dist. leftmost+bottom icon -- BG-boundary
var descriptionBoxSize : Vector2;

private var perkMenuActive : boolean = false;

function Update () {
	if (Input.GetKeyDown("space")) {
		if (!perkMenuActive) {
			perkMenuActive = true;
			Time.timeScale = 0;
			
			
		} else {
			perkMenuActive = false;
			Time.timeScale = 1;		
		}
	}
}

function OnGUI() {
	if (perkMenuActive) {
		GUI.DrawTexture(
				Rect((backgroundCenter.x - 0.5*backgroundWidth)*Screen.width, 
						(backgroundCenter.y - 0.5*backgroundHeight)*Screen.width, 
						(backgroundWidth*Screen.width), 
						(backgroundHeight*Screen.width)), 
				perkMenuBackground, 
				ScaleMode.StretchToFill, 
				true);
				
		// draw perk Icons
		for (var categoryIndex : int = 0; 
				categoryIndex < perkStock.CATEGORY_COUNT; categoryIndex++) {
			for (var perkIndex : int = 0;
					perkIndex < perkStock.getCategorySize(categoryIndex); 
					perkIndex++) {
				var perk : Perk = perkStock.getPerk(categoryIndex, perkIndex);
				var position : Vector2 = new Vector2(
						(categoryIndex*iconHorizontalDistance + iconOffset.x 
								+ backgroundCenter.x - 0.5*backgroundWidth)*Screen.width,
						(-perkIndex*iconVerticalDistance - iconOffset.y 
								+ backgroundCenter.y + 0.5*backgroundHeight)*Screen.width);	
				var buttonRect : Rect = new Rect (position.x, position.y, 
						iconSize.x*Screen.width, iconSize.y*Screen.width);
				
				var unlocked : boolean = perkStock.isUnlocked(categoryIndex, perkIndex);
				var active : boolean = perkStock.isActive(categoryIndex, perkIndex);
				
				// disable button if perk is too expensive or unlocked
				if ((!unlocked || perk.getSkillPointCost() > zedResources.getSkillPoints())
						|| active) {
					GUI.enabled = false;
				}													
																																		
				if (GUI.Button (buttonRect,	GUIContent (perk.getPerkIcon(), 
						perk.getName() + "\n" + perk.getSkillPointCost() + " SP"))){					
					purchasePerk(categoryIndex, perkIndex);							
				}
				if (active) {
					GUI.DrawTexture(buttonRect, purchasedIcon, ScaleMode.StretchToFill);
				}
		
				GUI.enabled = true;								
			}
		}
		
		
		GUI.Label (Rect ((backgroundCenter.x - 0.5*descriptionBoxSize.x)*Screen.width, 
						(backgroundCenter.y + 0.5*backgroundHeight - descriptionBoxSize.y)*Screen.width, 
						(descriptionBoxSize.x*Screen.width), 
						(descriptionBoxSize.y*Screen.width)),
							GUI.tooltip);
	} 
}

/*
 * Does not check whether Zed has enough skill points
 */
function purchasePerk(categoryIndex : int, perkIndex : int) {	
	var perk : Perk = perkStock.getPerk(categoryIndex, perkIndex);
	zedResources.changeSkillPoints(-perk.getSkillPointCost());
	perkStock.unlock(categoryIndex);
	zedResources.addPerk(perk);
}