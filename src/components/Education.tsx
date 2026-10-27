import { motion } from 'framer-motion'

const education = [
  {
    degree: 'MSc Data Science (Merit)',
    school: 'University of Roehampton',
    location: 'London, UK',
    period: '2025 — 2026',
    details: 'Relevant modules: Machine Learning, Deep Learning, Natural Language Processing, Statistics, Big Data Analytics, Data Visualisation.',
  },
  {
    degree: 'BSc Information Technology',
    school: 'Ganpat University',
    location: 'Gujarat, India',
    period: '2021 — 2024',
    details: 'Graduated with a CGPA of 9.27 / 10.',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Education() {
  return (
    <section id="education" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Background</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          EDUCATION
        </motion.h2>

        <div>
          {education.map((e, index) => (
            <motion.div
              key={e.degree}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: index * 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-gray-800 py-10 lg:py-14"
            >
              <div className="lg:col-span-5">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2">{e.degree}</h3>
                <p className="text-base lg:text-lg text-gray-400">{e.school}</p>
                <p className="text-sm text-gray-600 mt-2">{e.location}</p>
              </div>
              <p className="lg:col-span-2 text-sm text-gray-500 tracking-widest uppercase">{e.period}</p>
              <p className="lg:col-span-5 text-gray-400 leading-relaxed text-sm lg:text-base">{e.details}</p>
            </motion.div>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
