import { CreateUserParams, SignInParams, User } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: "com.rizvi.foodapp",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: "68940b6b002795b72a79",
    userCollectionId: "68940b8d00128a87eadb"
}

export const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!).setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatar = new Avatars(client);

export const createUser = async ({email, name, password}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if (!newAccount) {
            throw new Error("User creation failed");
        }
        const avatarUrl = avatar.getInitialsURL(newAccount.name);
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: newAccount.email,
                name: newAccount.name,
                avatar: avatarUrl
            }
        );

    } catch (error) {
        throw new Error("Failed to create user: " + error);
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        await account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw new Error("Failed to sign in: " + error);
    }
}

export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        if (!user) {
            throw new Error("No user is currently signed in");
        }
        const currentUser = await databases.listDocuments<User>(
            appwriteConfig.databaseId, 
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", user.$id)]
        )
        if (!currentUser) throw Error();
        return currentUser.documents[0] as User;
    } catch (error) {
        console.error("Failed to get current user:", error);
        throw new Error("Failed to get current user: " + error);
    }
}