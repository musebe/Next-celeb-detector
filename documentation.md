### Cloudinary Celebrity Detector

## Introduction

Facial Recognition is one of AI’s front-runner apps. This article demonstrates how to javascript can be used to create an app capable of biometric authentication to identify well-known people.

## Codesandbox

Check the sandbox demo on  [Codesandbox](/).

<CodeSandbox
title="mergevideos"
id=" "
/>

You can also get the project Github repo using [Github](/).

## Prerequisites

Entry-level javascript and React/Nextjs knowledge.

## Setting Up the Sample Project

In your respective folder, create a new net js app using `npx create-next-app celebdetector` in your terminal.
Head to your project root directory `cd celebdetector`
 

We will use [Cloudinary](https://cloudinary.com/?ap=em) recognition celebrity detector add-on for facial detection. Our app will have a sample picture of Leonardo Di Caprio to be sent to the Next js backend for upload and recognition. Our response will be the tagged name of the sample picture.
Create your own Cloudinary account using [Link](https://cloudinary.com/console) and log into it. Each Cloudinary user account will have a dashboard containing environmental variable keys which are necessary for the Cloudinary integration in our project.

In your project directory, start by including Cloudinary in your project dependencies `npm install cloudinary`
Create a new file named `.env.local` and paste the following code. Fill the blanks with your environment variables from the Cloudinary dashboard.

```
CLOUDINARY_CLOUD_NAME =

CLOUDINARY_API_KEY =

CLOUDINARY_API_SECRET =
```

Restart your project: `npm run dev`.

In the `pages/api` folder, create a new file named `cloudinary.js`. 
Configure the cloudinary keys and libraries.

```
var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
```
Create a handler function to execute the POST request. The function will receive media file data and post it to the Cloudinary website. We include the parameters below to request face detection. The response will be filtered out of an array and sent back as a response.
```
export default async function handler(req, res) {
    if (req.method === "POST") {
        let url = ""
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

        res.status(200).json({data: uploaded_url});
    }
}
```

For our front end, We will simply have 2 rows. One to contain the sample image and another to contain the result. Paste the following in your return statement. You can locate the css files from the Github repo. 

```
"pages/index.js"


return (
    <div className="container">
      <h1>Cloudinary Celebrity Detector</h1>
      <div className="row">
        <div className="column">
          <h2>SAMPLE</h2>
          <img  ref={imageRef} src="https://res.cloudinary.com/dogjmmett/image/upload/v1655712984/caprio_bilnap.png" alt="sample" title="sample" />
        </div>
        <div className="column">
          <h2>RESULT</h2><br/>
          {tags && <p>{tags}</p>}
        </div>
      </div>
    </div>
  )
```

We will use state hooks to reference our DOM elements and track our responses. 

We use a useEffect hook to POST the media to the backend and receive the name tag response. 

```
"pages/index.js"


import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const imageRef = useRef();
  const [tags, setTags] = useState('')

  useEffect(() => {
    console.log()
    try {
      fetch('/api/cloudinary', {
        method: 'POST',
        body: JSON.stringify({ data: imageRef.current.src }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          setTags(data.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);


  return (
    <div className="container">
      <h1>Cloudinary Celebrity Detector</h1>
      <div className="row">
        <div className="column">
          <h2>SAMPLE</h2>
          <img ref={imageRef} src="https://res.cloudinary.com/dogjmmett/image/upload/v1655712984/caprio_bilnap.png" alt="sample" title="sample" />
        </div>
        <div className="column">
          <h2>RESULT</h2><br />
          {tags && <p>{tags}</p>}
        </div>
      </div>
    </div>
  )
}

```
The final UI should look like the below:

![complete UI](https://res.cloudinary.com/dogjmmett/image/upload/v1655718961/UI_movqgn.png "complete UI")

Enjoy your coding experience.