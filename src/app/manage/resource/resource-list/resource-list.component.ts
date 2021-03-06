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
  parentShow = true
  saveOrUpdate = true
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
        this.resourceTreeData[0].$expend = true
        // this.showTree(this.resourceTreeData[0].children)
      }
    )
    return treeDataOb
  }

  //递归方法展开树
  showTree(childTree: any) {
    for (let i = 0; i < childTree.length; i++) {
      if (childTree[i].children != []) {
        childTree[i].$expend = true
        this.showTree(childTree[i].children)
      }
    }
  }

  //查找一节点
  findNode(id: number, childTree: any) {
    for (let i = 0; i < childTree.length; i++) {
      if (childTree[i].id == id) {
        this.resourceNode = childTree[i]
      } else if (childTree[i].children != []) {
        this.findNode(id, childTree[i].children)
      }
    }
  }

  addNode(node, parentNode) {
    for (let node in this.resourceNode) {
      this.resourceNode[node] = ''
    }
    this.saveOrUpdate = true
    this.show = true
    this.parentShow = true
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
    if (this.validateResource()) {
      this.resourceService.saveNode(this.resourceNode).subscribe((res) => {
        this.cancel(true)
      })
    }
  }

  cancel(getResource: boolean) {
    for (let node in this.resourceNode) {
      this.resourceNode[node] = ''
    }
    this.show = false
    if (getResource) {
      this.getResourceTree();
    }
    for(let res in this.resourceForm){
      this.resourceForm[res] = true
    }
  }

  updateNode() {
    if (this.validateResource()) {
      this.resourceService.updateNode(this.resourceNode.id, this.resourceNode).subscribe(
        (resourceNode) => {
          this.cancel(true)
        }
      )
    }
  }

  typeChange() {
    this.urlShow = false
    // this.resourceNode.url = ""
    switch (this.resourceNode.resourceType) {
      case 0:
        this.resourceNode.icoName = "glyphicon glyphicon-book"
        break
      case 1:
        this.resourceNode.icoName = "glyphicon glyphicon-th-large"
        this.urlShow = true
        break
      case 2:
        this.resourceNode.icoName = "glyphicon glyphicon-cog"
        break
    }
  }

  nodeItem(node) {
    console.log(node)
    this.saveOrUpdate = false
    this.parentShow = false
    this.show = true
    // this.findNode(node.id,this.resourceTreeData[0].children)
    this.resourceService.getNode(node.id).subscribe((node) => {
      this.resourceNode = node
    })
  }

  // 表单验证
  resourceForm = {
    name: true,
    code: true,
    resourceType: true,
    url: true,
    sortNo: true
  }

  validateResource() {
    this.resourceForm.name = this.resourceNode.name ? true : false
    this.resourceForm.code = this.resourceNode.code ? true : false
    this.resourceForm.resourceType = this.resourceNode.resourceType != null
    if (this.urlShow) {
      this.resourceForm.url = this.resourceNode.url ? true : false
    }
    this.resourceForm.sortNo = this.resourceNode.sortNo ? true : false

    return this.resourceForm.name &&
      this.resourceForm.code &&
      this.resourceForm.resourceType &&
      this.resourceForm.url &&
      this.resourceForm.sortNo
  }
}
