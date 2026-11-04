import { siteData } from '../data/siteData';

export default function Footer({ language = 'fr' }) {
  const isGerman = language === 'de';

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand small-brand">
            <img src="/deutschlogo.jpeg" alt="DEUTSCHE logo" />
            <span>{siteData.company}</span>
          </div>
          <p>{siteData.tagline}</p>
        </div>

        <div>
          <h3>{isGerman ? 'Kontakt' : 'Contact'}</h3>
          <ul>
            <li><a href={`tel:${siteData.phone}`}>{siteData.phone}</a></li>
            <li><a href={`https://wa.me/${siteData.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp {siteData.whatsapp}</a></li>
            <li><a href={`mailto:${siteData.email}`}>{siteData.email}</a></li>
          </ul>
        </div>

        <div>
          <h3>{isGerman ? 'Soziale Medien' : 'Réseaux'}</h3>
          <ul>
            <li><a href="https://instagram.com/StartApp89" target="_blank" rel="noreferrer">Instagram {siteData.instagram}</a></li>
            <li><a href="https://www.tiktok.com/@StartApp89" target="_blank" rel="noreferrer">TikTok {siteData.tiktok}</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Apprendre l’allemand. Apprendre & pratiquer l’Allemand.</span>
      </div>
    </footer>
  );
}
