var target:Transform;
var distance:float = 20.0;
var height:float = 5.0;
var heightDamping:float = 2.0;
 
var lookAtHeight:float = 0.0;
 
var parentRigidbody:Rigidbody;
 
var rotationSnapTime:float = 0.3;
 
var distanceSnapTime:float;
var distanceMultiplier:float;
 
private var lookAtVector:Vector3;
 
private var usedDistance:float;
 
var wantedRotationAngle:float;
var wantedHeight:float;
 
var currentRotationAngle:float;
var currentHeight:float;
 
var currentRotation:Quaternion;
var wantedPosition:Vector3;
 
private var yVelocity:float = 0.0;
private var zVelocity:float = 0.0;
 
function Start () {
 
	lookAtVector =  new Vector3(0,lookAtHeight,0);
 
}
 
function LateUpdate () {
 
	wantedHeight = target.position.y + height;
	currentHeight = transform.position.y;
 
	wantedRotationAngle = target.eulerAngles.y;
	currentRotationAngle = transform.eulerAngles.y;
 
	currentRotationAngle = Mathf.SmoothDampAngle(currentRotationAngle, wantedRotationAngle, yVelocity, rotationSnapTime);
 
	currentHeight = Mathf.Lerp(currentHeight, wantedHeight, heightDamping * Time.deltaTime);
 
	wantedPosition = target.position;
	wantedPosition.y = currentHeight;
 
	usedDistance = Mathf.SmoothDampAngle(usedDistance, distance + (parentRigidbody.velocity.magnitude * distanceMultiplier), zVelocity, distanceSnapTime); 
 
	wantedPosition += Quaternion.Euler(0, currentRotationAngle, 0) * new Vector3(0, 0, -usedDistance);
 
	transform.position = wantedPosition;
 
	transform.LookAt(target.position + lookAtVector);
 
}