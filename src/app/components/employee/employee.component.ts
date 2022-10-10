import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from "@angular/forms";
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployee().subscribe(res => {
      this.employeeService.employees = res;
    });
  }

  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.putEmployee(form.value).subscribe(res => {
        console.log(res);
        this.getEmployees();
        form.reset();
      });
    }else{
      this.employeeService.createEmployee(form.value).subscribe(res => {
        console.log(res);
        this.getEmployees();
        form.reset();
      });
    }
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }
  
  deleteEmployee(id: string){
    if (confirm("Are you sure you want to delete it?")){
      this.employeeService.deleteEmployee(id).subscribe(res => {
        console.log(res);
        this.getEmployees();
      });
    }
  }

  resetForm(form: NgForm){
    form.reset();
  }

}
