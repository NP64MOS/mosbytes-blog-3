#!/bin/bash

# MOSBytes Deployment Script
# This script prepares and deploys your MOSBytes website to Vercel

echo "🚀 MOSBytes Deployment Script"
echo "=============================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Pre-deployment checks...${NC}"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Run build test
echo -e "${BLUE}🔨 Testing build...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Please fix errors before deploying.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# Check for environment file
if [ ! -f ".env.local" ] && [ ! -f ".env.development.local" ]; then
    echo -e "${YELLOW}⚠️  No environment file found locally.${NC}"
    echo -e "${YELLOW}   Make sure to set environment variables in Vercel dashboard.${NC}"
fi

echo -e "${BLUE}🌐 Starting deployment to Vercel...${NC}"

# Deploy to Vercel
vercel --prod

if [ $? -eq 0 ]; then
    echo -e "${GREEN}🎉 Deployment successful!${NC}"
    echo ""
    echo -e "${BLUE}📋 Post-deployment checklist:${NC}"
    echo "1. ✅ Test your live site"
    echo "2. ✅ Verify admin login works"
    echo "3. ✅ Check database connection"
    echo "4. ✅ Test blog functionality"
    echo "5. ✅ Verify mobile responsiveness"
    echo ""
    echo -e "${GREEN}🌟 Your MOSBytes website is now live!${NC}"
    echo -e "${BLUE}   Share your AI knowledge with the world! 🎓✨${NC}"
else
    echo -e "${RED}❌ Deployment failed! Check the error messages above.${NC}"
    exit 1
fi