
const Form = styled.form``;

const TextArea = styled.textarea``;

const AttachFileButton = styled.label``;

const AttachFileInput = styled.input``;




export default function PostTweetForm(){
    return <Form>
        <TextArea />
        <AttachFileButton>Add Photo</AttachFileButton>
        <AttachFileInput/>
        <SubmitBtn />
    </Form>
}