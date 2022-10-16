import * as THREE from "three";
import { Component } from "ecsy";
import { ThreeTypes } from "ecsy-three";

export class Scale extends Component {}
Scale.schema = {
  // @fixme
  value: { default: new THREE.Vector3(), type: ThreeTypes.Vector3 }
};
