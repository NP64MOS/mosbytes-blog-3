// Email template component for newsletters and notifications
// This would be used when sending actual emails

export function generateEmailTemplate(content, subscriberEmail, unsubscribeReason = '') {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MOSBytes Newsletter</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #00d4ff;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #00d4ff;
            margin-bottom: 10px;
        }
        .content {
            margin-bottom: 30px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
        .unsubscribe-link {
            color: #666;
            text-decoration: none;
        }
        .unsubscribe-link:hover {
            text-decoration: underline;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #00d4ff, #9333ea);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MOSBytes</div>
            <p>AI for Everyone - Learn, Build, and Grow with AI</p>
        </div>
        
        <div class="content">
            ${content}
        </div>
        
        <div class="footer">
            <p>
                You're receiving this email because you subscribed to MOSBytes updates.
            </p>
            <p>
                <a href="${unsubscribeUrl}" class="unsubscribe-link">
                    Unsubscribe from all emails
                </a>
                |
                <a href="${baseUrl}/dashboard" class="unsubscribe-link">
                    Manage preferences
                </a>
            </p>
            <p>
                MOSBytes - Making AI accessible to everyone<br>
                © ${new Date().getFullYear()} MOSBytes. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
  `
}

// Welcome email template
export function generateWelcomeEmail(subscriberName, subscriberEmail) {
  const content = `
    <h2>Welcome to MOSBytes, ${subscriberName || 'AI Enthusiast'}! 🎉</h2>
    
    <p>Thank you for joining our community of AI learners! We're excited to have you on board.</p>
    
    <p>Here's what you can expect:</p>
    <ul>
        <li>📚 Weekly AI tutorials and guides</li>
        <li>🔧 Practical AI tools and resources</li>
        <li>💡 Industry insights and trends</li>
        <li>🎯 Personalized learning recommendations</li>
    </ul>
    
    <p>Ready to start your AI journey?</p>
    
    <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard" class="button">
        Visit Your Dashboard
    </a>
    
    <p>If you have any questions, feel free to reply to this email. We're here to help!</p>
    
    <p>Best regards,<br>The MOSBytes Team</p>
  `
  
  return generateEmailTemplate(content, subscriberEmail)
}

// Newsletter template
export function generateNewsletterEmail(title, articles, subscriberEmail) {
  const articlesHtml = articles.map(article => `
    <div style="margin-bottom: 20px; padding: 15px; border-left: 3px solid #00d4ff;">
        <h3 style="margin: 0 0 10px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/blog/${article.id}" style="color: #333; text-decoration: none;">
                ${article.title}
            </a>
        </h3>
        <p style="margin: 0 0 10px 0; color: #666;">${article.description}</p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/blog/${article.id}" class="button">
            Read More
        </a>
    </div>
  `).join('')

  const content = `
    <h2>${title}</h2>
    
    <p>Here are the latest AI insights and tutorials from MOSBytes:</p>
    
    ${articlesHtml}
    
    <p>Happy learning!</p>
    
    <p>Best regards,<br>The MOSBytes Team</p>
  `
  
  return generateEmailTemplate(content, subscriberEmail)
}

export default {
  generateEmailTemplate,
  generateWelcomeEmail,
  generateNewsletterEmail
}