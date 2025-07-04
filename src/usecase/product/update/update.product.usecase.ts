import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { UpdateProductDto, UpdateProductOutputDto } from './update.product.dto'

export default class UpdateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: UpdateProductDto): Promise<UpdateProductOutputDto> {
    const product = await this.productRepository.find(input.id);

    product.changeName(input.name);
    product.changePrice(input.price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}