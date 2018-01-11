import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../../resource/shared/resource.service"

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {
  resourceTreeData: any[] = []          // 所有资源
  show = false
  node : string
  parentNode : string
  constructor(private resourceService: ResourceService) {
  }

  ngOnInit() {
    this.getResourceTree()
  }

  getResourceTree() {
    let treeDataOb = this.resourceService.getTreeData()
    treeDataOb.subscribe(
      (treeData) => {
        this.resourceTreeData = treeData
      }
    )
    return treeDataOb
  }
  addNode(node, parentNode) {
    this.show = true
    this.node = node
    this.parentNode = parentNode
    console.log('add node', `node= ${node.name}; parent= ${parentNode && parentNode.name}`);
  }

  removeNode(node, parentNode) {
    console.log('remove node', `node= ${node.name}; parent= ${parentNode && parentNode.name}`);
  }
}
