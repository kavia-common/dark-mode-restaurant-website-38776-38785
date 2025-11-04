import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import { applyTheme, getInitialTheme, persistTheme } from './theme';

// Sample menu data (two categories minimum) with placeholder images/SVGs
const SAMPLE_MENU = [
  {
    category: 'Starters',
    items: [
      {
        id: 'st-1',
        name: 'Citrus Ceviche',
        description: 'Fresh white fish marinated in citrus with cilantro and red onion.',
        price: 12.0,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
        tags: ['Gluten-free', 'Fresh'],
      },
      {
        id: 'st-2',
        name: 'Roasted Beet Salad',
        description: 'Golden & red beets, arugula, goat cheese, toasted walnuts.',
        price: 10.5,
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
        tags: ['Vegetarian'],
      },
      {
        id: 'st-3',
        name: 'Seared Scallops',
        description: 'Pan-seared scallops with herb butter and lemon.',
        price: 16.0,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
        tags: ['Chef special'],
      },
    ],
  },
  {
    category: 'Mains',
    items: [
      {
        id: 'mn-1',
        name: 'Grilled Salmon',
        description: 'Ocean salmon, charred lemon, seasonal vegetables.',
        price: 24.0,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
        tags: ['Seafood', 'Gluten-free'],
      },
      {
        id: 'mn-2',
        name: 'Herb Roasted Chicken',
        description: 'Free-range chicken, rosemary jus, garlic potatoes.',
        price: 21.0,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
        tags: ['House favorite'],
      },
      {
        id: 'mn-3',
        name: 'Wild Mushroom Risotto',
        description: 'Creamy arborio rice, wild mushrooms, parmesan.',
        price: 19.0,
        image: 'https://images.unsplash.com/photo-1476127396823-1a27b7e7585c?q=80&w=1200&auto=format&fit=crop',
        tags: ['Vegetarian'],
      },
    ],
  },
];

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  return { theme, setTheme };
}

// PUBLIC_INTERFACE
export function ThemeToggle({ theme, onToggle }) {
  /** Toggle button for switching between themes. */
  return (
    <button
      className="btn ghost"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

function Header({ theme, onToggle }) {
  return (
    <header className="header" role="banner">
      <div className="container header-inner">
        <a className="brand" href="#home">
          <span className="brand-badge" aria-hidden="true" />
          Ocean Bistro
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <ThemeToggle theme={theme} onToggle={onToggle} />
        </nav>
        <div className="mobile-nav">
          <ThemeToggle theme={theme} onToggle={onToggle} />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section" aria-label="Welcome">
      <div className="container hero-inner">
        <div>
          <h1>
            Coastal flavors. <span>Modern</span> craft.
          </h1>
          <p className="lead">
            A refined dining experience inspired by the ocean. Seasonal ingredients, elegant plates,
            and a warm, contemporary atmosphere.
          </p>
          <div className="hero-cta">
            <a className="btn primary" href="#menu">Explore Menu</a>
            <a className="btn" href="#contact">Reserve a Table</a>
          </div>
        </div>
        <div className="hero-art">
          <div className="card hero-card" aria-hidden="true">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop"
              alt="Gourmet seafood dish"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection({ data }) {
  return (
    <section id="menu" className="section" aria-labelledby="menu-heading">
      <div className="container">
        <div className="section-title">
          <h2 id="menu-heading">Menu</h2>
          <small>Crafted with seasonal ingredients</small>
        </div>
        {data.map((cat) => (
          <div key={cat.category} className="section" aria-label={cat.category}>
            <h3>{cat.category}</h3>
            <div className="menu-grid">
              {cat.items.map((item) => (
                <article className="card menu-card" key={item.id}>
                  <img className="menu-thumb" src={item.image} alt={item.name} />
                  <div className="menu-body">
                    <div className="menu-topline">
                      <h4 style={{ margin: 0 }}>{item.name}</h4>
                      <span className="price">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="subtitle" style={{ margin: '6px 0 0' }}>{item.description}</p>
                    {item.tags?.length ? (
                      <div className="tags" aria-label="Tags">
                        {item.tags.map((t) => (
                          <span className="tag" key={t}>{t}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container about">
        <div>
          <h2 id="about-heading">About Ocean Bistro</h2>
          <p className="subtitle">
            We blend classic coastal cuisine with modern technique, focusing on sustainability and the finest ingredients.
          </p>
          <div className="card" role="note" aria-label="Our Philosophy">
            <p style={{ margin: 0 }}>
              From the first bite to the last sip, our team brings passion to every detail. Expect
              attentive service, a curated wine list, and a menu that evolves with the seasons.
            </p>
          </div>
        </div>
        <figure className="about-figure">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop"
            alt="Restaurant interior with modern decor"
          />
        </figure>
      </div>
    </section>
  );
}

function useContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = useMemo(() => (vals) => {
    const e = {};
    if (!vals.name.trim()) e.name = 'Name is required';
    if (!vals.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = 'Enter a valid email';
    if (!vals.message.trim()) e.message = 'Message is required';
    return e;
  }, []);

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const eMap = validate(values);
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) return;

    try {
      setStatus('sending');
      // No backend; simulate network delay.
      await new Promise((res) => setTimeout(res, 700));
      setStatus('success');
      setValues({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return { values, errors, status, handleChange, handleSubmit };
}

function Contact() {
  const { values, errors, status, handleChange, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-title">
          <h2 id="contact-heading">Contact</h2>
          <small>We would love to hear from you</small>
        </div>
        <div className="grid cols-2">
          <form className="card" onSubmit={handleSubmit} aria-describedby="contact-helper">
            <div style={{ padding: 18 }}>
              <div className="form">
                <label htmlFor="name">Name</label>
                <input
                  className={`input ${errors.name ? 'error' : ''}`}
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
                {errors.name ? (
                  <span id="name-error" className="helper error" role="alert">{errors.name}</span>
                ) : <span className="helper">Please enter your name.</span>}

                <label htmlFor="email">Email</label>
                <input
                  className={`input ${errors.email ? 'error' : ''}`}
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                {errors.email ? (
                  <span id="email-error" className="helper error" role="alert">{errors.email}</span>
                ) : <span className="helper">We will never share your email.</span>}

                <label htmlFor="message">Message</label>
                <textarea
                  className={`textarea ${errors.message ? 'error' : ''}`}
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="How can we help?"
                  required
                />
                {errors.message ? (
                  <span id="message-error" className="helper error" role="alert">{errors.message}</span>
                ) : <span className="helper">Tell us about your request.</span>}

                <div>
                  <button
                    type="submit"
                    className="btn primary"
                    disabled={status === 'sending'}
                    aria-busy={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                </div>

                {status === 'success' && (
                  <div role="status" className="helper" style={{ color: 'var(--clr-success)', fontWeight: 600 }}>
                    Your message has been sent. We will get back to you shortly.
                  </div>
                )}
                {status === 'error' && (
                  <div role="alert" className="helper error">
                    Something went wrong. Please try again.
                  </div>
                )}
                <p id="contact-helper" className="helper" style={{ marginTop: 8 }}>
                  This form performs basic validation locally. No data is transmitted.
                </p>
              </div>
            </div>
          </form>
          <div className="card" style={{ padding: 18 }}>
            <h3>Visit Us</h3>
            <p className="subtitle" style={{ marginTop: 8 }}>
              100 Ocean Avenue, Suite 12
              <br />
              Seaside City, CA
            </p>
            <hr className="divider" />
            <p>
              Hours:
              <br />
              Mon–Thu 11:00–21:00
              <br />
              Fri–Sat 11:00–23:00
              <br />
              Sun 11:00–20:00
            </p>
            <hr className="divider" />
            <p>
              Phone: <a href="tel:+15551234567" aria-label="Call +1 555 123 4567">+1 (555) 123‑4567</a>
              <br />
              Email: <a href="mailto:hello@oceanbistro.example">hello@oceanbistro.example</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const env = process.env.REACT_APP_NODE_ENV || 'development';
  return (
    <footer className="footer" role="contentinfo">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>© {year} Ocean Bistro</div>
        <div style={{ color: 'var(--muted-text)' }}>Environment: {env}</div>
      </div>
    </footer>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Main application with Ocean Professional theme and sections. */
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div>
      <Header theme={theme} onToggle={toggleTheme} />
      <main>
        <Hero />
        <MenuSection data={SAMPLE_MENU} />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
