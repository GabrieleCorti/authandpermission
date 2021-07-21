import styled from 'styled-components';

const BarContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 13px;
    .active.a0 {
        background-color: red;
    }
    .active.a1 {
        background-color: orange;
    }
    .active.a2 {
        background-color: yellow;
    }
    .active.a3 {
        background-color: green;
    }
`;

const Bar = styled.div`
    width: 40px;
    height: 14px;
    margin-left: 4px;
    background-color: #cbd3c7;
`;

export { Bar, BarContainer };