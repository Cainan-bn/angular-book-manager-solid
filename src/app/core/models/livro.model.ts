export class Livro {
  /**
   * @param codLivro     - Identificador único (auto-incrementado pelo serviço)
   * @param titulo       - Título completo da obra
   * @param resumo       - Breve descrição do conteúdo
   * @param autores      - Lista de autores (permite obras com múltiplos autores)
   * @param codEditora   - FK para a Editora responsável pela publicação
   * @param anoPublicacao - Ano de publicação com 4 dígitos
   */
  constructor(
    public codLivro: number,
    public titulo: string,
    public resumo: string,
    public autores: string[],
    public codEditora: number,
    public anoPublicacao: number
  ) {}
}
