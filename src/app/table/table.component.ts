import { AfterViewInit,Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataServiceService } from '../data-service.service';
import {Employee,ServerData} from 'src/app/types/Employee';





@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent  implements OnInit
{
  displayedColumns: string[] = ['id','birthDate', 'firstName', 'lastName', 'gender', 'hireDate', 'Delete', 'Edit'];
  data: any;
  dataSources = new MatTableDataSource<Employee>();

  @ViewChild(MatTable)
  table!: MatTable<Employee>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  current: any;

  ngAfterViewInit() 
  {
    this.dataSources.paginator = this.paginator;
  }

  constructor(private restClient:DataServiceService) 
  {
    this.loadData("http://localhost:8080/employees");
    this.dataSources = new MatTableDataSource(this.data?._embedded.employees);
  }

  ngOnInit(): void {
    
  }

  loadData(url : string)
  {
    this.restClient.getDataRows(url).subscribe
    (
      serverResponse => 
      {
        this.data = serverResponse;
        this.dataSources.data = this.data._embedded.employees;
        this.current = url;
      }
    )
  }

  nextpage()
  {
    if (this.data) this.loadData(this.data._links.next.href);
  }

  prevpage()
  {
    if (this.data) this.loadData(this.data._links.prev.href);
  }

  firstpage()
  {
    if (this.data) this.loadData(this.data._links.first.href);
  }

  lastpage()
  {
    if (this.data) this.loadData(this.data._links.last.href);
  }

  DeleteRow(index:number) 
  {
    this.restClient.remove(index).subscribe(()=>{
      this.loadData(this.current);
    })
   
  }
}


