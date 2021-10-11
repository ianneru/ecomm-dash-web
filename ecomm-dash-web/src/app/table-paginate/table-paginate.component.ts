import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Encomenda } from '../services/encomenda/encomenda.model';
import { EncomendaService } from '../services/encomenda/encomenda.service';

@Component({
  selector: 'app-table-paginate',
  templateUrl: './table-paginate.component.html',
  styleUrls: ['./table-paginate.component.css']
})
export class TablePaginateComponent implements AfterViewInit  {
  displayedColumns: string[] = ['pedido.numeroIdentificacao', 'pedido.dataEntrega','placaVeiculo',
   'pedido.endereco','pedido.pedidosProdutos','equipe.nome'];
  
  dataSource: Observable<any[]>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  currentPage = new BehaviorSubject<number>(0);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public encomendaService: EncomendaService) {}

  ngAfterViewInit() 
  {
    
    this.paginator.pageIndex = 0;
    
    merge(this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.encomendaService.getPaginated(
              this.paginator.pageIndex);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data['count'];

            return data['data'];
          }),
          catchError(() => {
            this.isLoadingResults = false;
            // Catch if the GitHub API has reached its rate limit. Return empty data.
            this.isRateLimitReached = true;
            return null;
          })
        ).subscribe(data => this.dataSource = data);
  }
}