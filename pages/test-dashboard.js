import { useState } from 'react'
import Layout from '../components/Layout'

export default function TestDashboard() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('john.doe@example.com')

  const testLookup = async () => {
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/subscriber/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testSubscribe = async () => {
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          name: 'Test User'
        })
      })

      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Test Dashboard APIs - MOSBytes">
      <div className="min-h-screen bg-gradient-to-br from-light to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary dark:text-white mb-8 text-center">
            Dashboard API Test
          </h1>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">
              Test Subscriber Lookup
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email to lookup:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter email to test"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={testLookup}
                  disabled={loading}
                  className="bg-gradient-to-r from-neon to-neon-purple text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? 'Testing...' : 'Test Lookup API'}
                </button>
                
                <button
                  onClick={testSubscribe}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? 'Testing...' : 'Test Subscribe API'}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-2">
                Demo Emails to Test:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <strong>john.doe@example.com</strong>
                  <br />12 tutorials, 15-day streak
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <strong>alice.johnson@example.com</strong>
                  <br />20 tutorials, 25-day streak
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <strong>jane.smith@example.com</strong>
                  <br />8 tutorials, 7-day streak
                </div>
              </div>
            </div>

            {result && (
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-white mb-2">
                  API Response:
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {result}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">
              Dashboard Access Instructions
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>1. Go to <a href="/dashboard" className="text-neon hover:underline">/dashboard</a></p>
              <p>2. Enter one of the demo emails above</p>
              <p>3. Click "Access Dashboard" to see real user data</p>
              <p>4. Or enter any new email to create a fresh account</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}