pipeline{
    environment{
        docker_image_server=""
        docker_image_client=""
        CI=false
        DOCKERHUB_CREDENTIALS=credentials('DockerHubCred')
    }
    agent any
    stages{
        stage('Stage 1: Clone git repo'){
            steps{
                git branch:'master',
                url:'https://github.com/Bimg-Brein42069/housekeepers-devops.git'
            }
        }
        stage('Build Server'){
            steps{
                sh 'cd server && npm install --loglevel=error'
            }
        }
        stage('Test API endpoints'){
            steps{
                sh 'cd server && npm run test'
            }
        }
        stage('Build Client'){
            steps{
                sh 'cd client && npm install --loglevel=error'
            }
        }
        stage('Build docker images'){
            steps{
                script{
                    sh 'docker compose build'
                    docker_image_client='dspani/housekeepclient:latest'
                    docker_image_server='dspani/housekeepserver:latest'
                }
            }
        }
        stage('Push images to dockerhub'){
            steps{
                script{
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    sh 'docker push dspani/housekeepclient:latest'
                    sh 'docker push dspani/housekeepserver:latest'
                }
            }
        }
        stage('Clean docker images'){
            steps{
                script{
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }
        stage('Ansible Deployment'){
            steps{
                ansiblePlaybook becomeUser:null,
                colorized: true,
                credentialsId: 'localhost',
                disableHostKeyChecking: true,
                installation: 'Ansible',
                inventory: './inventoryFile',
                playbook: './ansible-playbook.yml',
                sudoUser: null
            }
        }
    }
}
