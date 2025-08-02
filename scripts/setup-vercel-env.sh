#!/bin/bash

echo "🚀 Setting up Vercel environment variables..."
echo ""
echo "This script will help you set up the required environment variables for production deployment."
echo ""

# Function to prompt for input with a default value
prompt_with_default() {
    local prompt=$1
    local default=$2
    local var_name=$3
    
    read -p "$prompt [$default]: " value
    value=${value:-$default}
    echo "$value"
}

# Generate secrets if not provided
JWT_SECRET=$(openssl rand -base64 32)
PAYLOAD_SECRET=$(openssl rand -base64 32)

echo "📝 Please provide the following values:"
echo ""

# Prompt for each variable
DATABASE_URL=$(prompt_with_default "DATABASE_URL (PostgreSQL connection string)" "" "DATABASE_URL")
ADMIN_EMAIL=$(prompt_with_default "ADMIN_EMAIL" "admin@gluteproject.com" "ADMIN_EMAIL")
ADMIN_PASSWORD=$(prompt_with_default "ADMIN_PASSWORD" "GluteProject2024!" "ADMIN_PASSWORD")
NEXT_PUBLIC_BASE_URL=$(prompt_with_default "NEXT_PUBLIC_BASE_URL" "https://glute-project.vercel.app" "NEXT_PUBLIC_BASE_URL")

echo ""
echo "🔐 Generated secrets:"
echo "JWT_SECRET: $JWT_SECRET"
echo "PAYLOAD_SECRET: $PAYLOAD_SECRET"
echo ""

# Confirm before proceeding
read -p "Do you want to add these environment variables to Vercel? (y/n): " confirm
if [[ $confirm != "y" ]]; then
    echo "❌ Setup cancelled."
    exit 1
fi

# Add environment variables to Vercel
echo ""
echo "🔧 Adding environment variables to Vercel..."

vercel env add DATABASE_URL production <<< "$DATABASE_URL"
vercel env add JWT_SECRET production <<< "$JWT_SECRET"
vercel env add ADMIN_EMAIL production <<< "$ADMIN_EMAIL"
vercel env add ADMIN_PASSWORD production <<< "$ADMIN_PASSWORD"
vercel env add NEXT_PUBLIC_BASE_URL production <<< "$NEXT_PUBLIC_BASE_URL"
vercel env add PAYLOAD_SECRET production <<< "$PAYLOAD_SECRET"

echo ""
echo "✅ Environment variables added successfully!"
echo ""
echo "📋 Save these values for your records:"
echo "DATABASE_URL=$DATABASE_URL"
echo "JWT_SECRET=$JWT_SECRET"
echo "ADMIN_EMAIL=$ADMIN_EMAIL"
echo "ADMIN_PASSWORD=$ADMIN_PASSWORD"
echo "NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL"
echo "PAYLOAD_SECRET=$PAYLOAD_SECRET"
echo ""
echo "You can now run 'vercel --prod' to deploy your application."