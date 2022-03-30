import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})
export class ApisComponent implements OnInit {
  notFound = false;
  user!: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  getUser(userId: string){
    this.notFound = false;

    
    
    this.userService.getUser(userId).subscribe({
        next: (userFromTheAPI : User) => [this.user = userFromTheAPI, console.log(userFromTheAPI)],
        error: (e) => [console.error(e), this.notFound = true],
        complete: () => console.info('complete') 
    })
  }

}
