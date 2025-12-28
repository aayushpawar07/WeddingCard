// AI assisted development
import React, { useEffect, useState } from 'react';
import './WeddingCard.css';

const WeddingCard = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 100);

    // Scroll tracking for parallax
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Mouse tracking for 3D effects
    const handleMouseMove = (e) => {
      const card = document.querySelector('.wedding-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({
          x: (x / rect.width - 0.5) * 20,
          y: (y / rect.height - 0.5) * 20,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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

  return (
    <div className={`wedding-card-container ${isOpen ? 'open' : ''}`}>
      {/* Background Image - Premium Wedding Decoration */}
      <div className="card-bg-image-layer">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop" 
          alt="Wedding decoration" 
          className="card-bg-image"
        />
        <div className="card-bg-overlay"></div>
        <div className="card-pattern-dots"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="floating-decorations">
        <div className="decoration decoration-1">🌸</div>
        <div className="decoration decoration-2">🌺</div>
        <div className="decoration decoration-3">🌼</div>
        <div className="decoration decoration-4">✨</div>
        <div className="decoration decoration-5">💫</div>
      </div>

      <button className="close-btn" onClick={onClose} aria-label="Close invitation">
        ✕
      </button>
      
      <div className="card-wrapper">
        <div 
          className="wedding-card"
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Glassmorphism Overlay */}
          <div className="glass-overlay"></div>
          
          {/* Decorative Border */}
          <div className="card-border-outer"></div>
          <div className="card-border-inner"></div>
          
          {/* Animated Gradient Mesh */}
          <div className="gradient-mesh"></div>
          
          {/* Decorative corner elements - Mandala Style */}
          <div className="corner-mandala corner-top-left">
            <div className="mandala-pattern"></div>
          </div>
          <div className="corner-mandala corner-top-right">
            <div className="mandala-pattern"></div>
          </div>
          <div className="corner-mandala corner-bottom-left">
            <div className="mandala-pattern"></div>
          </div>
          <div className="corner-mandala corner-bottom-right">
            <div className="mandala-pattern"></div>
          </div>
          
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

            {/* Groom Details with Image */}
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

            {/* Bride Details with Image */}
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

            {/* Decorative Pond Scene with Premium Image */}
            <div className="pond-scene">
              <img 
                src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80&auto=format&fit=crop" 
                alt="Wedding decoration" 
                className="pond-bg-image"
              />
              <div className="pond-water"></div>
              <div className="pond-overlay"></div>
              <div className="pond-glow"></div>
              <div className="lotus-flower lotus-1">🪷</div>
              <div className="lotus-flower lotus-2">🪷</div>
              <div className="lotus-flower lotus-3">🪷</div>
              <div className="swan swan-left">🦢</div>
              <div className="swan swan-right">🦢</div>
              <div className="peacock peacock-left">🦚</div>
              <div className="peacock peacock-right">🦚</div>
            </div>

            {/* Photo Gallery Section */}
            <div className="photo-gallery">
              <h3 className="gallery-title">Memories to Cherish</h3>
              <div className="gallery-grid">
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=80&auto=format&fit=crop" alt="Gallery" />
                  <div className="gallery-overlay"></div>
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=300&q=80&auto=format&fit=crop" alt="Gallery" />
                  <div className="gallery-overlay"></div>
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=300&q=80&auto=format&fit=crop" alt="Gallery" />
                  <div className="gallery-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <div className="share-section">
        <button className="share-btn" onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Wedding Invitation - Abhishek & Divya',
              text: 'You are invited to the wedding celebration!',
              url: window.location.href,
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
          }
        }}>
          📤 Share Invitation
        </button>
      </div>
    </div>
  );
};

export default WeddingCard;

