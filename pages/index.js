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
