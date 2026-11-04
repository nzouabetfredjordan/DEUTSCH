import ContactForm from '../components/ContactForm';
import { siteData } from '../data/siteData';
import SectionTitle from '../components/SectionTitle';

export default function ContactPage() {
  return (
    <main className="page-shell">
      <div className="container contact-layout">
        <div>
          <SectionTitle eyebrow="Contact" title="Parlons de votre projet" text="Une idée, un besoin, un site à moderniser ? Faites-nous part de votre vision et nous vous répondons rapidement." />

          <div className="contact-list">
            <a href={`tel:${siteData.phone}`}><strong>Téléphone</strong> {siteData.phone}</a>
            <a href={`https://wa.me/${siteData.whatsapp}`} target="_blank" rel="noreferrer"><strong>WhatsApp</strong> {siteData.whatsapp}</a>
            <a href={`mailto:${siteData.email}`}><strong>Email</strong> {siteData.email}</a>
            <a href="https://instagram.com/StartApp89" target="_blank" rel="noreferrer"><strong>Instagram</strong> {siteData.instagram}</a>
            <a href="https://www.tiktok.com/@StartApp89" target="_blank" rel="noreferrer"><strong>TikTok</strong> {siteData.tiktok}</a>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
