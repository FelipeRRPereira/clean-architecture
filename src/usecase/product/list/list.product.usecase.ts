import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { ListProductDto, ListProductOutputDto } from './list.product.dto'

export default class ListProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: ListProductDto): Promise<ListProductOutputDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}