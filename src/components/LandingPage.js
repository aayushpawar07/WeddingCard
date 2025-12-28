// AI assisted development
import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ isLoaded }) => {
  const [particles, setParticles] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardMousePosition, setCardMousePosition] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showBackToTop, setShowBackToTop] = useState(false);

  const events = [
    {
      title: 'Sangeet & Haldi',
      date: '07 January 2026',
      venue: '',
      icon: '🎵',
    },
    {
      title: 'Wedding Ceremony',
      date: '08 January 2026',
      venue: 'Hotel Grand Lotus, Beside High-tech Bus Stand Bilaspur, Chhattisgarh',
      icon: '💒',
    },
    {
      title: 'Reception',
      date: '09 January 2026',
      venue: 'Hotel Sayaji, Raipur',
      icon: '🎉',
    },
  ];

  useEffect(() => {
    // Create floating particles with variety
    const particleTypes = ['✨', '💫', '⭐', '🌟', '💖', '💝', '💎', '🌙'];
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
      size: 0.8 + Math.random() * 0.4,
    }));
    setParticles(newParticles);

    // Create floating hearts
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
    }));
    setHearts(newHearts);

    // Mouse tracking for parallax
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Mouse tracking for card 3D effect - only on hover
    const handleCardMouseMove = (e) => {
      if (!isCardHovered) return;
      const card = document.querySelector('.wedding-card-section .wedding-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCardMousePosition({
          x: (x / rect.width - 0.5) * 10,
          y: (y / rect.height - 0.5) * 10,
        });
      }
    };

    const handleCardMouseLeave = () => {
      setIsCardHovered(false);
      setCardMousePosition({ x: 0, y: 0 });
    };

    const handleCardMouseEnter = () => {
      setIsCardHovered(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Scroll tracking for parallax
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Show back to top button after scrolling
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Countdown Timer - Calculate time until January 8, 2026
    const calculateCountdown = () => {
      const targetDate = new Date('2026-01-08T00:00:00').getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately and then every second
    calculateCountdown();
    const countdownInterval = setInterval(calculateCountdown, 1000);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.className]));
          entry.target.classList.add('section-visible');
        }
      });
    }, observerOptions);
    
    // Set up card hover listeners after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const cardElement = document.querySelector('.wedding-card-section .wedding-card');
      if (cardElement) {
        cardElement.addEventListener('mouseenter', handleCardMouseEnter);
        cardElement.addEventListener('mouseleave', handleCardMouseLeave);
        cardElement.addEventListener('mousemove', handleCardMouseMove);
      }
      
      // Observe all sections for scroll animations
      const sections = document.querySelectorAll('section');
      sections.forEach(section => observer.observe(section));
    }, 100);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      const cardElement = document.querySelector('.wedding-card-section .wedding-card');
      if (cardElement) {
        cardElement.removeEventListener('mouseenter', handleCardMouseEnter);
        cardElement.removeEventListener('mouseleave', handleCardMouseLeave);
        cardElement.removeEventListener('mousemove', handleCardMouseMove);
      }
      observer.disconnect();
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className={`landing-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated background pattern */}
      <div className="bg-pattern-layer"></div>
      <div className="bg-gradient-overlay"></div>

      {/* Floating particles */}
      <div className="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              transform: `scale(${particle.size})`,
            }}
          >
            {particle.type}
          </div>
        ))}
        {hearts.map((heart) => (
          <div
            key={`heart-${heart.id}`}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* Decorative geometric shapes */}
      <div className="geometric-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Background Image - Premium Wedding Image */}
      <div className="bg-image-layer">
        <img 
          src="https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=1200&q=80&auto=format&fit=crop" 
          alt="Wedding background" 
          className="bg-image"
        />
        <div className="bg-image-overlay"></div>
        <div className="bg-pattern-dots"></div>
        {/* Additional decorative elements */}
        <div className="bg-sparkles">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="sparkle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}>✨</span>
          ))}
        </div>
      </div>

      {/* Animated Gradient Orbs */}
      <div 
        className="gradient-orb orb-1"
        style={{
          left: `${mousePosition.x * 0.1}%`,
          top: `${mousePosition.y * 0.1}%`,
        }}
      ></div>
      <div 
        className="gradient-orb orb-2"
        style={{
          left: `${100 - mousePosition.x * 0.1}%`,
          top: `${100 - mousePosition.y * 0.1}%`,
        }}
      ></div>

      {/* Hero Section */}
      <section className="hero-section">
      <div className="landing-content">
        <div className="greeting-text">
          <div className="wedding-icon-wrapper">
            <div className="icon-ring"></div>
            <div className="icon-ring-outer"></div>
            <div className="wedding-icon">💒</div>
            <div className="icon-sparkles">
              <span>✨</span>
              <span>✨</span>
              <span>✨</span>
            </div>
          </div>
          <div className="title-decoration-top">
            <span className="decor-line"></span>
            <span className="decor-flower">🌺</span>
            <span className="decor-line"></span>
          </div>
          <h1 className="main-title">
            <span className="title-word">आपका</span>
            <span className="title-word">स्वागत</span>
            <span className="title-word">है</span>
          </h1>
          <div className="title-decoration-bottom">
            <span className="decor-line"></span>
            <span className="decor-flower">🌺</span>
            <span className="decor-line"></span>
          </div>
          <p className="subtitle">You are cordially invited to witness</p>
          <p className="wedding-text">The Sacred Union & Wedding Celebration</p>
        </div>

        <div className="couple-names">
          <div className="name-block groom">
            <div className="name-glow-effect"></div>
            <h2>Abhishek</h2>
            <p>Sahu</p>
            <div className="name-underline"></div>
          </div>
          <div className="heart-divider">
            <div className="heart-ring"></div>
            <span className="heart">💕</span>
            <span className="ampersand">&</span>
            <div className="heart-particles">
              <span>✨</span>
              <span>✨</span>
              <span>✨</span>
            </div>
          </div>
          <div className="name-block bride">
            <div className="name-glow-effect"></div>
            <h2>Divya</h2>
            <p>Singh</p>
            <div className="name-underline"></div>
          </div>
        </div>

        <div className="wedding-date">
          <div className="date-icon">📅</div>
          <p className="date-text">January 2026</p>
          <p className="date-subtext">Join us in celebrating this beautiful journey</p>
          <div className="date-line"></div>
          {/* Countdown Timer */}
          <div className="countdown-container">
            <div className="countdown-item">
              <span className="countdown-number">{String(countdown.days).padStart(2, '0')}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="countdown-number">{String(countdown.hours).padStart(2, '0')}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="countdown-number">{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">Mins</span>
            </div>
          </div>
        </div>

          <div className="scroll-hint">
            <p>Scroll to view the invitation</p>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* Wedding Card Section */}
      <section className="wedding-card-section" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <div className="section-container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Our Wedding Invitation</h2>
            <div className="section-title-decoration">
              <span className="decor-line"></span>
              <span className="decor-flower">🌺</span>
              <span className="decor-line"></span>
            </div>
          </div>

          <div className="card-wrapper">
            <div 
              className="wedding-card"
              style={{
                transform: isCardHovered 
                  ? `perspective(1000px) rotateY(${cardMousePosition.x}deg) rotateX(${-cardMousePosition.y}deg) scale(1.02)`
                  : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              {/* Glassmorphism Overlay */}
              <div className="glass-overlay"></div>
              
              {/* Decorative Border */}
              <div className="card-border-outer"></div>
              <div className="card-border-inner"></div>
              
              {/* Animated Gradient Mesh */}
              <div className="gradient-mesh"></div>
              
              {/* Floral Corner Decorations */}
              <div className="floral-corner floral-top-left">🌺</div>
              <div className="floral-corner floral-top-right">🌺</div>
              <div className="floral-corner floral-bottom-left">🌺</div>
              <div className="floral-corner floral-bottom-right">🌺</div>
              
              {/* Main Card Content */}
              <div className="card-content">
                {/* Top Invocation */}
                <div className="invocation">
                  <span className="invocation-text">|| श्री गणेशाय नमः ||</span>
                </div>

                {/* Hosts */}
                <div className="hosts">
                  <p className="host-text">MR. & MRS. SAHU</p>
                  <p className="invitation-text">
                    cordially invite your gracious presence on the auspicious occasion of the wedding celebration of their beloved son
                  </p>
                </div>

                {/* Groom Details */}
                <div className="groom-section">
                  <div className="name-image-wrapper">
                    <div className="name-image-frame groom-frame">
                      <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=150&q=80&auto=format&fit=crop" alt="Groom" />
                      <div className="image-glow"></div>
                    </div>
                  </div>
                  <h2 className="groom-name">Abhishek Sahu</h2>
                  <p className="parents-text">S/O LATE MR. RAGHUVENDRA SAHU & MRS. MAMTA SAHU</p>
                  <div className="name-sparkles">
                    <span>✨</span>
                    <span>✨</span>
                    <span>✨</span>
                  </div>
                </div>

                {/* Divider with Heart Animation */}
                <div className="divider">
                  <div className="divider-line"></div>
                  <div className="divider-heart-wrapper">
                    <span className="divider-heart">💖</span>
                    <span className="divider-text">WITH</span>
                  </div>
                  <div className="divider-line"></div>
                </div>

                {/* Bride Details */}
                <div className="bride-section">
                  <div className="name-image-wrapper">
                    <div className="name-image-frame bride-frame">
                      <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=150&q=80&auto=format&fit=crop" alt="Bride" />
                      <div className="image-glow"></div>
                    </div>
                  </div>
                  <h2 className="bride-name">Divya Singh</h2>
                  <p className="parents-text">D/O MR. AKHILESH SINGH & MRS. JANKI SINGH</p>
                  <div className="name-sparkles">
                    <span>✨</span>
                    <span>✨</span>
                    <span>✨</span>
                  </div>
                </div>

                {/* Events Section */}
                <div className="events-section">
                  <h3 className="events-section-title">
                    <span className="title-line"></span>
                    <span className="title-text">Our Wedding Events</span>
                    <span className="title-line"></span>
                  </h3>
                  {events.map((event, index) => (
                    <div 
                      key={index} 
                      className="event-item"
                      style={{
                        animationDelay: `${index * 0.2}s`,
                      }}
                    >
                      <div className="event-icon-wrapper">
                        <div className="event-icon-bg"></div>
                        <div className="event-icon">{event.icon}</div>
                        <div className="event-icon-ring"></div>
                      </div>
                      <div className="event-content">
                        <h3 className="event-title">{event.title}</h3>
                        <div className="event-date-wrapper">
                          <span className="event-date-icon">📅</span>
                          <p className="event-date">{event.date}</p>
                        </div>
                        {event.venue && (
                          <div className="event-venue-wrapper">
                            <span className="event-venue-icon">📍</span>
                            <p className="event-venue">{event.venue}</p>
                          </div>
                        )}
                      </div>
                      <div className="event-glow"></div>
                      <div className="event-shine"></div>
                    </div>
                  ))}
                </div>

                {/* Closing Message */}
                <div className="closing-message">
                  <p>We look forward to your blessings and presence to make the occasion truly special.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
        <div className="section-container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Our Journey Together</h2>
            <div className="section-title-decoration">
              <span className="decor-line"></span>
              <span className="decor-flower">💕</span>
              <span className="decor-line"></span>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-image-wrapper">
                <img src="https://media.istockphoto.com/id/2168707868/photo/indian-couple-holding-hand-close-up-in-wedding-ceremony.webp?a=1&b=1&s=612x612&w=0&k=20&c=YohVKdmbHl85l5Iy_retZo7uMDh53b7B-TEx5EmxF5c=" alt="First Meeting" />
                <div className="timeline-image-overlay"></div>
              </div>
              <div className="timeline-icon">💑</div>
              <div className="timeline-content">
                <h3>First Meeting</h3>
                <p>A beautiful beginning of our story</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-image-wrapper">
                <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=300&q=80&auto=format&fit=crop" alt="Engagement" />
                <div className="timeline-image-overlay"></div>
              </div>
              <div className="timeline-icon">💍</div>
              <div className="timeline-content">
                <h3>Engagement</h3>
                <p>Two hearts, one promise</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-image-wrapper">
                <img src="https://media.istockphoto.com/id/2148405076/photo/smiling-bride-and-groom-ready-to-exchange-floral-garlands-during-their-wedding-ceremony.webp?a=1&b=1&s=612x612&w=0&k=20&c=PxQ4t9dX-xn-_BfH__ecqsXt_YGpbq2WH73vQGIQK-E=" alt="Wedding Day" />
                <div className="timeline-image-overlay"></div>
              </div>
              <div className="timeline-icon">💒</div>
              <div className="timeline-content">
                <h3>Wedding Day</h3>
                <p>The day we become one</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="gallery-section" style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
        <div className="section-container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Memories to Cherish</h2>
            <div className="section-title-decoration">
              <span className="decor-line"></span>
              <span className="decor-flower">📸</span>
              <span className="decor-line"></span>
            </div>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://media.istockphoto.com/id/2168707868/photo/indian-couple-holding-hand-close-up-in-wedding-ceremony.webp?a=1&b=1&s=612x612&w=0&k=20&c=YohVKdmbHl85l5Iy_retZo7uMDh53b7B-TEx5EmxF5c=" alt="Indian Couple Holding Hands" />
              <div className="gallery-overlay">
                <span className="gallery-icon">💕</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://media.istockphoto.com/id/2148405076/photo/smiling-bride-and-groom-ready-to-exchange-floral-garlands-during-their-wedding-ceremony.webp?a=1&b=1&s=612x612&w=0&k=20&c=PxQ4t9dX-xn-_BfH__ecqsXt_YGpbq2WH73vQGIQK-E=" alt="Bride and Groom Exchange Garlands" />
              <div className="gallery-overlay">
                <span className="gallery-icon">💍</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://media.istockphoto.com/id/2240916784/photo/groom-tying-a-toe-ring-on-the-brides-foot-during-a-traditional-indian-wedding-ceremony.webp?a=1&b=1&s=612x612&w=0&k=20&c=RsQpA7lwHooopwa6OrcdVurUL4XU6JIDNywDRKVY1t0=" alt="Traditional Indian Wedding Ceremony" />
              <div className="gallery-overlay">
                <span className="gallery-icon">💑</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://plus.unsplash.com/premium_photo-1661317241247-08599f9869ca?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2VkZGluZyUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D" alt="Wedding Celebration" />
              <div className="gallery-overlay">
                <span className="gallery-icon">💎</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://plus.unsplash.com/premium_photo-1682092597591-81f59c80d9ec?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdlZGRpbmclMjBpbWFnZXMlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D" alt="Wedding Couple Together" />
              <div className="gallery-overlay">
                <span className="gallery-icon">🌹</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1639945506968-3dea2042c861?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D" alt="Wedding Rings Beautiful" />
              <div className="gallery-overlay">
                <span className="gallery-icon">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="rsvp-section">
        <div className="rsvp-bg-image">
          <img src="https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=1200&q=80&auto=format&fit=crop" alt="RSVP Background" />
          <div className="rsvp-bg-overlay"></div>
        </div>
        <div className="section-container">
          <div className="section-title-wrapper">
            <h2 className="section-title">RSVP</h2>
            <div className="section-title-decoration">
              <span className="decor-line"></span>
              <span className="decor-flower">✉️</span>
              <span className="decor-line"></span>
            </div>
            <p className="section-subtitle">Please let us know if you'll be joining us</p>
          </div>
          <div className="rsvp-form">
            <input type="text" placeholder="Your Name" className="rsvp-input" />
            <input type="email" placeholder="Your Email" className="rsvp-input" />
            <input type="tel" placeholder="Your Phone" className="rsvp-input" />
            <select className="rsvp-input">
              <option>Will you be attending?</option>
              <option>Yes, I'll be there!</option>
              <option>Sorry, can't make it</option>
            </select>
            <textarea placeholder="Any special requests or messages..." className="rsvp-textarea"></textarea>
            <button className="rsvp-submit-btn">Send RSVP</button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="section-container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Find Us</h2>
            <div className="section-title-decoration">
              <span className="decor-line"></span>
              <span className="decor-flower">📍</span>
              <span className="decor-line"></span>
            </div>
          </div>
          <div className="location-cards">
            <div className="location-card">
              <div className="location-icon">💒</div>
              <h3>Wedding Ceremony</h3>
              <p>Hotel Grand Lotus</p>
              <p>Beside High-tech Bus Stand</p>
              <p>Bilaspur, Chhattisgarh</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="location-link">View on Map</a>
            </div>
            <div className="location-card">
              <div className="location-icon">🎉</div>
              <h3>Reception</h3>
              <p>Hotel Sayaji</p>
              <p>Raipur</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="location-link">View on Map</a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          className="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <span className="back-to-top-icon">↑</span>
          <span className="back-to-top-text">Top</span>
        </button>
      )}

      {/* Footer */}
      <footer className="wedding-footer">
        <div className="footer-content">
          <p>With love, Abhishek & Divya</p>
          <div className="footer-icons">
            <span>💕</span>
            <span>🌺</span>
            <span>💕</span>
          </div>
          <p className="footer-text">Thank you for being part of our special day</p>
          <p className="footer-credit">Website designed by Purvi Sahu</p>
      </div>
      </footer>

      {/* Decorative elements */}
      <div className="decorative-flowers flower-1">🌸</div>
      <div className="decorative-flowers flower-2">🌺</div>
      <div className="decorative-flowers flower-3">🌼</div>
      <div className="decorative-flowers flower-4">🌻</div>
      
      {/* Floating Photo Frames */}
      <div className="photo-frame photo-frame-1">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80&auto=format&fit=crop" alt="Wedding" />
      </div>
      <div className="photo-frame photo-frame-2">
        <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=200&q=80&auto=format&fit=crop" alt="Wedding" />
      </div>
    </div>
  );
};

export default LandingPage;

