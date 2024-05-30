import cloudinary from "../services/cloudinary/config";

export function getPublicId(url: any) {
  const splitUrl = url.split("/");
  const concatUrlLastTwoPositions = splitUrl.splice(7).join("/");
  const publicId = concatUrlLastTwoPositions.split(".")[0];

  return publicId;
}

export async function uploadImageToCloudinary(image: any) {
  const fileName = image?.originalname;

  const fileNameWithoutExtension = fileName?.split(".")[0];

  const uploadImageToCloudinary = await cloudinary.uploader.upload(image, {
    folder: "image",
    public_id: "apollofybackend" + fileNameWithoutExtension + "-" + Date.now(),
  });

  if (!uploadImageToCloudinary) {
    return "Sync error with cloudinary. The image wasn't uploaded";
  }

  return uploadImageToCloudinary.secure_url;
}

export async function deleteImageFromClodinary(publicId: any) {
  try {
    const destroyImageAtCloudinary = await cloudinary.uploader.destroy(
      publicId
    );
    if (destroyImageAtCloudinary.result === "not found") {
      return `The image wasn't found in cloudinary`;
    }
    if (destroyImageAtCloudinary.result === "ok") {
      return `Image deleted successfully`;
    }
  } catch (error) {
    return `Error deleting image: ${error}`;
  }
}

export async function uploadSongToCloudinary(song: any) {
  const fileName = song?.originalname;

  const fileNameWithoutExtension = fileName?.split(".")[0];

  const uploadSongToCloudinary = await cloudinary.uploader.upload(song, {
    folder: "songs",
    public_id: "apollofybackend" + fileNameWithoutExtension + "-" + Date.now(),
  });

  if (!uploadSongToCloudinary) {
    return "Sync error with cloudinary. The song wasn't uploaded";
  }

  return uploadSongToCloudinary.secure_url;
}

export async function deleteSongFromCloudinary(publicId: any) {
  try {
    const destroySongAtCloudinary = await cloudinary.uploader.destroy(publicId);
    if (destroySongAtCloudinary.result === "not found") {
      return `The song wasn't found in cloudinary`;
    }
    if (destroySongAtCloudinary.result === "ok") {
      return `Song deleted successfully`;
    }
  } catch (error) {
    return `Error deleting song: ${error}`;
  }
}
