
## Intelligent Document Management System (GED) with Data Science Integration

### Overview

This project aims to develop an innovative **Electronic Document Management System (GED)**, leveraging advanced **Data Science** techniques for intelligent document classification and semantic search. The system integrates various technologies such as **FastAPI**, **React.js**, **MySQL**, and **Chromadb** to offer a seamless, intelligent document management experience.
please find below the drive link to the demo video
### Architecture

- **Backend**: The backend is structured with **FastAPI** to serve the document management and classification models. The system utilizes state-of-the-art document classification models, specifically the **Microsoft LayoutLMv3 (base)** and **Curiousily LayoutLMv3 (financial document classification)**, to classify incoming document images into categories.
  
- **Frontend**: The frontend is built using **React.js**, providing a user-friendly interface to interact with the system. The code for the frontend resides in the `main` branch, while the backend and models are in the `master` branch.
 
### Features

- **Document Classification**: The system processes incoming document images and classifies them into predefined categories such as:
  - **Business-related** (e.g., reports, memos)
  - **Finance-related** (e.g., invoices, financial statements)
  - **Marketing-related** (e.g., promotional material)
  
  This classification is achieved through the use of **LayoutLMv3**, a powerful pre-trained transformer model tailored for document understanding.

- **Search and Retrieval**:
  - **Keyword Search**: We use **MySQL** to store and retrieve document content. Users can search for specific documents based on keywords, and the system fetches relevant content from the database.
  - **Semantic Search**: To enhance the search experience, **Chromadb** is integrated for semantic search. This allows for context-aware searches, where documents are retrieved based on semantic similarity rather than just keyword matching. The semantic search leverages document embeddings generated by the **Paraphrase-MiniLM-L6-v2** model, which encodes document content into high-dimensional vectors.

### Document Embedding

For efficient semantic search, all documents are embedded using the **Paraphrase-MiniLM-L6-v2** model. The embeddings are generated from the **[CLS]** token of the model’s output, ensuring that each document is represented by a vector that captures its semantic meaning. These embeddings are stored in **Chromadb**, enabling fast and accurate similarity-based retrieval.

### Data Flow

1. **Document Upload**: A user uploads an image of a document.
2. **Preprocessing**: The document is passed through the LayoutLMv3 model, where it's classified into its respective category.
3. **Database Storage**: Document content is extracted and stored in both **MySQL** (for keyword-based retrieval) and **Chromadb** (for semantic search).
4. **Search**:
   - **Keyword Search**: Search queries are matched with documents in MySQL based on keywords.
   - **Semantic Search**: For more advanced queries, semantic similarity is calculated using the **Paraphrase-MiniLM-L6-v2** embeddings stored in Chromadb.

### Technologies Used

- **FastAPI**: For building the backend API.
- **React.js**: For the frontend user interface.
- **MySQL**: For storing document metadata and content for keyword search.
- **Chromadb**: For storing and querying semantic embeddings of documents.
- **LayoutLMv3**: For document classification and understanding.
- **Paraphrase-MiniLM-L6-v2**: For generating document embeddings for semantic search.

### LIVE DEMO VIDEO
https://drive.google.com/file/d/15x9tG2wMy4c1KGbfKiAoGVxdylYs6dG8/view
###  !! NOTE  !!
to get the code we encountred an issue during the upload , so our models and backend is in the master branch of this repo , the front part is on the main branch

### Conclusion

This intelligent document management system provides an efficient and intuitive platform for classifying and searching documents. By combining the power of machine learning models with semantic search, it helps users quickly find the information they need from a variety of document types.

---

