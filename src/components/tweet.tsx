import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import  {useState} from "react";
import { ITweet } from "./timeline";
import { styled } from "styled-components";
import  {useState} from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;
const Column = styled.div`
  &:last-child {
    justify-self: end;
  }
`;

const Photo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 15px;
  object-fit: cover; 
  margin: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
`;

const ModalPhoto = styled.img`
  max-width: 90%; 
  max-height: 80vh; 
  border-radius: 15px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #2E9AFE;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;
const CreatedAt = styled.div`
  justify-self: end; 
  font-size: 14px; 
  color: #00BFFF; 
  margin-right: 380px; 
`;

export default function Tweet({ username, photo, tweet, userId, id, createdAt }: ITweet) {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null); 
  

const date = new Date(createdAt).toLocaleString(); 



  const user = auth.currentUser;
  
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error("Error deleting tweet:", e);
    }
  };

  const onPhotoClick = () => {
    if (!photo) return; 
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <Wrapper>
        <Column>
          <Username>{username}</Username>
          <Payload>{tweet}</Payload>
          {user?.uid === userId ? (
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          ) : null}
        </Column>
        <Column>
          {photo && <Photo src={photo} onClick={onPhotoClick} />}
        </Column>
        <CreatedAt>{date}</CreatedAt>
      </Wrapper>

      {isModalOpen && selectedPhoto && ( 
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>Close</CloseButton>
            <ModalPhoto src={selectedPhoto} />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}