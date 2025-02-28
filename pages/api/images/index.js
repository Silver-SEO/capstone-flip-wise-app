import dbConnect from "@/db/connect";
import Image from "@/db/models/Image";

export default async function handler(request, response) {
  await dbConnect();
  try {
    switch (request.method) {
      case "GET": {
        const images = await Image.find();
        if (!images) {
          return response.status(404).json({ status: "Not Found" });
        }
        return response.status(200).json(images);
      }
      case "POST": {
        const image = await Image.create({ ...request.body });
        return response
          .status(201)
          .json({ status: "Image created", data: image });
      }
      default:
        return response.status(405).json({ status: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error" });
  }
}
