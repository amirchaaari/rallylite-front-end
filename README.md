Of course\! Here is the provided information formatted as a Markdown README page.

-----

# 🎾 Rallylite Frontend

**Rallylite** is a **Padel & Tennis matchmaking and tournament management platform**.
Players can **create matches**, **join others**, and **register for tournaments** with ease.
This is an early-stage project with upcoming **AI-powered features** for player skill matching, performance tracking, and tournament insights.

-----

## 🖥️ Tech Stack

  - **Framework:** Angular
  - **Language:** TypeScript
  - **Containerization:** Docker
  - **Deployment:** Azure Kubernetes Service (AKS)
  - **CI/CD:** Jenkins + GitHub Container Registry (GHCR)

-----

## 📁 Project Structure

```
rallylite-frontend/
├── src/
│   ├── app/
│   ├── assets/
│   └── environments/
├── Dockerfile
├── package.json
└── angular.json
```

-----

## ⚙️ Local Setup

### 1\. Clone the repository

```bash
git clone https://github.com/your-username/rallylite-frontend.git
cd rallylite-frontend
```

### 2\. Install dependencies

```bash
npm install
```

### 3\. Run locally

```bash
ng serve
```

The app will be available at 👉 `http://localhost:4200`

-----

## 🐳 Docker

### Build the image

```bash
docker build -t rallylite-frontend .
```

### Run the container

```bash
docker run -d -p 80:80 rallylite-frontend
```

🧩 This image serves the built Angular app using NGINX.

-----

## 🌍 Deployment

The frontend Docker image is pushed to GitHub Container Registry (GHCR) and deployed on Azure Kubernetes Service (AKS).

### 🔁 Pipeline Flow

1.  Jenkins builds and tests the Angular app.
2.  A Docker image is created and tagged.
3.  The image is pushed to GHCR.
4.  Kubernetes manifests are applied to AKS for deployment.

-----

## 🚀 Roadmap

  - Integrate AI-based player match suggestions
  - Add match history and player statistics
  - Implement real-time notifications for match requests
  - Enhance responsive design and accessibility
  - Add dark mode and multi-language support

-----

## 📄 License

[MIT License](https://opensource.org/licenses/MIT) © 2025 Rallylite Team
