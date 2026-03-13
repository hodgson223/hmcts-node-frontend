pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Check Node Environment') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }
    }

    post {
        success {
            echo 'Node Express pipeline ran successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}