// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Эта функция будет вызываться для любого вошедшего пользователя
  const handleUser = async (rawUser) => {
    if (rawUser) {
      const userRef = doc(db, 'users', rawUser.uid);
      const userDoc = await getDoc(userRef);
      // Создаем документ пользователя, только если его еще нет (актуально для Google Sign-In)
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          displayName: rawUser.displayName,
          email: rawUser.email,
          photoURL: rawUser.photoURL,
          createdAt: new Date(),
        });
      }
      setUser(rawUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
      alert(error.message);
    }
  };

  const registerWithEmail = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });

      // --- НАЧАЛО ИСПРАВЛЕНИЯ ---
      // Создаем документ пользователя в Firestore сразу после регистрации,
      // чтобы гарантированно сохранить displayName.
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        displayName: displayName, // Используем имя из формы
        email: userCredential.user.email,
        photoURL: null, // У email-пользователей нет аватара по умолчанию
        createdAt: new Date(),
      });
      // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
      
      // onAuthStateChanged позаботится об остальном
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      alert(error.message);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Ошибка входа:", error);
      alert("Неверный email или пароль.");
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  return { user, loading, signInWithGoogle, registerWithEmail, signInWithEmail, signOutUser };
};
