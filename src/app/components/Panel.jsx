import styled from "styled-components";

const Panel = styled.div`
	background-color: ${props => props.dark ? #404040 : #f2f2f2};
	padding: 5px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
`;

export default Panel;
