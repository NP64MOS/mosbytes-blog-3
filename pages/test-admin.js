import { useState } from 'react'
import Layout from '../components/Layout'

export default function TestAdmin() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testLogin = async () => {
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@mosbytes.com',
          password: 'admin123'
        }),
      })

      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testSubscribers = async () => {
    setLoading(true)
    setResult('')

    try {
      // First login to get token
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@mosbytes.com',
          password: 'admin123'
        }),
      })

      const loginData = await loginResponse.json()
      
      if (loginData.success) {
        // Then fetch subscribers
        const subscribersResponse = await fetch('/api/admin/subscribers', {
          headers: {
            'Authorization': `Bearer ${loginData.token}`
          }
        })

        const subscribersData = await subscribersResponse.json()
        setResult(JSON.stringify(subscribersData, null, 2))
      } else {
        setResult('Login failed: ' + JSON.stringify(loginData, null, 2))
      }
    } catch (error) {
      setResult(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Test Admin - MOSBytes">
      <div className="min-h-screen bg-gradient-to-br from-light to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary dark:text-white mb-8 text-center">
            Admin System Test
          </h1>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-sm">
            <div className="space-y-4 mb-6">
              <button
                onClick={testLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-neon to-neon-purple text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Admin Login'}
              </button>
              
              <button
                onClick={testSubscribers}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Subscribers API'}
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-2">
                Test Credentials:
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> admin@mosbytes.com<br />
                  <strong>Password:</strong> admin123
                </p>
              </div>
            </div>

            {result && (
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-white mb-2">
                  Result:
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto text-sm text-gray-800 dark:text-gray-200">
                  {result}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}