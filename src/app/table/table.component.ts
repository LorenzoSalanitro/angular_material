import { AfterViewInit,Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataServiceService } from '../data-service.service';


export interface Dati {
  id: any;
  birthDate: any;
  firstName: any;
  lastName: any;
  gender : any;
  hireDate : any;
}

export interface risposta
{
  _embedded: embedded;
  _links: links;
  page:any;
}

export interface links
{
  self:any;
  first:any;
  prev:any;
  next:any;
  last:any;
  profile:any;
}

export interface embedded
{
  employees:[Dati];
}



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent  implements AfterViewInit
{
  displayedColumns: string[] = ['id','birthDate', 'firstName', 'lastName', 'gender', 'hireDate'];

  dataSources = new MatTableDataSource<risposta>();

  @ViewChild(MatTable)
  table!: MatTable<Dati>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() 
  {
    this.dataSources.paginator = this.paginator;
  }

  constructor(private restClient:DataServiceService) 
  {
    this.loadData();
  }

  data: any;

  loadData(): void
  {
    this.restClient.getDataRows("http://localhost:8080/employees").subscribe
    (
      web_data => {this.data = web_data._embedded.employees},
    )
  }
}


