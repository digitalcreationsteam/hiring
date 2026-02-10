// src/components/HeroSection.tsx - Optimized for 320px mobile
'use client';

import { useEffect, useState } from 'react';
import { uniTalentColors } from 'src/common/Colors';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [gradientPos, setGradientPos] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    // Check on mount and resize
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Animate gradient position
    const gradientInterval = setInterval(() => {
      setGradientPos((prev) => (prev + 1) % 100);
    }, 50);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      clearInterval(gradientInterval);
    };
  }, []);

  // Reduce grid points on mobile for performance
  const gridPoints = isMobile ? 30 : 100;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Light Background with VERY VISIBLE Grid */}
      <div 
        style={{ backgroundColor: uniTalentColors.background }}
        className="absolute inset-0"
      >
        {/* PRIMARY VISIBLE GRID - Adjust size for mobile */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, ${uniTalentColors.primary} 1px, transparent 1px),
              linear-gradient(${uniTalentColors.primary} 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? '40px 40px' : '60px 60px',
            transform: `
              translateX(${scrollY * 0.05}px)
              translateY(${scrollY * 0.1}px)
            `,
          }}
        />
        
        {/* Secondary Moving Grid Pattern - Less visible on mobile */}
        {!isMobile && (
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 29px,
                  ${uniTalentColors.text} 29px,
                  ${uniTalentColors.text} 30px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 29px,
                  ${uniTalentColors.text} 29px,
                  ${uniTalentColors.text} 30px
                )
              `,
              backgroundSize: '60px 60px',
              transform: `
                translateX(${-gradientPos * 0.3}px)
                translateY(${-gradientPos * 0.2}px)
              `,
            }}
          />
        )}
        
        {/* Animated Grid Lines - Visible on all screens */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, 
                transparent 0%, 
                ${uniTalentColors.primary}33 50%, 
                transparent 100%)
            `,
            backgroundSize: isMobile ? '200px 100%' : '300px 100%',
            animation: 'gridShine 6s linear infinite',
          }}
        />
      </div>

      {/* Grid Intersection Points - Reduced on mobile */}
      {!isMobile && (
        <div className="absolute inset-0">
          {/* Create grid intersection dots */}
          {[...Array(gridPoints)].map((_, i) => {
            const x = (i * 10) % 100;
            const y = Math.floor(i / 10) * 10;
            return (
              <div
                key={i}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) scale(${1 + Math.sin(scrollY * 0.01 + i) * 0.3})`,
                }}
                className="absolute w-1.5 h-1.5 rounded-full transition-all duration-300"
              >
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    backgroundColor: uniTalentColors.primary,
                    boxShadow: `0 0 10px ${uniTalentColors.primary}`,
                    opacity: 0.8,
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Content Container with Mobile Optimizations */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-16 sm:py-20">
        <div className="text-center px-2">
          {/* Main Heading with Mobile-Optimized Text */}
          <div className="mb-10 xs:mb-12 sm:mb-16">
            <div className="relative inline-block max-w-full">
              <h2 
                style={{ color: uniTalentColors.text }}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 xs:mb-4 leading-tight tracking-tight"
              >
                You've Done Everything Right.
              </h2>
              
              {/* Animated Gradient Text - Optimized for mobile */}
              <div className="relative">
                <h2 
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 xs:mb-10 sm:mb-12 leading-tight tracking-tight"
                  style={{
                    background: `linear-gradient(90deg, 
                      ${uniTalentColors.primary} 0%, 
                      #1a1919 25%, 
                      ${uniTalentColors.primary} 50%, 
                      #302e2e 75%, 
                      ${uniTalentColors.primary} 100%)`,
                    backgroundSize: '200% auto',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    animation: 'textShimmer 8s infinite linear',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  So Why Aren't You Getting Interviews?
                </h2>
                
                {/* Glow Effect - Reduced on mobile */}
                <div 
                  style={{
                    background: `radial-gradient(circle, ${uniTalentColors.primary}33 0%, transparent 70%)`,
                    filter: 'blur(15px)',
                  }}
                  className="absolute -bottom-3 xs:-bottom-4 left-1/2 transform -translate-x-1/2 w-5/6 xs:w-3/4 h-4 xs:h-6 opacity-30 xs:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Problem Points - Stack on mobile */}
         {/* Problem Points - Responsive Layout */}
<div className="max-w-full mx-auto mb-10 xs:mb-12 sm:mb-16 px-1">
  <div className="flex flex-col md:flex-row gap-6 xs:gap-8 sm:gap-10 md:gap-12 mb-10 xs:mb-12">
    {/* Point 1 */}
    <div className="relative group w-full md:w-1/2">
      <div 
        style={{ 
          backgroundColor: uniTalentColors.background,
          borderColor: uniTalentColors.primary
        }}
        className="p-4 xs:p-5 sm:p-6 md:p-8 rounded-xl xs:rounded-2xl border-2 border-opacity-30 group-hover:border-opacity-100 transition-all duration-500 group-hover:scale-[1.02] shadow-lg hover:shadow-xl h-full"
      >
        <div className="mb-4 xs:mb-5 sm:mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-lg xs:rounded-xl mb-4 xs:mb-5 sm:mb-6 group-hover:scale-110 transition-all duration-300"
            style={{ 
              backgroundColor: uniTalentColors.primary,
              boxShadow: `0 4px 15px ${uniTalentColors.primary}4D`
            }}
          >
            <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" style={{ color: uniTalentColors.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 style={{ color: uniTalentColors.text }} className="text-xl xs:text-2xl font-bold mb-2 xs:mb-3">
            The Silence
          </h3>
        </div>
        <p style={{ color: uniTalentColors.text }} className="text-sm xs:text-base sm:text-lg opacity-80 leading-relaxed">
          You polish your resume, customize cover letters, submit applications... and hear nothing back.
        </p>
      </div>
    </div>

    {/* Point 2 */}
    <div className="relative group w-full md:w-1/2">
      <div 
        style={{ 
          backgroundColor: uniTalentColors.background,
          borderColor: uniTalentColors.primary
        }}
        className="p-4 xs:p-5 sm:p-6 md:p-8 rounded-xl xs:rounded-2xl border-2 border-opacity-30 group-hover:border-opacity-100 transition-all duration-500 group-hover:scale-[1.02] shadow-lg hover:shadow-xl h-full"
      >
        <div className="mb-4 xs:mb-5 sm:mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-lg xs:rounded-xl mb-4 xs:mb-5 sm:mb-6 group-hover:scale-110 transition-all duration-300"
            style={{ 
              backgroundColor: uniTalentColors.primary,
              boxShadow: `0 4px 15px ${uniTalentColors.primary}4D`
            }}
          >
            <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" style={{ color: uniTalentColors.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 style={{ color: uniTalentColors.text }} className="text-xl xs:text-2xl font-bold mb-2 xs:mb-3">
            The Unfair Advantage
          </h3>
        </div>
        <p style={{ color: uniTalentColors.text }} className="text-sm xs:text-base sm:text-lg opacity-80 leading-relaxed">
          Others with less experience get interviews through connections, keywords, or school names.
        </p>
      </div>
    </div>
  </div>


            {/* Truth Statement - Mobile Optimized */}
            <div className="relative">
              <div 
                style={{ 
                  background: `linear-gradient(90deg, transparent, ${uniTalentColors.primary}26, transparent)`,
                  transform: `translateX(${gradientPos * 2 - 100}%)`,
                }}
                className="absolute inset-0 rounded-xl xs:rounded-2xl"
              />
              <div 
                style={{ 
                  backgroundColor: uniTalentColors.background,
                  borderColor: uniTalentColors.primary
                }}
                className="relative py-5 xs:py-6 sm:py-8 px-4 xs:px-5 sm:px-6 md:px-8 rounded-xl xs:rounded-2xl border-2 shadow-lg"
              >
                <p 
                  style={{ color: uniTalentColors.text }}
                  className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold leading-tight"
                >
                  <span style={{ color: uniTalentColors.primary }} className="font-extrabold">The truth:</span> It's not your skills. The hiring system is broken—designed to filter out talent like yours.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section - Mobile Optimized */}
          <div className="max-w-full mx-auto px-2">
            <p 
              style={{ color: uniTalentColors.text }}
              className="text-base xs:text-lg sm:text-xl opacity-90 mb-6 xs:mb-8 animate-fade-in-up"
            >
              Ready to break through the broken system?
            </p>
            
            <div className="flex gap-2 xs:gap-4 justify-center mb-8 xs:mb-10 sm:mb-12">
              <button 
                style={{ 
                  background: `linear-gradient(135deg, ${uniTalentColors.primary} 0%, ${uniTalentColors.primaryLight || '#FFEDB2'} 100%)`,
                  color: uniTalentColors.text,
                  boxShadow: `0 8px 20px ${uniTalentColors.primary}66`,
                }}
                className="w-full py-3 xs:py-4 px-4 xs:px-6 sm:px-8 font-bold rounded-lg xs:rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group"
              >
                <span className="flex items-center justify-center text-sm xs:text-base">
                  Get Your Fair Shot
                  <svg 
                    className="w-4 h-4 xs:w-5 xs:h-5 ml-2 transform group-hover:translateX-2 transition-transform duration-300"
                    style={{ color: uniTalentColors.text }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <button 
                style={{ 
                  backgroundColor: 'transparent',
                  color: uniTalentColors.text,
                  borderColor: uniTalentColors.lightGray,
                }}
                className="w-full py-3 xs:py-4 px-4 xs:px-6 sm:px-8 font-bold rounded-lg xs:rounded-xl border-2 hover:border-#FFD85F hover:shadow-lg active:scale-95 transition-all duration-300 group"
              >
                <span className="flex items-center justify-center text-sm xs:text-base">
                  See How It Works
                  <svg 
                    className="w-4 h-4 xs:w-5 xs:h-5 ml-2 transform group-hover:rotate-180 transition-transform duration-300"
                    style={{ color: uniTalentColors.text }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Stats - Mobile Optimized */}
            <div 
              style={{ 
                backgroundColor: uniTalentColors.background,
                borderColor: uniTalentColors.primary,
                boxShadow: `0 4px 15px ${uniTalentColors.primary}26`,
              }}
              className="inline-flex flex-wrap justify-center gap-4 xs:gap-6 sm:gap-8 px-4 xs:px-6 sm:px-8 py-4 xs:py-5 sm:py-6 rounded-xl xs:rounded-2xl border-2 max-w-full"
            >
              <div className="text-center min-w-[80px] xs:min-w-[90px]">
                <div style={{ color: uniTalentColors.text }} className="text-2xl xs:text-3xl font-bold">5,000+</div>
                <div style={{ color: uniTalentColors.text }} className="text-xs xs:text-sm opacity-80">PMs Transformed</div>
              </div>
              <div 
                style={{ backgroundColor: uniTalentColors.primary }}
                className="h-8 xs:h-10 w-px hidden xs:block"
              ></div>
              <div className="text-center min-w-[80px] xs:min-w-[90px]">
                <div style={{ color: uniTalentColors.text }} className="text-2xl xs:text-3xl font-bold">3.2x</div>
                <div style={{ color: uniTalentColors.text }} className="text-xs xs:text-sm opacity-80">More Interviews</div>
              </div>
              <div 
                style={{ backgroundColor: uniTalentColors.primary }}
                className="h-8 xs:h-10 w-px hidden xs:block"
              ></div>
              <div className="text-center min-w-[80px] xs:min-w-[90px]">
                <div style={{ color: uniTalentColors.text }} className="text-2xl xs:text-3xl font-bold">85%</div>
                <div style={{ color: uniTalentColors.text }} className="text-xs xs:text-sm opacity-80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Smaller on mobile */}
      <div 
        style={{ color: uniTalentColors.primary }}
        className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;