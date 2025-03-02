import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    switch (request.method) {
      case "GET": {
        const user = await User.findById(id);
        if (!user) {
          return response.status(404).json({ status: "Not Found" });
        }
        return response.status(200).json(user);
      }

      case "PUT": {
        await User.findByIdAndUpdate(id, request.body);
        return response
          .status(200)
          .json({ status: "User successfully updated." });
      }

      case "DELETE": {
        await User.findByIdAndDelete(id);
        return response
          .status(200)
          .json({ status: "User successfully deleted." });
      }

      default:
        return response.status(405).json({ status: "Method not allowed." });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error" });
  }
}
