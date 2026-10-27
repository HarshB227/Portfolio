import { motion } from 'framer-motion'

const skillGroups = [
  { group: 'AI / ML', items: 'Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Prompt Engineering, Vector Databases (FAISS/Chroma), LangChain, Hugging Face Transformers, NLP, Deep Learning, Machine Learning, Supervised Learning, Feature Engineering, Model Evaluation, Cross-Validation, Hyperparameter Tuning' },
  { group: 'Programming', items: 'Python, SQL, Bash, PowerShell, R (basic)' },
  { group: 'Libraries & Tools', items: 'Pandas, NumPy, scikit-learn, Matplotlib, Seaborn, Jupyter Notebook, Git, GitHub, VS Code' },
  { group: 'Data & Databases', items: 'MySQL, PostgreSQL, SQL Server, BigQuery, ETL, Data Pipelines, Data Cleaning, Data Modelling' },
  { group: 'Cloud & DevOps', items: 'Google Cloud Platform (BigQuery, Compute Engine, Cloud Storage), Linux, Power Automate, Process Automation' },
  { group: 'Visualisation', items: 'Power BI (DAX, Power Query), Tableau, Excel' },
  { group: 'Working Practices', items: 'Agile/Scrum, Documentation, Cross-functional Collaboration, Stakeholder Communication' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Expertise</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-20"
        >
          TECHNICAL SKILLS
        </motion.h2>

        <div className="space-y-0">
          {skillGroups.map((g, index) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 border-b border-gray-800 py-5"
            >
              <span className="md:col-span-4 text-lg md:text-xl lg:text-2xl text-white font-light">{g.group}</span>
              <span className="md:col-span-8 text-sm md:text-base text-gray-400 leading-relaxed">{g.items}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
