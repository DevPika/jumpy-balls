import { System } from "ecsy";
import { OnObject3DAdded } from "../../Components/components.js";
import { Object3DComponent } from "ecsy-three";

export class OnObject3DAddedSystem extends System {
  execute() {
    const entities = this.queries.entities.added;

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const component = entity.getComponent(OnObject3DAdded);
      component.callback(entity.getObject3D());
    }
  }
}

OnObject3DAddedSystem.queries = {
  entities: {
    components: [OnObject3DAdded, Object3DComponent],
    listen: {
      added: true
    }
  }
};
