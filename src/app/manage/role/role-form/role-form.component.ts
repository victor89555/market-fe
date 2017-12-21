import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core'
import {Modal, TreeViewComponent} from "rebirth-ng"
import {Role} from "../shared/role.model"
import {RoleService} from "../shared/role.service"
import {ResourceService} from "../../resource/shared/resource.service"

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit, Modal {

  @ViewChild("checkedTreeView")
  treeViewComponent: TreeViewComponent

  context: { id: number, add: boolean }
  dismiss: EventEmitter<Role>
  role: Role = new Role()
  resourceTreeData: any[] = []          // 所有资源

  constructor(private roleService: RoleService, private resourceService: ResourceService) {
  }

  ngOnInit() {
    console.log('ModalTestComponent init....')
    this.getResourceTree()
  }

  getRole() {
    let roleOb = this.roleService.get(this.context.id)
    roleOb.subscribe(
      (role) => {
        this.role = role
      }
    )
    return roleOb
  }

  getResourceTree() {
    let treeDataOb = this.resourceService.getTreeData()
    treeDataOb.subscribe(
      (treeData) => {
        if (!this.context.add) {
          this.getRole().subscribe(() => {
            this.setChecked(treeData, this.role.resourceIds)
            this.resourceTreeData = treeData
          })
        } else {
          this.resourceTreeData = treeData
        }
      }
    )
    return treeDataOb
  }

  private setChecked(treeData, resourceIds) {
    treeData.forEach(node => {
      node["$check"] = resourceIds.includes(node.id)
      let nodeChildren = node["children"]
      if (nodeChildren) {
        this.setChecked(nodeChildren, resourceIds)
      }
    })
  }

  save() {
    let checkedNodes = this.treeViewComponent.getCheckedNodes()
    const checkedResourceIds = checkedNodes.map(checkedNode => {
      let node = checkedNode["node"]
      return node.id
    })
    this.role.resourceIds = checkedResourceIds
    this.roleService.save(this.role).subscribe(
      (role) => {
        this.dismiss.emit(role)
      }
    )
  }

  cancel() {
    this.dismiss.error(this.role)
  }

}
