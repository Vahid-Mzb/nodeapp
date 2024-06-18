pipeline {

  environment {
    dockerimagename = "vahidmzb/nodeapp"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git branch: 'main', url: 'https://github.com/Vahid-Mzb/nodeapp.git'
      }
    }

    stage('Unit Tests') {
      steps {
        script {
          // Check if Node.js is available and use nvm to install if it's not
          sh '''
          if type node; then
            echo "Node is installed"
          else
            echo "Node is not installed. Installing..."
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # Corrected line here
            nvm install node
          fi
          node --version
          npm --version
          '''

          // Install dependencies and run tests
          sh '''
          npm install
          cd test
          npx mocha app.test.mjs
          '''
        }
      }
    }

    stage('Build image') {
      steps {
        script {
          dockerImage = docker.build(dockerimagename)
        }
      }
    }

    stage('Pushing Image') {
      environment {
        registryCredential = 'dockerhublogin'
      }
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploying App to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "kubernetes")
        }
      }
    }
  }
}
