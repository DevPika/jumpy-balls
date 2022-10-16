import { Component } from "ecsy";
import { ThreeTypes } from "ecsy-three";
import * as THREE from "three";

export class Position extends Component {}

Position.schema = {
  value: { default: new THREE.Vector3(), type: ThreeTypes.Vector3 }
};
