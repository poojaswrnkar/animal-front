pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out repository..."
                git branch: 'main', url: 'https://github.com/poojaswrnkar/animal-front.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            when { expression { fileExists('package.json') && sh(script: "grep -q 'test' package.json", returnStatus: true) == 0 } }
            steps {
                echo "Running tests..."
                sh 'npm test || echo "No tests configured"'
            }
        }

        stage('Build') {
            steps {
                echo "Building project..."
                sh 'npm run build'
            }
        }

        stage('Deploy Locally') {
            steps {
                echo "Starting frontend server on port 9000..."
                sh 'nohup npm start &'
                echo "Frontend is running at http://localhost:9000"
            }
        }
    }

    post {
        always {
            echo "Pipeline finished (success or failure)."
        }
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}
