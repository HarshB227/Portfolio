import { motion } from 'framer-motion'

const certifications = [
  { name: 'Generative AI with LLMs', issuer: 'DeepLearning.AI / Coursera' },
  { name: 'Microsoft Azure AI Fundamentals (AI-900)', issuer: 'Microsoft' },
  { name: 'Microsoft Power BI Data Analyst Associate (PL-300)', issuer: 'Microsoft' },
  { name: 'Google Data Analytics Professional Certificate', issuer: 'Coursera' },
  { name: 'Complete 2026 Python Bootcamp (17.5 hrs)', issuer: 'Udemy — May 2026' },
  { name: 'Google Cloud: Architecting with Compute Engine', issuer: 'Coursera' },
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Certifications() {
  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Credentials</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          CERTIFICATIONS
        </motion.h2>

        <div>
          {certifications.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-t border-gray-800 py-6"
            >
              <span className="text-lg md:text-xl text-white font-light">{c.name}</span>
              <span className="text-xs text-gray-500 tracking-widest uppercase">{c.issuer}</span>
            </motion.div>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
