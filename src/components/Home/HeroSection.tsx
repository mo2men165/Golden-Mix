'use client';

import React, { useRef, useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Run once on mount
    checkMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);

    // Video playback setup
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Dynamic height based on screen size */}
      <div className={`h-screen w-full ${isMobile ? 'max-h-[500px]' : 'min-h-[600px]'}`}>
        {/* Video Background - always using object-cover for consistent behavior */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            className="absolute w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/videos/Goldenmix-optimized.mp4" type="video/mp4" />
          </video>
          
          {/* Responsive gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50"></div>
        </div>
        
        {/* Optional: Content container for text/buttons that sits on top of the video */}
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-white">
            {/* Your hero content goes here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;