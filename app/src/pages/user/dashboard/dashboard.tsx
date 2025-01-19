import { Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { Menu } from './components/menu';
import styled from 'styled-components';
import { Home } from './nested/home/homepage';
import { History } from './nested/history/history';
import { Finances } from './nested/finances/finances';
import { Profile } from './nested/profile/profile';
import { Budget } from './nested/budget/budget';

export const Dashboard = () => {
    return (
        <DashboardStyles>
            <Header/>
            <Menu/>
            <Routes>
                <Route path="home" element={<Home />}/>
                <Route path="history" element={<History />}/>
                <Route path="budget" element={<Budget />}/>
                <Route path="finances" element={<Finances />}/>
                <Route path="profile" element={<Profile />} />
            </Routes>
        </DashboardStyles>
    )
}

const DashboardStyles = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr; /* Largura da sidebar padrão */
    grid-template-rows: 100px 1fr;
    height: 100%;
    width: 100vw;
    background-color: #eff3f7;

    @media (max-width: 768px) {
        grid-template-columns: 250px 1fr; /* Sidebar menor em telas médias */
    }

    @media (max-width: 480px) {
        grid-template-columns: 200px 1fr; /* Sidebar ainda menor em telas pequenas */
    }
`;
