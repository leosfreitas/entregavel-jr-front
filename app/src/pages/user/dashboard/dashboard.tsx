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
    grid-template-columns: 200px 1fr;
    grid-template-rows: 100px 1fr;
    height: 100vh;
    width: 100vw;
    background-color: #f9f9f9;
`