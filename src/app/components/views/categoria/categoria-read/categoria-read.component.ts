import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriaDeleteComponent } from '../categoria-delete/categoria-delete.component';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

var ID = '';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})


export class CategoriaReadComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator?: MatPaginator;

  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  pageEvent?: PageEvent;
  categorias: Categoria[] = [];

  dataSource?: any;


  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];
  constructor(private dialog: MatDialog, private service: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
    this.getArray();
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.categorias);
    this.dataSource.paginator = this.paginator;
  }



  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private getArray() {
    this.service.findAll().subscribe((response) => {
      this.dataSource = new MatTableDataSource<Categoria>(response);
      this.dataSource.paginator = this.paginator;
      this.categorias = response;
      this.totalSize = this.categorias.length;
      this.iterator();
    });
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.categorias.slice(start, end);
    this.dataSource = part;
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.categorias = resposta;
    })
  }


  gotToCategoriaCreate(){
    this.router.navigate(['categorias/create'])
  }

  deleteCategoria(id?: any){
    ID = id;
   this.openDialog('0ms', '0ms');
  }

  static getId(){
    return ID;
  }

  //Abre uma caixa de dialogo para confirmar se deseja ou não deletar a categoria
  //O conteudo mostrado na caixa de dialogo é o que está no Componente CategoriaDelete
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CategoriaDeleteComponent, {
      width: '40rem',
      panelClass: "custom",
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}
