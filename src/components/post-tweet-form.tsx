
const Form = styled.form``;

const TextArea = styled.textarea``;

const AttachFileButton = styled.label``;

const AttachFileInput = styled.input``;

const SubmitBtn = styled.input``;


export default function PostTweetForm(){
    return <Form>
        <TextArea placeholder= "wth is going on?!" />
        <AttachFileButton htmlFor= "file">Add Photo</AttachFileButton>
        <AttachFileInput id="file" accept="image/*"/>
        <SubmitBtn />
    </Form>
}