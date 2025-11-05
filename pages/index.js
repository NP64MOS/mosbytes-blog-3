import Layout from '../components/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'

// ✅ SEO Metadata
export const metadata = {
  title: "MOSBytes | Simplify to Solve — Learn AI the Simple Way",
  description:
    "Learn AI without the overwhelm. MOSBytes turns complexity into clarity with simple, human-centered learning.",
  keywords: [
    "AI made simple",
    "learn AI easily",
    "AI for everyone",
    "simplify to solve",
    "AI tools",
    "AI tutorials",
  ],
}

export default function Home() {
  return (
    <Layout>
      {/* 🌿 Hero Section */}
      <section className="hero-bg section-padding">
        <div className="container-clean">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Main Headline */}
            <h1 className="text-hero mb-8">
              <span className="block">Simplify to</span>
              <span className="gradient-text">Solve</span>
            </h1>

            {/* Subtitle */}
            <p className="text-body-large mb-12 max-w-2xl mx-auto text-gray-700">
              AI made simple — human, clear, and ready to help you grow.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/blog" className="btn-primary text-lg px-10 py-5">
                Start Learning
              </Link>
              <Link href="#philosophy" className="btn-ghost text-lg px-8 py-5">
                Our Mindset
              </Link>
            </div>

            {/* Hero Visual */}
            <motion.div
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-sky-50 rounded-3xl shadow-card flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">AI Made Simple</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 📜 Philosophy Section */}
      <section id="philosophy" className="section-padding paper-bg">
        <div className="container-clean">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section-title mb-6">
              Why <span className="gradient-text">Simplify</span>?
            </h2>
            <p className="text-body-large max-w-3xl mx-auto text-gray-700">
              Clarity creates progress.
              We turn complex ideas into tools that empower people — not overwhelm them.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Clarity First',
                description: 'Simple ideas are powerful. We make AI easy to understand and use.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
              },
              {
                title: 'Grow Simply',
                description: 'Learn step by step. Each byte builds confidence and clarity.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
              {
                title: 'Human First',
                description: 'Tech should adapt to people, not the other way around.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="card-paper text-center hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-card-title mb-4">{item.title}</h3>
                <p className="text-body text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧩 Features Section */}
      <section className="section-padding">
        <div className="container-clean">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section-title mb-6">
              Learn AI the <span className="gradient-text">Simple Way</span>
            </h2>
            <p className="text-body-large max-w-3xl mx-auto text-gray-700">
              Learn, apply, and grow with AI — without the noise.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { title: 'Step-by-Step Guides', description: 'Simple steps. Real results.' },
                { title: 'Real Use Cases', description: 'AI that solves real problems.' },
                { title: 'Curated Tools', description: 'Skip the noise. Use what works.' },
                { title: 'Community', description: 'Learn with others who love simplicity.' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card-paper">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-8 bg-blue-100 rounded-lg flex items-center px-4">
                      <span className="text-blue-600 font-medium">AI Tutorial Complete ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ✳️ CTA Section */}
      <section className="section-padding hero-bg">
        <div className="container-narrow">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section-title mb-6">
              Ready to <span className="gradient-text">Simplify AI</span>?
            </h2>
            <p className="text-body-large mb-12 max-w-2xl mx-auto text-gray-700">
              The smartest way to use AI — is the simplest.
              Start learning today.
            </p>
            <Link href="/blog" className="btn-primary text-lg px-12 py-5 hover-glow">
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
