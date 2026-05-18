export default function Video() {
  return (
    <div className="max-w-7xl mx-auto mb-16">
      <h2 className="font-semibold text-3xl mb-6">Learn Your Routine</h2>
      <div className="rounded-[2.5rem] overflow-hidden border product-glow p-1">
        <video id="skincare-video" className="w-full rounded-[2.3rem] bg-black" controls>
          <source src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}