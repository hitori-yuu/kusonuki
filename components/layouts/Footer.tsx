import React from 'react'

import {
    Home,
    User,
    Settings,
    Info
} from 'lucide-react';

const Footer = () => {
    const footerItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: User, label: 'Profile', href: '/profile' },
        { icon: Settings, label: 'Settings', href: '/settings' },
        { icon: Info, label: 'About', href: '/about' },
    ];

  return (
    <footer className="flex justify-around items-center bg-gray-200/10 backdrop-blur-lg border border-gray-200/30 shadow-lg py-4 rounded-t-3xl">
        {footerItems.map((item, index) => (
            <a key={index} href={item.href} className="flex flex-col items-center">
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-sm">{item.label}</span>
            </a>
        ))}
    </footer>
  )
}

export default Footer