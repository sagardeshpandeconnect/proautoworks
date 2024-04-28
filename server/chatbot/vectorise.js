import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";

const mongoUrl = process.env.MONGO_URL;
const openAIApiKey = process.env.OPENAI_API_KEY;
const client = new MongoClient(mongoUrl);

export async function uploadChatBotDataToDatabase() {
  try {
    // Configure your Atlas collection
    const database = client.db("proautoworks");
    const collection = database.collection("chatbotdata");
    const dbConfig = {
      collection: collection,
      indexName: "vector_index", // The name of the Atlas search index to use.
      textKey: "text", // Field name for the raw text content. Defaults to "text".
      embeddingKey: "embedding", // Field name for the vector embeddings. Defaults to "embedding".
    };

    // Ensure that the collection is empty
    await collection.deleteMany({});

    // Load and split the sample data
    const loader = new TextLoader("chatbot/data/chatbotdata.txt");
    const data = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });
    const docs = await textSplitter.splitDocuments(data);

    // Instantiate Atlas as a vector store
    await MongoDBAtlasVectorSearch.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey }),
      dbConfig
    );
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}
