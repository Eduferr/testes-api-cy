pipeline {
    agent any

    stages {
        stage('setup') {
            steps {
                git branch: 'main', url: 'https://github.com/Eduferr/teste-api-ebac.git' 
                sh 'npm install'
            }
        }
        stage('servidorUp') {
            steps {
                //sh 'npm start &'
                // Inicia o servidor em segundo plano, com output em arquivo log
                sh 'nohup npm start > server.log 2>&1 &'
                // Aguarda alguns segundos para garantir que o servidor esteja online
               sleep(time: 50, unit: 'SECONDS')
            }
        }
        stage('Test') {
            steps {
                sh 'NO_COLOR=1 npm test'
            }
        }
    }
}