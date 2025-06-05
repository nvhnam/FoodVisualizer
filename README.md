# 🛒 TrafficShop

TrafficShop is an online grocery platform that integrates **visual nutrition labeling** and an **AI assistant** to help Vietnamese online grocery shoppers make healthier, more informed choices. Building on user-centered design and AI, TrafficShop combines traffic-light nutrient labels with a conversational agent for personalized guidance.

---

## ✨ Project Highlights  

- **Four visualization modes** on each product: Traffic Light Labels, Bar Charts, Pie Charts, Polar Charts  
- **Behavioral impact study** showing the presence of traffic-light labels reduce unhealthy nutrient selections  
- **Integrated AI assistant** for personalized nutrition suggestions, automatic product filtering, and Q&A  
- **Empirical user studies** (N=24, 22, 21) demonstrating perceived usefulness, usability (SUS = 77.4), and high AI helpfulness  
- **Prototype built** with React.js frontend, Node.js/Express.js backend and MySQL database

---

## 📚 Publication  

- **"TrafficShop: Designing Visual Nutrition Support with AI Assistance for Online Grocery Shoppers in Vietnam"**  
- Submitting to *International Journal of Food Design*.  
- Traffic-light labels & AI assistant evaluated across three user studies
- Empirical evidence on visualization preferences, behavioral influence, and UX implications

---

## 👨‍💻 Contributors

- **Nguyen Viet Hoang Nam** (Project Lead, Web Developer, Data Processing)   
- **Tran Bao Tu** (UI/UX Designer, Poster, Slides Creator)  
- **Nguyen Song Huy** (AI Integration)  
- **Dr. Vi Chi Thanh** (Research Supervisor & Guidance)   

---

## 🧠 Technologies Used

| Area               | Tech Stack                                              |
|--------------------|---------------------------------------------------------|
| Visualization      | React.js, Chart.js, Bootstrap                           |
| AI & Backend       | Node.js, Express, LangChain, Gemini                     |
| Data Processing    | Pandas, NumPy, Open Food Facts Dataset                  |
| Deployment & Tools | GitHub, Vercel, FilessIO (DB)                           |

---

## 📦 Data Source 

- Nutritional and product metadata from **Open Food Facts** dataset on Kaggle

---

## ⭐ Support This Project

If **TrafficShop** inspires your work or study:

- 🌟 Please consider giving this repository a **star** on [GitHub](https://github.com/nvhnam/TrafficShop).
- 📄 Cite our upcoming paper in your research (updating)
- 📨 Contribute ideas or fork & PR improvements

> 🆓 The **TrafficShop** is free to use for research and educational purposes **with proper citation**. Commercial use or redistribution is **not permitted**.

---

## 🚀 Features

- 🖼️ **Product Pages** with four nutrition visualizations  
- 🧠 **AI Assistant** for:
  - Personalized daily nutrient recommendations  
  - Automatic product filtering by suggested food groups  
  - Natural-language Q&A on any product  
- ⚡ **Real-time interaction** and smooth, mobile-friendly UI  
- 🔍 **Behavioral insights** captured via the analyzed SUS and user studies  

---

## 🛠️ Getting Started

### Clone & install
<pre>
git clone https://github.com/nvhnam/TrafficShop.git
cd TrafficShop
</pre>  

### Import the sample data
Make sure you have MySQL running, then create a database and load the SQL dump: 
<pre>
# in your MySQL client shell
CREATE DATABASE TrafficShop;
EXIT;
# back in your terminal
mysql -u your_user -p TrafficShop < datafood/openfood.sql
</pre>

### Start the backend (Node.js / Express)
<pre>
cd server
npm install
# configure your .env with DB credentials and any API keys
npm start          
</pre>
   
### Start the frontend (React.js)   
<pre>
cd ../client
npm install
npm start
</pre>

---

## 📈 Future Work

- Mobile & AR integration for on-the-go nutrient overlays
- Expanded local database with authentic Vietnamese product labels
- Longitudinal field study in real e-commerce platforms
- Enhanced AI: deeper personalization, voice interface, multilingual support

---

## 📩 Contact

For questions or collaborations:

- 📧 Email: nvhnam01@gmail.com
- 👨‍💻 Portfolio: https://nguyenviethoangnam.vercel.app/
- 📝 LinkedIn: https://www.linkedin.com/in/nvhnam01/
