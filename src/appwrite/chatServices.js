import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";

class ChatService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.VITE_APPWRITE_ENDPOINT)
      .setProject(conf.VITE_APPWRITE_PROJECT_ID);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Create a message
  async createMessage(message, sender_id, receiver_id, type) {
    try {
      return await this.databases.createDocument(
        conf.VITE_APPWRITE_DATABASE_ID,
        conf.VITE_APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
          message,
          sender_id,
          receiver_id,
          type,
        }
      );
    } catch (error) {
      console.error("Create Message Error:", error);
      throw error;
    }
  }

  // Fetch all messages with pagination
  async getMessages(limit = 50, offset = 0, queries = []) {
    try {
      return await this.databases.listDocuments(
        conf.VITE_APPWRITE_DATABASE_ID,
        conf.VITE_APPWRITE_COLLECTION_ID,
        [
          Query.limit(limit), // Specify limit for pagination
          Query.offset(offset), // Skip 'offset' number of records
          ...queries, // Additional queries can still be passed in
          Query.orderAsc("$createdAt"), // Order messages by creation time
        ]
      );
    } catch (error) {
      console.error("Get Messages Error:", error);
      throw error;
    }
  }

  // Subscribe to real-time updates for messages
  subscribeToMessages(callback) {
    const channel = `databases.${conf.VITE_APPWRITE_DATABASE_ID}.collections.${conf.VITE_APPWRITE_COLLECTION_ID}.documents`;

    return this.client.subscribe(channel, (response) => {
      // Check for create, update, or delete events
      if (
        response.events.includes("databases.*.collections.*.documents.*.create")
      ) {
        callback({ type: "create", payload: response.payload });
      } else if (
        response.events.includes("databases.*.collections.*.documents.*.update")
      ) {
        callback({ type: "update", payload: response.payload });
      } else if (
        response.events.includes("databases.*.collections.*.documents.*.delete")
      ) {
        callback({ type: "delete", payload: response.payload });
      }
    });
  }

  // Bucket Work here

  async uploadImg(imageurl) {
    try {
      return await this.storage.createFile(
        conf.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        imageurl
      );
    } catch (error) {
      console.log("Image Upload error ::" + error);
    }
  }

  getImg(imageurl) {
    try {
      return this.storage.getFileView(conf.VITE_APPWRITE_BUCKET_ID, imageurl);
    } catch (error) {
      console.log("Get Image error ::" + error);
    }
  }
}

const chatService = new ChatService();
export default chatService;
