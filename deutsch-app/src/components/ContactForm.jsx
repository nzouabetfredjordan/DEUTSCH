import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Erreur lors de l’envoi');
      setSubmitted(true);
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setSubmitted(false);
      alert('Une erreur est survenue. Merci d’utiliser WhatsApp ou le téléphone pour nous contacter directement.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="input-grid">
        <label>
          Nom
          <input type="text" name="name" placeholder="Votre nom" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="Votre email" required />
        </label>
      </div>
      <label>
        Sujet
        <input type="text" name="subject" placeholder="Quel est votre besoin ?" required />
      </label>
      <label>
        Message
        <textarea name="message" placeholder="Dites-nous votre projet" rows="5" required />
      </label>
      <button type="submit" className="primary-btn">
        Envoyer le message
      </button>
      {submitted && <p className="success-message">Message envoyé avec succès. Nous vous répondrons rapidement.</p>}
    </form>
  );
}
