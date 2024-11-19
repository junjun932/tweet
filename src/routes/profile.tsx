import { auth, db, storage } from "../firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";

import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const NameInput = styled.input`
  font-size: 22px;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 10px;
`;

const UpdateButton = styled.button`
  font-size: 16px;
  padding: 8px 12px;
  border: none;
  background-color: #1d9bf0;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export default function Profile() {
  const [user, setUser] = useState(auth.currentUser);
  const [avatar, setAvatar] = useState(user?.photoURL); 
  const [name, setName] = useState(user?.displayName ?? "Anonymous"); 
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 사용자 정보 업데이트
        setName(currentUser.displayName ?? "Anonymous"); // 초기 이름 설정
        setAvatar(currentUser.photoURL); // 초기 아바타 설정
      }
    });

    return () => unsubscribe();
  }, []);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl); 
      await updateProfile(user, {
        photoURL: avatarUrl, 
      });
    }
  };

  const onNameChange = async () => {
    if (user && name.trim()) {
      await updateProfile(user, {
        displayName: name, 
      });
      alert("Name has been successfully updated!");

      
      setName(user.displayName);
    } else {
      alert("Please enter a name.");
    }
  };

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} /> 
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange} 
        id="avatar"
        type="file"
        accept="image/*"
      />
      
      <NameInput
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      
      <UpdateButton onClick={onNameChange}>Edit Name</UpdateButton>
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} /> 
        ))}
      </Tweets>
    </Wrapper>
  );
}
