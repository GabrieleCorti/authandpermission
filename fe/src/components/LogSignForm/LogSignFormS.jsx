import styled from 'styled-components';

const LogSignFormS = styled.div`
    width: 40%;
    margin: auto;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 50px 100px;
    background-color: #2f2f2f;
    h1,
    label {
        color: white;
        font-size: 20px;
    }
    input {
        margin: 8px 0 20px;
        padding: 10px;
        font-size: 18px;
    } 
    h1 {
        margin: 0 0 20px;
        font-size: 36px;
    }
    box-sizing: border-box;
`;

export default LogSignFormS;