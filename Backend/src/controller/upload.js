import express from "express";
import { supabase } from "../../supabase.config.js";

/**
 *
 * const formData = new FormData();
 * formData.append("image", file)
 * fetch("http://localhost:3000/upload", {
 *   body:formData
 *  })
 *
 */

const router = express.Router();

router.post("/", async (req, res) => {
  const image = req.files.image;
  const id = Date.now();

  const type = image.mimetype.split("/")[1];

  const { data } = await supabase.storage
    .from("images")
    .upload(`${id}.${type}`, image.data, {
      contentType: image.mimetype,
    });

  const url = supabase.storage.from("images").getPublicUrl(data.path);

  res.status(200).send({
    url: url.data.publicUrl,
  });
});

export default router;
