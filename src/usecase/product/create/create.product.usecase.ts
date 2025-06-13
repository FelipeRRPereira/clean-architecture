import ProductFactory from '../../../domain/product/factory/product.factory'
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { CreateProductDto, CreateProductOutputDto } from './create.product.dto'

export default class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: CreateProductDto): Promise<CreateProductOutputDto> {
    const product = ProductFactory.create(
      input.type,
      input.name,
      input.price
    );

    await this.productRepository.create(product as any);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      type: input.type,
    };
  }
}