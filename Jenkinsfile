pipeline {
    agent any

    environment {
        APP_HOST = '3.93.59.62'
        APP_USER = 'ubuntu'
        APP_DIR = '/var/www/clouddesk'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Downloading CloudDesk source code'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Package Application') {
            steps {
                sh '''
                    tar -czf "$WORKSPACE/../clouddesk-${BUILD_NUMBER}.tar.gz" \
                    --exclude=.git \
                    --exclude=node_modules \
                    --exclude=.github \
                    --exclude=.env \
                    -C "$WORKSPACE" .
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['clouddesk-ec2-key']) {
                    sh '''
                        scp -o StrictHostKeyChecking=accept-new \
                        "$WORKSPACE/../clouddesk-${BUILD_NUMBER}.tar.gz" \
                        $APP_USER@$APP_HOST:/home/$APP_USER/

                        ssh -o StrictHostKeyChecking=accept-new \
                        $APP_USER@$APP_HOST "
                            mkdir -p $APP_DIR &&
                            tar -xzf ~/clouddesk-${BUILD_NUMBER}.tar.gz -C $APP_DIR &&
                            cd $APP_DIR &&
                            npm ci --omit=dev &&
                            pm2 startOrReload ecosystem.config.cjs --update-env
                        "
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CloudDesk deployed successfully!'
        }

        failure {
            echo 'Deployment failed. Check the console output.'
        }
    }
}
