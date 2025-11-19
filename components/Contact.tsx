'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useForm as useFormspree } from '@formspree/react';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone, FaIdBadge } from 'react-icons/fa';
import Quote from './lotr/Quote';
import { socialLinks, personalInfo, quotes } from '@/lib/content';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Map social link names to icons
const iconMap: Record<string, any> = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Email: FaEnvelope,
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
  const [formspreeState, sendToFormspree] = useFormspree('xgvpzorq');

  const onSubmit = async (data: ContactFormData) => {
    await sendToFormspree(data as any);
    if (formspreeState.succeeded) {
      reset();
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-gondor-stone relative"
      data-testid="contact-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-gondor-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-px bg-gondor-gold mx-auto" aria-hidden="true"></div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Quote text={quotes.contact.text} author={quotes.contact.author} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gondor-silver mb-2 font-cinzel text-sm uppercase tracking-wider">
                  Name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gondor-dark border border-gondor-gold/30
                             text-gondor-silver focus:border-gondor-gold focus:outline-none
                             transition-colors duration-300"
                  placeholder="Your name"
                  data-testid="contact-name-input"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={errors.name ? "true" : "false"}
                  required
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gondor-silver mb-2 font-cinzel text-sm uppercase tracking-wider">
                  Email
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gondor-dark border border-gondor-gold/30
                             text-gondor-silver focus:border-gondor-gold focus:outline-none
                             transition-colors duration-300"
                  placeholder="your.email@example.com"
                  data-testid="contact-email-input"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={errors.email ? "true" : "false"}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-gondor-silver mb-2 font-cinzel text-sm uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-gondor-dark border border-gondor-gold/30
                             text-gondor-silver focus:border-gondor-gold focus:outline-none
                             transition-colors duration-300 resize-none"
                  placeholder="Your message..."
                  data-testid="contact-message-input"
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={errors.message ? "true" : "false"}
                  required
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-red-400 text-sm">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formspreeState.submitting}
                className="w-full px-6 py-4 bg-transparent border-2 border-gondor-gold text-gondor-gold
                           hover:bg-gondor-gold hover:text-gondor-dark
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300 font-cinzel text-lg
                           relative overflow-hidden group"
                data-testid="contact-submit-button"
              >
                <span className="relative z-10">
                  {formspreeState.submitting ? 'Sending...' : 'Send Message'}
                </span>
                <span className="absolute inset-0 bg-gondor-gold transform scale-x-0
                                 group-hover:scale-x-100 transition-transform duration-300
                                 origin-left -z-0"></span>
              </button>

              {/* Success/Error Messages */}
              {formspreeState.succeeded && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center font-cinzel"
                  data-testid="contact-success-message"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.p>
              )}

              {formspreeState.errors && (
                <p className="text-red-400 text-center text-sm" data-testid="contact-error-message">
                  Oops! There was an error sending your message.
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Gondor Seal Decoration */}
            <div className="bg-gondor-dark border border-gondor-gold/30 p-8
                            flex items-center justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-gondor-gold/20" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-gondor-gold/20" aria-hidden="true" />

              <div className="text-center z-10">
                <div className="text-gondor-gold text-6xl mb-4 font-cinzel" aria-hidden="true">✦</div>
                <p className="text-gondor-silver text-lg leading-relaxed max-w-sm">
                  Let&apos;s collaborate on building something great. Whether it&apos;s a new opportunity
                  or just a chat about technology, I&apos;d love to hear from you.
                </p>
              </div>
            </div>

            {/* Contact Info Cards: Location, Phone, Work Authorization */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Location Card */}
              <div className="flex items-start gap-1 py-3 px-1 bg-gondor-dark border border-gondor-gold/20">
                <FaMapMarkerAlt className="text-gondor-gold text-lg sm:text-xl flex-shrink-0 mt-2" aria-hidden="true" />
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-gondor-white font-cinzel text-xs sm:text-sm mb-1 whitespace-nowrap tracking-tight">Location</p>
                  <p className="text-gondor-gold text-sm">{personalInfo.location}</p>
                </div>
              </div>

              {/* Phone Card */}
              {personalInfo.phone && (
                <div className="flex items-start gap-1 py-3 px-1 bg-gondor-dark border border-gondor-gold/20">
                  <FaPhone className="text-gondor-gold text-lg sm:text-xl flex-shrink-0 mt-2" aria-hidden="true" />
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-gondor-white font-cinzel text-xs sm:text-sm mb-1 whitespace-nowrap tracking-tight">Phone</p>
                    <a
                      href={`tel:${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                      className="text-gondor-gold hover:text-gondor-gold/80 transition-colors duration-300 text-sm"
                      aria-label={`Call ${personalInfo.phone}`}
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Work Authorization Card */}
              <div className="flex items-start gap-1 py-3 px-1 bg-gondor-dark border border-gondor-gold/20">
                <FaIdBadge className="text-gondor-gold text-lg sm:text-xl flex-shrink-0 mt-2" aria-hidden="true" />
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-gondor-white font-cinzel text-xs sm:text-sm mb-1 whitespace-nowrap tracking-tight">Work Authorization</p>
                  <p className="text-gondor-gold text-sm">{personalInfo.workAuthorization}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-cinzel text-xl text-gondor-white mb-4">Connect With Me</h3>
              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const IconComponent = iconMap[social.name];
                  const hoverColor = social.name === 'LinkedIn' ? 'hover:text-[#0077b5]' :
                                     social.name === 'GitHub' ? 'hover:text-gondor-white' :
                                     'hover:text-gondor-gold';

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 bg-gondor-dark border border-gondor-gold/20
                                 hover:border-gondor-gold/50 transition-all duration-300 group
                                 ${hoverColor}`}
                      data-testid={`social-link-${social.name.toLowerCase()}`}
                      aria-label={`Connect on ${social.name}`}
                    >
                      {IconComponent && <IconComponent className="text-gondor-gold text-2xl group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />}
                      <span className="text-gondor-silver group-hover:text-gondor-white transition-colors">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
