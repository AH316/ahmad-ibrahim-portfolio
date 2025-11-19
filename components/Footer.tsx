'use client';

import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { footerLinks, footerDescription, socialLinks, personalInfo, quotes } from '@/lib/content';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gondor-dark border-t border-gondor-gold/20 py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-cinzel text-3xl text-gondor-gold hover:text-gondor-white transition-colors mb-4"
              data-testid="footer-logo"
            >
              AI
            </motion.button>
            <p className="text-gondor-silver text-sm leading-relaxed max-w-sm">
              {footerDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cinzel text-lg text-gondor-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-gondor-silver hover:text-gondor-gold transition-colors text-sm"
                    data-testid={`footer-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gondor-silver hover:text-gondor-gold transition-colors text-sm"
                  data-testid="footer-link-resume"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-cinzel text-lg text-gondor-white mb-4">Get In Touch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gondor-silver hover:text-gondor-gold transition-colors"
                  data-testid="footer-email"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li className="text-gondor-silver">{personalInfo.location}</li>
              <li className="pt-2">
                {socialLinks.filter(link => link.name === 'LinkedIn' || link.name === 'GitHub').map((link, index) => (
                  <span key={link.name}>
                    {index > 0 && <span className="mx-2 text-gondor-gold">•</span>}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gondor-silver hover:text-gondor-gold transition-colors"
                      data-testid={`footer-${link.name.toLowerCase()}`}
                    >
                      {link.name}
                    </a>
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gondor-gold/30 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gondor-silver">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} Ahmad Ibrahim. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Built with</span>
            <FaHeart className="text-gondor-gold animate-pulse" />
            <span>using Next.js & TailwindCSS</span>
          </div>
        </div>

        {/* LOTR Easter Egg */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-8 pt-8 border-t border-gondor-gold/10"
        >
          <p className="text-gondor-silver/50 text-xs italic font-cinzel">
            &ldquo;{quotes.footer.text}&rdquo;
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
