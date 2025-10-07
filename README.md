# 🎾 Rallylite Frontend

Rallylite is a Paddle Tennis matchmaking and tournament management platform.  
Players can post matches, request to join existing ones, and register for tournaments.  
This is an early-stage project with plans to integrate **AI features** for player skill matching, performance analysis, and tournament insights.

---

## 🖥️ Tech Stack

- **Framework:** Angular  
- **Language:** TypeScript  
- **Containerization:** Docker  
- **Deployment:** Azure Kubernetes Service (AKS)  

---

## 📁 Project Structure

rallylite-frontend/
├── src/
│ ├── app/
│ ├── assets/
│ └── environments/
├── Dockerfile
├── package.json
└── angular.json

yaml
Data format:

Copy code

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/rallylite-frontend.git
cd rallylite-frontend
2. Install dependencies
bash
Data format:

Copy code
npm install
3. Run locally
bash
Data format:

Copy code
ng serve
The app will be available at 👉 http://localhost:4200

🐳 Docker
Build the image
bash
Data format:

Copy code
docker build -t rallylite-frontend .
Run the container
bash
Data format:

Copy code
docker run -d -p 80:80 rallylite-frontend
This image serves the built Angular app using NGINX.

🌍 Deployment
The frontend Docker image is pushed to GitHub Container Registry (GHCR) and deployed on Azure Kubernetes Service (AKS).

Pipeline flow:

Jenkins builds and tests the Angular app.

Docker image is created and tagged.

Image is pushed to GHCR.

Kubernetes manifests are applied to AKS for deployment.

🚀 Roadmap
 Integrate AI-based player match suggestions

 Add match history and player statistics

 Implement real-time notifications for match requests

 Improve responsive layout and accessibility

📄 License
MIT License © 2025 Rallylite Team
