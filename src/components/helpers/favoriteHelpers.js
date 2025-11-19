import { db } from '../../database/firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

export const getFavoriteDocRef = (userId, beerId) =>
  doc(db, 'favorites', `${userId}_${beerId}`);

export const checkBeerFavoriteStatus = async (userId, beerId) => {
  if (!userId || !beerId) return false;

  const userFavoritesRef = getFavoriteDocRef(userId, beerId);
  const docSnap = await getDoc(userFavoritesRef);
  return docSnap.exists();
};

export const toggleBeerFavoriteStatus = async ({ userId, beer, isFavorite }) => {
  if (!userId || !beer?.id) throw new Error('Missing user or beer information for favorite toggle');

  const userFavoritesRef = getFavoriteDocRef(userId, beer.id);

  if (isFavorite) {
    await deleteDoc(userFavoritesRef);
    return false;
  }

  await setDoc(userFavoritesRef, {
    ...beer,
    userId,
    addedAt: new Date(),
  });

  return true;
};
