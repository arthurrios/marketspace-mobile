import { ProductImageDTO } from '@dtos/ProductImageDTO'
import { ImagePickerAsset } from 'expo-image-picker'

export function transformProductImageToAsset(
  productImage: ProductImageDTO,
): ImagePickerAsset {
  // Assuming some default values for the ImagePickerAsset fields, modify as needed
  const asset: ImagePickerAsset = {
    uri: productImage.path,
    width: 100, // Provide actual width value
    height: 100, // Provide actual height value
  }

  function simplifyImageName(imageName: string): string {
    const underscoreIndex = imageName.indexOf('_')
    const hyphenIndex = imageName.indexOf('-')

    if (underscoreIndex !== -1 && hyphenIndex !== -1) {
      // Extract characters from the left of "_" until the first "-"
      const simplifiedName = imageName.substring(0, hyphenIndex)
      return simplifiedName
    } else {
      // If either "_" or "-" is not found, return the original name
      return imageName
    }
  }

  // You can copy other fields from the ProductImageDTO to the ImagePickerAsset
  asset.assetId = productImage.id
  asset.fileName = simplifyImageName(productImage.path)
  asset.type = 'image'

  return asset
}
