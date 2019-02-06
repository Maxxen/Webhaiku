import styled from "styled-components";

const Text = styled.p`
	color: ${props => props.dark ? "#f2f2f2" : "#404040"};
	font-size: ${props => props.size};
	font-style: ${props => props.italic && "italic"};
	font-weight: ${props => props.bold && "bold"};
	font-family: 'Source Sans Pro', sans-serif;
`;

export default Text;
