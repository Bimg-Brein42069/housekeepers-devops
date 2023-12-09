pipeline{
    environment{
        docker_image_server=""
        docker_image_client=""
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
                sh 'cd server && npm install'
            }
        }
        stage('Test API endpoints'){
            steps{
                sh 'cd server && npm run test'
            }
        }
        stage('Build Client'){
            steps{
                sh 'cd client && npm install'
            }
        }
        stage('Build docker images'){
            steps{
                script{
                    sh 'docker compose up --build'
                    docker_image_client='dspanihousekeep/client'
                    docker_image_server='dspanihousekeep/server'
                }
            }
        }
        stage('Push images to dockerhub'){
            steps{
                script{
                    docker.withRegistry('','DockerHubCred'){
                        docker_image_client.push()
                        docker_image_server.push()
                    }
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