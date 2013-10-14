public var totalBox : int = 0;
public var minDist:float = 1;
public var speed: float = 60;
public var maxSpeed: float = .6;
private var offsetHeight : float = 0;

private var collisionDetect : boolean = false;
private var targetPosition: Vector3;
private var dist:float;


//countdown


public var speedDelay : float = 6;
private var countdown:float;

public var totalSpeed :float;


//increase speed over time to make a fun game !!

//create a booster value


// plus on reste apuyé plus ça va vite ! Fire un starter au début du mouse boutton appuyé et l'enlever au mouse relaché


function Start() {

offsetHeight = transform.position.y;
countdown = speedDelay;

}


function Update() {


if(!collisionDetect) {
	//mouse pressed
	if (Input.GetMouseButton(0) ) {
	
	//timer
 	if(countdown >=0) countdown -= Time.deltaTime;
 	
	//physic
		var playerPlane = new Plane(Vector3.up, transform.position);
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hitdist = 0.0;
		
		if (playerPlane.Raycast(ray, hitdist)) {
		
			//if too near, do nothing
			dist = Vector3.Distance(ray.GetPoint(hitdist), transform.position);
			if(dist < minDist) {
				return false;
			}

			var targetPoint = ray.GetPoint(hitdist);
			targetPosition = ray.GetPoint(hitdist);
			targetPosition.y = offsetHeight;
			var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
			transform.rotation = targetRotation;
		}
	} else {
		 	if(countdown <=speedDelay) countdown = countdown+Time.deltaTime*3;

	}
	if (Input.GetMouseButtonDown(0) ) {
		//debut compteur vitesse
	} else {

	//	countdown = speedDelay; // reset countdown
	}

				dist = Vector3.Distance(targetPosition, transform.position);

	//convert distance from single to float

	var dir: Vector3 = targetPosition - transform.position;
	var dist: float = dir.magnitude;
	var move: float = speed * Time.deltaTime;
	

	if (dist > move ) {
		transform.position += dir.normalized * move;
	} else {
		transform.position = targetPosition;
	}
	
	
	if(totalSpeed > maxSpeed) {
		totalSpeed =maxSpeed;
	} else {
		totalSpeed =  (Time.deltaTime * speed * ((speedDelay-countdown+.3)/3)); // faire quelque chose pour la vitesse de base
	}
	
	
	Debug.Log(dist/30);
	
		transform.position = Vector3.Lerp (transform.position, targetPosition, totalSpeed );  
		//transform.position += (targetPosition - transform.position).normalized * speed * Time.deltaTime;


//
// 
//
//
//
//
//
//
//
//
//
//
//
//

	//faire en sorte que quand le clic est maintenu, plus la distance est proch plus le camion ralenti (que quand le clic est maintenau ! )
	

	} // fin pas collision
	else {
		Debug.Log('collision');
	}
}



 
function OnGUI(){

        if(GUI.Button(Rect(10,10,50,30),"Reset"))   {
 			Application.LoadLevel(0);
 			
 			}
 			
	 GUI.Label(Rect(10,40,90,30),"Caisses : "+ totalBox);
    
    
} 







function OnCollisionEnter(collision : Collision) {
		// Debug-draw all contact points and normals
		
	if(collision.gameObject.tag == "box") {
		totalBox ++;
		Destroy(collision.gameObject);
	}
		
		if(collision.gameObject.name == "mur") {
			//collisionDetect = true;
		}
	Debug.Log(collision.gameObject.name);
	
}




//faire trigger pour detection de murs !

