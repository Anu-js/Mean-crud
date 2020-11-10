import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  successAlert,
  infoAlert,
  errorAlert,
  deleteAlert,
} from 'src/app/shared/sweetalert/sweetalert';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  editMode: boolean = false;
  userDetails = [];
  isShown: boolean = false;
  name: string;
  email: string;
  userData;
  esistingUser;
  userUpdate: FormGroup;
  @ViewChild('updateModal', { static: true })
  updateModal: TemplateRef<any>;

  constructor(
    public _auth: AuthServiceService,
    private userService: UserService,
    private modelService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.esistingUser = this._auth.getUser();
  }

  ngOnInit(): void {
    console.log(this.esistingUser);
    this.getSingleUser(this.esistingUser.id);
    this.initForm();
    this.getUserList();
  }

  getSingleUser(id: string) {
    this.userService.getSingleuser(id).subscribe((res) => {
      console.log(res, 'user');
      this.userData = res.user;
      this.userUpdate.patchValue({
        name: res.user.name,
        email: res.user.email,
      });
    });
  }

  getUserList() {
    this.userService.getusers().subscribe((res) => {
      console.log(res);
      this.userDetails = res;
    });
  }
  private initForm() {
    this.userUpdate = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
    });
  }

  logout() {
    this._auth.onLogout();
  }

  onUpdatePoup() {
    this.modelService.open(this.updateModal);
  }
  onUpdate() {
    this.editMode = true;
  }

  cancelProfieUpdate() {
    this.editMode = false;
    this.modelService.dismissAll();
  }

  OnUpdateProfile() {
    this.userService
      .updateUser(this.userUpdate.value, this.esistingUser.id)
      .subscribe((res) => {
        if (res.success) {
          successAlert(res.msg);
          this.userData = res.user;
          this.getUserList();
          this.userUpdate.patchValue({
            name: res.user.name,
            email: res.user.email,
          });
          this.modelService.dismissAll();
        } else {
          errorAlert(res.msg);
        }
      });
  }

  ondeleteUser(id:string){
    deleteAlert().then((result) => {
      if(result.value){
        this.userService.deleteUser(id).subscribe((res)=>{
          this.getUserList();
          successAlert(res.msg)
        })
      }
    })

  }
}
