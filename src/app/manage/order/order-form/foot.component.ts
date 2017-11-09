import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-demo',
  template: `
    <div>
      
    </div>
  `
})
export class FooterComponent {

  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data.splice(0, 5);
    });
  }

  fetch(cb) {
    cb([{
      "name": "Ethel Price",
      "gender": "female",
      "company": "Johnson, Johnson and Partners, LLC CMP DDC",
      "age": 22
    },
      {
        "name": "Claudine Neal",
        "gender": "female",
        "company": "Sealoud",
        "age": 55
      },
      {
        "name": "Beryl Rice",
        "gender": "female",
        "company": "Velity",
        "age": 67
      },
      {
        "name": "Wilder Gonzales",
        "gender": "male",
        "company": "Geekko"
      },
      {
        "name": "Georgina Schultz",
        "gender": "female",
        "company": "Suretech"
      },
      {
        "name": "Carroll Buchanan",
        "gender": "male",
        "company": "Ecosys"
      }])
  }

}
