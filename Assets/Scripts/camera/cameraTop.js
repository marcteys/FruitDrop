#pragma strict

var target : Transform;
var  followSpeed:float = 1;
var followHeight :float = 20;
 
var  offsetX:float =0;
var  offsetZ:float =0;

function Start () {

}

function Update () {
  transform.position = Vector3.Slerp(transform.position, target.position + new Vector3(offsetX, followHeight, offsetZ), Time.deltaTime * followSpeed);
//slerp ou lerp ?? -> slerp plus reactif
}