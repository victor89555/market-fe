import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../../resource/shared/resource.service"
import {DialogService} from "rebirth-ng";
import {ResourceNode} from "../shared/resourceNode.model"

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {
  resourceTreeData: any[] = []          // 所有资源
  show = false
  urlShow = false
  resourceNode: ResourceNode = new ResourceNode()

  constructor(private resourceService: ResourceService,
              private dialogService: DialogService) {
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
    this.resourceNode.parentId = node.id
    this.resourceNode.pName = node.name
  }

  removeNode(node, parentNode) {
    this.dialogService.confirm({
      title: '提示',
      content: `确定要删除资源：${node.name}？`,
      html: false,

      yes: '确定',
      no: '取消'
    })
      .subscribe(
        data => {
          this.resourceService.deleteNode(node.id).subscribe((res) => {
            this.getResourceTree()
          })
        },
        error => {
        }
      );
    console.log('remove node', `node= ${node.name}; parent= ${parentNode && parentNode.name}`);
  }

  saveNode() {
    this.resourceService.saveNode(this.resourceNode).subscribe((res) => {
      console.log(res);
      this.getResourceTree();
    })
  }

  updateNode(id: number) {
    this.resourceService.updateNode(id, this.resourceNode).subscribe(
      (resourceNode) => {
        this.getResourceTree()
      }
    )
  }

  typeChange() {
    this.urlShow = false
    this.resourceNode.url = "resources"
    switch (this.resourceNode.resourceType) {
      case 0:
        this.resourceNode.icoName = "glyphicon glyphicon-th-large"
        break
      case 1:
        this.resourceNode.icoName = "glyphicon glyphicon-book"
        this.urlShow = true
        break
      case 2:
        this.resourceNode.icoName = "glyphicon glyphicon-cog"
        break
    }
  }
}
