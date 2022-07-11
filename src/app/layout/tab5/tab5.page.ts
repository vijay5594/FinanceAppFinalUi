import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  customerId: any = localStorage.getItem('customerId');
  PaymentId: any = localStorage.getItem('productCustomerId');

  _data: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService,


  ) {
    this.getProductHistory();
    
  }
  ngOnInit() {
  }
  getProductHistory() {
    this.apiService.productForCustomerDetails(this.customerId).subscribe(data => {
      this._data = data;
      console.log(data, 'Curent')

    });
  }
  getHistory(data: any) {
    console.log(data, 'geetha')
    let pid = this.userService.PaymentId = data;
    console.log(pid, 'geetha')
    this.apiService.getPayment(pid).subscribe(data => {
      console.log(data, 'geetha')
      this.router.navigate(['tabs/tab4']);
    });
    console.log("geeths")
  }

}
