#pragma strict



var skillPointCoinPrefab : GameObject;
var angleDeviationOfDying : float;

var armWeapon : MeleeWeapon;

private var zombieProperties : ZombieProperties;
private var health : float;
private var animatorDead : boolean;

var zedResources : ZedResources;

//var zombieDeathSound : AudioSource;

var zombieDeathSound : AudioClip;
var displayHealthPoints : boolean;

function OnGUI(){
	if (displayHealthPoints) {
		var screenPosition = Camera.main.WorldToScreenPoint(transform.position);
		GUI.Label(new Rect(screenPosition.x, Screen.height-screenPosition.y, 40, 40), ""+health);
	}
}

function Awake() {
	zombieProperties = transform.GetComponent(ZombieProperties);

	health = zombieProperties.getMaxHealth();
	animatorDead = false;
	
	zedResources = GameObject.Find("zed").GetComponent(ZedResources);
	
	armWeapon = new MeleeWeapon(zombieProperties.getAttackDamage(), "ArmWeapon", gameObject);
	var armAttackAngles : float[] = [ 	// triplets of: time, angle, length
		0.00,  60.0, 0.40,				// for the raycast
		0.05,  40.0, 0.40,
		0.45, 135.0, 0.40
	];
	armWeapon.initAngleData(armAttackAngles);
}

function Update() {
	// Zombie is dying
	if (!isAlive() && !animatorDead) {
		var animator : Animator = gameObject.GetComponent(Animator);
		animator.SetBool("isDead", true);
		animatorDead = true;
		animator.SetLayerWeight(2, 0); // stop overriding arm movement
		gameObject.tag = "deadZombie";
		gameObject.name = "deadZombie";
		
		// Play death sound.
		AudioSource.PlayClipAtPoint(zombieDeathSound,transform.position);
		trimUnnecessaryComponents();
			
		// Dying rotation variation
		gameObject.transform.Rotate(new Vector3(0, 0, (Random.value - 0.5)*angleDeviationOfDying));
		
		
		//spriteRenderer.sortingLayerName = "backgroundLayer";
		//spriteRenderer.sortingOrder = -10;
		
		// Tell Zed the difficulty of the zombie which was killed
		zedResources.handleZombieKilled(zombieProperties.getDifficultyLevel());
		
		if (Random.Range(0.0, 1.0) < zombieProperties.getSkillPointDropProbability()) {
			dropSkillPoint();
		}
	}
}

function reduceHealth(reductionAmount : float) {
	health -= reductionAmount;			
	if (health < 0) {
		health = 0;
	}
}

function isAlive() : boolean {
	return (health > 0);
}

function trimUnnecessaryComponents() {
	var components = gameObject.GetComponents(typeof(Component));
    for (var component : Component in components) {
            if (!(component instanceof Transform) &&
            	!(component instanceof Renderer) &&
            	!(component instanceof Animator)) {
                 Destroy(component);
            }
    }
    if(transform.childCount > 0) {
    	var childrenTransforms : Component[] = transform.GetComponentsInChildren(Transform);    
    	for(var i : int = 0; i < childrenTransforms.Length; i++) {
    		var child : Transform = childrenTransforms[i];    		
    		if(child.gameObject.CompareTag("detector")) {
	    		Destroy(child.gameObject);
	    	} else if(child.gameObject.CompareTag("collisionDetector")) {
	    		Destroy(child.gameObject);
	    	}
	    	child.gameObject.isStatic = true;
    	}    	
    }  
    gameObject.isStatic = true;    
}

function dropSkillPoint() {
	Instantiate(skillPointCoinPrefab, transform.position, Quaternion.identity);
}