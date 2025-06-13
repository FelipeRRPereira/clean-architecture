import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { FindProductDto, FindProductOutputDto } from './find.product.dto'

export default class FindProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: FindProductDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}