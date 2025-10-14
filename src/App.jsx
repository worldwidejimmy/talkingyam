import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'
import './App.css'

function App() {
  const [markdown, setMarkdown] = useState('Loading content...')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/content.md')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load content')
        }
        return response.text()
      })
      .then(text => {
        setMarkdown(text)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleCopyCode = (code) => {
    if (navigator.clipboard && code) {
      navigator.clipboard.writeText(code)
        .then(() => console.log('Code copied!'))
        .catch(err => console.error('Failed to copy:', err))
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="site-title">🗣️ Talking Yam</h1>
          <p className="site-subtitle">Political Analysis with Jimmy and ChatGPT5</p>
        </header>

        <main className="content">
          {loading && <div className="loading">Loading content...</div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && !error && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                pre: ({ children, ...props }) => {
                  const codeContent = children?.props?.children || ''
                  
                  return (
                    <div className="code-block-wrapper">
                      <pre {...props}>{children}</pre>
                      <button 
                        className="copy-button" 
                        onClick={() => handleCopyCode(codeContent)}
                      >
                        Copy
                      </button>
                    </div>
                  )
                },
              }}
            >
              {markdown}
            </ReactMarkdown>
          )}
        </main>

        <footer className="footer">
          <p>&copy; 2025 Talking Yam | Powered by React + Vite + Markdown</p>
        </footer>
      </div>
    </div>
  )
}

export default App
