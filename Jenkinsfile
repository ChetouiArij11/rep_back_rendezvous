pipeline {
    agent any
    environment {
        DOCKER_PATH = "C:\\Program Files\\Docker\\cli-plugins"
        NODEJS_PATH = "C:\\Program Files (x86)\\nodejs"
        KUBECONFIG = 'C:\\Program Files\\Jenkins\\.kube\\config' 
        PATH = "${DOCKER_PATH};${env.PATH}"
        CHROME_BIN = '/usr/bin/google-chrome'
    }
    stages {
        stage('Install Node.js and npm') {
            steps {
                script {
                    def nodejs = tool name: 'NODEJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodejs}/bin;${env.PATH}"
                }
            }
        }
        stage('Install express et Dependencies') {
            steps {
                script {
                    bat 'npm install express'
                    bat 'npm install'
                }
            }
        }
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }
        stage('Build & rename Docker Image') {
            steps {
                script {
                    bat 'docker build -t back_rendezvous:latest .'
                    bat 'docker tag back_rendezvous:latest arijchetoui1/back_rendezvous:latest'
                }
            }
        }
        stage('Deploy Docker image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', '14') {
                        docker.image('arijchetoui1/back_rendezvous:latest').push()
                    }
                }
            }
        }

        stage('SonarQube test') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube Test') { 
                        bat 'npm run sonarqube'
                    }
                }
            }
        }
        stage('Deploy with kubectl') {
            steps {
                script {
                    bat '''
                    kubectl config view
                    kubectl config use-context docker-desktop
                    kubectl cluster-info
                    kubectl get nodes
                    kubectl delete deployment backend-deployment  -n gestion-rendezvous
                    kubectl delete deployment mysql-deployment -n gestion-rendezvous
                    kubectl delete  svc backend-service  -n gestion-rendezvous
                    kubectl delete  svc mysql-service  -n gestion-rendezvous
                    kubectl get namespace gestion-rendezvous || kubectl create namespace gestion-rendezvous
                    kubectl apply -f db/configMap.yml -n gestion-rendezvous
                    kubectl apply -f db/mysqldep.yml -n gestion-rendezvous
                    kubectl apply -f db/persistant.yaml -n gestion-rendezvous
                    kubectl apply -f deployment.yaml -n gestion-rendezvous
                    '''
                }
            }
        }
<<<<<<< HEAD
        stage('Monitoring') {
=======
        stage('Monitoring project') {
>>>>>>> 69a1e5c ( version final de jenkins file)
            steps {
                script {
                    bat '''
                    cd monotoring
                    docker-compose up
                    '''
                }
            }
        }
    }
}
