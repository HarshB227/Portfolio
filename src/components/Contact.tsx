import { motion } from 'framer-motion'

const contacts = [
  { label: 'EMAIL — BHAVSARHARSH0904@GMAIL.COM', link: 'mailto:bhavsarharsh0904@gmail.com' },
  { label: 'PHONE — +44 7375 109422', link: 'tel:+447375109422' },
  { label: 'LINKEDIN', link: 'https://linkedin.com/in/harsh-bhavsar-059b90250' },
  { label: 'GITHUB', link: 'https://github.com/HarshB227' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Contact</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        {/* Giant Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-display text-[12vw] lg:text-hero leading-none tracking-tight mb-8"
        >
          Get in touch
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="w-full h-px bg-gray-700 mb-12 lg:mb-16"
        />

        {/* Informal Text */}
        <motion.div
          {...fadeInUp}
          className="mb-12 lg:mb-16 max-w-2xl"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-tight mb-4">
            OPEN TO<br />
            GENERATIVE AI<br />
            ROLES IN LONDON
          </h3>
          <p className="text-sm text-gray-500 tracking-widest uppercase">
            AVAILABLE FOR IMMEDIATE START — REFERENCES AVAILABLE ON REQUEST
          </p>
        </motion.div>

        {/* Contact Links */}
        <div className="space-y-0 max-w-2xl">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.link}
              target={contact.link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between border-t border-gray-800 py-5 md:py-6 group hover:bg-gray-900/30 transition-colors px-4 -mx-4"
            >
              <span className="text-sm text-gray-400 tracking-widest">
                {contact.label}
              </span>
              <span className="text-gray-500 group-hover:text-white transition-colors">
                ↗
              </span>
            </motion.a>
          ))}
          <div className="border-t border-gray-800" />
        </div>

        {/* Footer */}
        <motion.footer
          {...fadeInUp}
          className="mt-24 lg:mt-32 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Harsh Bhavsar. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            London, UK
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
