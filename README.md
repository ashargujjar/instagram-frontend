📦 MERN Social App – Backend
This is the backend for my full-stack MERN Social Media App. It provides a secure RESTful API for features such as user authentication, posting images, comments, and following/unfollowing users.

🚀 Tech Stack
Node.js + Express.js – Server and routing

MongoDB Atlas – Cloud database

Mongoose – ODM for MongoDB

JWT (jsonwebtoken) – Secure authentication

bcryptjs – Password hashing

Multer – Handle image uploads

Cloudinary – Cloud image storage

express-validator – Input validation

CORS – Cross-origin requests

dotenv – Environment variable management

🔧 Features
👤 User Signup/Login with JWT

✅ Input validation using express-validator

🔐 Protected routes for authenticated users

📤 Image uploads handled via Multer and stored on Cloudinary

📝 Create, read, and delete posts with image support

💬 Add and view comments on posts

🔍 Search for users

👥 Follow/Unfollow other users

📊 Track follower/following count

🧾 Profile fetching and updating

📁 Folder Structure
bash
Copy
Edit
backend/
│
├── controllers/      # Request logic
├── middleware/       # Auth middleware
├── models/           # Mongoose schemas
├── routes/           # Route definitions
├── utils/            # Cloudinary config, helpers
├── uploads/          # (temp storage, optional)
├── .env              # Environment variables
├── app.js            # Express setup
└── server.js         # App entry point
⚙️ Environment Variables
Create a .env file in the root of the backend with the following:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
🛠️ Setup & Run
bash
Copy
Edit
# Install dependencies
npm install

# Run the server
npm run dev
Make sure MongoDB Atlas and Cloudinary keys are correctly configured in .env.

📬 API Endpoints (Sample)
Method	Route	Description
POST	/api/auth/signup	Register new user
POST	/api/auth/login	User login
POST	/api/posts	Create new post
GET	/api/posts/feed	Get posts from following
PUT	/api/user/follow/:id	Follow a user
GET	/api/user/search	Search for users

❗ Notes
All protected routes require the token to be passed in the Authorization header.

Use tools like Postman or your frontend to test routes.

Frontend: [Link to frontend repo if public]

🧠 Author & Credits
Built by [Your Name].
100% custom logic — no AI-generated code.
Still under development and continuously improving, INSHALLAH 🙏.

