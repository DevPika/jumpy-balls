import { Component } from "ecsy";
import { ThreeTypes } from "ecsy-three";
import * as THREE from "three";

export class Transform extends Component {}

Transform.schema = {
  position: { default: new THREE.Vector3(), type: ThreeTypes.Vector3 },
  rotation: { default: new THREE.Vector3(), type: ThreeTypes.Vector3 }
};
