'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { saveInquiry } from '@/lib/demo-store';

export default function InquiryForm({ vehicleId }: { vehicleId?: string }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); saveInquiry({ name: String(data.get('name')), email: String(data.get('email')), phone: String(data.get('phone')), message: String(data.get('message')), vehicleId }); setSent(true); }
  if (sent) return <div className="form-success"><CheckCircle2 size={28} /><h3>Thanks — we’ll be in touch.</h3><p>A Singh Motors team member will follow up shortly.</p></div>;
  return <form className="inquiry-form" onSubmit={submit}><label>Your name<input name="name" required placeholder="First and last name" /></label><div className="form-two"><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Phone<input name="phone" required placeholder="(985) 555-0142" /></label></div><label>Message<textarea name="message" required rows={4} placeholder="What would you like to know?" defaultValue={vehicleId ? 'I am interested in this vehicle and would like to check availability.' : ''} /></label><button className="button button-green" type="submit">Send inquiry <span>→</span></button><p className="form-note">By submitting, you agree to be contacted by Singh Motors about your inquiry.</p></form>;
}
