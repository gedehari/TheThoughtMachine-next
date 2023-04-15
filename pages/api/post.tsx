import { uploadThought } from "@/lib/thought";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests are allowed!" })
    return
  }

  if (req.headers["content-type"] && req.headers["content-type"] != "application/json") {
    res.status(400).send({ message: "Content-Type header is undefined or invalid!" })
    return
  }

  const body = req.body
  if (!(body.title && body.message)) {
    res.status(400).send({ message: "Request body is invalid!" })
    return
  }

  let uploadResult = await uploadThought({
    title: body.title,
    content: body.message
  })
  if (uploadResult.error) {
    res.status(500).send({ message: "Internal database error. Please contact the webmaster." })
  }

  res.status(200).send({ message: "Success!" })
}