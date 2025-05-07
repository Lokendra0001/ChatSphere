import { Account, Client, Databases, ID } from "appwrite";
import conf from "../conf/conf";

class authServices {
  client = new Client();
  account;
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.VITE_APPWRITE_ENDPOINT)
      .setProject(conf.VITE_APPWRITE_PROJECT_ID);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  async createAccount(data) {
    try {
      const user = await this.account.create(
        ID.unique(),
        data.email,
        data.password,
        data.name
      );
      if (user) {
        await this.setContactList(user.$id, user.name);
        return this.loginAccount({
          email: data.email,
          password: data.password,
        });
      }
    } catch (err) {
      console.error("Create Account Error:", err.message || err);
    }
  }

  async loginAccount({ email, password }) {
    try {
      const user = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (user) return user;
      return false;
    } catch (error) {
      console.error("Login Error:", error.message || error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Get User Error:", error.message || error);
      return null;
    }
  }

  async logoutAccount() {
    try {
      const isDeleted = await this.account.deleteSessions();
      if (isDeleted) return true;
      return false;
    } catch (error) {
      console.error("Logout Error:", error.message || error);
    }
  }

  async googleLogin() {
    try {
      return await this.account.createOAuth2Session(
        "google",
        "https://chat-sphere-three-azure.vercel.app/",
        "https://chat-sphere-three-azure.vercel.app/login"
      );
    } catch (error) {
      console.log(error);
    }
  }

  async setContactList(userId, name) {
    try {
      const contact = {
        contact_id: userId,
        contact_name: name,
      };
      const added = await this.databases.createDocument(
        conf.VITE_APPWRITE_DATABASE_ID,
        "68189a6c001e5f8440a2",
        userId,
        contact
      );
      if (added) console.log(added);
    } catch (error) {
      console.log(error);
    }
  }

  async getContactList() {
    try {
      return await this.databases.listDocuments(
        conf.VITE_APPWRITE_DATABASE_ID,
        "68189a6c001e5f8440a2"
      );
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new authServices();
export default authService;
