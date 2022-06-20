var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "20000mb",
        },
    },
};

export default async function handler(req, res) {
    let uploaded_url = '';
    const fileStr = req.body.data;

    if (req.method === 'POST') {
        try {
            const uploadedResponse = await cloudinary.uploader.upload_large(fileStr, {
                chunk_size: 6000000,
                detection :"aws_rek_face",
                auto_tagging: 0.8
            });
            uploaded_url = uploadedResponse.tags[0];
            console.log(uploadedResponse.tags[0])
        } catch (error) {
            console.log(error);
        }
        res.status(200).json({ data: uploaded_url });
        console.log('complete!');
    }
};