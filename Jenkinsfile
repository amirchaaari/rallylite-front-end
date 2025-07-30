pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        GHCR_REPO = 'ghcr.io/amirchaaari/rallylite-frontend'
        GHCR_CREDENTIALS_ID = 'GHCR_PAT'
        API_URL = 'http://57.151.36.44'
            SONARQUBE_ENV = 'SonarQube' // Must match the Jenkins config name
    SONAR_PROJECT_KEY = 'rallylite-front'
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                deleteDir()
                git branch: 'main',
                    credentialsId: "${GHCR_CREDENTIALS_ID}",
                    url: 'https://github.com/amirchaaari/rallylite-front-end.git'
            }
        }

        stage('Inject Environment File') {
            steps {
                script {
                    writeFile file: 'src/environments/environment.prod.ts', text: """
export const environment = {
  production: true,
  apiUrl: '${API_URL}'
};
"""
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps'
            }
        }





        stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv("${SONARQUBE_ENV}") {
            sh "npx sonar-scanner \
                -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                -Dsonar.sources=. \
                -Dsonar.host.url=$SONAR_HOST_URL \
                -Dsonar.login=$SONAR_AUTH_TOKEN"
        }
    }
}


// stage('Quality Gate') {
//     steps {
//         timeout(time: 1, unit: 'MINUTES') {
//             waitForQualityGate abortPipeline: true
//         }
//     }
// }

        stage('Build Angular App') {
            steps {
                sh './node_modules/.bin/ng build --configuration=production'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def shortCommit = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.IMAGE_TAG = shortCommit
                    env.VERSION = shortCommit
                    docker.build("${GHCR_REPO}:${IMAGE_TAG}", "--platform linux/amd64 .")
                }
            }
        }

        stage('Push to GHCR') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${GHCR_CREDENTIALS_ID}",
                    usernameVariable: 'GHCR_USER',
                    passwordVariable: 'GHCR_PAT'
                )]) {
                    sh '''
                        echo $GHCR_PAT | docker login ghcr.io -u $GHCR_USER --password-stdin
                        docker push ${GHCR_REPO}:${IMAGE_TAG}
                        docker tag ${GHCR_REPO}:${IMAGE_TAG} ${GHCR_REPO}:latest
                        docker push ${GHCR_REPO}:latest
                        docker logout ghcr.io
                    '''
                }
            }
        }

        stage('Deploy to K8s') {
            steps {
                sh '''
                    which envsubst || (apt-get update && apt-get install -y gettext)

                    export IMAGE_TAG=${VERSION}
                    envsubst < k8s/frontend-deployment.yaml > k8s/frontend-deployment-rendered.yaml
                    kubectl apply -f k8s/frontend-deployment-rendered.yaml
                    kubectl apply -f k8s/frontend-service.yaml
                '''
            }
        }
    }

    post {
        success {
            echo ' Frontend pipeline completed successfully.' //test
        }
        failure {
            echo ' Frontend pipeline failed.' 
        }
    }
}
