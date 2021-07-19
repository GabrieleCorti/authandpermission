import styled from 'styled-components';

const NavS = styled.div`
    padding: 20px 30px;
    display: flex;
    justify-content: flex-end;
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ul {
        display: flex;
        list-style: none;
        text-align: end;
    }
    a {
        color: #0d920d;
        font-size: 24px;
    }
    li {
        margin-left: 12px;
    }
`;

export default NavS;