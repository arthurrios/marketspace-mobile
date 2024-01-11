import { PhotoFileDTO } from '@dtos/PhotoFileDTO'
import { ProductImageDTO } from '@dtos/ProductImageDTO'

export function transformProductImageToPhotoFile(
  productImage: ProductImageDTO,
) {
  const { path } = productImage

  // Extracting the name from the path (before the first ".jpg")
  const name = extractNameFromPath(path)

  // Constructing the PhotoFileDTO object
  const photoFile: PhotoFileDTO = {
    name,
    uri: path,
    type: determineFileType(path),
  }

  return photoFile
}

// Helper function to extract name from the path (before the first ".jpg")
function extractNameFromPath(path: string): string {
  const indexOfFirstJpg = path.indexOf('.jpg')
  const name = path.substring(0, indexOfFirstJpg)
  return name
}

// Helper function to determine the file type (after the last ".")
function determineFileType(path: string): string {
  const lastDotIndex = path.lastIndexOf('.')
  const fileType = path.substring(lastDotIndex + 1)
  return fileType
}
