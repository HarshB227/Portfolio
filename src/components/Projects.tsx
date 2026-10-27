import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Document Q&A Chatbot using RAG',
    type: 'Personal Project',
    stack: ['Python', 'LangChain', 'FAISS', 'LLM API', 'Streamlit'],
    points: [
      'Built a retrieval-augmented chatbot that answers questions over PDF documents using embeddings, a FAISS vector store and an LLM API.',
      'Applied prompt engineering and chunking strategies to reduce hallucinations; deployed as a Streamlit web app on GitHub.',
    ],
  },
  {
    title: 'Financial News Summariser with Hugging Face',
    type: 'Personal Project',
    stack: ['Python', 'Hugging Face Transformers', 'NLP'],
    points: [
      'Fine-tuned and evaluated a transformer summarisation model on financial news, measuring quality with ROUGE scores.',
    ],
  },
  {
    title: 'Hybrid Crypto Fraud & Risk Detection',
    type: 'MSc Project',
    stack: ['Python', 'SQL', 'NLP', 'Pandas', 'Matplotlib', 'Seaborn'],
    points: [
      'Engineered risk features for 10,000+ wallet addresses from transaction-graph data using SQL and Python (Pandas), targeting 90%+ detection accuracy.',
      'Applied NLP and machine learning techniques to classify risky behaviour and produce explainable risk scores.',
      'Built interactive visualisations with Matplotlib and Seaborn to communicate model outputs to non-technical stakeholders.',
    ],
  },
  {
    title: 'Sales Forecasting & Predictive Analytics',
    type: 'MSc Project',
    stack: ['Python', 'scikit-learn', 'Power BI'],
    points: [
      'Built an end-to-end supervised ML pipeline on tabular sales data, reaching 88% test-set performance after model selection and tuning.',
      'Benchmarked 6+ algorithms across regression and classification tasks, validated with 5-fold cross-validation.',
      'Published forecast outputs to a Power BI report with drill-through by region and product line.',
    ],
  },
  {
    title: 'Financial & Sales Analytics Platform',
    type: 'Personal Project',
    stack: ['SQL', 'MySQL', 'Power BI', 'DAX'],
    points: [
      'Designed an end-to-end analytics solution over a 50,000+ row retail dataset with 20+ SQL queries (joins, CTEs, window functions) feeding a star-schema model.',
      'Built DAX measures for YoY growth, cohort retention and RFM segmentation, reducing estimated manual reporting time by 70%.',
    ],
  },
  {
    title: 'HR Attrition & Workforce Analytics',
    type: 'Personal Project',
    stack: ['SQL', 'Tableau', 'Excel'],
    points: [
      'Analysed a 5,000-employee dataset in SQL to identify attrition drivers; surfaced a 23% higher attrition rate in one business unit via an interactive Tableau dashboard.',
    ],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Selected Work</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          PROJECTS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800 border border-gray-800">
          {projects.map((p, index) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background p-8 lg:p-12"
            >
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-4">
                {String(index + 1).padStart(2, '0')} — {p.type}
              </p>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-6">{p.title}</h3>
              <ul className="space-y-3 mb-6">
                {p.points.map((pt) => (
                  <li key={pt} className="text-sm lg:text-base text-gray-400 leading-relaxed">— {pt}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="px-3 py-1 text-xs text-gray-500 border border-gray-800 rounded-full">{s}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
