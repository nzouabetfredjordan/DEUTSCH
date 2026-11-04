import { siteData } from '../data/siteData';

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${siteData.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <img src="/logowhatsapp.jpeg" alt="WhatsApp" />
    </a>
  );
}
