import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Encomenda } from '../services/pedido/encomenda.model';
import { EncomendaService } from '../services/pedido/encomenda.service';

@Component({
  selector: 'app-table-paginate',
  templateUrl: './table-paginate.component.html',
  styleUrls: ['./table-paginate.component.css']
})
export class TablePaginateComponent implements AfterViewInit  {
  displayedColumns: string[] = ['pedido.numeroIdentificacao', 'pedido.dataEntrega','placaVeiculo',
   'pedido.endereco','pedido.pedidosProdutos','equipe.nome'];
  dataSource = new MatTableDataSource<Encomenda>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public encomendaService: EncomendaService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.encomendaService.getPaginated().subscribe(res => {
      
      var data = res['data'];

      this.dataSource = new MatTableDataSource<Encomenda>(data);
    });
  }
}