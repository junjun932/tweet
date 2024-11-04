import { Styled } from "styled-components"

const Button = styled.span`
    background-color: white;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 50px;
    border:0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;


const Logo = styled.img`
height: 25px;

`;







export default function GithubButton() {
    return <button>
        <Logo src="/github-logo.svg" />
        Continue with Github 
    </button>
}