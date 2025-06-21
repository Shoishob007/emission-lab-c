// components/CloudinaryVideo.js
export default function CloudinaryVideo() {
  return (
    <div className="">
      <video
        controls
        autoPlay={false}
        muted={false}
        className="w-full h-auto rounded-xl shadow-md"
      >
        <source
          src="https://res.cloudinary.com/dmazsiqdy/video/upload/v1750540137/emisison-lab/video-3.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
