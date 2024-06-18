# Node.js Application CI/CD Pipeline

This repository details the CI/CD pipeline setup for a simple Node.js application utilizing Jenkins, Kubernetes, Docker, Grafana, and Prometheus. The pipeline facilitates automated testing, building, and deployment of the application, coupled with robust monitoring.

## Pipeline Overview

The CI/CD pipeline implemented in this project includes various stages that leverage modern DevOps tools to ensure every code commit is systematically built, tested, and deployed. It also integrates monitoring tools to track the application's performance and health.

### Pipeline Stages

- **Checkout Source:** Clones the code from the GitHub repository to the Jenkins server.
- **Unit Tests:** Runs unit tests on the application to ensure expected functionality.
- **Build Image:** Creates a Docker image from the application source code.
- **Push Image:** Pushes the Docker image to a Docker registry.
- **Deploy App:** Deploys the Docker image to a Kubernetes cluster using Minikube.
- **Monitoring Setup:** Configures Grafana and Prometheus using Docker Compose to monitor the application.

## Technologies Used

- **Jenkins:** Automates the pipeline for build, test, and deployment tasks.
- **Kubernetes with Minikube:** Manages the deployment of containerized applications.
- **Docker:** Containers the application for consistent deployment environments.
- **Grafana & Prometheus:** Provides monitoring and metric visualization.

## Monitoring with Grafana and Prometheus

Monitoring is handled through Grafana and Prometheus, set up via a Docker Compose file. These tools are essential for visualizing the application's metrics and ensuring operational health.

## Setting Up the Environment

### Prerequisites

- Jenkins with required plugins for Git, Docker, and Kubernetes.
- Docker and Minikube installed on the host where Jenkins runs.
- Access credentials for DockerHub and Kubernetes configured in Jenkins.

Add credentials like this:

![credentials](https://i.imgur.com/ekSLqu2.png)

### Installation

1. Install Jenkins on your system.
2. Add necessary plugins for Git, Docker, and Kubernetes integration in Jenkins.
3. Set up Minikube as the Kubernetes cluster on the same system.

![Minikube](https://i.imgur.com/Nq1Zn5W.png)

## Jenkins Pipeline Stages Explained

The Jenkins pipeline for deploying a Node.js application includes several key stages. Each stage is designed to ensure the code moves smoothly from source to deployment with necessary checks and balances. Here’s a detailed explanation of each stage as shown in the Jenkins dashboard:

![overview](https://i.imgur.com/i3bxgQ2.png)

### Start

- **Description:** This initial phase marks the beginning of the pipeline execution.
- **Purpose:** Prepares the pipeline environment and gathers necessary parameters for running subsequent stages.

### Checkout Source

- **Description:** The source code is fetched from the main branch of the specified Git repository.
- **Purpose:** Ensures the latest version of the source code is used for all following actions in the pipeline.

![checkout](https://i.imgur.com/qOzsVIY.png)

### Unit Tests

- **Description:** Runs unit tests on the Node.js application using tools like Mocha.
- **Purpose:** Validates the correctness of the code and checks for any breaking changes before moving forward in the pipeline.

![unit-test](https://i.imgur.com/qMAhs5q.png)

### Build Image

- **Description:** A Docker image of the Node.js application is created.
- **Purpose:** Packages the application and its environment into a Docker image, making it ready for deployment in a consistent manner across any Docker-compatible system.

![build](https://i.imgur.com/9ikwiDT.png)

### Pushing Image

- **Description:** The built Docker image is pushed to a Docker registry (e.g., DockerHub).
- **Purpose:** Stores the Docker image in a registry from where it can be pulled during the deployment stage.

![pushing](https://i.imgur.com/K7yLw9J.png)

### Deploying App to Kubernetes

- **Description:** The Docker image is deployed to a Kubernetes cluster using configurations specified in the deployment files.
- **Purpose:** Ensures the application is deployed and managed efficiently in a Kubernetes environment, allowing for scalability and management of the application instances.

![deploying](https://i.imgur.com/KUmzfUv.png)

### End

- **Description:** Represents the conclusion of the pipeline process.
- **Purpose:** Finalizes the pipeline execution, providing a completion status and cleaning up any resources used during the pipeline execution if necessary.

![end](https://i.imgur.com/wq05qYU.png)

These stages are designed to automate the process from code integration to deployment, ensuring a robust and consistent delivery of the application with minimal manual intervention.

## Minikube Tunnel Explanation

When working with Minikube, which simulates a Kubernetes cluster on a local machine, you often need a way to expose services externally. `minikube tunnel` is a command that runs in the background and creates a route between your local machine and the Minikube cluster, allowing you to access services as if they were running on a real Kubernetes cluster.

![tunnel](https://i.imgur.com/o8ya9zQ.png)

And this is the response of webserver in kubernetes:

![response](https://i.imgur.com/ZJVaXf1.png)

## Grafana Dashboard for Node.js Application Monitoring

The dashboard consists of several panels, each displaying specific performance metrics.

![dashboard](https://i.imgur.com/srwv6qm.png)

### Usage

This dashboard is vital for developers and system administrators who need to ensure that their Node.js applications are performing well and efficiently. By regularly checking these metrics, one can proactively address performance issues before they impact users.

### Setup

To set up a similar dashboard:

1. Ensure that Prometheus is scraping metrics from your Node.js application.
2. Use Grafana to connect to your Prometheus data source.
3. Create and configure the dashboard panels to display the desired metrics.
