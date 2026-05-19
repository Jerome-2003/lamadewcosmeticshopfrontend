// export default function Video() {
//   return (
//     <div className="max-w-7xl mx-auto mb-16">
//       <h2 className="font-semibold text-3xl mb-6">Learn Your Routine</h2>
//       <div className="rounded-[2.5rem] overflow-hidden border product-glow p-1">
//         <video id="skincare-video" className="w-full rounded-[2.3rem] bg-black" controls>
//           <source src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     </div>
//   );
// }
// src/components/Video.jsx
import { useSite } from '../Store';

export default function Video() {
  const { siteConfig } = useSite();

  if (siteConfig.show_video_adv === false) return null;

  return (
    <div className="max-w-7xl mx-auto mb-16 px-4 animate-fadeIn">
      <h2 className="font-semibold text-3xl mb-6 text-gray-900">Learn Your Routine</h2>
      <div className="rounded-[2.5rem] overflow-hidden border p-1 bg-white shadow-sm">
        <video 
          key={siteConfig.hero_video_url} 
          id="skincare-video\" 
          className="w-full rounded-[2.3rem] bg-black aspect-video object-cover focus:outline-none" 
          controls
        >
          <source src={siteConfig.hero_video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}