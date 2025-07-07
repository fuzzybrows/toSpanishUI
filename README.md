# toSpanish Translation System

A full-stack application that adds Spanish translations to ProPresenter song files using Google's Gemini AI, featuring a React frontend and a FastAPI backend.

## Description

toSpanish is a tool designed for churches and worship teams that need to display song lyrics in both English and Spanish. It leverages Google's Gemini AI to translate English song lyrics to Spanish and formats them in a way that can be imported back into ProPresenter with both languages displayed.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Backend Setup

The backend is a FastAPI application. For detailed installation and configuration instructions, please refer to the [toSpanish API repository](https://github.com/fuzzybrows/toSpanish).

## 🔌 API Endpoints

The frontend application interacts with the following backend API endpoints:

#### 1. Translate Single Text
`POST /propresenter/include_spanish`

#### 2. Upload ProPresenter Files
`POST /propresenter/upload_exported_files`

#### 3. Download Processed File
`GET /propresenter/download_importable_file/{file_id}`

For complete API documentation, see the [backend repository](https://github.com/fuzzybrows/toSpanish).

## 📚 Tech Stack

### Frontend
- **Core:** React 19.1.0
- **Routing:** React Router DOM 7.6.3
- **Styling:** Tailwind CSS 3.4.17, PostCSS 8.5.6
- **HTTP Client:** Axios 1.10.0
- **UI Components:** React Hot Toast 2.5.2

### Backend
- **Framework:** FastAPI
- **AI Integration:** Google Genai
- **Validation:** Pydantic
- **Server:** Uvicorn

## 🧪 Testing

- **Frontend:** The frontend testing suite uses Jest and React Testing Library. Run tests with:
    ```bash
    npm test
    ```
- **Backend:** Refer to the backend repository for details on its testing setup.

## 📄 License

This project is private and proprietary.

## 🔄 Version

Current version: 0.1.0

