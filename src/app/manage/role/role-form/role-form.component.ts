import {Component, EventEmitter, OnInit} from '@angular/core';
import {Modal} from "rebirth-ng";
import {Role} from "../shared/role.model";
import {RoleService} from "../shared/role.service";
import {ResourceService} from "../../resource/shared/resource.service"

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit, Modal {
  context: { id: number, add: boolean };
  dismiss: EventEmitter<Role>;
  role: Role = new Role();
  resourceTreeData: any[] = [];          // 所有资源
  checkedResources: number[] = [];      //  选中的资源

  constructor(private roleService: RoleService, private resourceService: ResourceService) {
  }

  ngOnInit() {
    console.log('ModalTestComponent init....');
    if (!this.context.add) {
      this.getRole();
    }
    this.getResource();
  }

  getRole() {
    this.roleService.get(this.context.id).subscribe(
      (role) => {
        this.role = role;
      }
    )
  }

  getResource() {
    this.resourceService.getTree().subscribe(
      (resourceIds) => {
        this.resourceTreeData = resourceIds;
      }
    )
  }

  save() {
    this.roleService.save(this.role).subscribe(
      (role) => {
        this.dismiss.emit(role);
        console.log(this.checkedResources);
      }
    )
  }

  cancel() {
    this.dismiss.error(this.role);
  }

// 资源分配的结果
  showTreeBack(node) {
    console.log(node);
    if (node.$check) {
      this.checkedResources.push(node.id);
    } else {
      for (let i = 0; i < this.checkedResources.length; i++) {
        if (node.id == this.checkedResources[i]) {
          this.checkedResources.splice(i, 1);
        }
      }
    }
  }
}
