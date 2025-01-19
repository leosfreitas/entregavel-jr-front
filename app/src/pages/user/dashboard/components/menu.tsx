import { menuItems } from "../constants/menu-items";
import styled from "styled-components";
import { TrendUp } from "@phosphor-icons/react";

export const Menu = () => {
    return (
        <MenuStyles>
            <h1>
                <TrendUp weight="bold" className="icon"/>
                <span>Fin Track</span>
            </h1>
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
};

const MenuStyles = styled.div`
    grid-column: 1;
    grid-row: 1 / span 2;
    background-color: #1c2434;
    padding: 20px 30px;
    border-right: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 20px;

    h1 {
        font-size: 1.8rem;
        margin-bottom: 25px;
        margin-left: 10px;
        font-weight: 650;
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 15px;

        .icon {
            font-size: 2.0rem; /* Reduz o tamanho da seta */
            color: #ffffff;
            background-color: #3c50e0;
            border-radius: 15%; /* Mantém o formato arredondado */
            margin-top: 3px; /* Adicionado o margin-top */
            padding: 2px; /* Ajusta o tamanho do background */
            display: inline-flex; /* Garante que o ícone fique centralizado */
            align-items: center; /* Centraliza a seta no background */
            justify-content: center; /* Centraliza a seta no background */
        }
    }

    a {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 1.0rem;
        font-weight: 500;
        color: #d9dce8;
        transition: background-color 0.3s ease, color 0.3s ease;

        svg {
            font-size: 1.5rem;
        }
    }
`;
