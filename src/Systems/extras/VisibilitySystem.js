import { System } from "ecsy";
import { Visible } from "../../Components/components.js";
import { Object3DComponent } from "ecsy-three";

export class VisibilitySystem extends System {
  processVisibility(entities) {
    entities.forEach(entity => {
      entity.getObject3D().visible = entity.getComponent(Visible).value;
    });
  }

  execute() {
    this.processVisibility(this.queries.entities.added);
    this.processVisibility(this.queries.entities.changed);
  }
}

VisibilitySystem.queries = {
  entities: {
    components: [Visible, Object3DComponent],
    listen: {
      added: true,
      changed: [Visible]
    }
  }
};
