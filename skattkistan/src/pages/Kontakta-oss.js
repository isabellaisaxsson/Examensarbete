import "./style/kontakta-oss.css";

const KontaktaOss = () => {
      return (
        <div className="page-container">
    
          {/* Main content */}
          <main className="main-content">
            {/* Introduction section */}
            <section className="intro-section">
              <div className="intro-container">
                <h1>Kontakta oss</h1>
                <p>
                  We'd love to hear from you. Get in touch with us for any questions about our products or sustainable
                  initiatives.
                </p>
              </div>
            </section>
    
            <div className="contact-layout">
              {/* Contact Information */}
              <section className="contact-info-section">
                <div className="info-container">
                  <h2>Get in Touch</h2>
    
                  <div className="info-item">
                    <div className="info-icon">📞</div>
                    <div className="info-content">
                      <h3>Phone</h3>
                      <p>+46 123 456 789</p>
                      <p className="info-detail">Monday - Friday: 9:00 - 17:00</p>
                    </div>
                  </div>
    
                  <div className="info-item">
                    <div className="info-icon">✉️</div>
                    <div className="info-content">
                      <h3>Email</h3>
                      <p>hello@example.com</p>
                      <p className="info-detail">We'll respond within 24 hours</p>
                    </div>
                  </div>
    
                  <div className="info-item">
                    <div className="info-icon">📍</div>
                    <div className="info-content">
                      <h3>Location</h3>
                      <p>Stockholm, Sweden</p>
                      <p className="info-detail">Sustainable City Center</p>
                    </div>
                  </div>
                </div>
              </section>
    
              {/* Contact Form */}
              <section className="contact-form-section">
                <div className="form-container">
                  <h2>Send Us a Message</h2>
                  <form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" name="name" placeholder="Your name" required />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" placeholder="Your email address" required />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input type="text" id="subject" name="subject" placeholder="What is this regarding?" required />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" placeholder="Your message" rows={5} required></textarea>
                    </div>
    
                    <button type="submit" className="custom-button">
                      Send Message
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </main>
        </div>
      )
    };

export default KontaktaOss;

