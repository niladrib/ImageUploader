import express from 'express';
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles, validateUrl } from './util/util.js';

const app = express();
const port = 8080;

app.use(bodyParser.json());

// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
app.get('/filteredimage', async (req, res, next) => {
    const { image_url } = req.query;
    if (validateUrl(image_url)) {
        //valid url
        try {
            const outPath = await filterImageFromURL(image_url);
            res.sendFile(outPath, {}, (error) => {
                deleteLocalFiles([outPath]);
                if (error) {
                    console.log(`file send error=${error}`);
                    next(error);
                }
            });
        }
        catch (error) {
            res.status(500).send(`unexpected error=${error}`);
        }
    } else {
        //invalid url
        res.status(500).send('invalid url');
    }
});

app.get('/', (req, res) => {
    res.send('Hello world');
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});