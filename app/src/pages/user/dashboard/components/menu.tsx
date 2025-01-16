import { menuItems } from "../constants/menu-items";
import styled from "styled-components";

export const Menu = () => {
    return (
        <MenuStyles>
            <h1>Menu</h1>
            {menuItems.map((item, index) => {
                return (
                    <a key={index} href={item.href}>
                        {item.icon}
                        {item.label}
                    </a>
                );
            })}
        </MenuStyles>
    );
}

const MenuStyles = styled.div`
    grid-column: 1;
    grid-row: 1 / span 2;
    background-color: #ffffff;
    padding: 20px;
    border-right: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 15px;

    h1 {
        font-size: 1.5rem;
        margin-bottom: 20px;
    }

    a {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 15px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 500;
        color: #333;
        transition: background-color 0.3s ease, color 0.3s ease;

        &:hover {
            background-color: #f0f0f0;
            color: #000;
        }

        svg {
            font-size: 1.25rem;
        }
    }
`;
