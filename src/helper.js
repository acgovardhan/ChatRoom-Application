import { collection, query, where, getCountFromServer } from 'firebase/firestore'
import { db } from './firebase-config'

export default async (roomName) =>{
  const messageRef = collection(db, "messages")
  const messageQuery = query(messageRef, where("room", "==", roomName));
  const snapshot = await getCountFromServer(messageQuery)
  return snapshot.data().count
}