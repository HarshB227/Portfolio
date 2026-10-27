import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

const stats = [
  { value: '1.5+', label: 'Years in IT, automation & security' },
  { value: '9.27', label: 'BSc CGPA out of 10' },
  { value: '10K+', label: 'Wallets analysed for fraud risk' },
  { value: '6+', label: 'ML algorithms benchmarked' },
]

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">About Harsh</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.p {...fadeInUp} className="text-base lg:text-lg text-gray-300 leading-relaxed">
            I'm an MSc Data Science graduate from the University of Roehampton, specialising in
            Machine Learning, Deep Learning and Natural Language Processing. I work mostly in
            Python and SQL, building end-to-end ML pipelines, NLP solutions and data-driven applications.
          </motion.p>
          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-base lg:text-lg text-gray-300 leading-relaxed"
          >
            My work covers model development, evaluation and deployment-minded engineering with
            scikit-learn and Google Cloud Platform — backed by 1.5+ years of IT, automation and
            security experience delivering reliable, scalable systems.
          </motion.p>
        </div>

        <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
          <h2 className="font-display text-[8vw] lg:text-section leading-none tracking-tight text-gray-300">
            "SEEKING A<br />
            <span className="text-white underline underline-offset-8">GENERATIVE AI DEVELOPER</span><br />
            ROLE IN LONDON."
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
              className="border-t border-gray-800 pt-6"
            >
              <p className="font-display text-5xl lg:text-6xl text-white">{s.value}</p>
              <p className="mt-2 text-xs text-gray-500 tracking-widest uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
