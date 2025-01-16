import { House } from '@phosphor-icons/react';
import { User } from '@phosphor-icons/react';
import { SignOut } from '@phosphor-icons/react';
import { Money } from '@phosphor-icons/react';
import { Clock } from '@phosphor-icons/react';

export const menuItems = [
    {
        label: 'Página Inicial',
        icon: <House />,
        href: '/user/dashboard/home',
    },
    {
        label: 'Perfil',
        icon: <User />,
        href: '/user/dashboard/profile',
    },

    {
        label: 'Finanças',
        icon: <Money />,
        href: '/user/dashboard/finances',
    },

    {
        label: 'Histórico',
        icon: <Clock />,
        href: '/user/dashboard/history',
    },

    {
        label: 'Sair',
        icon: <SignOut />,
        href: '/logout',
    }

];

