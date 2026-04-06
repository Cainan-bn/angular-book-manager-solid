export class Editora {
  /**
   * @param codEditora - Identificador único (auto-incrementado pelo serviço)
   * @param nomeEditora - Nome comercial da editora
   */
  constructor(
    public codEditora: number,
    public nomeEditora: string
  ) {}
}
