import { Product } from './../product.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

const EXAMPLE_DATA: Product[] = [
  {id: 1, name: 'Hydrogen', sobrenome: 'Luis da Silva', email: 'batata@batata.com.r', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 2, name: 'Hydrogen', sobrenome: 'Manoel de olivrira', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 3, name: 'Hydrogen', sobrenome: 'Tequila baby', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 4, name: 'Hydrogen', sobrenome: 'Tequila baby', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 5, name: 'Hydrogen', sobrenome: 'José da Silva lima', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 6, name: 'Hydrogen', sobrenome: 'Jose Luiz da Silva', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 7, name: 'Hydrogen', sobrenome: 'Da silva rodrigues', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 8, name: 'Hydrogen', sobrenome: 'batestin cypriano', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 9, name: 'Hydrogen', sobrenome: 'Osvaldo luiz', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 10, name: 'Hydrogen', sobrenome: 'Pereira Souza', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 11, name: 'Hydrogen', sobrenome: 'Carvalho de Santos', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 12, name: 'Hydrogen', sobrenome: 'Silva Sauro', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 13, name: 'Hydrogen', sobrenome: 'Batista Batista', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 14, name: 'Hydrogen', sobrenome: 'Alulra Da Silva', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 15, name: 'Hydrogen', sobrenome: 'Catadista DA', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 16, name: 'Hydrogen', sobrenome: 'Demori Demori', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 17, name: 'Hydrogen', sobrenome: 'Luis Bananinha Rodolfo', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 18, name: 'Hydrogen', sobrenome: 'Marisvaldo Gaucho', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 19, name: 'Hydrogen', sobrenome: 'Luiza Montreal', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
  {id: 20, name: 'Hydrogen', sobrenome: 'EUivando de Verdade', email: 'batata@batata.com', telefone: '35228727',formacao: 'Academia Internacional de Letras'},
];

/**
 * Data source (fonte de dados) para visualização do ProductRead2 (lista)/ ARMAZENAMENTO. 
 * Esta classe deve encapsular toda lógica acima para manipular e mostrar o resultado
 * incluindo paginação, listagem e filtragem).
 */


export class ProductRead2DataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Conecta esse banco de dados a tabela. Essa tabela vai atualizar quando emitir um novo
   * item.
   * @returns o retorno desse item é renderizado.
   */
  connect(): Observable<Product[]> {
    // Combina todos os item em uma unica atualização. Ou seja o item que eu alterar vai afetar toda tabela
    // Parametros para o consumo de dados.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Chama quando a tabela estiver corrompida. Usa essa função para limpar ou conectar
   * quando a tabela reiniciar
   */
  disconnect() {}

  /**
   * Se você estiver usando server-side pagination,
   * esta requisição substituirá dados no servidor. 
   */
  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * lista por dados. Se vc estiver usando server-side sorting,
   * este substituirá os dados no servidor.
   */
  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'sobrenome': return compare(a.sobrenome, b.sobrenome, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'telefone': return compare(a.telefone, b.telefone, isAsc);
        case 'formacao': return compare(a.formacao, b.formacao, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Um simples comparador de nome/ID (para o lado do cliente). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
