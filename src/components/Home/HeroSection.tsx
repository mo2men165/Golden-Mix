'use client';

import React, { useRef, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Optimize video playback
      videoRef.current.playbackRate = 0.8; // Slightly slower for better visual impact
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }

    // Add cleanup function
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  return (
    <section className="relative md:h-[120vh] sm:h-[365px] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute w-full h-full object-contain md:object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata" // Only preload metadata to improve initial page load
        >
          <source src="/videos/Goldenmix-optimized.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay gradient - lighter to show more of the video content */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40"></div>
      </div>
    </section>
  );
};

export default HeroSection;